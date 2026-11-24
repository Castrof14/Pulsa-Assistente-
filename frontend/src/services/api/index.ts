import { env } from "@/config/env";
import { createApiClient } from "./client";
import type { HealthResponse } from "./types";

export { ApiError } from "./client";
export type { HealthResponse } from "./types";

export const api = createApiClient(env.apiUrl);

export function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return api.request<HealthResponse>("/health", { signal });
}
