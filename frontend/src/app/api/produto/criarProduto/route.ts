import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_COOKIE } from "@/lib/backend";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const cookieStore = cookies();
    const token = cookieStore.get(TOKEN_COOKIE)?.value;

    const response = await fetch("http://localhost:3333/product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
     },
      body: formData,
    });

    const texto = await response.text();

    let data;
    try {
      data = JSON.parse(texto);
    } catch {
      data = { message: texto };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("ERRO NA API DO NEXT:", error);
    return NextResponse.json(
      { message: "Erro ao criar produto", error: String(error) },
      { status: 500 }
    );
  }
}