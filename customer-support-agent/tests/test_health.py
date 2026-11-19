


from fastapi.testclient import TestClient

from customer_support_agent.main import app


client = TestClient(app)


def test_health_check():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_check_does_not_require_ai_credentials(monkeypatch):
    import customer_support_agent.core.model as model

    def missing_settings():
        raise RuntimeError("AI credentials are unavailable")

    monkeypatch.setattr(model, "get_settings", missing_settings)

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
