


MOCK_ORDERS: dict[str, dict] = {
    "ORD-1001": {
        "order_id": "ORD-1001",
        "status": "shipped",
        "product": "Gaming Laptop",
        "total": 45000,
        "currency": "PKR",
        "estimated_delivery": "2026-11-22",
    },
    "ORD-1002": {
        "order_id": "ORD-1002",
        "status": "processing",
        "product": "Wireless Headphones",
        "total": 8500,
        "currency": "PKR",
        "estimated_delivery": "Not available yet",
    },
    "ORD-1003": {
        "order_id": "ORD-1003",
        "status": "delivered",
        "product": "Mechanical Keyboard",
        "total": 12000,
        "currency": "PKR",
        "estimated_delivery": "Delivered",
    },
}


def fetch_order_status(order_id: str) -> dict | None:
    normalized_id = order_id.strip().upper()

    return MOCK_ORDERS.get(normalized_id)
