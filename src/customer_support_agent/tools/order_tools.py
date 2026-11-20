
from agents.decorators import tool

from  customer_support_agent.services.order_service import fetch_order_status


@tool
def get_order_status(order_id: str) -> str:
    """
    Retrieve the current status of a customer order.

    Args:
        order_id: The customer's order ID.
    """
    order = fetch_order_status(order_id)

    if not order:
        return "Order not found."

    return str(order)

