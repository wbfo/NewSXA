/**
 * Admin email allowlist.
 *
 * In production, set the ADMIN_EMAILS environment variable to a comma-separated
 * list of email addresses that should have admin access, e.g.:
 *   ADMIN_EMAILS="ops@sxaudits.com,admin@sxaudits.com"
 *
 * If ADMIN_EMAILS is not set, the list falls back to an empty array so that no
 * account is accidentally granted admin access in an unconfigured deployment.
 */
function resolveAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw || !raw.trim()) return [];
  return raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

export const ADMIN_EMAILS = resolveAdminEmails();

export const isEmailAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  return resolveAdminEmails().includes(email.toLowerCase());
};
