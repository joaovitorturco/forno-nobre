/**
 * Cliente HTTP usado no NAVEGADOR.
 *
 * Todas as chamadas apontam para as rotas internas do Next (/api/...),
 * que ficam na MESMA origem da aplicação. Por isso não há requisição
 * cross-origin partindo do browser e o CORS deixa de ser um problema.
 * Quem realmente conversa com http://localhost:3333 é o servidor do Next.
 */

type Json = Record<string, unknown>;

async function parse(res: Response) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message =
      (data && (data.error || data.message)) ||
      "Não foi possível completar a requisição.";
    throw new Error(message);
  }
  return data;
}

export const api = {
  async postJson<T = unknown>(path: string, body: Json): Promise<T> {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return parse(res);
  },
};
