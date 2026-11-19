

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


PROJECT_ROOT = Path(__file__).resolve().parents[3]

load_dotenv(PROJECT_ROOT / ".env")


@dataclass(frozen=True)
class Settings:
    openrouter_api_key: str
    openrouter_model: str
    openrouter_base_url: str


def get_settings() -> Settings:
    api_key = os.getenv("OPENROUTER_API_KEY")

    if not api_key:
        raise RuntimeError(
            "OPENROUTER_API_KEY is missing. "
            "Please configure it in your .env file."
        )

    return Settings(
        openrouter_api_key=api_key,
        openrouter_model=os.getenv(
            "OPENROUTER_MODEL",
            "openrouter/free",
        ),
        openrouter_base_url="https://openrouter.ai/api/v1",
    )
