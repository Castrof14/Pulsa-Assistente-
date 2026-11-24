# Backend Pulsa — Módulo 1

Base FastAPI independente do frontend. Requer Python 3.14 (validado em 3.14.6).
Neste módulo não existem banco de dados, autenticação, integrações ou dados demonstrativos.

## Executar localmente

A partir da raiz do projeto:

```sh
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
cp .env.example .env
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Para executar sem dependências de testes, instale `requirements.txt`.

- Swagger: http://127.0.0.1:8000/docs
- OpenAPI: http://127.0.0.1:8000/openapi.json
- Health: http://127.0.0.1:8000/api/v1/health
- Liveness: `/api/v1/health/live`
- Readiness: `/api/v1/health/ready`

A prontidão indica apenas que a aplicação está respondendo: não verifica serviços externos neste módulo.

## Configuração

Execute os comandos dentro de `backend/` para carregar `.env`. Variáveis do ambiente têm precedência.

| Variável | Padrão | Uso |
| --- | --- | --- |
| APP_ENV | development | development, test ou production |
| APP_NAME | Pulsa API | Identificação do serviço |
| APP_VERSION | 0.1.0 | Versão da API |
| CORS_ORIGINS | localhost:3000 e 127.0.0.1:3000, com http | Array JSON de origens explícitas |

Em produção é obrigatório definir `CORS_ORIGINS` explicitamente, usando HTTPS. Para desabilitar acesso entre origens, use `[]`. Wildcards, caminhos, credenciais e origens não HTTP(S) são rejeitados na inicialização.

```dotenv
APP_ENV=production
CORS_ORIGINS=["https://app.seu-dominio.com"]
```

CORS não substitui autenticação. Credenciais de navegador não estão habilitadas. Os métodos GET, POST, PUT, PATCH, DELETE e OPTIONS estão preparados para os próximos módulos; os endpoints disponíveis nesta etapa são somente GET.

## Contrato HTTP

O frontend usa a base `http://localhost:8000/api/v1` (ou `http://127.0.0.1:8000/api/v1`).

```json
{"status":"ok","service":"Pulsa API","version":"0.1.0","environment":"development"}
```

Erros 404, 405, 422 e 500 seguem o formato:

```json
{"error":{"code":"not_found","message":"Not Found","details":null,"request_id":"UUID"}}
```

O campo `details` é uma lista de campos inválidos nos erros 422; os valores de entrada não são devolvidos. Erros 500 retornam mensagem genérica e registram a exceção no servidor. Respostas 405 preservam o cabeçalho `Allow`.

Cada resposta recebe um `X-Request-ID` gerado no servidor, inclusive preflight CORS. Nos erros JSON, corresponde ao `error.request_id`. O cabeçalho é exposto ao navegador por CORS; respostas 500 também recebem CORS para origens permitidas. Respostas de preflight seguem o protocolo padrão do middleware CORS (incluindo 400 para preflight rejeitado).

## Organização

- `app/main.py`: fábrica `create_app`, configuração da aplicação e middleware.
- `app/api/router.py`: rotas versionadas e verificações de saúde.
- `app/core/config.py`: validação e carregamento do ambiente.
- `app/core/errors.py`: erros HTTP e de validação.
- `app/core/middleware.py`: identificação de requisições e contenção de erros inesperados.
- `app/schemas/`: contratos Pydantic.
- `app/services/`: pacote reservado para lógica dos próximos módulos.
- `tests/test_api.py`: testes de contratos, inicialização, documentação, CORS e configurações.

A ordem do middleware é identificação → CORS → contenção de erros → rotas. Isso permite identificar preflights e aplicar CORS aos erros 500. Uma falha após o início de uma resposta em streaming é registrada e propagada, pois já não é possível substituir o corpo HTTP.

## Testar

```sh
cd backend
source .venv/bin/activate
python -m pytest -q
python -m pip check
```

Os testes não exigem banco, frontend, chaves ou acesso a APIs externas. As dependências têm faixas limitadas por versão principal. A combinação validada foi FastAPI 0.165.0, Pydantic 2.14.4, pydantic-settings 2.16.3, Uvicorn 0.54.0, HTTPX 0.28.1 e pytest 9.2.0. Essa versão do Starlette emite um aviso de depreciação do HTTPX no TestClient; os testes continuam passando.
