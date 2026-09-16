import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://localhost:3333/listarcategorias"
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Erro ao buscar categorias no backend" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API do Next:", error);

    return NextResponse.json(
      { message: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}