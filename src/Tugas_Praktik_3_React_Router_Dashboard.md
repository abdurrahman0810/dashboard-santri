# 🧑‍💻 TUGAS PRAKTIK REACT ROUTER
# Mini Project — Dashboard Santri


## 🎯 Goal / Tujuan Tugas

Buat sebuah website sederhana bernama **Dashboard Santri**.

Website ini digunakan untuk menampilkan informasi santri dan menyediakan beberapa halaman yang dapat dikunjungi melalui menu navigasi.

**Inti tugas:** User dapat berpindah halaman melalui menu, melihat daftar santri, lalu membuka detail santri yang dipilih.

---

## 🧭 1. HALAMAN YANG HARUS DIBUAT

Buat halaman:

```text
1. Dashboard
2. Daftar Santri
3. Detail Santri
4. Tentang
5. Not Found / 404
```

---

## 🏠 2. HALAMAN DASHBOARD

### URL

```text
/
```

### Tampilan yang diinginkan

```text
==============================
       DASHBOARD SANTRI
==============================

Selamat datang di Dashboard
Santri.
```

Ketika user membuka `/`, halaman Dashboard harus ditampilkan.

---

## 👨‍🎓 3. HALAMAN DAFTAR SANTRI

### URL

```text
/santri
```

Gunakan data berikut:

```jsx
const santri = [
  {
    id: 1,
    nama: "Ahmad",
    kelas: "XI",
  },
  {
    id: 2,
    nama: "Ali",
    kelas: "X",
  },
  {
    id: 3,
    nama: "Umar",
    kelas: "XII",
  },
];
```

### Tampilan yang diinginkan

```text
Daftar Santri

Ahmad
Kelas XI
[ Detail ]

Ali
Kelas X
[ Detail ]

Umar
Kelas XII
[ Detail ]
```

### Ketentuan

Data santri harus ditampilkan menggunakan **Array, Object, dan `map()`**.

Jangan membuat Component detail yang berbeda untuk setiap santri.

---

## 🔎 4. HALAMAN DETAIL SANTRI

Ketika user menekan tombol **Detail**, user harus dibawa ke halaman detail santri yang sesuai.

Contoh:

```text
Ahmad
[ Detail ]
    ↓
/santri/1
```

Tampilan:

```text
Detail Santri

ID     : 1
Nama   : Ahmad
Kelas  : XI

[ Kembali ]
```

Untuk Ali:

```text
/santri/2
```

Tampilkan:

```text
ID     : 2
Nama   : Ali
Kelas  : X
```

Untuk Umar:

```text
/santri/3
```

Tampilkan:

```text
ID     : 3
Nama   : Umar
Kelas  : XII
```

### 🔑 Aturan Penting

Cukup buat **satu Component Detail Santri**.

Jangan membuat:

```text
DetailAhmad.jsx
DetailAli.jsx
DetailUmar.jsx
```

Satu Component harus dapat menampilkan data berbeda berdasarkan ID pada URL.

Contoh:

```text
/santri/1 → Ahmad
/santri/2 → Ali
/santri/3 → Umar
```

---

## ↩️ 5. TOMBOL KEMBALI

Pada halaman Detail Santri, buat tombol:

```text
[ Kembali ]
```

Ketika diklik, user kembali ke:

```text
/santri
```

Alurnya:

```text
Daftar Santri
     ↓
  klik Detail
     ↓
Detail Santri
     ↓
 klik Kembali
     ↓
Daftar Santri
```

Gunakan cara navigasi React Router yang sudah dipelajari.

---

## ℹ️ 6. HALAMAN TENTANG

### URL

```text
/about
```

Tampilkan:

```text
Tentang Pondok

Website Dashboard Santri
dibuat sebagai latihan
React Router.
```

Isi boleh dikembangkan.

---

## ❌ 7. HALAMAN NOT FOUND / 404

Jika user membuka URL yang tidak tersedia, misalnya:

```text
/abc
```

atau:

```text
/halaman-rahasia
```

tampilkan:

```text
404

Halaman tidak ditemukan.

[ Kembali ke Dashboard ]
```

Tombol tersebut harus membawa user ke:

```text
/
```

---

## 🧭 8. NAVBAR / MENU NAVIGASI

Buat menu navigasi:

```text
Dashboard | Santri | Tentang
```

User harus dapat berpindah halaman melalui menu tersebut.

Contoh:

```text
Dashboard
    ↓
klik Santri
    ↓
/santri
```



---

