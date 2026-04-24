# AGENTS.md

## Commands

### npm (from frontend/)
- `cd frontend && npm run dev` — Start dev server (localhost, port shown in output)
- `cd frontend && npm run build` — TypeScript check + Vite build
- `cd frontend && npm run lint` — ESLint check
- `cd frontend && npm run test` — Run tests with vitest UI
- `cd frontend && npm run test:run` — Run tests once
- `cd frontend && npm run dev:full` — Runs mock API server + dev server concurrently
- `npm run mock` — Standalone mock server on port 4010

### Makefile (root)
- `make build` — Run tsc + Vite build
- `make lint` — Run ESLint
- `make test` — Run vitest once

## Structure

- `frontend/` — React 19 + TypeScript + Vite app
- `typespec/` — API TypeSpec definitions
- `typespec-dist/` — Generated OpenAPI spec (mock server uses this)

## Notes

- Hexlet CI runs auto-check on every push (hexlet-check.yml)
- Mock server uses `typespec-dist/openapi.json` — regenerate if API changes
- Regenerate: run tsp compile in typespec/