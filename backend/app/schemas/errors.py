from typing import Any

from pydantic import BaseModel


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: list[Any] | dict[str, Any] | None = None
    request_id: str


class ErrorResponse(BaseModel):
    error: ErrorDetail
