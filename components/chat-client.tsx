"use client";

import { useEffect, useRef, useState, useCallback, startTransition } from "react";
import type { DashboardPayload } from "@/lib/domain/types";
import { Navigation } from "@/components/navigation";
import { TopBar } from "@/components/topbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Panel } from "@/components/ui";
import { formatDisplayTime } from "@/lib/utils/time";

const MAX_MESSAGE_LENGTH = 32000;

async function fetchDashboard(): Promise<DashboardPayload | null> {
  const response = await fetch("/api/dashboard", { cache: "no-store" });
  if (!response.ok) {
    // 401/403 means the session expired or the user lost admin access —
    // return null so the caller can handle it gracefully.
    return null;
  }
  return (await response.json()) as DashboardPayload;
}

// ─── Voice Recognition Hook ───────────────────────────────────────────────────

type VoiceState = "idle" | "listening" | "unsupported";

type SpeechRecognitionAPI = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionAPI;

function useVoiceInput(onTranscript: (text: string) => void, onError?: (err: string) => void) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const recognitionRef = useRef<SpeechRecognitionAPI | null>(null);

  useEffect(() => {
    const SpeechRecognitionAPI =
      (typeof window !== "undefined" &&
        ((window as typeof window & {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }).SpeechRecognition ||
          (window as typeof window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition)) ||
      null;

    if (!SpeechRecognitionAPI) {
      startTransition(() => setVoiceState("unsupported"));
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .slice(event.resultIndex)
        .filter((result) => result.isFinal)
        .map((result) => result[0].transcript)
        .join(" ")
        .trim();
      if (transcript) {
        onTranscript(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      setVoiceState("idle");
      if (onError && event?.error) {
        if (event.error === "not-allowed") {
          onError("Microphone access denied. Please enable microphone permissions in your browser settings.");
        } else if (event.error !== "no-speech" && event.error !== "aborted") {
          onError(`Speech recognition error: ${event.error}`);
        }
      }
    };

    recognition.onend = () => {
      setVoiceState("idle");
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognition) {
        try {
          recognition.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [onTranscript, onError]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || voiceState === "unsupported") return;
    try {
      recognitionRef.current.start();
      setVoiceState("listening");
      if (onError) onError(""); // clear any previous error
    } catch (e) {
      if (onError) onError("Failed to start voice input.");
    }
  }, [voiceState, onError]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      setVoiceState("idle");
    } catch (e) {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    if (voiceState === "listening") {
      stopListening();
    } else {
      startListening();
    }
  }, [voiceState, startListening, stopListening]);

  return { voiceState, toggle };
}

// ─── Narrator (TTS Controls) Hook ───────────────────────────────────────────

function splitIntoSentences(text: string): string[] {
  // Split by common sentence endings, keeping the delimiter
  const parts = text.match(/[^.!?]+[.!?]*/g) || [text];
  return parts.map(p => p.trim()).filter(p => p.length > 0);
}

function useNarrator(voice: SpeechSynthesisVoice | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [rate, setRate] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(-1);
    setIsVisible(false);
  }, []);

  const speakSentence = useCallback((index: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    if (index < 0 || !sentences || index >= sentences.length) {
      stop();
      return;
    }

    const text = sentences[index];
    if (!text) {
      stop();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    
    utterance.onend = () => {
      // Small delay to prevent overlap issues on some browsers
      setTimeout(() => {
        setCurrentIndex(prev => {
          if (prev === index) return prev + 1;
          return prev;
        });
      }, 50);
    };
    
    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", {
        error: e.error,
        type: e.type,
        utterance: e.utterance?.text || "Unknown"
      });
      if (e.error !== "interrupted" && e.error !== "canceled") {
        stop();
      }
    };
    
    window.speechSynthesis.speak(utterance);
  }, [sentences, voice, rate, stop]);

  // Effect to handle sentence progression
  useEffect(() => {
    if (isPlaying && !isPaused && currentIndex >= 0 && sentences && currentIndex < sentences.length) {
      startTransition(() => speakSentence(currentIndex));
    } else if (isPlaying && sentences && currentIndex >= sentences.length) {
      startTransition(() => stop());
    }
  }, [currentIndex, isPlaying, isPaused, sentences, speakSentence, stop]);

  const start = useCallback((text: string) => {
    const s = splitIntoSentences(text);
    if (s.length === 0) return;
    
    setSentences(s);
    setCurrentIndex(0);
    setIsPlaying(true);
    setIsPaused(false);
    setIsVisible(true);
  }, []);

  const togglePause = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isPaused) {
      setIsPaused(false);
      // We don't use resume() because it's flaky. 
      // Instead, the useEffect will trigger speakSentence(currentIndex).
    } else {
      setIsPaused(true);
      window.speechSynthesis.cancel();
    }
  }, [isPaused]);

  const next = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, (sentences || []).length));
  }, [sentences]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleRateChange = useCallback((newRate: number) => {
    setRate(newRate);
    // Restart current sentence with new rate
    if (isPlaying && !isPaused) {
      speakSentence(currentIndex);
    }
  }, [isPlaying, isPaused, currentIndex, speakSentence]);

  return {
    isPlaying,
    isPaused,
    currentIndex,
    totalSentences: sentences.length,
    currentSentence: sentences[currentIndex] || "",
    rate,
    setRate: handleRateChange,
    isVisible,
    start,
    stop,
    togglePause,
    next,
    prev
  };
}

// ─── Mic Button ───────────────────────────────────────────────────────────────

function MicButton({ voiceState, onToggle }: { voiceState: VoiceState; onToggle: () => void }) {
  if (voiceState === "unsupported") {
    return null;
  }

  const isListening = voiceState === "listening";

  return (
    <button
      type="button"
      onClick={onToggle}
      title={isListening ? "Stop recording" : "Start voice input"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        background: isListening ? "var(--red)" : "var(--surface-2)",
        border: `1px solid ${isListening ? "var(--red)" : "var(--border-light)"}`,
        borderRadius: 6,
        color: "var(--text)",
        cursor: "pointer",
        fontSize: 13,
        fontFamily: "inherit",
        transition: "all 0.2s ease",
        flexShrink: 0,
        boxShadow: isListening ? "0 0 12px var(--red)" : "none"
      }}
    >
      {/* Mic icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isListening ? (
          /* Stop icon when listening */
          <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none" />
        ) : (
          /* Mic icon when idle */
          <>
            <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </>
        )}
      </svg>
      <span>{isListening ? "Stop" : "Voice"}</span>
      {isListening && (
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "white",
            animation: "pulse 1s infinite"
          }}
        />
      )}
    </button>
  );
}

// ─── Message Actions ──────────────────────────────────────────────────────────

function MessageActions({ content, onListen }: { content: string; onListen: (text: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [justCopied, setJustCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setJustCopied(true);
      setTimeout(() => {
        setJustCopied(false);
        setIsOpen(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        background: isOpen ? "var(--surface-2)" : "transparent",
        border: `1px solid ${isOpen ? "var(--border-light)" : "transparent"}`,
        borderRadius: 20,
        padding: isOpen ? "2px 4px 2px 8px" : "2px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        height: 32,
        position: "relative"
      }} 
      ref={menuRef}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: isOpen ? "auto" : 0,
          maxWidth: isOpen ? 200 : 0,
          opacity: isOpen ? 1 : 0,
          transform: `translateX(${isOpen ? 0 : 20}px)`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: isOpen ? "auto" : "none",
          marginRight: isOpen ? 8 : 0
        }}
      >
        <button
          onClick={() => {
            onListen(content);
            setIsOpen(false);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            color: "var(--text)",
            fontSize: 11,
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 12,
            whiteSpace: "nowrap",
            transition: "all 0.2s ease"
          }}
          className="hover-surface"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          Listen
        </button>
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            color: justCopied ? "var(--green)" : "var(--text)",
            fontSize: 11,
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 12,
            whiteSpace: "nowrap",
            transition: "all 0.2s ease"
          }}
          className="hover-surface"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {justCopied ? "Copied" : "Copy"}
        </button>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen ? "var(--surface-3)" : "transparent",
          border: "none",
          color: isOpen ? "var(--text)" : "var(--dim)",
          cursor: "pointer",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          transition: "all 0.2s ease",
          flexShrink: 0
        }}
        title="More actions"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5"
          style={{
            transform: `rotate(${isOpen ? 90 : 0}deg)`,
            transition: "transform 0.3s ease"
          }}
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
    </div>
  );
}

// ─── Audio Bar Component ──────────────────────────────────────────────────────

function AudioBar({ narrator }: { narrator: ReturnType<typeof useNarrator> }) {
  if (!narrator.isVisible) return null;

  return (
    <div className="audio-bar">
      <div className="audio-controls">
        <button 
          className="audio-btn" 
          onClick={narrator.prev} 
          disabled={narrator.currentIndex <= 0}
          title="Rewind (Previous Sentence)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 19 2 12 11 5 11 19" />
            <polygon points="22 19 13 12 22 5 22 19" />
          </svg>
        </button>
        <button 
          className="audio-btn active" 
          onClick={narrator.togglePause}
          title={narrator.isPaused ? "Play" : "Pause"}
        >
          {narrator.isPaused ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          )}
        </button>
        <button 
          className="audio-btn" 
          onClick={narrator.next} 
          disabled={narrator.currentIndex >= narrator.totalSentences - 1}
          title="Fast-forward (Next Sentence)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 19 22 12 13 5 13 19" />
            <polygon points="2 19 11 12 2 5 2 19" />
          </svg>
        </button>
        <button 
          className="audio-btn" 
          onClick={narrator.stop}
          title="Stop"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        </button>
      </div>

      <div className="audio-info">
        <div className="audio-status mono-subtle">
          Narrating Sentence {narrator.currentIndex + 1} of {narrator.totalSentences}
        </div>
        <div className="audio-text">
          {narrator.currentSentence}
        </div>
      </div>

      <div className="audio-rate-container">
        <div className="audio-rate-label mono-subtle">Speed</div>
        <input 
          type="range" 
          min="0.5" 
          max="2.0" 
          step="0.1" 
          value={narrator.rate} 
          onChange={(e) => narrator.setRate(parseFloat(e.target.value))}
          className="audio-slider"
        />
        <div className="mono-subtle" style={{ width: 30, fontSize: 11, textAlign: "right" }}>{narrator.rate.toFixed(1)}x</div>
      </div>
    </div>
  );
}

// ─── Chat Client ──────────────────────────────────────────────────────────────

export function ChatClient({ initialData }: { initialData: DashboardPayload }) {
  const [dashboard, setDashboard] = useState(initialData);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const narrator = useNarrator(selectedVoice);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };


  // Voice/TTS Initialization
  useEffect(() => {
    const initVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Prefer Google US English
      const googleVoice = voices.find(v => v.name === "Google US English") || 
                         voices.find(v => v.lang === "en-US") || 
                         voices[0];
      setSelectedVoice(googleVoice || null);
    };

    if (typeof window !== "undefined" && window.speechSynthesis) {
      initVoice();
      window.speechSynthesis.onvoiceschanged = initVoice;
    }
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // SSE stream — refresh dashboard on any agent event.
  useEffect(() => {
    const stream = new EventSource("/api/events/stream");
    stream.onmessage = () => {
      void fetchDashboard().then((d) => { if (d) setDashboard(d); }).catch(() => undefined);
    };
    return () => stream.close();
  }, []);


  // Voice transcript handler — append to current message with spacing.
  const handleTranscript = useCallback((transcript: string) => {
    setMessage((prev) => {
      const separator = prev.length > 0 && !prev.endsWith(" ") ? " " : "";
      return prev + separator + transcript;
    });
    // Re-focus textarea so user can continue editing or press Enter.
    textareaRef.current?.focus();
  }, []);

  const { voiceState, toggle: toggleVoice } = useVoiceInput(handleTranscript, setError);

  const sendMessage = async () => {
    if ((!message.trim() && attachments.length === 0) || isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const payload = {
        message: message.trim(),
        attachments: attachments.map(f => ({ name: f.name, size: f.size, type: f.type }))
      };
      const response = await fetch("/api/hermes/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "Hermes chat failed.");
      }
      setMessage("");
      setAttachments([]);
      const refreshed = await fetchDashboard();
      if (refreshed) setDashboard(refreshed);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Hermes chat failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const charsRemaining = MAX_MESSAGE_LENGTH - message.length;
  const nearLimit = charsRemaining < 1000;

  return (
    <ThemeProvider>
      {/* Pulse animation for recording indicator */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div className="shell">
        <Navigation />
        <div className="main">
          <TopBar dashboard={dashboard} />
          <div className="content-grid">
            <main className="section-grid">

              {/* ── Chat Log ── */}
              <Panel title="Hermes Chat Console">
                <div
                  className="chat-log"
                  style={{
                    maxHeight: "60vh",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12
                  }}
                >
                  {(!dashboard?.chat || dashboard.chat.length === 0) ? (
                    <div className="mono-subtle" style={{ padding: "12px 0" }}>
                      No messages yet. Send a message or use Voice below.
                    </div>
                  ) : (
                    dashboard.chat.map((item) => (
                      <div key={item.id} className="chat-message" data-role={item.role}>
                        <div 
                          className="mono-subtle" 
                          style={{ 
                            marginBottom: 6,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <span>{item.role} · {formatDisplayTime(item.createdAt)}</span>
                          {item.role !== "user" && (
                            <MessageActions content={item.content} onListen={narrator.start} />
                          )}
                        </div>
                        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                          {item.content}
                        </div>
                      </div>
                    ))
                  )}
                  {/* Scroll anchor */}
                  <div ref={chatBottomRef} />
                </div>
              </Panel>

              {/* ── Input Panel ── */}
              <Panel title="Send Message">
                <div className="stack">

                  {/* Voice status banner */}
                  {voiceState === "listening" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        background: "rgba(231, 76, 60, 0.12)",
                        border: "1px solid var(--red)",
                        borderRadius: 6,
                        fontSize: 13,
                        color: "var(--red)"
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--red)",
                          animation: "pulse 1s infinite",
                          flexShrink: 0
                        }}
                      />
                      Listening — speak now. Click Stop when done.
                    </div>
                  )}

                  {/* Attachments Preview */}
                  {attachments.length > 0 && (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                      {attachments.map((file, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--surface-2)", padding: "4px 8px", borderRadius: 4, fontSize: 12, border: "1px solid var(--border-light)" }}>
                          <span className="mono-subtle" style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                          <button type="button" onClick={() => removeAttachment(i)} style={{ background: "transparent", border: "none", color: "var(--text)", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    className="textarea"
                    placeholder="Type a message or click Voice to speak…"
                    value={message}
                    maxLength={MAX_MESSAGE_LENGTH}
                    rows={5}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      // Cmd+Enter or Ctrl+Enter to send
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        void sendMessage();
                      }
                    }}
                    style={{ resize: "vertical", minHeight: 100 }}
                    disabled={isSubmitting}
                  />

                  {/* Counter + action row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap"
                    }}
                  >
                    {/* Char counter */}
                    <span
                      className="mono-subtle"
                      style={{
                        fontSize: 12,
                        color: nearLimit ? "var(--orange)" : undefined
                      }}
                    >
                      {message.length.toLocaleString()} / {MAX_MESSAGE_LENGTH.toLocaleString()}
                    </span>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                      />
                      <button
                        className="button"
                        type="button"
                        title="Attach files"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ background: "transparent", border: "1px solid var(--border-light)", color: "var(--text)", padding: "10px 16px" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                      </button>
                      <MicButton voiceState={voiceState} onToggle={toggleVoice} />
                      <button
                        className="button"
                        type="button"
                        disabled={isSubmitting || (!message.trim() && attachments.length === 0)}
                        onClick={() => void sendMessage()}
                        style={{ minWidth: 100 }}
                      >
                        {isSubmitting ? "Sending…" : "Send"}
                      </button>
                    </div>
                  </div>

                  <div className="mono-subtle" style={{ fontSize: 11, color: "var(--dim)" }}>
                    Tip: ⌘ Enter or Ctrl+Enter to send quickly.
                  </div>

                  {/* Error */}
                  {error ? (
                    <div
                      className="list-card"
                      style={{ borderLeft: "3px solid var(--orange)", marginTop: 4 }}
                    >
                      {error}
                    </div>
                  ) : null}
                </div>
              </Panel>
            </main>

            <AudioBar narrator={narrator} />

            {/* ── Right Rail ── */}
            <aside className="right-rail">
              <Panel title="Shared State">
                <div className="stack">
                  <div className="list-card">
                    <div className="mono-subtle">Queue</div>
                    <div style={{ fontSize: 22, marginTop: 6 }}>{dashboard.queue.length}</div>
                  </div>
                  <div className="list-card">
                    <div className="mono-subtle">Workflow Runs</div>
                    <div style={{ fontSize: 22, marginTop: 6 }}>{dashboard.workflowRuns.length}</div>
                  </div>
                  <div className="list-card">
                    <div className="mono-subtle">Active Agents</div>
                    <div style={{ fontSize: 22, marginTop: 6 }}>
                      {dashboard.agents.filter((a) => a.status === "ACTIVE").length}
                    </div>
                  </div>
                </div>
              </Panel>

              <Panel title="Recent Events">
                <div className="stack">
                  {dashboard.events.slice(0, 6).map((event) => (
                    <div key={event.id} className="list-card">
                      <div className="mono-subtle">{event.sourceAgent}</div>
                      <div style={{ marginTop: 6, lineHeight: 1.6 }}>{event.payloadSummary}</div>
                    </div>
                  ))}
                </div>
              </Panel>
            </aside>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
