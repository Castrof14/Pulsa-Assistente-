from fastapi import APIRouter, Request

from app.schemas.health import HealthResponse

router = APIRouter(prefix="/api/v1")


@router.get("/health", response_model=HealthResponse, tags=["health"])
async def health(request: Request) -> HealthResponse:
    settings = request.app.state.settings
    return HealthResponse(service=settings.app_name, version=settings.app_version,
                          environment=settings.app_env)


@router.get("/health/live", response_model=HealthResponse, tags=["health"])
async def liveness(request: Request) -> HealthResponse:
    return await health(request)


@router.get("/health/ready", response_model=HealthResponse, tags=["health"])
async def readiness(request: Request) -> HealthResponse:
    # Module 1 has no database or external services to probe.
    return await health(request)
