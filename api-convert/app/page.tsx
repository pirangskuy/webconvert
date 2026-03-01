"use client";
import { useState } from "react";

// Daftar pilihan konversi
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
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleConvert = async () => {
    if (!file) return;
    setStatus("loading");
    setDownloadUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/convert/${type}`, {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
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
    <div className="min-h-screen bg-gradient-to-br from-[#Fdfbf7] to-[#f5f2ed] overflow-x-hidden">
      {/* Background Circle */}
      <div className="fixed w-[600px] h-[600px] bg-gradient-to-r from-[#6B8E23]/10 via-[#6B8E23]/5 to-transparent rounded-full top-1/4 -left-48 -z-10 blur-xl" />
      
      {/* Navigation */}
      <nav className="flex justify-between items-center px-5% py-8 max-w-6xl mx-auto w-full">
        <a href="#" className="text-2xl font-black text-[#6B8E23] no-underline flex items-center gap-2">
          Earth<span className="text-[#3E3E3E]">Convert</span>
        </a>
        <div className="flex items-center gap-8">
          <div className="flex gap-8 text-[#757575] font-medium">
            <a href="#" className="hover:text-[#6B8E23] transition-colors">Fitur</a>
            <a href="#" className="hover:text-[#6B8E23] transition-colors">Harga</a>
            <a href="#" className="hover:text-[#6B8E23] transition-colors">Bantuan</a>
          </div>
          <a href="#" className="px-6 py-2.5 border-2 border-[#6B8E23] rounded-full text-[#6B8E23] font-semibold hover:bg-[#6B8E23] hover:text-white transition-all duration-300">
            Masuk Akun
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center px-8 pb-16 pt-16 text-center max-w-4xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-5xl md:text-[3rem] font-black text-[#3E3E3E] leading-tight mb-4">
          Ubah Format Dokumen & <br />
          <span className="text-[#6B8E23] relative inline-block">
            Gambar Tanpa Kehilangan Kualitas
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#6B8E23]/20 rounded-full z-[-1]" />
          </span>
        </h1>
        <p className="text-xl text-[#757575] mb-12 max-w-xl mx-auto leading-relaxed">
          Konverter online tercepat dan teraman. Mendukung berbagai format dokumen dan gambar.
        </p>

        {/* Converter Card */}
        <div className="relative bg-white p-12 rounded-[20px] shadow-[0_10px_30px_rgba(107,142,35,0.15)] w-full max-w-[700px] border border-white/80">
          {/* Pilih Format Dropdown */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#3E3E3E] mb-3">Pilih Jenis Konversi:</label>
            <select 
              className="w-full p-4 bg-[#E8E4D9] border-2 border-[#E8E4D9] rounded-2xl text-[#3E3E3E] font-semibold text-lg focus:border-[#6B8E23] focus:outline-none transition-all hover:bg-[#6B8E23]/5"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {CONVERSION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="text-lg">
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Drop Zone / File Input */}
          <div 
            className={`border-2 border-dashed border-[#dcdcdc] rounded-3xl p-12 bg-[#fafafa] transition-all duration-300 cursor-pointer hover:border-[#6B8E23] hover:bg-[#6B8E23]/5 mb-8 flex flex-col items-center justify-center gap-4 ${
              status === "loading" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <div className="w-20 h-20 bg-[#E8E4D9] rounded-full flex items-center justify-center text-[#6B8E23] text-2xl mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div className="text-xl font-bold text-[#3E3E3E]">Tarik & Lepas file di sini</div>
            <div className="text-sm text-[#757575]">atau klik untuk memilih {file ? file.name : "file dari perangkat"}</div>
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={status === "loading"}
            />
          </div>

          {/* Convert Button */}
          <button
            onClick={handleConvert}
            disabled={!file || status === "loading"}
            className={`w-full py-5 px-12 bg-[#6B8E23] text-white rounded-full text-lg font-bold shadow-[0_4px_15px_rgba(107,142,35,0.3)] transition-all duration-200 hover:bg-[#556B2F] hover:-translate-y-0.5 active:translate-y-0 disabled:bg-[#E8E4D9] disabled:text-[#757575] disabled:shadow-none disabled:cursor-not-allowed ${
              status === "loading" ? "animate-pulse" : ""
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Memproses...
              </span>
            ) : (
              "🚀 Konversi Sekarang"
            )}
          </button>

          {/* Success State */}
          {status === "success" && (
            <div className="mt-8 p-8 bg-gradient-to-r from-[#6B8E23]/10 to-[#6B8E23]/5 border-2 border-dashed border-[#6B8E23]/30 rounded-3xl">
              <div className="text-[#6B8E23] font-bold text-2xl mb-6 flex items-center justify-center gap-3">
                ✅ Konversi Berhasil!
              </div>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#6B8E23] text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-[#556B2F] hover:shadow-lg transition-all text-center"
              >
                📥 Download Hasil Konversi
              </a>
            </div>
          )}
        </div>

        {/* How It Works */}
        <section className="mt-24 w-full">
          <h2 className="text-3xl font-black text-[#3E3E3E] mb-12">Cara Kerja Sangat Mudah</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: 1, title: "Pilih Konversi", desc: "Pilih jenis konversi dan seret file ke area unggah.", icon: "📁" },
              { num: 2, title: "Proses Otomatis", desc: "Klik konversi, sistem akan memproses dalam hitungan detik.", icon: "⚡" },
              { num: 3, title: "Download Instan", desc: "Ambil hasil konversi berkualitas tinggi langsung dari browser.", icon: "💾" }
            ].map((step, i) => (
              <div key={i} className="text-center p-8 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-[#6B8E23] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-[#3E3E3E] mb-4">{step.title}</h3>
                <p className="text-[#757575] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2b2b2b] text-[#d1d1d1] py-16 px-5% mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-black text-[#6B8E23] mb-4 flex items-center gap-2">
              Earth<span className="text-white">Convert</span>
            </div>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              Konversi dokumen dan gambar tercepat dengan kualitas terbaik. Dibuat dengan cinta di Indonesia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#3e3e3e] rounded-full flex items-center justify-center hover:bg-[#6B8E23] transition-colors">X</a>
              <a href="#" className="w-10 h-10 bg-[#3e3e3e] rounded-full flex items-center justify-center hover:bg-[#6B8E23] transition-colors">I</a>
              <a href="#" className="w-10 h-10 bg-[#3e3e3e] rounded-full flex items-center justify-center hover:bg-[#6B8E23] transition-colors">📷</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Alat Kami</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">Word ke PDF</a>
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">PNG ke WebP</a>
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">Kompres Gambar</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Perusahaan</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">Tentang Kami</a>
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">Karir</a>
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">Blog</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Bantuan</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">Pusat Bantuan</a>
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">Status Sistem</a>
              <a href="#" className="block text-[#a0a0a0] hover:text-[#6B8E23] transition-colors">API Docs</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#3e3e3e] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#a0a0a0]">
          <div>&copy; 2026 EarthConvert. Dibuat Oleh 221220019 & 221220023</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
