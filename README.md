# Sovereign X Command Center

Internal command center for Sovereign X Audits. The app is built with Next.js 16, React 19, Firebase Auth/Admin, a JSON-backed local runtime store, and Hermes agent workflow integrations.

## Status

This project builds and tests locally, but it is not ready for public production exposure until the Firestore security rules are replaced with scoped authenticated rules.

Current verification commands:

```bash
npm run lint
npm test
npm run build
```

## Requirements

- Node.js 20+
- npm
- Firebase project with Google Auth enabled
- Firebase Admin service-account credentials for server-side auth
- Optional: Hermes runtime at `~/.local/bin/hermes`
- Optional: `PERPLEXITY_API_KEY` for live research/outreach agent intelligence

## Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.local.example` to `.env.local` and fill in real values. Do not commit `.env.local`.

Important variables:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `NEXT_PUBLIC_FIREBASE_*`
- `ADMIN_EMAILS`
- `SX_API_SERVER_KEY`
- `SX_PUBLIC_URL`
- `CRON_SECRET`
- `PERPLEXITY_API_KEY` optional

Development bypass flags are present for local work only:

- `NEXT_PUBLIC_ENABLE_DEV_BYPASS=false`
- `SX_ENABLE_DEV_BYPASS=false`

Keep both disabled outside local development.

## Scripts

```bash
npm run dev        # Start local Next.js dev server
npm run lint       # Run ESLint
npm run lint:fix   # Run ESLint autofix
npm test           # Run Vitest test suite
npm run build      # Build production bundle
npm start          # Start built app
```

## Project Structure

```txt
app/                 Next.js App Router pages and API routes
components/          Client UI components
content/             Knowledge base and toolkit content
lib/auth/            Server auth helpers
lib/firebase/        Firebase client/admin configuration
lib/hermes/          Hermes runtime integration
lib/server/          Runtime store, event bus, logging, rate limiting
lib/agents/          Agent runner logic
tests/               Vitest tests
scripts/             Local helper scripts
```

## Data Persistence

Runtime state is stored at `data/runtime-state.json`, which is intentionally gitignored. This is suitable for a single-server deployment only. Use a database-backed store before deploying across multiple instances or serverless workers.

## Security Notes

- `firestore.rules` must be hardened before production.
- Firebase ID tokens are currently stored in a JavaScript-readable cookie so the Firebase Client SDK can refresh them. See `SECURITY.md` for the tradeoff and migration path to HttpOnly session cookies.
- Rate limiting is in-memory and single-instance only.
- `scratch/`, `.env.local`, build output, dependency folders, and runtime state are ignored for GitHub safety.

## Docker

The included `Dockerfile` builds the Next standalone output. Mount `/app/data` as a persistent volume if using the JSON runtime store.
