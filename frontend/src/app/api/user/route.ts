import { NextRequest, NextResponse } from "next/server";
import { ENDPOINTS, callBackend, apiUnreachable, passthroughError } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const r = await callBackend(ENDPOINTS.user, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: body.nome, email: body.email, senha: body.senha }),
  });

  if (r.networkError) return apiUnreachable(ENDPOINTS.user);
  if (!r.ok) return passthroughError(ENDPOINTS.user, r, "Não foi possível cadastrar o usuário.");

  return NextResponse.json(
    { id: r.data.id, nome: r.data.nome, email: r.data.email },
    { status: 201 },
  );
}
