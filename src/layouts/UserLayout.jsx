import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  Award,
  Bell,
  LogOut,
  ChevronRight,
  Sparkles,
  QrCode
} from 'lucide-react';

export default function SantriDashboard({ user = { name: 'Ahmad Fauzi', nisn: '20261042' }, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isPresensiDone, setIsPresensiDone] = useState(false);

  // Quick Stats
  const stats = [
    { label: 'Hafalan Qur\'an', val: '12 Juz', sub: 'Surah Al-Kahf', icon: BookOpen },
    { label: 'Kehadiran', val: '98%', sub: 'Bulan Ini', icon: CheckCircle2 },
    { label: 'Poin Pelanggaran', val: '0 Poin', sub: 'Clean Sheet', icon: Award },
    { label: 'Jadwal Berikutnya', val: '12:05', sub: 'Sholat Dzuhur', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 md:pb-6">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-semibold leading-none">{user.name}</h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">NISN: {user.nisn}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto p-4 space-y-5">
        
        {/* Banner Quick Presensi - Mobile Optimized Action */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              <span>Presensi Subuh & Kajian</span>
            </div>
            <h3 className="text-base font-bold text-zinc-100">Status Kehadiran Hari Ini</h3>
            <p className="text-xs text-zinc-400">Scan QR Code saat memasuki area Masjid/Kelas</p>
          </div>

          <button
            onClick={() => setIsPresensiDone(true)}
            disabled={isPresensiDone}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-lg font-medium text-xs flex items-center justify-center gap-2 active:scale-95 transition-all ${
              isPresensiDone 
                ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPresensiDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Sudah Presensi</span>
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4" />
                <span>Tap Untuk Presensi</span>
              </>
            )}
          </button>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[11px] font-medium">{item.label}</span>
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-zinc-100">{item.val}</div>
                  <div className="text-[10px] text-zinc-500">{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Hafalan & Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Tracker Hafalan */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-zinc-100">Target Hafalan Pekan Ini</h4>
              <span className="text-xs text-emerald-400 font-semibold">80% Selesai</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
              <div className="bg-emerald-500 h-full w-[80%] rounded-full" />
            </div>

            <div className="space-y-2 pt-2">
              {[
                { surah: 'Surah Al-Kahf (1-20)', status: 'Setor Mutqin', date: 'Kemarin' },
                { surah: 'Surah Al-Kahf (21-40)', status: 'Muraja\'ah', date: 'Hari Ini' },
                { surah: 'Surah Al-Kahf (41-60)', status: 'Belum Setor', date: 'Besok' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-xs">
                  <div>
                    <div className="font-medium text-zinc-200">{h.surah}</div>
                    <div className="text-[10px] text-zinc-500">{h.date}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                    h.status === 'Setor Mutqin' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : h.status === 'Muraja\'ah'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}>
                    {h.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal Sholat & Kegiatan Mobile Widget */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Jadwal Harian Santri</span>
            </h4>

            <div className="space-y-2 text-xs">
              {[
                { time: '04:15', act: 'Sholat Subuh Berjamaah', active: false },
                { time: '05:30', act: 'Halaqah Tahfizh Pagi', active: false },
                { time: '12:05', act: 'Sholat Dzuhur & Makan Siang', active: true },
                { time: '15:30', act: 'Sholat Ashar & Kajian Kitab', active: false },
              ].map((j, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-3 p-2 rounded-lg border transition-colors ${
                    j.active 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <span className="font-mono font-bold text-[11px]">{j.time}</span>
                  <span className="text-[11px] truncate">{j.act}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (Muncul khusus di Layar HP) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 md:hidden z-40 px-6 py-2">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          {[
            { id: 'home', label: 'Beranda', icon: Home },
            { id: 'hafalan', label: 'Tahfizh', icon: BookOpen },
            { id: 'jadwal', label: 'Jadwal', icon: Calendar },
            { id: 'profil', label: 'Profil', icon: User },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 p-1 transition-all ${
                  isActive ? 'text-emerald-400 scale-105' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}