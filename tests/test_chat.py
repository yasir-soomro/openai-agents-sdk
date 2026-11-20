


import customer_support_agent.api.routes.chat as chat_route

from fastapi.testclient import TestClient

from customer_support_agent.main import app


client = TestClient(app)


def test_chat_success(monkeypatch):

    async def fake_get_chat_response(message: str) -> str:
        assert message == "Hello"
        return "Hello! How can I help you?"

    monkeypatch.setattr(
        chat_route,
        "get_chat_response",
        fake_get_chat_response,
    )

    response = client.post(
        "/api/chat",
        json={"message": "Hello"},
    )

    assert response.status_code == 200
    assert response.json() == {
        "response": "Hello! How can I help you?"
    }


def test_chat_rejects_empty_message():

    response = client.post(
        "/api/chat",
        json={"message": " "},
    )

    assert response.status_code == 422


def test_chat_reports_ai_service_failure(monkeypatch):
    async def fail_get_chat_response(message: str) -> str:
        raise RuntimeError("Upstream service unavailable")

    monkeypatch.setattr(
        chat_route,
        "get_chat_response",
        fail_get_chat_response,
    )

    response = client.post(
        "/api/chat",
        json={"message": "Hello"},
    )

    assert response.status_code == 502
    assert response.json() == {
        "detail": "AI service is temporarily unavailable."
    }
