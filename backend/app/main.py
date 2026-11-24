from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.router import router
from app.core.config import Settings
from app.core.errors import register_error_handlers
from app.core.middleware import ErrorBoundaryMiddleware, RequestContextMiddleware
from app.schemas.errors import ErrorResponse


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings if settings is not None else Settings()
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        debug=False,
        responses={status: {"model": ErrorResponse} for status in (404, 405, 422, 500)},
    )
    app.state.settings = settings
    register_error_handlers(app)

    # Wrapping order: request ID -> CORS -> error boundary -> routes.
    app.add_middleware(ErrorBoundaryMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=False,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization", "X-Request-ID"],
        expose_headers=["X-Request-ID"],
    )
    app.add_middleware(RequestContextMiddleware)
    app.include_router(router)
    return app


app = create_app()
