/**
 * Variáveis públicas do frontend. Tudo que começa com NEXT_PUBLIC_ vai para o
 * bundle do navegador: nunca coloque segredos aqui.
 */
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
} as const;
