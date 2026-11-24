import logging
from http import HTTPStatus

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException

from app.schemas.errors import ErrorDetail, ErrorResponse

logger = logging.getLogger(__name__)


def error_response(request: Request, status: int, code: str, message: str,
                   details=None, headers=None) -> JSONResponse:
    body = ErrorResponse(error=ErrorDetail(
        code=code, message=message, details=details,
        request_id=request.scope["state"]["request_id"],
    ))
    return JSONResponse(status_code=status, content=body.model_dump(), headers=headers)


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(HTTPException)
    async def http_error(request: Request, exc: HTTPException) -> JSONResponse:
        try:
            phrase = HTTPStatus(exc.status_code).phrase
        except ValueError:
            phrase = "HTTP Error"
        return error_response(request, exc.status_code, phrase.lower().replace(" ", "_"),
                              phrase, headers=exc.headers)

    @app.exception_handler(RequestValidationError)
    async def validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
        # Do not echo inputs, which could contain credentials or personal information.
        details = [{"loc": list(err["loc"]), "type": err["type"], "message": err["msg"]}
                   for err in exc.errors()]
        return error_response(request, 422, "validation_error", "Request validation failed", details)
