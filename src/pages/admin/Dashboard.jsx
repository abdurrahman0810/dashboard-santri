import React from "react";
import { UseAuthStore } from "@/pages/auth/store/UseAuthStore";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Award,
  CalendarCheck,
  Send,
  Plus,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

export default function DashboardAdmin() {
  const user = UseAuthStore((state) => state.user);

  const stats = [
    { title: "Total Santri Mukim", value: "482", icon: Users, desc: "Santri Putra & Putri", badge: "+12 Santri Baru" },
    { title: "Target Hafalan Total", value: "1,240 Juz", icon: BookOpen, desc: "Capaian Al-Qur'an Bulan Ini", badge: "+85 Juz Pekan Ini" },
    { title: "Tingkat Kehadiran Shalat", value: "98.4%", icon: CalendarCheck, desc: "Jamaah Subuh & Isya", badge: "Sangat Baik" },
    { title: "Rapor AI Siap Terbit", value: "156", icon: Sparkles, desc: "Evaluasi Otomatis Akhir Pekan", badge: "Siap Kirim WA" },
  ];

  const recentHafalan = [
    { name: "Ahmad Fauzi", class: "Kelas 11 IPA - Ula", surah: "Surah Al-Baqarah (Juz 2)", status: "Lancar (Mumtaz)", time: "10 menit yang lalu" },
    { name: "Muhammad Zaki", class: "Kelas 10 IPS - Wustho", surah: "Surah An-Nisa (Juz 5)", status: "Muroja'ah Ulang", time: "25 menit yang lalu" },
    { name: "Fathimah Az-Zahra", class: "Kelas 12 - Ulya", surah: "Surah Yasin & Ar-Rahman", status: "Lancar (Mumtaz)", time: "1 jam yang lalu" },
    { name: "Ibrahim Malik", class: "Kelas 9 - Salafiyah", surah: "Juz 30 (Juz Amma Completes)", status: "Khatam Juz", time: "2 jam yang lalu" },
  ];

  return (
    <div className="space-y-8">
      {/* Banner Selamat Datang */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Pondok AI Ikhtiar Management Suite</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Assalamu'alaikum, Ustadz {user?.name || "Admin"}!
          </h1>
          <p className="text-sm text-emerald-100/80 leading-relaxed">
            Sistem cerdas AI pesantren saat ini beroperasi normal. Semua analitik hafalan santri, presensi shalat, dan laporan wali santri siap dikelola.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-bold gap-2 rounded-xl shadow-lg">
              <Plus className="h-4 w-4" /> Input Setoran Hafalan
            </Button>
            <Button variant="outline" className="border-emerald-700 bg-emerald-900/40 text-emerald-100 hover:bg-emerald-800 font-semibold gap-2 rounded-xl">
              <Zap className="h-4 w-4 text-emerald-400" /> Generate Laporan AI
            </Button>
          </div>
        </div>

        {/* Hiasan background */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{item.title}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-slate-800">{item.value}</h3>
                <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 w-fit px-2.5 py-0.5 rounded-md">
                <TrendingUp className="h-3 w-3" />
                <span>{item.badge}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Konten Utama 2 Kolom */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Kolom Kiri (2 Span): Data Setoran Hafalan Santri Terbaru */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Setoran Tahfidz Terbaru</h2>
                <p className="text-xs text-slate-400">Laporan realtime dari para Asatidzah Pengampu</p>
              </div>
              <Button variant="ghost" className="text-xs font-bold text-emerald-700 hover:bg-emerald-50">
                Lihat Semua Data
              </Button>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {recentHafalan.map((santri, index) => (
                <div key={index} className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      {santri.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{santri.name}</p>
                      <p className="text-xs text-slate-500">{santri.class} • <span className="font-semibold text-emerald-800">{santri.surah}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      santri.status.includes("Mumtaz") 
                        ? "bg-emerald-100 text-emerald-800" 
                        : santri.status.includes("Khatam")
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {santri.status}
                    </span>
                    <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      {santri.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan (1 Span): Quick AI Assistant & Broadcast Tools */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base mb-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <h3>Asisten AI Pondok Ikhtiar</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Buat narasi perkembangan santri otomatis menggunakan AI untuk dikirim langsung ke WhatsApp Wali Santri.
            </p>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-emerald-500 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Generate Rapor Akhir Bulan</p>
                    <p className="text-[10px] text-slate-400">Analisis hafalan & kedisiplinan</p>
                  </div>
                </div>
                <Zap className="h-4 w-4 text-slate-300 group-hover:text-emerald-600" />
              </button>

              <button className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-emerald-500 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Broadcast WA Wali Santri</p>
                    <p className="text-[10px] text-slate-400">Kirim pengumuman otomatis</p>
                  </div>
                </div>
                <Zap className="h-4 w-4 text-slate-300 group-hover:text-emerald-600" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Integritas Server & Sistem</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Database Santri</span>
                <span className="font-bold text-emerald-700">Terhubung</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Modul AI Analytics</span>
                <span className="font-bold text-emerald-700">Aktif</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Backup Data Harian</span>
                <span className="font-bold text-slate-500">02.00 WIB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}