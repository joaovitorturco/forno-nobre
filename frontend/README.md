# 🍕 Dudu's Pizzas — Versão básica (cadastro · login · início)

Versão enxuta do frontend em **React + Next.js (App Router)**, com apenas três telas:

- `/` — **Login** (`POST /session`)
- `/signup` — **Cadastro de usuário** (`POST /user`)
- `/dashboard` — **Página inicial** (protegida; exige sessão)

As funcionalidades de categorias, produtos e pedidos foram removidas nesta versão.

## Como a arquitetura evita CORS

O navegador nunca chama `http://localhost:3333` diretamente. Ele chama as rotas
internas do Next (`/api/...`, mesma origem) e o **servidor** do Next encaminha para
a API real. Como a chamada servidor → servidor não passa pelo navegador, o CORS some.

```
Navegador (services) ──► /api/session (proxy) ──► http://localhost:3333/session
```

## Endpoints usados

| Tela     | Serviço (`auth/routes.ts`) | Proxy interno         | API         |
|----------|----------------------------|-----------------------|-------------|
| Login    | `signIn`                   | `POST /api/session`   | `/session`  |
| Cadastro | `signUp`                   | `POST /api/user`      | `/user`     |
| Logout   | `signOutRequest`           | `POST /api/session/logout` | (limpa o cookie) |

No login, o token é guardado em cookie **httpOnly** e nunca é exposto ao JavaScript.
Os caminhos ficam centralizados em `src/lib/backend.ts` (`ENDPOINTS`).

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000  (API em http://localhost:3333)
```

Variáveis em `.env.local`:
```
API_URL=http://localhost:3333
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## Estrutura

```
src/
├── app/
│   ├── page.tsx              # Login
│   ├── signup/page.tsx       # Cadastro
│   ├── dashboard/
│   │   ├── layout.tsx        # Layout protegido (topbar + logout)
│   │   └── page.tsx          # Página inicial
│   └── api/                  # Proxies (evitam CORS)
│       ├── session/route.ts
│       ├── session/logout/route.ts
│       └── user/route.ts
├── services/
│   ├── api.ts                # cliente HTTP do navegador
│   └── auth/routes.ts        # signIn / signUp / signOut
├── contexts/AuthContext.tsx
├── components/Brand.tsx
└── lib/backend.ts            # helpers de servidor + ENDPOINTS
```
