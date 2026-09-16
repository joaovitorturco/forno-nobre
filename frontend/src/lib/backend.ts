/**
 * Helpers usados SOMENTE no lado servidor (route handlers em src/app/api).
 *
 * Por que isto evita CORS: o navegador só fala com /api/* (mesma origem).
 * É o servidor do Next que chama http://localhost:3333. Como essa chamada
 * é servidor -> servidor, não há requisição cross-origin e o CORS some.
 */

const API_URL = process.env.API_URL ?? "http://localhost:3333";

/**
 *  CAMINHOS DA SUA API — ajuste AQUI se os nomes forem diferentes.
 */
export const ENDPOINTS = {
  session: "/session",
  user: "/user",
} as const;

/** Monta a URL completa de um endpoint da API. */
export function backendUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalized}`;
}

/** Nome do cookie httpOnly onde guardamos o token de autenticação. */
export const TOKEN_COOKIE = "@dudus:token";

type ApiResult = {
  ok: boolean;
  status: number;
  data: any;
  networkError: boolean;
};

/**
 * Faz a chamada à API tratando o caso de a API estar fora do ar.
 * Em vez de derrubar a rota (500 genérico), devolvemos networkError=true.
 */
export async function callBackend(
  path: string,
  init: RequestInit,
): Promise<ApiResult> {
  const url = backendUrl(path);
  try {
    const res = await fetch(url, { cache: "no-store", ...init });
    const text = await res.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }
    return { ok: res.ok, status: res.status, data, networkError: false };
  } catch (err) {
    console.error(`[proxy] falha ao chamar ${init.method ?? "GET"} ${url}:`, err);
    return { ok: false, status: 0, data: null, networkError: true };
  }
}

/** Resposta padrão quando a API não respondeu (fora do ar / porta errada). */
export function apiUnreachable(path: string) {
  return Response.json(
    {
      error: `A API não respondeu em ${backendUrl(path)}. Verifique se ela está rodando nessa porta.`,
    },
    { status: 502 },
  );
}

/** Repassa o status da API e mostra a rota chamada (ajuda a depurar 404). */
export function passthroughError(path: string, result: ApiResult, fallback: string) {
  const isDev = process.env.NODE_ENV !== "production";
  return Response.json(
    {
      error: result.data?.error ?? result.data?.message ?? fallback,
      ...(isDev ? { _debug: { target: backendUrl(path), status: result.status } } : {}),
    },
    { status: result.status || 400 },
  );
}
