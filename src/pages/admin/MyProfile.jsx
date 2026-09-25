import React, { useState } from "react";
import { UseAuthStore } from "@/pages/auth/store/UseAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  ShieldCheck,
  KeyRound,
  CheckCircle,
  Building,
  Sparkles,
  Save,
} from "lucide-react";

export default function MyProfileAdmin() {
  const user = UseAuthStore((state) => state.user);
  
  const [name, setName] = useState(user?.name || "Ustadz Budi");
  const [email, setEmail] = useState(user?.email || "admin@pondokikhtiar.id");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800">Profil Admin & Otoritas Sistem</h1>
        <p className="text-xs text-slate-500 mt-1">
          Pengaturan akun pengasuh, kredensial login, dan otoritas pengelolaan Pondok AI Ikhtiar.
        </p>
      </div>

      {isSaved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-100 p-4 text-xs font-bold text-emerald-800 border border-emerald-200">
          <CheckCircle className="h-4 w-4" />
          <span>Informasi profil admin berhasil diperbarui!</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Identity Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5 text-center">
          <div className="relative mx-auto h-24 w-24">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-900 text-3xl font-black text-white shadow-lg">
              {name[0]?.toUpperCase() || "A"}
            </div>
            <span className="absolute bottom-0 right-0 rounded-full bg-emerald-500 p-1.5 text-white ring-2 ring-white">
              <ShieldCheck className="h-4 w-4" />
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-slate-800 text-base">{name}</h3>
            <p className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit mx-auto mt-1 border border-emerald-200">
              {user?.role === "admin" ? "Super Admin Pesantren" : "Pengasuh Pondok"}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4 text-left space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Building className="h-4 w-4 text-emerald-600" />
              <span>Pondok Pesantren AI Ikhtiar</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="h-4 w-4 text-emerald-600" />
              <span className="truncate">{email}</span>
            </div>
          </div>
        </div>

        {/* Form Settings */}
        <div className="md:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b pb-3">Informasi Personal Admin</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Nama Lengkap & Gelar</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-slate-200 text-xs focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Alamat Email Pengasuh</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-slate-200 text-xs focus:border-emerald-500"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs gap-2 rounded-xl py-5">
                <Save className="h-4 w-4" /> Simpan Perubahan Profil
              </Button>
            </div>
          </form>

          {/* AI License & Security Status */}
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-800">Lisensi & Keamanan Sistem</h3>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Lisensi AI Engine Pondok</p>
                  <p className="text-[11px] text-slate-500">Status: Aktif (Unlimited Santri Analytics)</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}