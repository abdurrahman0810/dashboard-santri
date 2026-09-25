import React from "react";
import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit, ShieldCheck, Compass, ArrowRight } from "lucide-react";

function GuestLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Live Running Banner Pengumuman AI Pondok */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 px-4 py-2 text-center text-xs font-semibold text-emerald-200 border-b border-emerald-800/40 flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-spin" />
        <span>Penerimaan Santri Baru Pondok AI Ikhtiar: Kurikulum Terpadu Tahfidz & Generative AI</span>
        <span className="hidden md:inline rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-400/30">Kuota Terbatas</span>
      </div>

      {/* Floating Glassmorphic Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-emerald-900/40 bg-slate-950/80 px-6 lg:px-12 py-4 backdrop-blur-xl shadow-xl">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
            <BrainCircuit className="h-6 w-6 text-slate-950" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-wider text-white">Pondok <span className="text-emerald-400">AI Ikhtiar</span></span>
            <p className="text-[10px] text-slate-400 font-medium">Islamic & Artificial Intelligence Boarding School</p>
          </div>
        </Link>

        {/* Navbar Menu */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <Link to="/" className="hover:text-emerald-400 transition-colors">Beranda</Link>
          <a href="#kurikulum" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <span>Kurikulum AI & Tahfidz</span>
          </a>
          <a href="#testimony" className="hover:text-emerald-400 transition-colors">Kisah Santri</a>
          <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 gap-2">
            <Link to="/sign-in">
              <span>Masuk Portal</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer Modern Pesantren AI */}
      <footer className="border-t border-emerald-900/40 bg-slate-950 px-6 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Pondok AI Ikhtiar. Mencetak Hafiz Al-Qur'an Berjiwa AI Innovator.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-emerald-400">Privasi</a>
            <a href="#" className="hover:text-emerald-400">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-emerald-400">Kontak Pengasuh</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default GuestLayout; 