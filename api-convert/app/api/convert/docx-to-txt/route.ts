import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "File tidak ada" }, { status: 400 });

    const API_SECRET = "n8ZP8DKCVen7TANjOWZkMMQvYv4ZuBze"; 
    const convertFormData = new FormData();
    convertFormData.append("File", file);

    const response = await fetch(`https://v2.convertapi.com/convert/docx/to/txt?Secret=${API_SECRET}`, {
      method: "POST",
      body: convertFormData,
    });

    const result = await response.json();
    if (result.Files) {
      return NextResponse.json({ status: "sukses", link_download: result.Files[0].Url });
    }
    return NextResponse.json({ error: "Gagal", detail: result }, { status: 500 });
  } catch (e) { return NextResponse.json({ error: "Server Error" }, { status: 500 }); }
}