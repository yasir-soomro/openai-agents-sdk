

import asyncio

from customer_support_agent.services.chat_service import (
    get_chat_response,
)


async def main() -> None:
    message = "Assalam o Alaikum! Aap meri kis tarah madad kar sakte hain?"

    print("User:", message)

    response = await get_chat_response(message)

    print("\nCustomer Support Agent:", response)


if __name__ == "__main__":
    asyncio.run(main())
