

import asyncio
import os
from dotenv import load_dotenv

from openai import AsyncOpenAI
from agents import (
    Agent,
    Runner,
    OpenAIChatCompletionsModel,
    set_tracing_disabled
)

load_dotenv()



set_tracing_disabled(True)

api_key = os.getenv("OPENROUTER_API_KEY")

if api_key is None:
    raise ValueError("OPENROUTER_API_KEY environment variable is not set.")

external_client = AsyncOpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1",
)


model = OpenAIChatCompletionsModel(
    openai_client=external_client,
    model="openrouter/free"
)


agent = Agent(
    name="Assistant",
    instructions="You are a helpful AI assistant.",
    model=model
)

async def main():
    result = await Runner.run(
        agent,
        "Explain Python functions with a simple example."
    )
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())