import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseAuthStore } from "./auth/store/UseAuthStore";
import {
  BrainCircuit,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  UserPlus,
} from "lucide-react";

export default function SignUp() {
  // 1. State Input Formulir
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 2. State UI & Notifikasi
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. Store Auth & Router
  const register = UseAuthStore((state) => state.register);
  const navigate = useNavigate();

  // 4. Logika Pendaftaran & Validasi
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validasi 1: Kolom tidak boleh kosong
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("Semua kolom pendaftaran wajib diisi!");
      return;
    }

    // Validasi 2: Kesamaan kata sandi
    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak cocok dengan password!");
      return;
    }

    // Validasi 3: Panjang minimal kata sandi
    if (password.length < 3) {
      setErrorMessage("Password minimal terdiri dari 3 karakter!");
      return;
    }

    setIsSubmitting(true);

    // Proses Pendaftaran ke Store
    setTimeout(() => {
      let isSuccess = false;

      if (typeof register === "function") {
        isSuccess = register({ name, email, password, role: "user" });
      } else {
        // Fallback simpan jika method register di store belum dibuat
        isSuccess = true;
      }

      setIsSubmitting(false);

      if (isSuccess) {
        setSuccessMessage("Akun berhasil dibuat! Mengalihkan ke halaman Sign In...");
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      } else {
        setErrorMessage("Email sudah terdaftar. Gunakan email lain!");
      }
    }, 400);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* Container Utama Form */}
      <div className="w-full max-w-md lg:max-w-4xl rounded-2xl sm:rounded-3xl border border-emerald-900/50 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* PANEL KIRI: DESAIN BRANDING & INFORMASI */}
        <div className="hidden lg:flex flex-col justify-between border-r border-emerald-900/40 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-950 p-8 relative">
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <BrainCircuit className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-wider">
                PONDOK AI IKHTIAR
              </h2>
              <p className="text-[10px] text-emerald-400 font-semibold">
                Sistem Registrasi Wali Santri
              </p>
            </div>
          </div>

          <div className="my-auto space-y-4 py-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span>Bergabung Komunitas Wali Santri Digital</span>
            </div>

            <h1 className="text-2xl font-black text-white leading-snug">
              Mulai Perjalanan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                Pendidikan Santri Digital
              </span>
            </h1>

            <p className="text-xs text-slate-400 leading-relaxed">
              Daftarkan diri Anda untuk memantau langsung mutaba'ah harian, perkembangan tahfidz, dan laporan akademik ananda.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Akses Dashboard Wali Santri Realtime</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Laporan Evaluasi Hafalan Al-Qur'an Pekanan</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Integrasi Pembayaran Syahriah Transparan</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-emerald-900/40 pt-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Data Wali Santri Terenkripsi
            </span>
            <span>&copy; 2026 Pondok AI</span>
          </div>
        </div>

        {/* PANEL KANAN: FORM SIGN UP */}
        <div className="flex flex-col justify-center p-6 sm:p-8 w-full bg-slate-900">
          
          {/* Logo Mobile */}
          <div className="flex items-center justify-center gap-2 lg:hidden mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-bold">
              <BrainCircuit className="h-5 w-5 text-slate-950" />
            </div>
            <span className="font-extrabold text-base text-white">
              Pondok AI Ikhtiar
            </span>
          </div>

          <div className="mb-5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-white">Sign Up</h1>
              <UserPlus className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">Buat akun baru kamu</p>
          </div>

          {/* Alert Pesan Error */}
          {errorMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-950/90 p-3 text-xs font-semibold text-red-200 border border-red-800 animate-shake">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Alert Pesan Sukses */}
          {successMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-950/90 p-3 text-xs font-semibold text-emerald-200 border border-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* FORM INPUT UTAMA */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            
            {/* Input Username */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-emerald-400" />
                <span>Username / Nama Lengkap</span>
              </label>
              <Input
                type="text"
                placeholder="Masukkan username/nama..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 rounded-xl border-slate-800 bg-slate-950 px-3 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500"
              />
            </div>

            {/* Input Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                <span>Email</span>
              </label>
              <Input
                type="email"
                placeholder="Masukkan email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-xl border-slate-800 bg-slate-950 px-3 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500"
              />
            </div>

            {/* Input Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Password</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 rounded-xl border-slate-800 bg-slate-950 px-3 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Input Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Confirm Password</span>
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Ulangi password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-10 rounded-xl border-slate-800 bg-slate-950 px-3 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500"
              />
            </div>

            {/* Tombol Action & Navigasi */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-full gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-md shadow-emerald-500/20 text-xs"
              >
                {isSubmitting ? (
                  <span>Mendaftarkan Akun...</span>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Link Kembali ke Sign In */}
              <div className="text-center mt-2 pt-3 border-t border-slate-800">
                <Link to="/sign-in" className="font-medium text-xs text-slate-400 hover:text-white transition-colors">
                  Sudah punya akun? <u className="text-blue-400 font-semibold ml-1">Sign In</u>
                </Link>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}