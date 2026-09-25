import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseAuthStore } from "./auth/store/UseAuthStore";
import {
  BrainCircuit,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  BookOpen,
  Award,
} from "lucide-react";

export default function SignIn() {
  // ==========================================
  // LOGIKA ASLI KAMU (DIJAGA 100% SAMA)
  // ==========================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = UseAuthStore((state) => state.login);
  const error = UseAuthStore((state) => state.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isSuccess = login(email, password);

    if (isSuccess) {
      const currentUser = UseAuthStore.getState().user;
      console.log(currentUser);

      if (currentUser?.role === "admin") {
        navigate("/admin");
      } else if (currentUser?.role === "user") {
        navigate("/user");
      }
    }
  };

  // ==========================================
  // TAMBAHAN STATE & HELPER KHUSUS DESAIN UI
  // ==========================================
  const [showPassword, setShowPassword] = useState(false);

  // Helper untuk mengisi otomatis kredensial uji coba (Demo Cepat)
  const handleQuickFill = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-950 font-sans text-slate-100 p-3 sm:p-6 lg:p-8 overflow-x-hidden antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Visual Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-teal-500/10 blur-[130px] pointer-events-none -z-10" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-md lg:max-w-5xl rounded-2xl sm:rounded-3xl border border-emerald-900/40 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* ========================================================================= */}
        {/* PANEL KIRI: DESAIN BRANDING (Tampil di Layar Desktop / Tablet Besar)       */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex flex-col justify-between border-r border-emerald-900/40 bg-gradient-to-br from-emerald-950/90 via-slate-950 to-slate-950 p-8 xl:p-10 relative">
          
          {/* Header Branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <BrainCircuit className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-wider">
                PONDOK AI IKHTIAR
              </h2>
              <p className="text-[10px] text-emerald-400 font-semibold">
                Sistem Informasi & Digital Santri
              </p>
            </div>
          </div>

          {/* Core Banner Text */}
          <div className="my-auto space-y-5 py-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span>Portal Wali Santri & Digital Tahfidz</span>
            </div>

            <h1 className="text-2xl xl:text-3xl font-black text-white leading-snug">
              Pantau Perkembangan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Ananda Secara Realtime
              </span>
            </h1>

            <p className="text-xs text-slate-400 leading-relaxed">
              Sistem AI terpadu untuk evaluasi mutaba'ah harian, kelancaran tajwid, nilai akademis, serta kedisiplinan ibadah secara transparan.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Grafik Setoran Hafalan Al-Qur'an Pekanan</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Notifikasi Ringkasan Kedisiplinan Santri</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Integrasi Syahriah (SPP) & Finance Terverifikasi</span>
              </div>
            </div>
          </div>

          {/* Security Footer Badge */}
          <div className="flex items-center justify-between border-t border-emerald-900/40 pt-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Sistem Keamanan Otentikasi
            </span>
            <span>&copy; 2026 Pondok AI</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANEL KANAN: FORM LOGIKA UTAMA (TERHUBUNG KE STATE & SUBMIT KAMU)         */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10 w-full">
          
          {/* Logo Header khusus Layar HP */}
          <div className="flex items-center justify-center gap-2.5 lg:hidden mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-bold">
              <BrainCircuit className="h-5 w-5 text-slate-950" />
            </div>
            <span className="font-extrabold text-base text-white tracking-wide">
              Pondok AI Ikhtiar
            </span>
          </div>

          {/* Judul & Subtitle Form */}
          <div className="mb-5 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Sign In
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Masuk ke akun kamu
            </p>
          </div>

          {/* Tombol Demo Cepat (Quick Fill) */}
          <div className="mb-5 rounded-xl bg-slate-950 p-2.5 border border-emerald-900/50 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <KeyRound className="h-3 w-3" /> Isi Cepat Demo:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill("admintest@gmail.com", "123")}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-950/80 py-1.5 px-2 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-900 border border-emerald-800 transition-colors"
              >
                <Award className="h-3 w-3 text-emerald-400" />
                <span>Demo Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("user@gmail.com", "123")}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-teal-950/80 py-1.5 px-2 text-[11px] font-semibold text-teal-300 hover:bg-teal-900 border border-teal-800 transition-colors"
              >
                <BookOpen className="h-3 w-3 text-teal-400" />
                <span>Demo User</span>
              </button>
            </div>
          </div>

          {/* Alert Peringatan jika State Error dari Store terisi */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-red-950/90 p-3.5 text-xs font-semibold text-red-200 border border-red-800/80 animate-shake">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* FORM UTAMA (LOGIKA ASLI KAMU DITERAPKAN DI SINI) */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                <span>Email</span>
              </label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border-slate-800 bg-slate-950 px-3.5 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Password</span>
                </label>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl border-slate-800 bg-slate-950 px-3.5 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Area Tombol Submit & Redirect Sign Up */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                className="h-11 w-full gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 transition-all text-xs"
              >
                <span>Login</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              {/* Link Sign Up (Sesuai dengan kode asli milik kamu) */}
              <div className="text-center mt-2 pt-3 border-t border-slate-800/80">
                <Link to="/sign-up" className="font-medium text-xs text-slate-400 hover:text-white transition-colors">
                  Do you not Have Account ? <u className="text-red-500 font-semibold ml-1">Sign Up</u>
                </Link>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}