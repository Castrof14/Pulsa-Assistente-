# Estrutura do frontend

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, Lucide.

| Caminho | Responsabilidade |
| --- | --- |
| `src/app/layout.tsx` | HTML raiz, fontes e metadata global |
| `src/app/(app)/layout.tsx` | Casca da aplicação (sidebar/topbar). Único layout das páginas internas |
| `src/app/(app)/<rota>/page.tsx` | Página: compõe componentes, sem lógica pesada |
| `src/components/ui/` | Primitivos reutilizáveis (botão, campo, card...) |
| `src/components/layout/` | Sidebar, topbar, navegação mobile |
| `src/components/<dominio>/` | Componentes de um domínio (`calendario`, `marca`...) |
| `src/config/navigation.ts` | Fonte única das rotas do menu |
| `src/config/env.ts` | Único lugar que lê `process.env` |
| `src/services/api/` | Cliente HTTP do backend |
| `src/services/<dominio>.ts` | Acesso a dados de um domínio. Hoje lê `src/mocks`; depois chamará `api` |
| `src/mocks/` | Dados demonstrativos. Importados só por `src/services` |
| `src/types/` | Tipos de domínio |

## Regras

- Páginas e componentes obtêm dados por `src/services/*`, nunca importando `src/mocks` direto.
- Server Component por padrão; `"use client"` só onde há interação.
- `cacheComponents` está ligado: `new Date()`, `Date.now()` e `Math.random()` em componente
  renderizado no servidor (inclusive client component no SSR) quebram o build. Use datas fixas
  nos mocks ou leia a data no navegador.
- Com `cacheComponents`, páginas visitadas ficam ocultas e preservam o estado ao navegar.
- `typedRoutes` está ligado: `href` para rota inexistente é erro de tipo.
- Dados demonstrativos devem ser identificados como tais na interface.
- Consulte `node_modules/next/dist/docs/` antes de usar uma API do Next.

## Comandos

`npm run dev` · `npm run lint` · `npm run typecheck` · `npm test` · `npm run build`
