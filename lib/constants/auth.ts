/**
 * Session allowlist.
 *
 * For now, the admin email is hardcoded so we can remove the third-party sign-in
 * dependency immediately. Additional allowed client emails can be supplied
 * later through CLIENT_EMAILS or ADMIN_EMAILS without changing the auth flow.
 */
const DEFAULT_ADMIN_EMAIL = "sxabfcg@gmail.com";

function resolveEmails(raw?: string | null): string[] {
  if (!raw || !raw.trim()) return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const ADMIN_EMAILS = Array.from(
  new Set([DEFAULT_ADMIN_EMAIL, ...resolveEmails(process.env.ADMIN_EMAILS)])
);
export const CLIENT_EMAILS = Array.from(new Set(resolveEmails(process.env.CLIENT_EMAILS)));
export const ALLOWED_EMAILS = Array.from(new Set([...ADMIN_EMAILS, ...CLIENT_EMAILS]));

export const isEmailAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

export const isEmailClient = (email?: string | null): boolean => {
  if (!email) return false;
  return CLIENT_EMAILS.includes(email.toLowerCase());
};

export const isAllowedEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return ALLOWED_EMAILS.includes(email.toLowerCase());
};
