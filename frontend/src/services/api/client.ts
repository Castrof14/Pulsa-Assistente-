import type { ApiErrorBody } from "./types";

const API_PREFIX = "/api/v1";
const DEFAULT_TIMEOUT_MS = 10_000;

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: unknown;
  readonly requestId: string | null;

  constructor(init: {
    status: number;
    code: string;
    message: string;
    details?: unknown;
    requestId?: string | null;
  }) {
    super(init.message);
    this.name = "ApiError";
    this.status = init.status;
    this.code = init.code;
    this.details = init.details ?? null;
    this.requestId = init.requestId ?? null;
  }
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== "object" || value === null || !("error" in value)) return false;
  const { error } = value;
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string" &&
    "message" in error &&
    typeof error.message === "string"
  );
}

/** status 0 = a requisição não chegou a ter resposta (rede, CORS ou timeout). */
function toTransportError(cause: unknown): ApiError {
  const timedOut = cause instanceof DOMException && cause.name === "TimeoutError";
  return new ApiError({
    status: 0,
    code: timedOut ? "timeout" : "network_error",
    message: timedOut
      ? "O servidor demorou demais para responder."
      : "Não foi possível conectar ao servidor.",
  });
}

export function createApiClient(baseUrl: string) {
  const root = baseUrl.replace(/\/+$/, "") + API_PREFIX;

  async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, headers, signal, timeoutMs = DEFAULT_TIMEOUT_MS } = options;
    const timeout = AbortSignal.timeout(timeoutMs);

    let response: Response;
    let text: string;
    try {
      response = await fetch(root + path, {
        method,
        headers: {
          Accept: "application/json",
          ...(body === undefined ? {} : { "Content-Type": "application/json" }),
          ...headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
      });
      text = await response.text();
    } catch (cause) {
      // Cancelamento pedido por quem chamou não é erro de API.
      if (signal?.aborted) throw cause;
      throw toTransportError(cause);
    }

    let payload: unknown = null;
    let validJson = true;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        validJson = false;
      }
    }

    if (!response.ok) {
      const requestId = response.headers.get("x-request-id");
      if (isApiErrorBody(payload)) {
        throw new ApiError({
          status: response.status,
          code: payload.error.code,
          message: payload.error.message,
          details: payload.error.details,
          requestId: payload.error.request_id ?? requestId,
        });
      }
      throw new ApiError({
        status: response.status,
        code: "unexpected_response",
        message: "O servidor retornou um erro inesperado.",
        requestId,
      });
    }

    if (!validJson) {
      throw new ApiError({
        status: response.status,
        code: "invalid_json",
        message: "O servidor retornou uma resposta inválida.",
        requestId: response.headers.get("x-request-id"),
      });
    }

    return payload as T;
  }

  return { request };
}
