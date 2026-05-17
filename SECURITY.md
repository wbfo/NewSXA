# Security Notes — Sovereign X Audits

## Known Transitive Vulnerabilities (Low Severity)

**Last reviewed:** 2026-05-16  
**Status:** Accepted — no fix without breaking change

`npm audit` currently reports **8 low-severity** vulnerabilities, all tracing
through `firebase-admin ≥ 11.0.0`:

```
@tootallnate/once < 3.0.1  (GHSA-vpq2-c234-7xj6 — Incorrect Control Flow Scoping)
  └─ http-proxy-agent
     └─ teeny-request
        ├─ @google-cloud/storage
        └─ retry-request
           └─ google-gax
              └─ @google-cloud/firestore
                 └─ firebase-admin (our direct dependency)
```

### Why these are accepted

- **Severity:** All 8 are classified **low** by npm / GitHub Advisory Database.
- **Attack surface:** These packages handle outbound HTTP proxying inside the
  Firebase Admin SDK. They are never exposed to user-controlled input directly.
- **Fix cost:** `npm audit fix --force` would downgrade `firebase-admin` to
  `v10.3.0`, which is a **breaking change** — v11+ APIs are used throughout
  the codebase.
- **No known exploit:** The advisory (GHSA-vpq2-c234-7xj6) describes an
  incorrect control-flow scoping issue with no documented public exploit or
  CVSS score above 3.x.

### Remediation plan

Monitor the `firebase-admin` changelog. When a patched v11+ or v12+ release
ships that resolves the transitive dependency chain, upgrade and re-run
`npm audit` to confirm resolution.

```bash
# To re-audit at any time:
npm audit

# Do NOT run npm audit fix --force — it will break firebase-admin API usage.
```

---

## Architecture Security Notes

### Session Cookies — Not HttpOnly

Firebase ID tokens are stored in `firebase-token` cookie by the client-side
SDK. Because the Firebase Client SDK must read and refresh this token from
JavaScript, the cookie **cannot** be `HttpOnly`. This is standard Firebase
web-app practice and is mitigated by:

- `SameSite=Strict` to block CSRF
- `Secure` flag enforced on HTTPS
- `Content-Security-Policy` headers blocking inline scripts from untrusted origins

To switch to HttpOnly cookies, migrate to Firebase Admin session cookies:
https://firebase.google.com/docs/auth/admin/manage-cookies

### Rate Limiting — In-Memory Only

The API rate limiter (`lib/server/rate-limit.ts`) stores counters in process
memory. It is effective for single-instance deployments. For multi-instance or
serverless deployments, replace with a Redis/Upstash shared counter.

### Admin Email Allowlist

Admin access is controlled by the `ADMIN_EMAILS` environment variable (a
comma-separated list). This must be set in all environments. An unconfigured
deployment defaults to an empty allowlist (no admins), not a permissive one.

### JSON File Store

All runtime state is persisted to `data/runtime-state.json`. This is suitable
for single-server deployments only. See `lib/server/store.ts` for migration
notes.
