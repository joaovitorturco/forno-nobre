import { api } from "@/services/api";

export type SessionResponse = {
  id: string;
  nome: string;
  email: string;
  token: string;
};

/** POST /session -> autentica o usuário. */
export async function signIn(email: string, senha: string) {
  return api.postJson<SessionResponse>("/api/session", { email, senha });
}

/** POST /user -> cadastra um novo usuário. */
export type SignUpResponse = { id: string; nome: string; email: string };
export async function signUp(nome: string, email: string, senha: string) {
  return api.postJson<SignUpResponse>("/api/user", { nome, email, senha });
}

/** Encerra a sessão (limpa o cookie httpOnly do token). */
export async function signOutRequest() {
  return api.postJson("/api/session/logout", {});
}
