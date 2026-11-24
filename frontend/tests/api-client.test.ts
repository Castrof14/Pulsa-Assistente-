import assert from "node:assert/strict";
import { createServer, type RequestListener, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterEach, test } from "node:test";

import { ApiError, createApiClient } from "../src/services/api/client.ts";

let server: Server | undefined;

async function serve(handler: RequestListener): Promise<string> {
  server = createServer(handler);
  await new Promise<void>((resolve) => server!.listen(0, "127.0.0.1", resolve));
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
}

afterEach(() => {
  server?.closeAllConnections();
  server?.close();
  server = undefined;
});

async function captureApiError(promise: Promise<unknown>): Promise<ApiError> {
  try {
    await promise;
  } catch (error) {
    assert.ok(error instanceof ApiError);
    return error;
  }
  assert.fail("a requisição deveria ter falhado");
}

test("usa o prefixo /api/v1, aceita barra final e devolve o JSON", async () => {
  let url: string | undefined;
  const base = await serve((req, res) => {
    url = req.url;
    res.end(JSON.stringify({ status: "ok" }));
  });
  assert.deepEqual(await createApiClient(`${base}/`).request("/health"), { status: "ok" });
  assert.equal(url, "/api/v1/health");
});

test("envia corpo JSON com Content-Type", async () => {
  let received = "";
  let contentType: string | undefined;
  const base = await serve(async (req, res) => {
    contentType = req.headers["content-type"];
    for await (const chunk of req) received += chunk;
    res.end("{}");
  });
  await createApiClient(base).request("/x", { method: "POST", body: { a: 1 } });
  assert.equal(received, '{"a":1}');
  assert.equal(contentType, "application/json");
});

test("204 sem corpo devolve null", async () => {
  const base = await serve((_req, res) => res.writeHead(204).end());
  assert.equal(await createApiClient(base).request("/x"), null);
});

test("converte o envelope de erro do backend em ApiError", async () => {
  const base = await serve((_req, res) =>
    res.writeHead(404).end(
      JSON.stringify({
        error: { code: "not_found", message: "Não existe", details: null, request_id: "r-1" },
      }),
    ),
  );
  const error = await captureApiError(createApiClient(base).request("/x"));
  assert.equal(error.status, 404);
  assert.equal(error.code, "not_found");
  assert.equal(error.requestId, "r-1");
});

test("erro sem envelope usa o X-Request-ID do header", async () => {
  const base = await serve((_req, res) =>
    res.writeHead(502, { "X-Request-ID": "r-2" }).end("<html>"),
  );
  const error = await captureApiError(createApiClient(base).request("/x"));
  assert.equal(error.code, "unexpected_response");
  assert.equal(error.requestId, "r-2");
});

test("200 com corpo que não é JSON vira invalid_json", async () => {
  const base = await serve((_req, res) => res.end("<html>"));
  const error = await captureApiError(createApiClient(base).request("/x"));
  assert.equal(error.code, "invalid_json");
});

test("timeout vira ApiError timeout", async () => {
  const base = await serve(() => {});
  const error = await captureApiError(createApiClient(base).request("/x", { timeoutMs: 50 }));
  assert.equal(error.code, "timeout");
  assert.equal(error.status, 0);
});

test("servidor fora do ar vira network_error", async () => {
  const error = await captureApiError(createApiClient("http://127.0.0.1:1").request("/x"));
  assert.equal(error.code, "network_error");
});

test("cancelamento do chamador propaga o abort original", async () => {
  const base = await serve(() => {});
  const controller = new AbortController();
  const pending = createApiClient(base).request("/x", { signal: controller.signal });
  controller.abort();
  await assert.rejects(pending, { name: "AbortError" });
});
