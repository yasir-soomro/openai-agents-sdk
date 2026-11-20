

from agents import Runner

from customer_support_agent.agents.customer_support import (
    get_customer_support_agent,
)


async def get_chat_response(message: str) -> str:
    result = await Runner.run(
        get_customer_support_agent(),
        input=message,
    )

    return result.final_output
