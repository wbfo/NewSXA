import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

interface TelegramChatPreference {
  preferredAddress?: string;
  updatedAt: string;
}

type TelegramPreferences = Record<string, TelegramChatPreference>;

const PREFERENCES_PATH = path.join(process.cwd(), "data", "telegram-preferences.json");

async function readPreferences(): Promise<TelegramPreferences> {
  try {
    const raw = await readFile(PREFERENCES_PATH, "utf8");
    return JSON.parse(raw) as TelegramPreferences;
  } catch {
    return {};
  }
}

async function writePreferences(preferences: TelegramPreferences) {
  await mkdir(path.dirname(PREFERENCES_PATH), { recursive: true });
  await writeFile(PREFERENCES_PATH, `${JSON.stringify(preferences, null, 2)}\n`, "utf8");
}

export function extractPreferredAddress(text: string): string | null {
  const match = text.match(/\b(?:refer to me as|call me|address me as)\s+([^.!?\n]+)/i);
  if (!match) return null;

  const value = match[1]
    .replace(/\b(?:moving forward|from now on|during our conversations?)\b.*$/i, "")
    .trim()
    .replace(/^["']|["']$/g, "");

  return value.length > 0 ? value : null;
}

export async function getTelegramChatPreference(chatId: number | string): Promise<TelegramChatPreference | null> {
  const preferences = await readPreferences();
  return preferences[String(chatId)] ?? null;
}

export async function setTelegramPreferredAddress(chatId: number | string, preferredAddress: string) {
  const preferences = await readPreferences();
  preferences[String(chatId)] = {
    ...preferences[String(chatId)],
    preferredAddress,
    updatedAt: new Date().toISOString(),
  };
  await writePreferences(preferences);
}

export async function resetTelegramPreferencesForTests() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("resetTelegramPreferencesForTests can only run in tests");
  }

  await unlink(PREFERENCES_PATH).catch(() => undefined);
}
