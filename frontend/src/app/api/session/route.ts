import { NextRequest, NextResponse } from "next/server";
import {
  ENDPOINTS,
  TOKEN_COOKIE,
  callBackend,
  apiUnreachable,
  passthroughError,
} from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const r = await callBackend(ENDPOINTS.session, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: body.email, senha: body.senha }),
  });

  if (r.networkError) return apiUnreachable(ENDPOINTS.session);
  if (!r.ok) return passthroughError(ENDPOINTS.session, r, "E-mail ou senha inválidos.");

  const res = NextResponse.json(
    { id: r.data.id, nome: r.data.nome, email: r.data.email, token: r.data.token },
    { status: 200 },
  );
  if (r.data?.token) {
    res.cookies.set(TOKEN_COOKIE, r.data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return res;
}
