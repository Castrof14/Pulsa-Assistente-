# Contrato da API

Base: `http://localhost:8000/api/v1`. JSON em `snake_case`.

## Health

`GET /api/v1/health` → `200`

```json
{ "status": "ok", "service": "...", "version": "...", "environment": "..." }
```

`GET /api/v1/health/live` e `GET /api/v1/health/ready` servem a sondas de infraestrutura. Nenhum deles
verifica serviços externos neste módulo.

## Erros

Toda resposta de erro (404, 405, 422, 500) usa o mesmo envelope:

```json
{ "error": { "code": "not_found", "message": "...", "details": null, "request_id": "..." } }
```

- `code`: identificador estável em `snake_case`. A interface decide por ele, nunca por `message`.
- `request_id`: igual ao header `X-Request-ID`, presente em toda resposta e exposto no CORS.

No frontend, `src/services/api/client.ts` converte isso em `ApiError`. Falhas sem resposta têm
`status: 0` e código `timeout` ou `network_error`.

## CORS

Origens permitidas vêm de `CORS_ORIGINS` (array JSON) no backend. Curingas são rejeitados na
inicialização e produção exige origens HTTPS explícitas.

## Ao adicionar um endpoint

1. Schema Pydantic em `backend/app/schemas`, rota em `backend/app/api`, teste em `backend/tests`.
2. Tipo em `frontend/src/services/api/types.ts`.
3. Função em `frontend/src/services/<dominio>.ts` (substitui o mock, mantendo a assinatura).
4. Atualizar este arquivo.
