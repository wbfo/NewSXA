export type AuthRole = "admin" | "client";

export interface AuthUserRecord {
  email: string;
  role: AuthRole;
  passwordHash: string;
  displayName?: string;
}

const DEFAULT_ADMIN_EMAIL = "sxabfcg@gmail.com";

function normalizeEmail(email?: string | null): string {
  return (email || "").trim().toLowerCase();
}

function parseAuthUsersJson(): AuthUserRecord[] {
  const raw = process.env.AUTH_USERS_JSON;
  if (!raw || !raw.trim()) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    const records = parsed
      .map((entry): AuthUserRecord | null => {
        if (!entry || typeof entry !== "object") return null;
        const record = entry as Record<string, unknown>;
        const email = normalizeEmail(typeof record.email === "string" ? record.email : "");
        const role = record.role === "client" ? "client" : record.role === "admin" ? "admin" : null;
        const passwordHash = typeof record.passwordHash === "string" ? record.passwordHash.trim() : "";
        const displayName = typeof record.displayName === "string" ? record.displayName.trim() : undefined;

        if (!email || !role || !passwordHash) return null;
        return { email, role, passwordHash, displayName };
      })
      .filter((entry): entry is AuthUserRecord => entry !== null);

    return records;
  } catch {
    return [];
  }
}

function parseFallbackUsers(): AuthUserRecord[] {
  const email = normalizeEmail(
    process.env.AUTH_ADMIN_EMAIL ||
      process.env.ADMIN_EMAILS?.split(",")[0] ||
      DEFAULT_ADMIN_EMAIL
  );
  const passwordHash = (process.env.AUTH_ADMIN_PASSWORD_HASH || "").trim();
  if (!email || !passwordHash) return [];

  return [
    {
      email,
      role: "admin",
      passwordHash,
      displayName: "Administrator",
    },
  ];
}

export function getConfiguredAuthUsers(): AuthUserRecord[] {
  const records = [...parseAuthUsersJson(), ...parseFallbackUsers()];
  const byEmail = new Map<string, AuthUserRecord>();

  for (const record of records) {
    byEmail.set(record.email, record);
  }

  return Array.from(byEmail.values());
}

export function findAuthUserByEmail(email?: string | null): AuthUserRecord | null {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;
  return getConfiguredAuthUsers().find((record) => record.email === normalizedEmail) || null;
}

export function listAdminEmails(): string[] {
  return getConfiguredAuthUsers()
    .filter((record) => record.role === "admin")
    .map((record) => record.email);
}

export function listAllowedEmails(): string[] {
  return getConfiguredAuthUsers().map((record) => record.email);
}
