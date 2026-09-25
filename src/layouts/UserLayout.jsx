import React, { useState } from "react";
import { UseAuthStore } from "@/pages/auth/store/UseAuthStore";
import { Button } from "@/components/ui/button";
import {
  User,
  BookOpen,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  Calendar,
  DollarSign,
  ChevronRight,
} from "lucide-react";

export default function WaliSantriDashboard() {
  const user = UseAuthStore((state) => state.user);
  const getSantriData = UseAuthStore((state) => state.getSantriData);
  const getSppBySantri = UseAuthStore((state) => state.getSppBySantri);
  const getTahfidzBySantri = UseAuthStore((state) => state.getTahfidzBySantri);
  const getReportsBySantri = UseAuthStore((state) => state.getReportsBySantri);
  const paySpp = UseAuthStore((state) => state.paySpp);

  const [activeTab, setActiveTab] = useState("tahfidz");
  const [paymentSuccess, setPaymentSuccess] = useState("");

  const santri = getSantriData(user?.santriId);
  const sppList = getSppBySantri(santri.id);
  const tahfidzList = getTahfidzBySantri(santri.id);
  const reportsList = getReportsBySantri(santri.id);

  const handlePay = (sppId) => {
    const ref = paySpp(sppId, "Bank Syariah Indonesia (BSI)");
    setPaymentSuccess(`Pembayaran Berhasil! No. Ref: ${ref}`);
    setTimeout(() => setPaymentSuccess(""), 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100">
      
      {/* HEADER PROFIL SANTRI */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-6 border border-emerald-800/60 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-black text-xl shadow-lg">
            <User className="h-8 w-8 text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white">{santri.nama}</h1>
            <p className="text-xs text-emerald-400 font-semibold">NIS: {santri.nis}</p>
            <p className="text-[11px] text-slate-400 mt-1">{santri.kelas}</p>
          </div>
        </div>

        <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
          <p className="text-slate-400">Ustadz Pembimbing: <strong className="text-white">{santri.ustadzPembimbing}</strong></p>
          <p className="text-slate-400">Asrama/Kamar: <strong className="text-white">{santri.kamar}</strong></p>
          <p className="text-slate-400">Status Kehadiran: <strong className="text-emerald-400">{santri.statusKehadiran}</strong></p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-900/50 flex items-center justify-around text-center">
          <div>
            <p className="text-xs text-slate-400">Hafalan Qur'an</p>
            <p className="text-xl font-black text-emerald-400">{santri.capaianJuz} / {santri.targetJuz} Juz</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div>
            <p className="text-xs text-slate-400">Rata Tajwid</p>
            <p className="text-xl font-black text-teal-400">{santri.rataNilaiTajwid} (A)</p>
          </div>
        </div>

      </div>

      {/* PEMBERITAHUAN BAYAR SPP SUKSES */}
      {paymentSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{paymentSuccess}</span>
        </div>
      )}

      {/* TAB NAVIGATION */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("tahfidz")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "tahfidz"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Setoran Mutaba'ah Tahfidz</span>
        </button>

        <button
          onClick={() => setActiveTab("spp")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "spp"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <CreditCard className="h-4 w-4" />
          <span>Tagihan & SPP (Syahriah)</span>
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "reports"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Kedisiplinan & Laporan Masalah</span>
        </button>
      </div>

      {/* TAB CONTENT 1: SETORAN TAHFIDZ */}
      {activeTab === "tahfidz" && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Riwayat Setoran Hafalan Harian
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {tahfidzList.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{item.surah}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">{item.tipe}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Penguji: {item.penguji} • Tanggal: {item.tanggal}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-emerald-400">Tajwid: {item.nilaiTajwid}</p>
                  <p className="text-[11px] text-slate-400">{item.kelancaran}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "spp" && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            Status Tagihan Syahriah Pesantren
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {sppList.map((spp) => (
              <div key={spp.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <p className="text-xs font-bold text-white">{spp.bulan}</p>
                  <p className="text-sm font-black text-emerald-400 mt-1">Rp {spp.nominal.toLocaleString("id-ID")}</p>
                  <p className="text-[11px] text-slate-400">Jatuh Tempo: {spp.tanggalJatuhTempo}</p>
                </div>

                {spp.status === "Lunas" ? (
                  <div className="text-left md:text-right space-y-1">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-800">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Lunas
                    </span>
                    <p className="text-[10px] text-slate-500">Ref: {spp.buktiBayar}</p>
                  </div>
                ) : (
                  <Button
                    onClick={() => handlePay(spp.id)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                  >
                    Bayar SPP Sekarang (BSI Direct)
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: LAPORAN KEDISIPLINAN & MASALAH SANTRI */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Catatan Kesehatan, Kedisiplinan & Penanganan
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {reportsList.map((rep) => (
              <div
                key={rep.id}
                className={`p-5 rounded-2xl border ${
                  rep.isAlert ? "bg-amber-950/20 border-amber-800/60" : "bg-slate-900 border-slate-800"
                } space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{rep.kategori}</span>
                  <span className="text-[10px] text-slate-400">{rep.tanggal}</span>
                </div>
                <p className="text-xs text-red-400">{rep.deskripsi}</p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Tindakan Pengasuh: <strong className="text-emerald-300">{rep.tindakan}</strong></span>
                  <span className="font-bold text-teal-400">{rep.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}