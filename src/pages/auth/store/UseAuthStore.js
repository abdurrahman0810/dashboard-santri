import { create } from "zustand";
import { persist } from "zustand/middleware";

// Data Awal Pengguna (MOCK USER)
const INITIAL_USERS = [
  {
    id: 1,
    email: "admintest@gmail.com",
    password: "123",
    name: "Ustadz Abdullah, S.Pd.I",
    role: "admin",
  },
  {
    id: 2,
    email: "user@gmail.com",
    password: "123",
    name: "Bapak Ahmad Subagja",
    role: "user",
    santriId: 101, // Terhubung ke Santri ID 101
  },
];

// Data Awal Santri
const INITIAL_SANTRI = [
  {
    id: 101,
    waliId: 2,
    nis: "202601001",
    nama: "Muhammad Zaidan Al-Farisi",
    kelas: "X - Software Engineering & AI",
    kamar: "Utsman bin Affan - Room 04",
    ustadzPembimbing: "Ustadz Hanif Al-Atsari",
    targetJuz: 30,
    capaianJuz: 12,
    rataNilaiTajwid: 92,
    statusKehadiran: "Hadir Mutlak (100%)",
  },
];

// Data Tagihan & Riwayat SPP (Syahriah)
const INITIAL_SPP = [
  {
    id: "SPP-2026-09",
    santriId: 101,
    bulan: "September 2026",
    nominal: 1500000,
    status: "Belum Bayar",
    tanggalJatuhTempo: "2026-09-10",
    tanggalBayar: null,
    metodeBayar: null,
    buktiBayar: null,
  },
  {
    id: "SPP-2026-08",
    santriId: 101,
    bulan: "Agustus 2026",
    nominal: 1500000,
    status: "Lunas",
    tanggalJatuhTempo: "2026-08-10",
    tanggalBayar: "2026-08-05 09:30",
    metodeBayar: "Bank Syariah Indonesia (BSI)",
    buktiBayar: "TRX-88201920192",
  },
];

// Data Catatan Setoran Tahfidz Harian
const INITIAL_TAHFIDZ = [
  {
    id: 1,
    santriId: 101,
    tanggal: "2026-09-24",
    surah: "Surah Al-Kahf (Ayat 1 - 30)",
    tipe: "Ziyadah (Hafalan Baru)",
    nilaiTajwid: "A (Mumtaz)",
    kelancaran: "Sangat Mutqin",
    penguji: "Ustadz Hanif Al-Atsari",
  },
  {
    id: 2,
    santriId: 101,
    tanggal: "2026-09-23",
    surah: "Surah Al-Baqarah (Juz 2 Sub-1)",
    tipe: "Muraja'ah (Pengulangan)",
    nilaiTajwid: "A- (Jayyid Jiddan)",
    kelancaran: "Lancar dengan 1 koreksi",
    penguji: "Ustadz Hanif Al-Atsari",
  },
];

// Data Catatan Kedisiplinan / Laporan Masalah Santri
const INITIAL_REPORTS = [
  {
    id: 1,
    santriId: 101,
    tanggal: "2026-09-20",
    kategori: "Kesehatan / Izin",
    deskripsi: "Ananda sempat flu ringan dan diistirahatkan di UKS Pesantren selama 1 hari.",
    status: "Selesai / Pulih",
    tindakan: "Diberikan vitamin & obat oleh tim medis pesantren.",
    isAlert: false,
  },
  {
    id: 2,
    santriId: 101,
    tanggal: "2026-09-12",
    kategori: "Kedisiplinan Shalat",
    deskripsi: "Terlambat 3 menit masuk shaf pertama Shalat Subuh berjamaah.",
    status: "Diberikan Ta'dib Educatif",
    tindakan: "Membaca 1 Juz Al-Qur'an sebelum halaqah pagi.",
    isAlert: true,
  },
];

export const UseAuthStore = create(
  persist(
    (set, get) => ({
      users: INITIAL_USERS,
      santriList: INITIAL_SANTRI,
      sppList: INITIAL_SPP,
      tahfidzList: INITIAL_TAHFIDZ,
      reportsList: INITIAL_REPORTS,
      user: null,
      error: null,

      // 1. AUTENTIKASI (LOGIN, LOGOUT, REGISTER)
      login: (email, password) => {
        const currentUsers = get().users;
        const foundUser = currentUsers.find(
          (u) => u.email === email && String(u.password) === String(password)
        );

        if (foundUser) {
          set({
            user: {
              id: foundUser.id,
              email: foundUser.email,
              name: foundUser.name,
              role: foundUser.role,
              santriId: foundUser.santriId || null,
            },
            error: null,
          });
          return true;
        } else {
          set({
            error: "Email atau Password Anda salah. Harap periksa kembali!",
          });
          return false;
        }
      },

      register: ({ name, email, password, role = "user" }) => {
        const currentUsers = get().users;
        const isExist = currentUsers.some((u) => u.email === email);

        if (isExist) {
          set({ error: "Email sudah terdaftar. Silakan gunakan email lain!" });
          return false;
        }

        const newUserId = Date.now();
        const newSantriId = newUserId + 1000;

        const newUser = {
          id: newUserId,
          email,
          password,
          name,
          role,
          santriId: newSantriId,
        };

        const newSantri = {
          id: newSantriId,
          waliId: newUserId,
          nis: `2026${Math.floor(1000 + Math.random() * 9000)}`,
          nama: `Ananda (${name})`,
          kelas: "X - AI & Tahfidz Starter",
          kamar: "Ali bin Abi Thalib - Room 01",
          ustadzPembimbing: "Ustadz Abdullah, S.Pd.I",
          targetJuz: 30,
          capaianJuz: 1,
          rataNilaiTajwid: 85,
          statusKehadiran: "Hadir (100%)",
        };

        const newSppBill = {
          id: `SPP-2026-${Math.floor(100 + Math.random() * 900)}`,
          santriId: newSantriId,
          bulan: "September 2026",
          nominal: 1500000,
          status: "Belum Bayar",
          tanggalJatuhTempo: "2026-09-30",
          tanggalBayar: null,
          metodeBayar: null,
          buktiBayar: null,
        };

        set((state) => ({
          users: [...state.users, newUser],
          santriList: [...state.santriList, newSantri],
          sppList: [...state.sppList, newSppBill],
          error: null,
        }));

        return true;
      },

      logout: () => set({ user: null, error: null }),

      // 2. FUNGSI PEMBAYARAN SPP (SYAHRIAH)
      paySpp: (sppId, metodeBayar) => {
        const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);
        const refNumber = `TRX-${Math.floor(100000000 + Math.random() * 900000000)}`;

        set((state) => ({
          sppList: state.sppList.map((item) =>
            item.id === sppId
              ? {
                  ...item,
                  status: "Lunas",
                  tanggalBayar: timestamp,
                  metodeBayar: metodeBayar,
                  buktiBayar: refNumber,
                }
              : item
          ),
        }));
        return refNumber;
      },

      // 3. FUNGSI INPUT DATA OLEH ADMIN (TAHFIDZ & LAPORAN MASALAH)
      addTahfidzRecord: (record) => {
        set((state) => ({
          tahfidzList: [{ id: Date.now(), ...record }, ...state.tahfidzList],
        }));
      },

      addProblemReport: (report) => {
        set((state) => ({
          reportsList: [{ id: Date.now(), ...report }, ...state.reportsList],
        }));
      },

      // 4. GETTER HELPER
      getSantriData: (santriId) => {
        return get().santriList.find((s) => s.id === santriId) || get().santriList[0];
      },
      getSppBySantri: (santriId) => {
        return get().sppList.filter((s) => s.santriId === santriId);
      },
      getTahfidzBySantri: (santriId) => {
        return get().tahfidzList.filter((t) => t.santriId === santriId);
      },
      getReportsBySantri: (santriId) => {
        return get().reportsList.filter((r) => r.santriId === santriId);
      },
    }),
    { name: "pondok-ai-ikhtiar-store" }
  )
);