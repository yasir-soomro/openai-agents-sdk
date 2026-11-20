# Customer Support Agent

Customer-support chat application with a FastAPI backend and Next.js frontend.
The backend sends chat messages to OpenRouter through the OpenAI Agents SDK.

## Requirements

- Python 3.13 or newer and [uv](https://docs.astral.sh/uv/)
- Node.js and npm
- An OpenRouter API key for AI responses

## Configure and run

From this directory, create a `.env` file containing:

```env
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL=openrouter/free
```

Start the backend:

```powershell
uv sync --group dev
uv run customer-support-agent
```

The API listens on `http://127.0.0.1:8000`. Check `/health` for service status
and `/docs` for the interactive API documentation.

In another terminal, start the frontend:

```powershell
Set-Location frontend
npm install
npm run dev
```

Open `http://localhost:3000`. The Next.js development server forwards `/api/*`
requests to `http://127.0.0.1:8000`. Set `CUSTOMER_SUPPORT_API_URL` if the
backend is hosted at a different URL.

## Validate

```powershell
uv run --group dev pytest -q
Set-Location frontend
npm run lint
npm run build
```