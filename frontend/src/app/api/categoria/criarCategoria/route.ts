import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("🔥 CHEGOU NA API DO NEXT");
    console.log("BODY:", body);

    const response = await fetch("http://localhost:3333/novacategoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("Resposta do backend:", data);

    return NextResponse.json(data, {
      status: response.status,
    });

  } catch (error) {
    console.error("Erro na API do Next:", error);

    return NextResponse.json(
      { message: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}
