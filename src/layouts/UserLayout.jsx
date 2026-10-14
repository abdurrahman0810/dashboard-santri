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
  ShieldCheck,
  Award,
  Wallet,
  MessageSquare,
  FileText,
  ChevronRight,
  Download,
  Calendar,
  PlusCircle,
  Phone,
  ArrowUpRight,
  ArrowDownLeft,
  X,
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
  const [showTopUpModal, setShowTopUpModal] = useState(false);

  // Mock data tambahan untuk kelengkapan fitur Wali Santri
  const [uangSaku, setUangSaku] = useState({
    saldo: 185000,
    limitHarian: 25000,
    riwayat: [
      { id: 1, tanggal: "14 Okt 2026", tipe: "keluar", nominal: 15000, ket: "Kantin Utama" },
      { id: 2, tanggal: "12 Okt 2026", tipe: "keluar", nominal: 10000, ket: "Koperasi Kitab" },
      { id: 3, tanggal: "10 Okt 2026", tipe: "masuk", nominal: 200000, ket: "Top Up Transfer BSI" },
    ],
  });

  const [perizinanList] = useState([
    {
      id: "IZN-001",
      jenis: "Izin Pulang (Sakit)",
      tglKeluar: "02 Okt 2026",
      tglKembali: "05 Okt 2026",
      status: "Selesai (Kembali)",
      disetujuiOleh: "Ustadz Ahmad Fauzi",
    },
  ]);

  // Safety Fallback jika data santri belum terload
  const santri = getSantriData ? getSantriData(user?.santriId) : null;

  if (!santri) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-slate-500 text-sm">
        Memuat data santri...
      </div>
    );
  }

  const sppList = getSppBySantri ? getSppBySantri(santri.id) : [];
  const tahfidzList = getTahfidzBySantri ? getTahfidzBySantri(santri.id) : [];
  const reportsList = getReportsBySantri ? getReportsBySantri(santri.id) : [];

  const handlePay = (sppId) => {
    const ref = paySpp(sppId, "Bank Syariah Indonesia (BSI)");
    setPaymentSuccess(`Pembayaran Berhasil! No. Ref: ${ref}`);
    setTimeout(() => setPaymentSuccess(""), 5000);
  };

  const openWhatsApp = () => {
    const phone = "6281234567890"; // Nomor Ustadz Pembimbing
    const msg = `Assalamu'alaikum Ustadz, saya wali dari ${santri.nama} (${santri.kelas}). Boleh mohon info terkait...`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6 bg-slate-50 min-h-screen text-slate-800">
      
      {/* BANNER PROFIL SANTRI */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl border border-emerald-200 shrink-0">
              {santri.nama ? santri.nama.charAt(0) : "S"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">{santri.nama}</h1>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  {santri.statusKehadiran || "Aktif di Asrama"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                NIS: <span className="font-medium text-slate-700">{santri.nis}</span> • Kelas: <span className="font-medium text-slate-700">{santri.kelas}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <Button
              onClick={openWhatsApp}
              variant="outline"
              size="sm"
              className="text-xs border-emerald-600 text-emerald-700 hover:bg-emerald-50 gap-2 h-9 rounded-lg"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              <span>Hubungi Musyrif</span>
            </Button>
          </div>
        </div>

        {/* METRIK UTAMA SANTRI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 font-medium">Ustadz Pembimbing</p>
            <p className="text-xs font-semibold text-slate-800 mt-1 truncate">{santri.ustadzPembimbing}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Kamar: {santri.kamar}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 font-medium">Capaian Tahfidz</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-base font-bold text-emerald-700">{santri.capaianJuz}</span>
              <span className="text-xs text-slate-500">/ {santri.targetJuz} Juz</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full" 
                style={{ width: `${(santri.capaianJuz / santri.targetJuz) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 font-medium">Nilai Tajwid & Fashoha</p>
            <p className="text-base font-bold text-slate-800 mt-1">{santri.rataNilaiTajwid} <span className="text-xs font-normal text-slate-500">(A)</span></p>
            <p className="text-[10px] text-emerald-600 mt-0.5 font-medium">Sangat Baik</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Sisa Uang Saku</p>
              <p className="text-base font-bold text-slate-900 mt-1">
                Rp {uangSaku.saldo.toLocaleString("id-ID")}
              </p>
            </div>
            <button 
              onClick={() => setShowTopUpModal(true)}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 mt-1"
            >
              <PlusCircle className="h-3 w-3" /> Top Up Saldo
            </button>
          </div>
        </div>
      </div>

      {/* NOTIFIKASI PEMBAYARAN */}
      {paymentSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{paymentSuccess}</span>
        </div>
      )}

      {/* NAVIGASI TAB */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-2 pt-2 gap-1 overflow-x-auto shadow-2xs">
        {[
          { id: "tahfidz", label: "Mutaba'ah Tahfidz", icon: BookOpen },
          { id: "spp", label: "Tagihan & Syahriah", icon: CreditCard },
          { id: "saku", label: "Uang Saku Santri", icon: Wallet },
          { id: "perizinan", label: "Perizinan", icon: Calendar },
          { id: "reports", label: "Kedisiplinan & Catatan", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-lg"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* KONTEN TAB */}
      <div className="bg-white p-5 rounded-b-2xl border-x border-b border-slate-200 shadow-sm">
        
        {/* TAB 1: SETORAN TAHFIDZ */}
        {activeTab === "tahfidz" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Riwayat Setoran Mutaba'ah</h2>
                <p className="text-xs text-slate-500">Catatan perkembangan hafalan dan ziyadah harian santri.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {tahfidzList.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.surah}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded border border-slate-200">
                        {item.tipe}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Penguji: <span className="font-medium text-slate-700">{item.penguji}</span> • Tgl: <span className="text-slate-600">{item.tanggal}</span>
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      Tajwid: {item.nilaiTajwid}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">{item.kelancaran}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SPP & TAGIHAN */}
        {activeTab === "spp" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Rincian Pembayaran Syahriah</h2>
              <p className="text-xs text-slate-500">Daftar kewajiban administrasi dan pembayaran yang telah selesai.</p>
            </div>

            <div className="space-y-3">
              {sppList.map((spp) => (
                <div key={spp.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900">{spp.bulan}</p>
                      {spp.status === "Lunas" && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-base font-bold text-slate-900">
                      Rp {spp.nominal.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-slate-500">Jatuh Tempo: {spp.tanggalJatuhTempo}</p>
                  </div>

                  {spp.status === "Lunas" ? (
                    <div className="flex items-center gap-3">
                      <div className="text-left sm:text-right">
                        <p className="text-xs text-slate-500">Ref: {spp.buktiBayar}</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs text-slate-600 gap-1 rounded-lg">
                        <Download className="h-3.5 w-3.5" />
                        <span>Kuitansi</span>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handlePay(spp.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg px-4 h-9 shadow-xs"
                    >
                      Bayar via BSI Virtual Account
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: UANG SAKU */}
        {activeTab === "saku" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Dompet Digital Santri</h2>
                <p className="text-xs text-slate-500">Monitor penggunaan uang saku harian di lingkungan pesantren.</p>
              </div>
              <Button 
                onClick={() => setShowTopUpModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 rounded-lg gap-1.5"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Top Up Uang Saku</span>
              </Button>
            </div>

            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100">
              <div className="p-3 bg-slate-50 text-xs font-semibold text-slate-600">
                Riwayat Transaksi Terakhir
              </div>
              {uangSaku.riwayat.map((tx) => (
                <div key={tx.id} className="p-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.tipe === "masuk" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {tx.tipe === "masuk" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{tx.ket}</p>
                      <p className="text-[10px] text-slate-400">{tx.tanggal}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${tx.tipe === "masuk" ? "text-emerald-600" : "text-slate-700"}`}>
                    {tx.tipe === "masuk" ? "+" : "-"} Rp {tx.nominal.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PERIZINAN */}
        {activeTab === "perizinan" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Catatan Perizinan & Pulang</h2>
              <p className="text-xs text-slate-500">Riwayat izin meninggalkan area pondok pesantren.</p>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {perizinanList.map((p) => (
                <div key={p.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{p.jenis}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">{p.id}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Masa Izin: <span className="font-medium text-slate-700">{p.tglKeluar} s/d {p.tglKembali}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Penanggung Jawab: {p.disetujuiOleh}</p>
                  </div>
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: KEDISIPLINAN & LAPORAN */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Laporan Kedisiplinan & Kesehatan</h2>
              <p className="text-xs text-slate-500">Catatan dari pengasuhan terkait perkembangan perilaku dan kondisi santri.</p>
            </div>

            <div className="space-y-3">
              {reportsList.map((rep) => (
                <div
                  key={rep.id}
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    rep.isAlert ? "bg-amber-50/50 border-amber-200" : "bg-slate-50/50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{rep.kategori}</span>
                    <span className="text-[11px] text-slate-400">{rep.tanggal}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{rep.deskripsi}</p>
                  <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between gap-1 text-[11px]">
                    <span className="text-slate-500">
                      Tindakan Pengasuh: <strong className="text-slate-800 font-semibold">{rep.tindakan}</strong>
                    </span>
                    <span className="font-semibold text-emerald-700">{rep.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL SIMULASI TOP UP UANG SAKU */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Top Up Saldo Uang Saku</h3>
              <button onClick={() => setShowTopUpModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Pilih nominal top up uang saku harian untuk santri. Saldo akan otomatis dapat digunakan di kantin pesantren.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[50000, 100000, 200000, 500000].map((nom) => (
                <button
                  key={nom}
                  onClick={() => {
                    setUangSaku(prev => ({ ...prev, saldo: prev.saldo + nom }));
                    setShowTopUpModal(false);
                    setPaymentSuccess(`Top Up Rp ${nom.toLocaleString("id-ID")} Berhasil!`);
                    setTimeout(() => setPaymentSuccess(""), 4000);
                  }}
                  className="p-2.5 text-xs font-semibold border border-slate-200 rounded-xl hover:border-emerald-600 hover:bg-emerald-50 text-slate-700 transition-colors"
                >
                  + Rp {nom.toLocaleString("id-ID")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}