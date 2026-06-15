"use client";

import { useEffect, useRef, useState, useCallback, startTransition } from "react";
import type { DashboardPayload } from "@/lib/domain/types";

const MAX_MESSAGE_LENGTH = 32000;

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
      setVoiceState("unsupported");
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


export function ChatBubble({
  dashboard,
  refreshDashboard
}: {
  dashboard: DashboardPayload;
  refreshDashboard: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const narrator = useNarrator(selectedVoice);
  const [activeNarratedMessageId, setActiveNarratedMessageId] = useState<string | null>(null);

  // Voice/TTS Initialization
  useEffect(() => {
    const initVoice = () => {
      const voices = window.speechSynthesis.getVoices();
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

  // Sync active narrated message ID when narrator is no longer playing
  useEffect(() => {
    if (!narrator.isPlaying) {
      setActiveNarratedMessageId(null);
    }
  }, [narrator.isPlaying]);

  // Auto-scroll to bottom of chat log when open/message length changes
  const scrollToBottom = useCallback(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, dashboard.chat, scrollToBottom]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTranscript = useCallback((transcript: string) => {
    setMessage((prev) => {
      const separator = prev.length > 0 && !prev.endsWith(" ") ? " " : "";
      return prev + separator + transcript;
    });
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
        attachments: attachments.map((f) => ({ name: f.name, size: f.size, type: f.type }))
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
      await refreshDashboard();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Hermes chat failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      <style>{`
        /* Floating Chat Bubble Button */
        .floating-chat-bubble {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: var(--primary, #00ffcc);
          border: 2px solid var(--border, #333);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 255, 204, 0.4);
          cursor: pointer;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .floating-chat-bubble:hover {
          transform: scale(1.08);
          background-color: #00e6b8;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 255, 204, 0.6);
        }
        .floating-chat-bubble svg {
          width: 26px;
          height: 26px;
          fill: #000;
        }

        /* Slide-out Chat Panel */
        .chat-bubble-panel {
          position: fixed;
          bottom: 92px;
          right: 24px;
          width: 400px;
          height: 550px;
          max-height: calc(100vh - 120px);
          background-color: var(--bg-panel, #121212);
          border: 1px solid var(--border, #333);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 255, 204, 0.1);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(10px);
          opacity: 0;
          pointer-events: none;
        }
        .chat-bubble-panel.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Panel Header */
        .chat-bubble-header {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border, #333);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
        }
        .chat-bubble-title {
          font-family: var(--font-mono, monospace);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.05em;
          color: var(--text, #fff);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .chat-bubble-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--primary, #00ffcc);
          box-shadow: 0 0 8px var(--primary, #00ffcc);
        }
        .chat-bubble-close {
          background: none;
          border: none;
          color: var(--text-muted, #888);
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.15s ease, background-color 0.15s ease;
        }
        .chat-bubble-close:hover {
          color: var(--text, #fff);
          background-color: rgba(255, 255, 255, 0.05);
        }

        /* Messages Area */
        .chat-bubble-log {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: rgba(0, 0, 0, 0.15);
        }
        .chat-bubble-msg {
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          line-height: 1.45;
          word-break: break-word;
          font-family: var(--font-sans, system-ui, sans-serif);
        }
        .chat-bubble-msg[data-role="user"] {
          align-self: flex-end;
          background-color: var(--bg-card, #1e1e1e);
          border: 1px solid var(--border, #333);
          color: var(--text, #fff);
        }
        .chat-bubble-msg[data-role="assistant"] {
          align-self: flex-start;
          background-color: rgba(0, 255, 204, 0.03);
          border: 1px solid rgba(0, 255, 204, 0.2);
          color: var(--text, #fff);
        }
        .chat-bubble-msg-role {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          text-transform: uppercase;
          margin-bottom: 4px;
          letter-spacing: 0.05em;
          color: var(--primary, #00ffcc);
        }
        .chat-bubble-msg[data-role="user"] .chat-bubble-msg-role {
          color: var(--text-muted, #888);
        }

        /* Input Area */
        .chat-bubble-input-container {
          padding: 14px;
          border-top: 1px solid var(--border, #333);
          background-color: var(--bg-panel, #121212);
        }
        .chat-bubble-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .chat-bubble-textarea {
          flex: 1;
          background-color: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border, #333);
          border-radius: 6px;
          color: var(--text, #fff);
          padding: 8px 12px;
          font-size: 13.5px;
          font-family: var(--font-sans, system-ui, sans-serif);
          resize: none;
          height: 38px;
          max-height: 80px;
          line-height: 1.4;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .chat-bubble-textarea:focus {
          border-color: var(--primary, #00ffcc);
        }
        .chat-bubble-btn {
          width: 38px;
          height: 38px;
          border-radius: 6px;
          border: 1px solid var(--border, #333);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text, #fff);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .chat-bubble-btn:hover:not(:disabled) {
          border-color: var(--primary, #00ffcc);
          background: rgba(0, 255, 204, 0.05);
          color: var(--primary, #00ffcc);
        }
        .chat-bubble-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .chat-bubble-btn.primary-btn {
          background-color: var(--primary, #00ffcc);
          border-color: var(--primary, #00ffcc);
          color: #000;
        }
        .chat-bubble-btn.primary-btn:hover:not(:disabled) {
          background-color: #00e6b8;
          color: #000;
        }

        /* Microphone pulsating animation */
        @keyframes micPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.08); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
        }
        .chat-bubble-btn.listening {
          background-color: #ef4444 !important;
          border-color: #ef4444 !important;
          color: #fff !important;
          animation: micPulse 1.5s infinite;
        }

        /* Attachments Bar */
        .chat-bubble-attachments {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
        }
        .chat-bubble-attachment-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border, #333);
          padding: 3px 8px;
          border-radius: 4px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: var(--text, #fff);
        }
        .chat-bubble-attachment-chip button {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 0;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Thinking message indicator */
        .thinking-indicator {
          display: flex;
          gap: 4px;
          padding: 4px 8px;
          align-items: center;
        }
        .thinking-dot {
          width: 6px;
          height: 6px;
          background-color: var(--primary, #00ffcc);
          border-radius: 50%;
          animation: thinkingBounce 1.4s infinite ease-in-out both;
        }
        .thinking-dot:nth-child(1) { animation-delay: -0.32s; }
        .thinking-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes thinkingBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }

        /* Compact Audio Bar */
        .chat-bubble-audio-bar {
          padding: 8px 12px;
          background: rgba(0, 255, 204, 0.04);
          border-top: 1px solid var(--border, #333);
          backdrop-filter: blur(10px);
          transition: all 0.25s ease;
        }
        .chat-bubble-audio-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-bubble-audio-buttons {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .chat-bubble-audio-btn {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid var(--border, #333);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text, #fff);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transition: all 0.15s ease;
        }
        .chat-bubble-audio-btn:hover:not(:disabled) {
          border-color: var(--primary, #00ffcc);
          background: rgba(0, 255, 204, 0.05);
          color: var(--primary, #00ffcc);
        }
        .chat-bubble-audio-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .chat-bubble-audio-btn.active {
          border-color: var(--primary, #00ffcc);
          background: rgba(0, 255, 204, 0.1);
          color: var(--primary, #00ffcc);
        }
        .chat-bubble-audio-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .chat-bubble-audio-status {
          font-family: var(--font-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.05em;
          color: var(--primary, #00ffcc);
        }
        .chat-bubble-audio-text {
          font-size: 11px;
          color: var(--text-muted, #888);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Listen / speaker button in messages */
        .chat-bubble-listen-btn {
          background: none;
          border: none;
          color: var(--text-muted, #888);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease, background-color 0.15s ease;
        }
        .chat-bubble-listen-btn:hover {
          color: var(--primary, #00ffcc);
          background-color: rgba(0, 255, 204, 0.05);
        }

        /* Speaking pulsating bars */
        .speaking-indicator {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          width: 14px;
          height: 14px;
          padding-bottom: 2px;
        }
        .speaking-bar {
          width: 2px;
          background-color: var(--primary, #00ffcc);
          border-radius: 1px;
          animation: bounceSpeak 0.8s ease-in-out infinite alternate;
        }
        .speaking-bar:nth-child(1) { height: 4px; animation-delay: 0.1s; }
        .speaking-bar:nth-child(2) { height: 8px; animation-delay: 0.3s; }
        .speaking-bar:nth-child(3) { height: 6px; animation-delay: 0.2s; }

        @keyframes bounceSpeak {
          from { height: 3px; }
          to { height: 10px; }
        }
      `}</style>

      {/* Floating Chat Button */}
      <button
        className="floating-chat-bubble"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Open Hermes Assistant"
      >
        <svg viewBox="0 0 24 24">
          {isOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
          )}
        </svg>
      </button>

      {/* Chat Panel */}
      <div className={`chat-bubble-panel ${isOpen ? "open" : ""}`}>
        <div className="chat-bubble-header">
          <div className="chat-bubble-title">
            <span className="chat-bubble-status" />
            HERMES TACTICAL
          </div>
          <button className="chat-bubble-close" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        {/* Message Log */}
        <div className="chat-bubble-log">
          {(!dashboard.chat || dashboard.chat.length === 0) ? (
            <div className="mono-subtle" style={{ margin: "auto", textAlign: "center", color: "#888", fontSize: "12px" }}>
              Awaiting transmission...
            </div>
          ) : (
            dashboard.chat.map((item) => (
              <div key={item.id} className="chat-bubble-msg" data-role={item.role}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <div className="chat-bubble-msg-role">
                    {item.role === "user" ? "OLA (OPERATOR)" : "HERMES"}
                  </div>
                  {item.role !== "user" && (
                    <button
                      className="chat-bubble-listen-btn"
                      onClick={() => {
                        if (activeNarratedMessageId === item.id && narrator.isPlaying) {
                          narrator.stop();
                          setActiveNarratedMessageId(null);
                        } else {
                          narrator.stop();
                          setActiveNarratedMessageId(item.id);
                          narrator.start(item.content);
                        }
                      }}
                      title={activeNarratedMessageId === item.id && narrator.isPlaying ? "Stop reading" : "Read response aloud"}
                    >
                      {activeNarratedMessageId === item.id && narrator.isPlaying ? (
                        <span className="speaking-indicator">
                          <span className="speaking-bar" />
                          <span className="speaking-bar" />
                          <span className="speaking-bar" />
                        </span>
                      ) : (
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: "block" }}>
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                <div style={{ whiteSpace: "pre-wrap" }}>{item.content}</div>
              </div>
            ))
          )}
          {isSubmitting && (
            <div className="chat-bubble-msg" data-role="assistant">
              <div className="chat-bubble-msg-role">HERMES</div>
              <div className="thinking-indicator">
                <span className="thinking-dot" />
                <span className="thinking-dot" />
                <span className="thinking-dot" />
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Error bar if any */}
        {error && (
          <div className="mono-subtle" style={{ color: "#ef4444", padding: "8px 14px", borderTop: "1px solid var(--border)", fontSize: "11px" }}>
            {error}
          </div>
        )}

        {/* Compact Narrator Audio Bar */}
        {narrator.isVisible && (
          <div className="chat-bubble-audio-bar">
            <div className="chat-bubble-audio-row">
              <div className="chat-bubble-audio-buttons">
                <button
                  className="chat-bubble-audio-btn"
                  onClick={narrator.prev}
                  disabled={narrator.currentIndex <= 0}
                  title="Previous sentence"
                >
                  ⏮
                </button>
                <button
                  className="chat-bubble-audio-btn active"
                  onClick={narrator.togglePause}
                  title={narrator.isPaused ? "Play" : "Pause"}
                >
                  {narrator.isPaused ? "▶" : "⏸"}
                </button>
                <button
                  className="chat-bubble-audio-btn"
                  onClick={narrator.next}
                  disabled={narrator.currentIndex >= narrator.totalSentences - 1}
                  title="Next sentence"
                >
                  ⏭
                </button>
                <button
                  className="chat-bubble-audio-btn"
                  onClick={narrator.stop}
                  title="Stop narration"
                >
                  ⏹
                </button>
              </div>
              <div className="chat-bubble-audio-info">
                <div className="chat-bubble-audio-status">
                  HERMES SPEAKING · {narrator.currentIndex + 1}/{narrator.totalSentences}
                </div>
                <div className="chat-bubble-audio-text" title={narrator.currentSentence}>
                  {narrator.currentSentence}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Input Container */}
        <div className="chat-bubble-input-container">
          {attachments.length > 0 && (
            <div className="chat-bubble-attachments">
              {attachments.map((file, idx) => (
                <div key={idx} className="chat-bubble-attachment-chip">
                  <span>{file.name.length > 15 ? file.name.substring(0, 12) + "..." : file.name}</span>
                  <button onClick={() => removeAttachment(idx)}>×</button>
                </div>
              ))}
            </div>
          )}

          <div className="chat-bubble-input-row">
            {/* Paperclip upload button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: "none" }}
              multiple
            />
            <button
              className="chat-bubble-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Attach files (Brief Hermes)"
              disabled={isSubmitting}
            >
              📎
            </button>

            {/* Input message text field */}
            <textarea
              ref={textareaRef}
              className="chat-bubble-textarea"
              placeholder="Message Hermes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
              maxLength={MAX_MESSAGE_LENGTH}
            />

            {/* Microphone button */}
            {voiceState !== "unsupported" && (
              <button
                className={`chat-bubble-btn ${voiceState === "listening" ? "listening" : ""}`}
                onClick={toggleVoice}
                title={voiceState === "listening" ? "Stop listening" : "Start Voice input"}
                disabled={isSubmitting}
              >
                🎙️
              </button>
            )}

            {/* Send button */}
            <button
              className="chat-bubble-btn primary-btn"
              onClick={sendMessage}
              disabled={(!message.trim() && attachments.length === 0) || isSubmitting}
              title="Send Command"
            >
              ➔
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
