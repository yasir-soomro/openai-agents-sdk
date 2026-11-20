

from functools import lru_cache

from agents import Agent

from customer_support_agent.core.model import get_model

from customer_support_agent.tools.order_tools import get_order_status


@lru_cache(maxsize=1)
def get_customer_support_agent() -> Agent:
    return Agent(
        name="Customer Support Agent",
        instructions="""
        You are a professional customer support assistant.

        Your responsibilities:
        - Help customers with their questions.
        - Be polite, helpful, and professional.
        - Give clear and easy-to-understand answers.
        - Respond in the same language as the customer.
        - If you do not know something, be honest.
        - Never invent customer or order information.
        - Do not claim that an order has been checked
          because order lookup functionality is not available yet.
        """,
        model=get_model(),
        tools=[get_order_status],
    )
