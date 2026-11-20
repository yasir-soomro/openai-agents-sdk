

from functools import lru_cache

from agents import (
    OpenAIChatCompletionsModel,
    set_tracing_disabled,
)
from openai import AsyncOpenAI

from customer_support_agent.core.config import get_settings


@lru_cache(maxsize=1)
def get_model() -> OpenAIChatCompletionsModel:
    settings = get_settings()

    openrouter_client = AsyncOpenAI(
        api_key=settings.openrouter_api_key,
        base_url=settings.openrouter_base_url,
    )

    set_tracing_disabled(disabled=True)

    model = OpenAIChatCompletionsModel(
        model=settings.openrouter_model,
        openai_client=openrouter_client,
    )

    return model
