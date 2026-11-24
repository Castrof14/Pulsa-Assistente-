from uuid import UUID

import pytest
from fastapi import Query
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.core.config import Settings
from app.main import create_app

ORIGIN = "http://localhost:3000"


@pytest.fixture
def client():
    app = create_app(Settings(_env_file=None, app_env="test"))

    @app.get("/test/validate")
    async def validate(count: int = Query(gt=0)):
        return {"count": count}

    @app.get("/test/crash")
    async def crash():
        raise RuntimeError("private failure detail")

    with TestClient(app) as client:
        yield client


@pytest.mark.parametrize("path", ["/api/v1/health", "/api/v1/health/live", "/api/v1/health/ready"])
def test_health(client, path):
    response = client.get(path)
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "Pulsa API",
                               "version": "0.1.0", "environment": "test"}
    assert str(UUID(response.headers["x-request-id"]))


@pytest.mark.parametrize("path", ["/docs", "/openapi.json"])
def test_documentation(client, path):
    response = client.get(path)
    assert response.status_code == 200
    assert response.headers["x-request-id"]


@pytest.mark.parametrize("method,path,status,code", [
    ("GET", "/missing", 404, "not_found"),
    ("POST", "/api/v1/health", 405, "method_not_allowed"),
    ("GET", "/test/validate?count=private-value", 422, "validation_error"),
    ("GET", "/test/crash", 500, "internal_server_error"),
])
def test_error_contract_and_cors(client, method, path, status, code):
    response = client.request(method, path, headers={"Origin": ORIGIN})
    assert response.status_code == status
    error = response.json()["error"]
    assert set(error) == {"code", "message", "details", "request_id"}
    assert error["code"] == code
    assert error["request_id"] == response.headers["x-request-id"]
    assert response.headers["access-control-allow-origin"] == ORIGIN
    assert "X-Request-ID" in response.headers["access-control-expose-headers"]
    assert "private" not in response.text
    if status == 405:
        assert "GET" in response.headers["allow"]


def test_preflight(client):
    response = client.options("/api/v1/health", headers={
        "Origin": ORIGIN, "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "X-Request-ID",
    })
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == ORIGIN
    assert response.headers["x-request-id"]


def test_disallowed_origin(client):
    response = client.get("/api/v1/health", headers={"Origin": "https://untrusted.example"})
    assert "access-control-allow-origin" not in response.headers
    response = client.options("/api/v1/health", headers={
        "Origin": "https://untrusted.example", "Access-Control-Request-Method": "GET",
    })
    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers
    assert response.headers["x-request-id"]


def test_request_ids_are_unique(client):
    first = client.get("/api/v1/health", headers={"X-Request-ID": "untrusted"})
    second = client.get("/api/v1/health")
    assert first.headers["x-request-id"] != second.headers["x-request-id"]
    assert first.headers["x-request-id"] != "untrusted"


@pytest.mark.parametrize("origin", ["*", "https://*.example.com", "https://example.com/path",
                                  "https://user:password@example.com", "ftp://example.com"])
def test_reject_invalid_origins(origin):
    with pytest.raises(ValidationError):
        Settings(_env_file=None, cors_origins=[origin])


def test_production_requires_explicit_https_origins(monkeypatch):
    monkeypatch.delenv("CORS_ORIGINS", raising=False)
    with pytest.raises(ValidationError):
        Settings(_env_file=None, app_env="production")
    with pytest.raises(ValidationError):
        Settings(_env_file=None, app_env="production", cors_origins=[ORIGIN])
    settings = Settings(_env_file=None, app_env="production", cors_origins=["https://pulsa.example"])
    assert settings.cors_origins == ["https://pulsa.example"]
    assert Settings(_env_file=None, app_env="production", cors_origins=[]).cors_origins == []


def test_origins_from_environment(monkeypatch):
    monkeypatch.setenv("CORS_ORIGINS", '["https://frontend.example"]')
    settings = Settings(_env_file=None)
    assert settings.cors_origins == ["https://frontend.example"]
