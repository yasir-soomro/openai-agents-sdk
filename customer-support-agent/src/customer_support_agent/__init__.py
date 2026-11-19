import os


def main() -> None:
    import uvicorn

    uvicorn.run(
        "customer_support_agent.main:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", "8000")),
    )
