"use client";
import { useState } from "react";

// Daftar pilihan konversi yang sudah kita buat API-nya
const CONVERSION_OPTIONS = [
  { id: "docx-to-pdf", label: "Word ke PDF", icon: "📄" },
  { id: "txt-to-docx", label: "Teks ke Word", icon: "📝" },
  { id: "docx-to-txt", label: "Word ke Teks", icon: "📖" },
  { id: "txt-to-pdf", label: "Teks ke PDF", icon: "📕" },
  { id: "png-to-webp", label: "PNG ke WebP", icon: "🖼️" },
  { id: "webp-to-png", label: "WebP ke PNG", icon: "📷" },
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState(CONVERSION_OPTIONS[0].id);
  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleConvert = async () => {
    if (!file) return;
    setStatus("loading");
    setDownloadUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // API dipanggil secara dinamis sesuai pilihan user
      const response = await fetch(`/api/convert/${type}`, {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();

      // Menangani berbagai format key (link_download atau link_download_pdf)
      const finalLink = data.link_download || data.link_download_pdf;

      if (finalLink) {
        setDownloadUrl(finalLink);
        setStatus("success");
      } else {
        alert("Gagal mengonversi. Cek kembali file Anda.");
        setStatus("idle");
      }
    } catch (error) {
      alert("Koneksi ke server terputus.");
      setStatus("idle");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 md:p-10 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Earthy Convert 🌍</h1>
          <p className="text-slate-500">Konversi dokumen dan gambar dengan sekali klik.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Bagian Pilih Jenis Konversi */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Aksi:</label>
            <select 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 transition"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {CONVERSION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.icon} {opt.label}</option>
              ))}
            </select>
          </div>

          {/* Bagian Pilih File */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih File:</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
        </div>

        {/* Tombol Eksekusi */}
        <button
          onClick={handleConvert}
          disabled={!file || status === "loading"}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 disabled:bg-slate-300 disabled:scale-100 transition-all duration-200 shadow-lg shadow-blue-200"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang Memproses...
            </span>
          ) : "Konversi Sekarang"}
        </button>

        {/* Notifikasi Sukses & Download */}
        {status === "success" && (
          <div className="mt-8 p-6 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-2xl text-center">
            <p className="text-emerald-800 font-bold text-lg mb-4">Selesai! File Anda siap diunduh 🚀</p>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 font-bold transition-all hover:shadow-lg"
            >
              📥 Download Hasil Konversi
            </a>
          </div>
        )}
      </div>
      
      <footer className="mt-10 text-slate-400 text-sm">
        Dibuat dengan ❤️ oleh Izan - Web Developer
      </footer>
    </main>
  );
}