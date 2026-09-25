import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { UseAuthStore } from "@/pages/auth/store/UseAuthStore";
import {
  BrainCircuit,
  BookOpenCheck,
  Code2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Users,
  Award,
  Lock,
  Smartphone,
  Star,
  Eye,
  EyeOff,
  Mail,
  User,
  Phone,
  ChevronDown,
  ChevronUp,
  Calendar,
  Check,
  HelpCircle,
  Zap,
  GraduationCap,
  HeartPulse,
  MessageSquare,
  Building,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const login = UseAuthStore((state) => state.login);
  const register = UseAuthStore((state) => state.register);
  const storeError = UseAuthStore((state) => state.error);

  // 1. STATE FORM AUTHENTICATION (SIGN IN & SIGN UP)
  const [authMode, setAuthMode] = useState("signin"); // "signin" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState("");
  const [localError, setLocalError] = useState("");

  // Form Input States
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [santriName, setSantriName] = useState("");
  const [selectedClass, setSelectedClass] = useState("SMA - Software & AI");

  // 2. STATE INTERAKTIF FAQ ACCORDION
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // 3. STATE KALKULATOR SPP / SIMULASI SYAHRIAH
  const [laundryService, setLaundryService] = useState(true);
  const [cateringPackage, setCateringPackage] = useState("premium"); // "standard" | "premium"
  const [aiLabOption, setAiLabOption] = useState(true);

  // HANDLER SUBMIT SIGN IN
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    setAuthSuccessMsg("");

    if (!signInEmail || !signInPassword) {
      setLocalError("Harap isi Email dan Password secara lengkap!");
      return;
    }

    const success = login(signInEmail, signInPassword);
    if (success) {
      setAuthSuccessMsg("Login berhasil! Mengalihkan ke Portal Dashboard...");
      setTimeout(() => {
        navigate("/user");
      }, 1200);
    } else {
      setLocalError(storeError || "Email atau password salah.");
    }
  };

  // HANDLER SUBMIT SIGN UP
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    setAuthSuccessMsg("");

    if (!signUpName || !signUpEmail || !signUpPassword || !santriName) {
      setLocalError("Mohon lengkapi seluruh kolom pendaftaran!");
      return;
    }

    const success = register({
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      role: "user",
    });

    if (success) {
      setAuthSuccessMsg(
        "Pendaftaran Akun Wali Santri Berhasil! Silakan Sign In."
      );
      setAuthMode("signin");
      setSignInEmail(signUpEmail);
      setSignInPassword(signUpPassword);
    } else {
      setLocalError(storeError || "Gagal mendaftar. Email mungkin sudah terdaftar.");
    }
  };

  // HITUNG BIAYA SPP DENGAN SIMULATOR
  const calculateTotalSpp = () => {
    let base = 1500000; // SPP Pokok
    if (cateringPackage === "premium") base += 350000;
    if (laundryService) base += 150000;
    if (aiLabOption) base += 200000;
    return base;
  };

  // DATA KELAS FAQ
  const faqData = [
    {
      q: "Bagaimana integrasi antara Kurikulum Syar'i dan Kurikulum AI / IT?",
      a: "Santri mengikuti kegiatan Tahfidz dan Dirasah Islamiyah di pagi hari hingga siang (kondisi wudhu & konsentrasi tinggi). Sesi Coding, Algoritma Python, dan Prompt Engineering dilaksanakan pada siang hingga sore hari dengan sistem lab praktek terkontrol.",
    },
    {
      q: "Apakah wali santri dapat memantau setoran hafalan secara realtime?",
      a: "Ya. Setiap setoran Ziyadah (hafalan baru) maupun Muraja'ah diuji oleh Ustadz pembimbing dan langsung diinput ke dalam sistem database. Wali Santri cukup login ke Portal ini untuk melihat laporan nilai tajwid, kelancaran, dan grafik progress juz.",
    },
    {
      q: "Bagaimana prosedur pembayaran SPP (Syahriah) bulanan?",
      a: "Pembayaran dapat dilakukan melalui BSI Direct Payment yang terintegrasi di Dashboard Wali. Setelah transaksi selesai, sistem secara otomatis menerbitkan bukti resi digital tanpa perlu konfirmasi manual via WhatsApp.",
    },
    {
      q: "Apakah santri diperbolehkan membawa gadget pribadi?",
      a: "Penggunaan laptop dan perangkat IT diatur secara ketat hanya pada jam pelajaran laboratorium AI dan software development di bawah pengawasan instruktur IT pesantren.",
    },
    {
      q: "Bagaimana kriteria kelulusan santri Pondok Al-Ikhtiar?",
      a: "Santri dinyatakan lulus setelah menyelesaikan Mutaba'ah Tahfidz 30 Juz Bersanad, menyelesaikan Mini-Project Aplikasi AI yang bermanfaat untuk masyarakat, serta lulus Ujian Niha'i Dirasah Islamiyah.",
    },
  ];

  return (
    <div className="w-full space-y-24 py-6 bg-slate-950 text-slate-100 antialiased">
      
      {/* BANNER INFORMASI PSB 2026/2027 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border border-emerald-800/60 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </span>
            <p className="text-slate-200">
              <strong className="text-emerald-300">PSB Gelombang 1 TA 2026/2027 Telah Dibuka:</strong> Beasiswa Khusus Santri Berprestasi IT & Hafidz 10 Juz.
            </p>
          </div>
          <a
            href="#psb-steps"
            className="shrink-0 text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
          >
            <span>Lihat Alur Pendaftaran</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* HERO SECTION DENGAN KARTU SIGN IN & SIGN UP TERPADU */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* SISI KIRI: PROFIL & DESKRIPSI PONDOK */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Manhaj Salafus Shalih • Ahlus Sunnah Wal Jama'ah</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Mencetak Santri <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Hafidz 30 Juz & Expert Generative AI
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
              Pondok Al-Ikhtiar menggabungkan kekuatan Aqidah & Kurikulum Tahfidz Qur'an Bersanad dengan Keahlian Software Engineering modern. Kami mempersiapkan santri menjadi pemimpin Rabbani yang menguasai teknologi AI.
            </p>

            {/* HIGHIGHT METRICS */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-900/40">
                <p className="text-xl font-black text-emerald-400">30 Juz</p>
                <p className="text-[10px] text-slate-400 font-medium">Mutqin & Sanad</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-900/40">
                <p className="text-xl font-black text-teal-400">Fullstack</p>
                <p className="text-[10px] text-slate-400 font-medium">AI & Python Dev</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-900/40">
                <p className="text-xl font-black text-emerald-400">24/7</p>
                <p className="text-[10px] text-slate-400 font-medium">Monitoring Wali</p>
              </div>
            </div>

            {/* DAFTAR FITUR SINGKAT */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Ustadz Pengajar Bersanad Al-Qur'an & Tajwid</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Laboratorium Komputer Komputasi AI & Cloud Computing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Portal Sistem Wali Santri Transparan (Mutaba'ah & SPP)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white border-2 border-slate-950">A</div>
                <div className="h-8 w-8 rounded-full bg-teal-700 flex items-center justify-center font-bold text-white border-2 border-slate-950">B</div>
                <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white border-2 border-slate-950">S</div>
              </div>
              <p>Dipercaya lebih dari <strong>350+ Wali Santri</strong> di seluruh Indonesia.</p>
            </div>

          </div>

          {/* SISI KANAN: KARTU SIGN IN / SIGN UP DENGAN TAB SWITCHER */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-3xl bg-slate-900/90 border border-emerald-800/80 p-6 sm:p-8 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl relative space-y-6">
              
              {/* HEADER FORM & TAB SWITCHER */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <span className="font-extrabold text-sm text-white">Portal Wali Santri</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-800 font-bold">
                    System Active
                  </span>
                </div>

                {/* TAB SWITCH BUTTONS */}
                <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signin");
                      setLocalError("");
                      setAuthSuccessMsg("");
                    }}
                    className={`py-2.5 rounded-xl transition-all ${
                      authMode === "signin"
                        ? "bg-emerald-500 text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Masuk (Sign In)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signup");
                      setLocalError("");
                      setAuthSuccessMsg("");
                    }}
                    className={`py-2.5 rounded-xl transition-all ${
                      authMode === "signup"
                        ? "bg-emerald-500 text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Daftar (Sign Up)
                  </button>
                </div>
              </div>

              {/* PESAN NOTIFIKASI ERROR / SUCCESS */}
              {localError && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{localError}</span>
                </div>
              )}

              {authSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{authSuccessMsg}</span>
                </div>
              )}

              {/* FORM SIGN IN */}
              {authMode === "signin" && (
                <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">Email Wali Santri</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input
                        type="email"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="contoh: user@gmail.com"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 font-semibold">Kata Sandi</label>
                      <span className="text-[10px] text-emerald-400 cursor-pointer hover:underline">
                        Lupa sandi?
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-10 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 gap-2 mt-2"
                  >
                    <span>Masuk Ke Dashboard Wali</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                    <p className="font-bold text-emerald-300">Akun Demo Wali Santri:</p>
                    <p>• Email: <code className="text-amber-300">user@gmail.com</code> | Pass: <code className="text-amber-300">123</code></p>
                  </div>
                </form>
              )}

              {/* FORM SIGN UP */}
              {authMode === "signup" && (
                <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Nama Lengkap Wali</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="Bapak / Ibu Nama Lengkap"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold block">Email Aktif</label>
                      <input
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="email@domain.com"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold block">No. WhatsApp</label>
                      <input
                        type="text"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        placeholder="08123456789"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Nama Calon Santri / Putra</label>
                    <input
                      type="text"
                      value={santriName}
                      onChange={(e) => setSantriName(e.target.value)}
                      placeholder="Nama Lengkap Ananda"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Buat Kata Sandi</label>
                    <input
                      type="password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Minimal 6 Karakter"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 gap-2 mt-2"
                  >
                    <span>Daftar Akun Baru & Buat Sesi</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* SECTION KEUNGGULAN UTAMA KURIKULUM */}
      <section id="keunggulan" className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-24">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            <GraduationCap className="h-4 w-4 text-emerald-400" />
            <span>Kurikulum Integrasi Unggulan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Pillar Pendidikan Pondok Al-Ikhtiar
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Menyeimbangkan kebutuhan ruhiyah, ilmu syar'i, dan keahlian IT profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/50 hover:border-emerald-500/50 transition-all space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <BookOpenCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Tahfidz Qur'an Bersanad</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Program hafalan intensif dengan target 30 Juz Mutqin. Pembimbingan langsung oleh Ustadz berpengalaman dengan sanad bacaan yang tersambung.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Target Hafalan 30 Juz Mutqin</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Matan Jazariyyah & Tajwid Imtiyaz</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Setoran Rutin Subuh & Zhohor</li>
            </ul>
          </div>

          {/* CARD 2 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/50 hover:border-emerald-500/50 transition-all space-y-4">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Generative AI & Software Dev</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurikulum teknologi yang mengajarkan logika dasar pemrograman, pengembangan web modern (React/Node.js), hingga penerapan AI Prompting & Machine Learning.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400" /> Pemrograman Python & JavaScript</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400" /> Integration LLM & AI API</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400" /> Portfolio Project Aplikasi Islam</li>
            </ul>
          </div>

          {/* CARD 3 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/50 hover:border-emerald-500/50 transition-all space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Dirasah Islamiyah & Adab</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Santri tidak hanya diajarkan teknologi, tetapi dibina Aqidah yang lurus sesuai pemahaman Salafus Shalih, Fiqh Ibadah harian, serta pembiasaan Adab Rabbani.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Kajian Kitab Aqidah & Akhlaq</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Bahasa Arab & Nahwu Sharaf</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Disiplin Shalat Berjamaah Tepat Waktu</li>
            </ul>
          </div>

        </div>

      </section>

      {/* JADWAL HARIAN SANTRI (RUNDOWN 24 JAM) */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-slate-900/90 border border-emerald-900/60 p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Clock className="h-4 w-4" />
                <span>Rutinitas Santri Rabbani</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Jadwal Kegitan Harian Santri</h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Aktivitas santri dirancang disiplin dan berimbang antara ibadah, hafalan Al-Qur'an, kelas AI, dan waktu istirahat yang cukup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold text-sm">03:30 - 06:00</span>
              <p className="font-bold text-white">Tahajud & Ziyadah Subuh</p>
              <p className="text-slate-400 text-[11px]">Shalat Qiyamul Lail, Shalat Subuh Berjamaah, Dzikir Pagi, dan Setoran Hafalan Baru.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold text-sm">08:00 - 11:30</span>
              <p className="font-bold text-white">Dirasah Islamiyah & Bahasa</p>
              <p className="text-slate-400 text-[11px]">Kajian Kitab Fiqh, Aqidah, Hadits, serta Pendalaman Bahasa Arab & Inggris Aktif.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold text-sm">13:30 - 16:00</span>
              <p className="font-bold text-white">AI & Coding Lab Session</p>
              <p className="text-slate-400 text-[11px]">Praktek Pemrograman Python, Software Architecture, dan Eksperimen Prompt Engineering.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-teal-400 font-bold text-sm">18:30 - 21:00</span>
              <p className="font-bold text-white">Muraja'ah & Istirahat</p>
              <p className="text-slate-400 text-[11px]">Shalat Maghrib-Isya, Pengulangan Hafalan Malam, Evaluasi Harian, dan Tidur Teratur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* KALKULATOR SIMULASI BIAYA SPP / SYAHRIAH INTERAKTIF */}
      <section id="syahriah" className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-24">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-8 sm:p-12 border border-emerald-800/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
              <CreditCard className="h-4 w-4 text-emerald-400" />
              <span>Transparansi Finansial Digital</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Simulasi SPP / Syahriah Digital Pesantren
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Seluruh biaya pendidikan terperinci secara rinci di Portal Wali Santri. Bebas dari biaya tersembunyi dan dapat diakses secara transparan setiap bulan.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-300">SPP Pokok & Asrama (Makan 3x, Asrama AC, Pengajar):</span>
                <span className="font-bold text-emerald-400">Rp 1.500.000 / bln</span>
              </div>

              {/* CONTROLS SIMULATOR */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <p className="font-bold text-white">Opsi Tambahan Layanan Santri:</p>
                
                <div className="flex items-center justify-between">
                  <label className="text-slate-400 text-xs flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={laundryService}
                      onChange={(e) => setLaundryService(e.target.checked)}
                      className="rounded accent-emerald-500"
                    />
                    <span>Layanan Laundry Seragam & Pakaian (+Rp 150.000)</span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-slate-400 text-xs flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiLabOption}
                      onChange={(e) => setAiLabOption(e.target.checked)}
                      className="rounded accent-emerald-500"
                    />
                    <span>Akses High-Performance AI Server & Cloud Lab (+Rp 200.000)</span>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Paket Katering Tambahan:</span>
                  <select
                    value={cateringPackage}
                    onChange={(e) => setCateringPackage(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-white rounded-lg text-xs px-2 py-1"
                  >
                    <option value="standard">Katering Standard (Termasuk)</option>
                    <option value="premium">Katering Premium Nutrisi (+Rp 350.000)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* CARD HASIL KALKULASI */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-emerald-800 space-y-4 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Estimasi Total Syahriah Bulanan
            </p>

            <div className="py-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                Rp {calculateTotalSpp().toLocaleString("id-ID")}
              </span>
              <span className="text-xs text-slate-500 font-medium"> / bulan</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pembayaran otomatis terkonfirmasi melalui sistem payment gateway BSI tanpa harus mengirim struk bukti transaksi secara manual.
            </p>

            <Button
              onClick={() => {
                setAuthMode("signin");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs h-11 rounded-xl shadow-lg shadow-emerald-500/20"
            >
              Coba Fitur SPP di Portal Wali
            </Button>
          </div>

        </div>
      </section>

      {/* ALUR PENDAFTARAN SANTRI BARU (PSB STEPS) */}
      <section id="psb-steps" className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-24 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">4 Langkah Mudah Pendaftaran Santri</h2>
          <p className="text-xs text-slate-400">Proses seleksi transparan dan terukur untuk calon wali santri.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-extrabold text-xs">1</span>
            <h4 className="font-bold text-white text-sm">Registrasi Akun Wali</h4>
            <p className="text-slate-400 text-[11px]">Isi formulir pendaftaran akun pada form Sign Up di atas untuk membuka portal calon santri.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 font-extrabold text-xs">2</span>
            <h4 className="font-bold text-white text-sm">Tes Tilawah & Logika</h4>
            <p className="text-slate-400 text-[11px]">Calon santri mengikuti ujian pemetaan bacaan Al-Qur'an serta tes penalaran logika IT dasar secara online.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-extrabold text-xs">3</span>
            <h4 className="font-bold text-white text-sm">Wawancara Komitmen</h4>
            <p className="text-slate-400 text-[11px]">Sesi dialog singkat antara Tim Pengasuh Pesantren dengan Calon Wali Santri mengenai kesiapan ananda.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 font-extrabold text-xs">4</span>
            <h4 className="font-bold text-white text-sm">Daftar Ulang & Masuk</h4>
            <p className="text-slate-400 text-[11px]">Penyelesaian registrasi ulang digital dan penempatan kamar asrama santri baru.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONI WALI SANTRI */}
      <section id="testimony" className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-24 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Kisah & Testimoni Wali Santri</h2>
          <p className="text-xs text-slate-400">Pengalaman langsung wali santri yang memercayakan pendidikan putra mereka.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex text-amber-400 gap-1">
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Alhamdulillah ananda Zaidan baru kelas X tapi hafalan sudah mencapai 12 Juz dan bisa membuat web aplikasi sendiri. Portal wali sangat memudahkan saya memantau perkembangan harian dari jauh."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs font-bold text-white">Bapak Ahmad Subagja</p>
              <p className="text-[10px] text-slate-500">Wali Santri • Jakarta Selatan</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex text-amber-400 gap-1">
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Manhaj Ahlus Sunnah yang konsisten membuat kami sebagai orang tua sangat tenang. Aqidah anak lurus, akhlaqnya santun, dan kemampuan AI-nya bisa diadu dengan mahasiswa IT."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs font-bold text-white">Ibu Dr. Ratna Pertiwi</p>
              <p className="text-[10px] text-slate-500">Wali Santri • Surabaya</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex text-amber-400 gap-1">
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
              <Star className="h-4 w-4 fill-amber-400" />
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Sistem pembayarannya sangat modern. Dulu di pondok lama harus konfirmasi WA bolak-balik, di Pondok Al-Ikhtiar cukup masuk dashboard langsung beres."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs font-bold text-white">H. Hendra Wijaya, S.T.</p>
              <p className="text-[10px] text-slate-500">Wali Santri • Bandung</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION INTERAKTIF */}
      <section id="faq" className="px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto scroll-mt-24 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <HelpCircle className="h-4 w-4 text-emerald-400" />
            <span>Paling Sering Ditanyakan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Pertanyaan Umum (FAQ)</h2>
          <p className="text-xs text-slate-400">Informasi lengkap seputar operasional pesantren.</p>
        </div>

        <div className="space-y-3">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs text-emerald-300 flex items-center justify-between gap-4 hover:bg-slate-850"
              >
                <span>{item.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 sm:p-12 text-slate-950 text-center space-y-5 shadow-2xl shadow-emerald-500/20">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Siapkan Masa Depan Rabbani & Digital Ananda Sekarang
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-950/80 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah bersama ratusan santri penghafal Al-Qur'an yang siap menaklukkan tantangan era Generative AI dengan Aqidah yang kokoh.
          </p>
          <div className="pt-2 flex justify-center">
            <Button
              onClick={() => {
                setAuthMode("signup");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="h-12 px-8 bg-slate-950 hover:bg-slate-900 text-emerald-400 font-black text-xs rounded-xl shadow-xl gap-2"
            >
              <span>Daftarkan Putra Anda Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}