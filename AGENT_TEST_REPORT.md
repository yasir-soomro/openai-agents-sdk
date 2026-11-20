# Customer Support Agent — Fix and Verification Report

## Issues found and fixed

- **AI configuration blocked API startup:** The support agent and model were
  created during module import, so missing AI credentials could prevent even
  the health endpoint from starting. Agent creation is now lazy and cached;
  configuration is required only when handling a chat request.
- **Console entry point did not run the API:** Replaced the placeholder with a
  Uvicorn launcher, configurable with `HOST` and `PORT`.
- **Frontend was still the Next.js starter page:** Added a responsive support
  chat interface with suggested questions, message/loading states, and visible
  error handling.
- **Frontend had no backend connection:** Added a Next.js `/api/*` rewrite to
  the FastAPI service, configurable with `CUSTOMER_SUPPORT_API_URL`.
- **Setup and previous report were inaccurate:** Added run instructions and
  updated this report to describe the actual project and current checks.

## Verification

- Backend: `uv run --group dev pytest -q` — **5 passed**.
- Backend: `uv run python -m compileall -q src tests` — **passed**.
- Frontend: `npm run lint` — **passed**.
- Frontend: `npm run build` — **passed**.
- Dependency install: **358 packages installed; 0 vulnerabilities reported**.
- Runtime smoke tests:
  - FastAPI `/health` — **HTTP 200**.
  - FastAPI `/api/chat` — **HTTP 200** with a configured AI service.
  - Next.js homepage — **HTTP 200**.
  - Next.js `/api/chat` proxy — forwarded invalid input and returned the
    expected **HTTP 422** validation response.

## Running instance

- Frontend: <http://127.0.0.1:3001>
- Backend: <http://127.0.0.1:8765>

Port 8000 was already occupied in this environment, so the verified backend
instance uses port 8765. The frontend was started with
`CUSTOMER_SUPPORT_API_URL=http://127.0.0.1:8765`.

For normal setup and run instructions, see [README.md](README.md).
