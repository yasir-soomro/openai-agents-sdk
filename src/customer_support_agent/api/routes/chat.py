


import logging

from fastapi import APIRouter, HTTPException


from customer_support_agent.schemas.chat import (
    ChatRequest,
    ChatResponse,
)
from customer_support_agent.services.chat_service import (
    get_chat_response,
)


logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api",
    tags=["Chat"],
)


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    try:
        response = await get_chat_response(payload.message)

        return ChatResponse(response=response)

    except Exception as exc:
        logger.exception("AI chat request failed")

        raise HTTPException(
            status_code=502,
            detail="AI service is temporarily unavailable.",
        ) from exc
