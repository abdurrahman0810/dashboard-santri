🧑‍💻 Ujian Praktik React — Mini Dashboard Santri
🎯 Tujuan
Buat sebuah aplikasi React sederhana bernama Dashboard Santri.

Aplikasi harus memiliki:

Informasi nama santri.
Penghitung angka.
Pesan ketika Component pertama kali dijalankan.
Informasi ketika angka berubah.
Judul browser yang mengikuti perubahan angka.
Setiap proses menggunakan useEffect sesuai kebutuhan.

Catatan: Tentukan sendiri cara menggunakan useEffect yang tepat untuk setiap kebutuhan berdasarkan apa yang sudah dipelajari.


1. Tampilan Awal
Ketika aplikasi dibuka, tampilkan:

========================

     DASHBOARD SANTRI

========================

Nama Santri : [ Ahmad ]

Halo, Ahmad

Angka : 0

[ Tambah ]

Status:

Belum ada perubahan angka.


2. Fitur Nama Santri
Buat sebuah input untuk memasukkan nama santri.

Contoh:

Nama Santri : [ Ahmad ]

Gunakan Controlled Component dan useState.

Ketika nama diketik, nama tersebut langsung ditampilkan pada halaman.

Contoh:

Nama Santri : [ Ahmad ]

Halo, Ahmad

Jika nama diganti menjadi Ali, tampilan berubah menjadi:

Nama Santri : [ Ali ]

Halo, Ali


3. Fitur Penghitung Angka
Buat sebuah angka dengan nilai awal:

0

Kemudian buat tombol:

[ Tambah ]

Setiap tombol diklik, angka bertambah 1.

Contoh:

Angka : 0

klik

↓

Angka : 1

klik

↓

Angka : 2

klik

↓

Angka : 3

Gunakan useState.


4. Pesan Ketika Aplikasi Pertama Kali Dibuka
Ketika Component pertama kali dijalankan, tampilkan pesan berikut di Console:

Dashboard Santri berhasil dijalankan

Pesan tersebut tidak perlu ditampilkan pada halaman.


5. Pantau Perubahan Angka
Setiap kali nilai angka berubah, tampilkan pesan di Console.

Contoh:

Jika angka menjadi 1:

Angka sekarang: 1

Jika angka menjadi 2:

Angka sekarang: 2

Jika angka menjadi 3:

Angka sekarang: 3


6. Tampilkan Status Perubahan
Pada halaman, tampilkan:

Status:

Belum ada perubahan angka.

Jika tombol Tambah diklik sehingga angka berubah menjadi 1, ubah menjadi:

Status:

Angka sudah berubah.

Jika angka berubah lagi menjadi 2, status tetap:

Status:

Angka sudah berubah.

Gunakan useState untuk mengatur status tersebut.


7. Judul Browser
Judul tab browser harus mengikuti angka.

Jika:

Angka : 0

maka judul browser:

Angka: 0

Jika angka menjadi 5:

Angka: 5

Jika angka menjadi 10:

Angka: 10

Gunakan document.title untuk mengubah/update nya.


📌 Ketentuan Pengerjaan
Gunakan materi yang sudah dipelajari:

Component
JSX
useState
useEffect
Controlled Component
Event Handling
onClick
onChange
Conditional Rendering jika diperlukan
Jangan menggunakan:
API
React Router
Library tambahan



