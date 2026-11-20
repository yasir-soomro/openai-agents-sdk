




from fastapi import FastAPI

from customer_support_agent.api.routes.chat import (
    router as chat_router,
)
from customer_support_agent.api.routes.health import (
    router as health_router,
)


app = FastAPI(
    title="Customer Support Agent API",
    description="AI-powered customer support backend",
    version="0.1.0",
)

app.include_router(health_router)
app.include_router(chat_router)
