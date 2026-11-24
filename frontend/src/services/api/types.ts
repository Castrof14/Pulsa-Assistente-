/** Contratos compartilhados com o backend (ver docs/API.md). */

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details: unknown;
    request_id: string;
  };
}

export interface HealthResponse {
  status: "ok";
  service: string;
  version: string;
  environment: string;
}
