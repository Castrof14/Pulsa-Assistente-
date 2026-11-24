# Arquitetura

## Visão geral

Duas aplicações independentes no mesmo repositório, sem código compartilhado em tempo de execução:

```text
navegador ── HTML ──> frontend/ (Next.js, :3000)
    └────── JSON /api/v1 ──> backend/ (FastAPI, :8000)
```

O contrato entre elas é HTTP e está em [API.md](API.md). Cada uma instala, testa e publica sozinha
(Vercel para o frontend, servidor persistente para o backend).

## Decisões

| Decisão | Motivo |
| --- | --- |
| Navegador chama o FastAPI direto, com CORS restrito | Evita uma segunda camada de API no Next e mantém o backend como único dono das regras de negócio |
| `/api/v1` como prefixo | Permite evoluir o contrato sem quebrar clientes |
| Envelope único de erro e `X-Request-ID` | A interface trata erros de um jeito só e qualquer falha é rastreável no log |
| Mocks atrás de `src/services` | Trocar dado demonstrativo por API não altera páginas nem componentes |
| `navigation.ts` como fonte única do menu, com `typedRoutes` | Rota quebrada vira erro de compilação |
| `/` redireciona com 307 | Temporário, pois a raiz poderá virar página pública |
| npm, sem workspace de monorepo | Só há um pacote JavaScript |

A organização interna do frontend está em [ESTRUTURA.md](../frontend/ESTRUTURA.md) e a do backend
em [backend/README.md](../backend/README.md).

## Ambiente

| Variável | Onde | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `frontend/.env.local` | URL do backend. Pública: vai para o navegador |
| Ver `backend/.env.example` | `backend/.env` | Configuração do servidor, inclusive futuros segredos |

Segredos existem somente no backend. Arquivos `.env` não são versionados; `.env.example` são.

## Pontos de extensão

Nada abaixo está implementado.

- **Módulo 2 (persistência):** regras em `backend/app/services`; isolamento por empresa no servidor.
- **Autenticação:** o cliente HTTP aceita `headers` por requisição; a sessão será validada no backend.
- **Módulos 3 e 5 (IA, Instagram):** integrações e chaves só no backend, uma por serviço.
