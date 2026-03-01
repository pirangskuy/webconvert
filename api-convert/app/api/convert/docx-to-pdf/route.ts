import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah." }, { status: 400 });
    }

    // 1. MASUKKAN API SECRET ANDA DI SINI
    // Ganti tulisan GANTI_DENGAN_API_SECRET_ANDA dengan kode yang Anda salin dari ConvertAPI
    const API_SECRET = "n8ZP8DKCVen7TANjOWZkMMQvYv4ZuBze"; 

    // 2. Siapkan wadah baru untuk meneruskan file ke ConvertAPI
    const convertFormData = new FormData();
    convertFormData.append("File", file);

    // 3. Kirim file ke mesin ConvertAPI (mengubah docx ke pdf)
    const response = await fetch(`https://v2.convertapi.com/convert/docx/to/pdf?Secret=${API_SECRET}`, {
      method: "POST",
      body: convertFormData,
    });

    const result = await response.json();

    // 4. Jika berhasil, ConvertAPI akan memberikan link (URL) untuk mengunduh PDF-nya
    if (result.Files && result.Files.length > 0) {
      const pdfUrl = result.Files[0].Url;
      
      return NextResponse.json({ 
        status: "sukses",
        pesan: "Yeay! File berhasil diubah ke PDF.",
        nama_file_asli: file.name,
        link_download_pdf: pdfUrl
      });
    } else {
      return NextResponse.json({ error: "Gagal mengonversi file.", detail: result }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}