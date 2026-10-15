import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { UseAuthStore } from "@/pages/auth/store/UseAuthStore";
import { z } from "zod";
import {
  BrainCircuit,
  BookOpenCheck,
  Code2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Mail,
  User,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  GraduationCap,
  Clock,
  CheckCircle,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

// Schema Validasi Zod
const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi!")
    .email("Format email tidak valid!"),
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi!")
    .min(3, "Kata sandi minimal 3 karakter!"),
});

const signUpSchema = z.object({
  name: z.string().min(1, "Nama lengkap wali wajib diisi!"),
  email: z
    .string()
    .min(1, "Email wajib diisi!")
    .email("Format email tidak valid!"),
  phone: z.string().optional(),
  santriName: z.string().min(1, "Nama calon santri wajib diisi!"),
  password: z.string().min(6, "Kata sandi pendaftaran minimal 6 karakter!"),
});

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
  const [fieldErrors, setFieldErrors] = useState({});

  // Form Input States
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [santriName, setSantriName] = useState("");

  // 2. STATE INTERAKTIF FAQ ACCORDION
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // 3. STATE KALKULATOR SPP / SIMULASI SYAHRIAH
  const [laundryService, setLaundryService] = useState(true);
  const [cateringPackage, setCateringPackage] = useState("premium"); // "standard" | "premium"
  const [aiLabOption, setAiLabOption] = useState(true);

  // HANDLER SUBMIT SIGN IN DENGAN ZOD
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    setAuthSuccessMsg("");
    setFieldErrors({});

    // Validasi Zod
    const validationResult = signInSchema.safeParse({
      email: signInEmail,
      password: signInPassword,
    });

    if (!validationResult.success) {
      const formattedErrors = {};
      validationResult.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setFieldErrors(formattedErrors);
      setLocalError(
        validationResult.error.issues[0]?.message || "Input tidak valid!",
      );
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

  // HANDLER SUBMIT SIGN UP DENGAN ZOD
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    setAuthSuccessMsg("");
    setFieldErrors({});

    // Validasi Zod
    const validationResult = signUpSchema.safeParse({
      name: signUpName,
      email: signUpEmail,
      phone: signUpPhone,
      santriName: santriName,
      password: signUpPassword,
    });

    if (!validationResult.success) {
      const formattedErrors = {};
      validationResult.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setFieldErrors(formattedErrors);
      setLocalError(
        validationResult.error.issues[0]?.message ||
          "Mohon lengkapi formulir pendaftaran!",
      );
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
        "Pendaftaran Akun Wali Santri Berhasil! Silakan Sign In.",
      );
      setAuthMode("signin");
      setSignInEmail(signUpEmail);
      setSignInPassword(signUpPassword);
    } else {
      setLocalError(
        storeError || "Gagal mendaftar. Email mungkin sudah terdaftar.",
      );
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
    <div className="w-full bg-emerald-600 text-slate-800 antialiased min-h-screen">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold shadow-sm">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base leading-none block">
                Pondok Al-Ikhtiar
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold tracking-wider uppercase">
                Tahfidz & AI Technology
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a
              href="#keunggulan"
              className="hover:text-emerald-700 transition-colors"
            >
              Keunggulan
            </a>
            <a
              href="#jadwal"
              className="hover:text-emerald-700 transition-colors"
            >
              Jadwal Santri
            </a>
            <a
              href="#syahriah"
              className="hover:text-emerald-700 transition-colors"
            >
              Simulasi SPP
            </a>
            <a href="#faq" className="hover:text-emerald-700 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#auth-portal"
              className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg border border-emerald-200 transition-all"
            >
              Portal Wali
            </a>
          </div>
        </div>
      </header>

      {/* BANNER INFORMASI PSB */}
      <div className="bg-emerald-800 text-white text-xs font-medium py-2 px-4 text-center">
        <span>
          Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027 Telah Dibuka.
          Kuota Terbatas!
        </span>
      </div>

      <div className="space-y-20 py-10">
        {/* HERO SECTION DENGAN KARTU AUTH */}
        <section
          id="auth-portal"
          className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto pt-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* SISI KIRI: PROFIL & DESKRIPSI PONDOK */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>Manhaj Salafus Shalih • Ahlus Sunnah Wal Jama'ah</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Mencetak Generasi <br />
                <span className="text-white">Hafidz Quran & Mahir IT</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Pondok Al-Ikhtiar menggabungkan kekuatan Aqidah & Kurikulum
                Tahfidz Qur'an Bersanad dengan Keahlian Software Engineering
                modern. Kami mempersiapkan santri menjadi pemuda Rabbani yang
                unggul dalam sains dan teknologi AI.
              </p>

              {/* HIGHLIGHT METRICS */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <p className="text-xl font-black text-emerald-700">30 Juz</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Mutqin & Sanad
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <p className="text-xl font-black text-teal-700">Fullstack</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    AI & Python Dev
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <p className="text-xl font-black text-emerald-700">24/7</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Monitoring Wali
                  </p>
                </div>
              </div>

              {/* DAFTAR FITUR SINGKAT */}
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Ustadz Pengajar Bersanad Al-Qur'an & Tajwid Imtiyaz
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Laboratorium Komputer Komputasi AI & Cloud Infrastructure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Portal Sistem Wali Santri Realtime (Mutaba'ah, Tabungan &
                    SPP)
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center border-2 border-white text-xs">
                    A
                  </div>
                  <div className="h-8 w-8 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center border-2 border-white text-xs">
                    B
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center border-2 border-white text-xs">
                    S
                  </div>
                </div>
                <p>
                  Dipercaya oleh lebih dari{" "}
                  <strong className="text-slate-800">350+ Wali Santri</strong>{" "}
                  di seluruh Indonesia.
                </p>
              </div>
            </div>

            {/* SISI KANAN: KARTU SIGN IN / SIGN UP */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-sky-500 border border-slate-200 p-6 sm:p-7 shadow-md relative space-y-5">
                {/* HEADER FORM & TAB SWITCHER */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-sm text-slate-900">
                        Portal Akses Wali Santri
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                      Online
                    </span>
                  </div>

                  {/* TAB SWITCH BUTTONS */}
                  <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signin");
                        setLocalError("");
                        setAuthSuccessMsg("");
                        setFieldErrors({});
                      }}
                      className={`py-2 rounded-lg transition-all ${
                        authMode === "signin"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
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
                        setFieldErrors({});
                      }}
                      className={`py-2 rounded-lg transition-all ${
                        authMode === "signup"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Daftar (Sign Up)
                    </button>
                  </div>
                </div>

                {/* PESAN NOTIFIKASI ERROR / SUCCESS */}
                {localError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-red-600 shrink-0" />
                    <span>{localError}</span>
                  </div>
                )}

                {authSuccessMsg && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{authSuccessMsg}</span>
                  </div>
                )}

                {/* FORM SIGN IN */}
                {authMode === "signin" && (
                  <form
                    onSubmit={handleSignInSubmit}
                    className="space-y-4 text-xs"
                    noValidate
                  >
                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-semibold block">
                        Email Wali Santri
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          value={signInEmail}
                          onChange={(e) => {
                            setSignInEmail(e.target.value);
                            if (fieldErrors.email) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                email: null,
                              }));
                            }
                          }}
                          placeholder="contoh: user@gmail.com"
                          className={`w-full rounded-lg bg-slate-50 border ${
                            fieldErrors.email
                              ? "border-red-500"
                              : "border-slate-300"
                          } pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all`}
                        />
                      </div>
                      {fieldErrors.email && (
                        <p className="text-[11px] text-red-700 font-medium">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-slate-700 font-semibold">
                          Kata Sandi
                        </label>
                        <span className="text-[10px] text-emerald-700 cursor-pointer hover:underline">
                          Lupa sandi?
                        </span>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={signInPassword}
                          onChange={(e) => {
                            setSignInPassword(e.target.value);
                            if (fieldErrors.password) {
                              setFieldErrors((prev) => ({
                                ...prev,
                                password: null,
                              }));
                            }
                          }}
                          placeholder="••••••••"
                          className={`w-full rounded-lg bg-slate-50 border ${
                            fieldErrors.password
                              ? "border-red-500"
                              : "border-slate-300"
                          } pl-9 pr-9 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {fieldErrors.password && (
                        <p className="text-[11px] text-red-700 font-medium">
                          {fieldErrors.password}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs gap-2 mt-1"
                    >
                      <span>Masuk Ke Portal Wali</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
                      <p className="font-bold text-emerald-800">
                        Akun Demo Wali Santri:
                      </p>
                      <p>
                        Email:{" "}
                        <code className="text-slate-900 font-semibold bg-slate-200 px-1 py-0.5 rounded">
                          user@gmail.com
                        </code>{" "}
                        | Pass:{" "}
                        <code className="text-slate-900 font-semibold bg-slate-200 px-1 py-0.5 rounded">
                          123
                        </code>
                      </p>
                    </div>
                  </form>
                )}

                {/* FORM SIGN UP */}
                {authMode === "signup" && (
                  <form
                    onSubmit={handleSignUpSubmit}
                    className="space-y-3 text-xs"
                    noValidate
                  >
                    <div className="space-y-1">
                      <label className="text-slate-700 font-semibold block">
                        Nama Lengkap Wali
                      </label>
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="Bapak / Ibu Nama Lengkap"
                        className={`w-full rounded-lg bg-slate-50 border ${
                          fieldErrors.name
                            ? "border-red-500"
                            : "border-slate-300"
                        } px-3 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-red-700 font-medium">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-slate-700 font-semibold block">
                          Email Aktif
                        </label>
                        <input
                          type="email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="email@domain.com"
                          className={`w-full rounded-lg bg-slate-50 border ${
                            fieldErrors.email
                              ? "border-red-500"
                              : "border-slate-300"
                          } px-3 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all`}
                        />
                        {fieldErrors.email && (
                          <p className="text-[11px] text-red-700 font-medium">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-700 font-semibold block">
                          No. WhatsApp
                        </label>
                        <input
                          type="text"
                          value={signUpPhone}
                          onChange={(e) => setSignUpPhone(e.target.value)}
                          placeholder="08123456789"
                          className="w-full rounded-lg bg-slate-50 border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-semibold block">
                        Nama Calon Santri / Ananda
                      </label>
                      <input
                        type="text"
                        value={santriName}
                        onChange={(e) => setSantriName(e.target.value)}
                        placeholder="Nama Lengkap Santri"
                        className={`w-full rounded-lg bg-slate-50 border ${
                          fieldErrors.santriName
                            ? "border-red-500"
                            : "border-slate-300"
                        } px-3 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all`}
                      />
                      {fieldErrors.santriName && (
                        <p className="text-[11px] text-red-700 font-medium">
                          {fieldErrors.santriName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-semibold block">
                        Buat Kata Sandi
                      </label>
                      <input
                        type="password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Minimal 6 Karakter"
                        className={`w-full rounded-lg bg-slate-50 border ${
                          fieldErrors.password
                            ? "border-red-500"
                            : "border-slate-300"
                        } px-3 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all`}
                      />
                      {fieldErrors.password && (
                        <p className="text-[11px] text-red-700 font-medium">
                          {fieldErrors.password}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs gap-2 mt-2"
                    >
                      <span>Daftar Akun Wali Santri</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION KEUNGGULAN UTAMA KURIKULUM */}
        <section
          id="keunggulan"
          className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              <GraduationCap className="h-4 w-4 text-emerald-700" />
              <span>Pilar Kurikulum Terpadu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Kurikulum Integrasi Pondok Al-Ikhtiar
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Keseimbangan antara penanaman aqidah, hafalan Al-Qur'an bersanad,
              serta penguasaan teknologi AI profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-emerald-300 transition-all">
              <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <BookOpenCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                1. Tahfidz Qur'an Bersanad
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Program hafalan intensif dengan target 30 Juz Mutqin.
                Pembimbingan langsung oleh Ustadz berpengalaman dengan sanad
                bacaan muttashil.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />{" "}
                  Target 30 Juz Mutqin
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />{" "}
                  Matan Jazariyyah & Tajwid Imtiyaz
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />{" "}
                  Setoran Subuh & Halaqah Sore
                </li>
              </ul>
            </div>

            {/* CARD 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-emerald-300 transition-all">
              <div className="h-11 w-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                2. Generative AI & Software Dev
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kurikulum teknologi modern yang mengajarkan logika dasar
                pemrograman, web dev (React/Node.js), dan pemanfaatan AI API
                secara bijak.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />{" "}
                  Pemrograman Python & JavaScript
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />{" "}
                  Integration LLM & AI Systems
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" /> Project
                  Aplikasi Islami
                </li>
              </ul>
            </div>

            {/* CARD 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-emerald-300 transition-all">
              <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                3. Dirasah Islamiyah & Adab
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pembinaan Aqidah lurus sesuai pemahaman Salafus Shalih, Fiqh
                Ibadah harian, Bahasa Arab, serta pembentukan akhlaqul karimah.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />{" "}
                  Kajian Kitab Aqidah & Akhlaq
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />{" "}
                  Bahasa Arab & Nahwu Sharaf
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />{" "}
                  Kedisiplinan Shalat Berjamaah
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* JADWAL HARIAN SANTRI */}
        <section
          id="jadwal"
          className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <Clock className="h-4 w-4" />
                  <span>Rutinitas Santri</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Jadwal Kegiatan Harian Santri
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-md">
                Aktivitas terstruktur 24 jam yang menyeimbangkan antara ibadah,
                hafalan Al-Qur'an, kelas teknologi, dan istirahat yang cukup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-emerald-700 font-bold text-sm">
                  03:30 - 06:00
                </span>
                <p className="font-bold text-slate-900">
                  Tahajud & Ziyadah Subuh
                </p>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Qiyamul Lail, Subuh Berjamaah, Dzikir Pagi, dan Setoran
                  Hafalan Baru dengan Musyrif.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-teal-700 font-bold text-sm">
                  08:00 - 11:30
                </span>
                <p className="font-bold text-slate-900">
                  Dirasah Islamiyah & Bahasa
                </p>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Kajian Fiqh, Aqidah, Hadits, serta Pendalaman Bahasa Arab &
                  Inggris Aktif.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-emerald-700 font-bold text-sm">
                  13:30 - 16:00
                </span>
                <p className="font-bold text-slate-900">
                  Coding & AI Software Lab
                </p>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Praktek Pemrograman Python, Web Development, serta Eksplorasi
                  Tools AI di Laboratorium Komputer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-teal-700 font-bold text-sm">
                  18:00 - 21:00
                </span>
                <p className="font-bold text-slate-900">
                  Muraja'ah & Evaluasi Malam
                </p>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Sholat Maghrib & Isya Berjamaah, Muraja'ah Mandiri, Evaluasi
                  Harian Musyrif, dan Istirahat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* KALKULATOR SPP / SIMULASI SYAHRIAH */}
        <section
          id="syahriah"
          className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CreditCard className="h-4 w-4" />
                  <span>Kalkulator Pembiayaan</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Simulasi Biaya SPP (Syahriah) Bulanan
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-md">
                Estimasi transparan biaya bulanan santri termasuk fasilitas
                asrama, konsumsi, dan laboratorium teknologi.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-xs">
                {/* Paket Catering */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="font-bold text-slate-800 block">
                    Paket Konsumsi / Catering Santri:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCateringPackage("standard")}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        cateringPackage === "standard"
                          ? "bg-emerald-50 border-emerald-600 text-emerald-900 font-bold"
                          : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      <span className="block text-xs">Standard</span>
                      <span className="text-[10px] text-slate-500">
                        3x Makan Sehat Harian
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCateringPackage("premium")}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        cateringPackage === "premium"
                          ? "bg-emerald-50 border-emerald-600 text-emerald-900 font-bold"
                          : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      <span className="block text-xs">Premium (+Rp 350rb)</span>
                      <span className="text-[10px] text-slate-500">
                        Menu Nutrisi & Buah Segar
                      </span>
                    </button>
                  </div>
                </div>

                {/* Checkbox Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={laundryService}
                      onChange={(e) => setLaundryService(e.target.checked)}
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-800 block">
                        Layanan Laundry (+Rp 150rb)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Cuci & Setrika Pakaian
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiLabOption}
                      onChange={(e) => setAiLabOption(e.target.checked)}
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-800 block">
                        Akses AI Lab & Cloud (+Rp 200rb)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Server GPU & Cloud API
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Box Output Total */}
              <div className="lg:col-span-5 bg-emerald-900 text-white p-6 rounded-2xl space-y-4 shadow-sm text-center">
                <span className="text-xs text-emerald-200 font-semibold tracking-wide uppercase">
                  Total Estimasi SPP Bulanan
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-300">
                  Rp {calculateTotalSpp().toLocaleString("id-ID")}
                  <span className="text-xs text-emerald-200 font-normal">
                    /bln
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  Sudah termasuk SPP Pokok, Asrama, Pembinaan Tahfidz, dan
                  Fasilitas Pesantren. Pembayaran dilakukan via BSI Direct.
                </p>
                <a
                  href="#auth-portal"
                  className="inline-flex items-center justify-center w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all gap-1.5"
                >
                  <span>Daftar Wali & Bayar SPP</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION FAQ ACCORDION */}
        <section
          id="faq"
          className="px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto scroll-mt-20"
        >
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              <HelpCircle className="h-4 w-4 text-emerald-700" />
              <span>Pertanyaan Populer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Pertanyaan Sering Diajukan (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-emerald-700/30 pt-10 pb-8 text-white/90 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-700 font-bold">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <span className="font-bold text-base text-white">
                  Pondok Al-Ikhtiar
                </span>
              </div>
              <p className="text-emerald-100/80 text-xs leading-relaxed max-w-sm">
                Pondok Pesantren Tahfidz Qur'an & AI Technology Modern.
                Membentuk santri berakhlak mulia, berjiwa Rabbani, dan menguasai
                teknologi masa depan.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">Kontak Pesantren</h4>
              <div className="space-y-1.5 text-emerald-100/80 text-xs">
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" /> 0812-3456-7890
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" /> psb@al-ikhtiar.sch.id
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" /> Bogor, Jawa Barat
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">Navigasi Cepat</h4>
              <ul className="space-y-1 text-emerald-100/80">
                <li>
                  <a href="#keunggulan" className="hover:text-white">
                    Keunggulan
                  </a>
                </li>
                <li>
                  <a href="#jadwal" className="hover:text-white">
                    Jadwal Santri
                  </a>
                </li>
                <li>
                  <a href="#syahriah" className="hover:text-white">
                    Simulasi SPP
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 border-t border-emerald-700/40 text-center text-[11px] text-emerald-200/60">
            © 2026 Pondok Al-Ikhtiar Tahfidz & AI Technology. All Rights
            Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
