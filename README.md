# Pulsa

SaaS de marketing e gerenciamento de Instagram com IA para pequenos e médios negócios.

**Etapa atual: Módulo 1 — fundação e estrutura visual.** Não há autenticação, banco de dados,
Instagram nem IA: as telas usam dados demonstrativos.

| Pasta | Conteúdo |
| --- | --- |
| `frontend/` | Next.js + TypeScript + Tailwind ([estrutura](frontend/ESTRUTURA.md)) |
| `backend/` | FastAPI ([como executar](backend/README.md)) |
| `docs/` | [Arquitetura](docs/ARQUITETURA.md) e [contrato da API](docs/API.md) |

## Executar

Backend (Python 3.14), em um terminal: siga [backend/README.md](backend/README.md). API em
http://localhost:8000, Swagger em http://localhost:8000/docs.

Frontend (Node 24), em outro terminal:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Interface em http://localhost:3000.
