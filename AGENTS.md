# AGENTS.md

## Commands

- `cd frontend && npm run dev` — Start dev server (runs on localhost, port shown in output)
- `cd frontend && npm run build` — TypeScript check + Vite build
- `cd frontend && npm run lint` — ESLint check (no type-checking)
- `cd frontend && npm run dev:full` — Runs mock API server + dev server concurrently
- `npm run mock` (in frontend/) — Standalone mock server on port 4010

## Structure

- `frontend/` — React 19 + TypeScript + Vite app
- `typespec/` — API TypeSpec definitions
- `typespec-dist/` — Generated output (OpenAPI spec for mock server)

## Notes

- No test framework configured
- Hexlet CI runs auto-check on every push (hexlet-check.yml)
- Mock server uses `typespec-dist/openapi.json` — regenerate if API changes