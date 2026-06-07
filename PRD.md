
---

# PRODUCT REQUIREMENTS DOCUMENT
## eSPeKa — Sistem Pendukung Keputusan Seleksi Asisten Laboratorium
### Versi 2.0 — Arsitektur Tiga Peran

| | |
|---|---|
| **Metodologi** | TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) |
| **Tech Stack** | Laravel 13 · React.js (Inertia.js) · Tailwind CSS · MySQL |
| **Domain** | Seleksi Asisten Praktikum — Jurusan Informatika, Universitas Jenderal Soedirman |
| **Versi Dokumen** | v2.0 — Juni 2026 |
| **Tim Penyusun** | Empat Sekawan \| Rifky D.R.P. · Wakhid N. · Rajendra R.P. · Yunan F.S. |
| **Dosen Pengampu** | Ir. Nofiyati, S.Kom., M.Kom., IPM |
| **Mata Kuliah** | Sistem Pendukung Keputusan — Kelas A |

**PROGRAM STUDI INFORMATIKA · FAKULTAS TEKNIK**  
**UNIVERSITAS JENDERAL SOEDIRMAN · 2026**

---

## Catatan Revisi v2.0

PRD versi ini menggantikan v1.0 secara keseluruhan. Perubahan utama:

| # | Perubahan | Dampak |
|---|---|---|
| R-01 | Ekspansi model peran dari 2 menjadi **3 peran hierarkis** (Superadmin, Admin, User) | Memengaruhi seluruh modul autentikasi, otorisasi, dan UI |
| R-02 | Penambahan fitur **self-registration** untuk CalonAsPrak | Skema database baru, halaman publik baru |
| R-03 | Penambahan **Manajemen Periode Seleksi** dan **Kendali Publikasi Hasil** | FR-08, FR-09 baru; alur kerja berubah |
| R-04 | Penambahan **Dashboard Analitik Lintas Matkul** untuk Superadmin | FR-10 baru |
| R-05 | Skema database diperbarui (5 tabel baru) | Migration files baru |
| R-06 | **Matriks RBAC** lengkap per aksi × peran | Fondasi implementasi middleware |

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Konteks & Latar Belakang Proyek](#2-konteks--latar-belakang-proyek)
3. [Goals & Objectives](#3-goals--objectives)
4. [User Personas & Hak Akses](#4-user-personas--hak-akses)
5. [Data Domain & Kriteria Penilaian](#5-data-domain--kriteria-penilaian)
6. [Algoritma TOPSIS — Spesifikasi Komputasi](#6-algoritma-topsis--spesifikasi-komputasi)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Arsitektur Sistem & Tech Stack](#9-arsitektur-sistem--tech-stack)
10. [Hasil Pilot Run — Implementasi Excel (2025/2026)](#10-hasil-pilot-run--implementasi-excel-20252026)
11. [Development Phases & Roadmap](#11-development-phases--roadmap)
12. [Konvensi Kode & Struktur Folder](#12-konvensi-kode--struktur-folder)
13. [Strategi Pengujian](#13-strategi-pengujian)
14. [Constraints, Assumptions & Risks](#14-constraints-assumptions--risks)
15. [Referensi](#15-referensi)

---

## 1. Executive Summary

**eSPeKa** (sistem Pendukung Keputusan Asprak) adalah aplikasi berbasis web yang mengotomatiskan dan menstandarisasi proses seleksi calon asisten praktikum di Jurusan Informatika, Fakultas Teknik, Universitas Jenderal Soedirman. Sistem menggantikan proses rekapitulasi manual yang rentan inkonsistensi dengan komputasi sistematis berbasis algoritma TOPSIS.

Versi 2.0 memperkenalkan arsitektur **tiga peran hierarkis** yang mencerminkan struktur organisasi nyata proses seleksi:

- **Dosen/KepalaLab (Superadmin)** — otoritas tertinggi sistem; mengelola periode, kriteria global, akun admin, dan publikasi hasil.
- **KoorAsPrak (Admin)** — koordinator per mata kuliah; menginput nilai dan memantau hasil kalkulasi untuk matkul yang ditugaskan.
- **CalonAsPrak (User)** — kandidat yang mendaftar mandiri dan memantau status seleksi dirinya sendiri.

Sistem dibangun di atas empat pilar: **(1) Objektivitas** — keputusan berbasis matematis terstandarisasi; **(2) Efisiensi** — kalkulasi multi-kriteria dalam hitungan detik; **(3) Transparansi** — seluruh jejak perhitungan dapat diverifikasi; **(4) Keadilan Akses** — setiap peran hanya melihat dan memodifikasi data sesuai wewenangnya.

| Metrik | Nilai |
|---|---|
| Kandidat diproses (pilot run) | 26 |
| Mata Kuliah | 4 (Struktur Data, Basis Data, Sistem Operasi, Pemrograman Web I) |
| Kriteria Penilaian | 6 (1 Cost, 5 Benefit) |
| Asprak Terpilih (rekomendasi) | 12 (top 3 per matkul) |
| Peran Pengguna | 3 hierarkis |

---

## 2. Konteks & Latar Belakang Proyek

### 2.1 Permasalahan yang Diselesaikan

Proses seleksi asisten praktikum di Jurusan Informatika selama ini dilakukan secara manual. Koordinator asisten menilai kandidat berdasarkan wawancara, simulasi mengajar (micro teaching), dan rekam jejak akademik. Tanpa sistem terstandarisasi, beberapa masalah berulang:

- **Inkonsistensi penilaian** antarpenilai akibat tidak adanya rumus kalkulasi terpusat.
- **Proses rekapitulasi** nilai dari berbagai sumber memakan waktu 2–3 hari kerja.
- **Sulit memverifikasi** keputusan akhir karena tidak ada jejak audit perhitungan.
- **Potensi bias subjektif** saat kandidat dikenal secara personal oleh penilai.
- **Tidak ada mekanisme perbandingan** lintas mata kuliah yang adil dan seragam.
- **Kandidat tidak memiliki visibilitas** terhadap status pendaftaran dan hasil seleksinya.
- **Kepala Lab tidak memiliki pandangan terpadu** atas seluruh proses seleksi lintas matkul.

### 2.2 Solusi yang Diusulkan

eSPeKa v2.0 mengimplementasikan metode TOPSIS sebagai mesin kalkulasi inti, dilengkapi dengan arsitektur multi-peran yang mencerminkan hierarki organisasi nyata:

- **TOPSIS** dipilih karena mampu menangani pengambilan keputusan multi-kriteria dengan bobot berbeda secara matematis, prinsipnya intuitif, mendukung kriteria Benefit dan Cost, dan hasil dapat diverifikasi secara penuh.
- **Hierarki tiga peran** memastikan bahwa setiap aktor dalam proses seleksi — Dosen/KepalaLab, KoorAsPrak, dan CalonAsPrak — memiliki antarmuka yang sesuai dengan peran dan tanggung jawabnya.
- **Self-registration CalonAsPrak** menghilangkan beban pendataan kandidat dari koordinator.
- **Kendali publikasi** oleh Superadmin memastikan hasil tidak bocor sebelum pengumuman resmi.

---

## 3. Goals & Objectives

| # | Tujuan | Deskripsi | Indikator Keberhasilan |
|---|---|---|---|
| G-01 | **Objektivitas** | Menghilangkan bias subjektif dalam seleksi melalui perhitungan matematis yang terstandarisasi dan dapat diaudit. | Seluruh keputusan rekomendasi dapat ditelusuri ke rumus TOPSIS; tidak ada override manual tanpa justifikasi tercatat. |
| G-02 | **Efisiensi** | Mereduksi waktu rekapitulasi nilai dari 2–3 hari menjadi di bawah 5 menit melalui otomatisasi kalkulasi. | Waktu dari input data terakhir hingga ranking final < 5 menit; sistem dapat memproses ≥ 50 kandidat tanpa degradasi performa. |
| G-03 | **Transparansi** | Menyediakan jejak audit lengkap dari matriks keputusan awal hingga skor preferensi akhir. | Setiap hasil ranking dilengkapi breakdown D+, D−, dan skor preferensi; laporan dapat diekspor dalam format PDF/Excel. |
| G-04 | **Skalabilitas** | Mendukung penambahan mata kuliah baru, kriteria baru, dan kandidat baru tanpa memerlukan perubahan kode. | Superadmin dapat menambah matkul/kriteria dari UI; sistem tetap berjalan benar setelah penambahan. |
| G-05 | **Aksesibilitas** | Memastikan sistem dapat diakses dari perangkat desktop maupun mobile. | Tampilan responsif di layar ≥ 320px; UI dapat dioperasikan tanpa pelatihan teknis lebih dari 30 menit. |
| G-06 | **Keadilan Akses** | Memastikan setiap peran hanya dapat melihat dan memodifikasi data sesuai wewenangnya. | Admin hanya melihat data matkul yang ditugaskan; CalonAsPrak hanya melihat data miliknya sendiri; tidak ada kebocoran data lintas peran. |

---

## 4. User Personas & Hak Akses

### 4.1 Gambaran Umum Hierarki Peran

```
┌─────────────────────────────────────────────┐
│        DOSEN / KEPALA LAB (Superadmin)       │
│  • Governance sistem penuh                   │
│  • Manajemen periode & publikasi             │
│  • Manajemen akun KoorAsPrak                 │
│  • Konfigurasi kriteria global               │
│  • Analytics lintas matkul                   │
└───────────────────┬─────────────────────────┘
                    │ membawahi
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌────────▼───────┐
│  KoorAsPrak    │    │  KoorAsPrak    │  (satu per matkul / dapat lebih)
│  (Admin)       │    │  (Admin)       │
│  • CRUD kandidat│   │  • CRUD kandidat│
│  • Input nilai  │   │  • Input nilai  │
│  • Lihat hasil  │   │  • Lihat hasil  │
└────────────────┘    └────────────────┘
        │
        │ berinteraksi dengan
┌───────▼────────────────┐
│     CalonAsPrak (User) │
│  • Self-registration   │
│  • Pilih matkul        │
│  • Lihat status diri   │
└────────────────────────┘
```

---

### 4.2 Persona 1: Dosen / Kepala Lab (Superadmin)

**Deskripsi:** Dosen pengampu atau kepala laboratorium yang memiliki otoritas penuh atas seluruh sistem seleksi asprak. Bertanggung jawab atas keadilan dan integritas proses seleksi.

**Kebutuhan Utama:**
- Membuka dan menutup periode seleksi dengan tanggal yang dapat dikonfigurasi.
- Mengelola akun KoorAsPrak (buat, edit, nonaktifkan).
- Mengatur kriteria dan bobot penilaian global yang berlaku untuk semua matkul.
- Memantau progres seleksi di semua mata kuliah dalam satu dashboard terpadu.
- Mengunci hasil kalkulasi setelah periode selesai agar tidak dapat diubah.
- Mempublikasikan hasil (mengubah visibilitas ke CalonAsPrak).
- Mengekspor laporan konsolidasi lintas matkul.
- Mengakses log aktivitas seluruh pengguna.

**Hak Akses:**

| Fitur | Aksi yang Diizinkan |
|---|---|
| Manajemen Periode | Create, Read, Update, Delete, Lock, Unlock, Publish |
| Manajemen Akun | Create/Edit/Disable KoorAsPrak dan CalonAsPrak |
| Kriteria & Bobot | Create, Read, Update, Delete (global) |
| Mata Kuliah | Create, Read, Update, Delete (semua) |
| Kandidat & Nilai | Read semua; tidak input nilai langsung |
| Hasil TOPSIS | Read semua matkul; Export konsolidasi |
| Log Aktivitas | Read semua |
| Pengaturan Visibilitas | Toggle visibilitas skor ke CalonAsPrak |

---

### 4.3 Persona 2: KoorAsPrak / Koordinator Asisten Praktikum (Admin)

**Deskripsi:** Mahasiswa senior atau staf yang ditunjuk sebagai koordinator asisten untuk satu atau beberapa mata kuliah praktikum tertentu. Akun dibuat oleh Superadmin dan akses dibatasi pada matkul yang ditugaskan.

**Kebutuhan Utama:**
- Mengelola daftar kandidat yang mendaftar ke mata kuliahnya.
- Menginput dan memperbarui nilai setiap kandidat per kriteria.
- Memperoleh hasil perankingan real-time beserta detail perhitungan TOPSIS.
- Mengekspor laporan hasil untuk matkul yang ditangani.

**Hak Akses:**

| Fitur | Aksi yang Diizinkan |
|---|---|
| Mata Kuliah | Read (hanya yang ditugaskan) |
| Kandidat | Create, Read, Update, Delete (hanya di matkul yang ditugaskan) |
| Input Nilai | Create, Read, Update (hanya di matkul yang ditugaskan) |
| Kriteria & Bobot | Read only (tidak dapat mengubah) |
| Hasil TOPSIS | Read + Export PDF/Excel (hanya matkul yang ditugaskan) |
| Akun Pengguna | Tidak ada akses |
| Log Aktivitas | Read aktivitas diri sendiri saja |

---

### 4.4 Persona 3: CalonAsPrak / Calon Asisten Praktikum (User)

**Deskripsi:** Mahasiswa Jurusan Informatika yang ingin mendaftar sebagai asisten praktikum. Mendaftar secara mandiri melalui halaman publik dan memantau status seleksinya setelah pengumuman resmi.

**Kebutuhan Utama:**
- Mendaftar akun menggunakan NIM dan email kampus.
- Memilih mata kuliah praktikum yang ingin diikuti seleksinya.
- Melihat status pendaftaran (Menunggu / Diterima / Tidak Diterima) setelah Superadmin mempublikasikan hasil.
- Melihat skor TOPSIS dirinya sendiri (jika Superadmin mengaktifkan visibilitas).

**Hak Akses:**

| Fitur | Aksi yang Diizinkan |
|---|---|
| Registrasi | Create akun diri sendiri |
| Profil | Read & Update data diri sendiri |
| Pilih Matkul | Create (daftar ke matkul selama periode terbuka) |
| Status Pendaftaran | Read status diri sendiri (hanya setelah dipublikasikan) |
| Skor TOPSIS | Read skor diri sendiri (jika Superadmin mengaktifkan visibilitas) |
| Data Kandidat Lain | Tidak ada akses sama sekali |

---

### 4.5 Matriks RBAC Lengkap

Tabel berikut merangkum seluruh izin sistem per aksi × peran. Simbol: **✅ Diizinkan** · **🚫 Ditolak** · **⚠️ Terbatas**

| Aksi | Superadmin | KoorAsPrak (Admin) | CalonAsPrak (User) |
|---|:---:|:---:|:---:|
| **Periode Seleksi** | | | |
| Buat/Edit/Hapus Periode | ✅ | 🚫 | 🚫 |
| Kunci/Buka Periode | ✅ | 🚫 | 🚫 |
| Publikasikan Hasil | ✅ | 🚫 | 🚫 |
| **Manajemen Akun** | | | |
| Buat akun KoorAsPrak | ✅ | 🚫 | 🚫 |
| Edit/Nonaktifkan KoorAsPrak | ✅ | 🚫 | 🚫 |
| Lihat daftar semua pengguna | ✅ | 🚫 | 🚫 |
| Registrasi akun sendiri | ✅ (sistem) | ✅ (dibuat oleh SA) | ✅ |
| Edit profil diri sendiri | ✅ | ✅ | ✅ |
| **Kriteria & Bobot** | | | |
| Buat/Edit/Hapus Kriteria | ✅ | 🚫 | 🚫 |
| Lihat Kriteria | ✅ | ✅ | 🚫 |
| **Mata Kuliah** | | | |
| Buat/Edit/Hapus Matkul | ✅ | 🚫 | 🚫 |
| Lihat Semua Matkul | ✅ | ⚠️ (hanya ditugaskan) | ⚠️ (hanya yang terbuka) |
| **Kandidat & Nilai** | | | |
| Tambah/Edit/Hapus Kandidat | ✅ | ⚠️ (hanya matkul sendiri) | 🚫 |
| Input/Edit Nilai | ✅ | ⚠️ (hanya matkul sendiri) | 🚫 |
| Daftar Matkul (apply) | 🚫 | 🚫 | ✅ (periode terbuka) |
| **Hasil TOPSIS** | | | |
| Lihat Ranking Semua Matkul | ✅ | 🚫 | 🚫 |
| Lihat Ranking Matkul Sendiri | N/A | ✅ | 🚫 |
| Lihat Audit Trail | ✅ | ⚠️ (matkul sendiri) | 🚫 |
| Lihat Skor Diri Sendiri | N/A | N/A | ⚠️ (jika dipublikasikan & diaktifkan) |
| Export PDF/Excel per Matkul | ✅ | ✅ (matkul sendiri) | 🚫 |
| Export Laporan Konsolidasi | ✅ | 🚫 | 🚫 |
| **Log Aktivitas** | | | |
| Lihat Log Semua Pengguna | ✅ | 🚫 | 🚫 |
| Lihat Log Diri Sendiri | ✅ | ✅ | ✅ |

---

## 5. Data Domain & Kriteria Penilaian

### 5.1 Kriteria dan Bobot Baku

Kriteria berikut ditetapkan berdasarkan hasil wawancara terstruktur dengan koordinator asisten praktikum pada 17 Mei 2026 (Daiva Paundra Gevano — Struktur Data; Irfan Widodo — Basis Data) dan disepakati sebagai standar seragam untuk seluruh mata kuliah.

> **Catatan v2.0:** Kriteria dan bobot kini hanya dapat diubah oleh **Superadmin**. KoorAsPrak dan CalonAsPrak tidak dapat memodifikasi konfigurasi ini.

| Kode | Bobot | Nama Kriteria | Tipe | Skala | Justifikasi |
|---|---|---|---|---|---|
| C1 | 30% | Public Speaking | Benefit | 0–100 | Asisten harus mampu menyampaikan materi modul secara jelas, persuasif, dan adaptif kepada praktikan. |
| C2 | 30% | Penguasaan & Pemahaman Materi | Benefit | 0–100 | Prasyarat mutlak untuk membimbing dan menjawab pertanyaan teknis praktikan secara tepat dan mendalam. |
| C3 | 10% | Nilai Mata Kuliah Terkait | Benefit | 0–100 | Indikator rekam jejak akademis objektif; nilai minimal B sebagai ambang batas kelayakan. |
| C4 | 10% | Micro Teaching | Benefit | 0–100 | Simulasi mengajar untuk menilai kompetensi pedagogik, sistematika penyampaian, dan manajemen kelas. |
| C5 | 15% | Latihan Soal | Benefit | 0–100 | Mengukur kemampuan analytical thinking dan problem-solving kandidat secara terstruktur. |
| C6 | 5% | Keaktifan Mahasiswa | Cost | 0–100 | Beban kegiatan luar kampus; semakin tinggi, semakin besar potensi kendala manajemen waktu asisten. |

**Aturan Validasi:** Total bobot semua kriteria aktif HARUS tepat 1.00 (100%), toleransi ±0.001. Sistem akan menolak penyimpanan jika validasi ini gagal.

---

### 5.2 Data Alternatif — Pilot Run Asprak Genap 2025/2026

Berikut adalah data 26 kandidat yang telah diproses pada pilot run menggunakan implementasi Excel. Data ini berfungsi sebagai *ground truth* untuk validasi implementasi web application.

| No | Kode | Nama Kandidat | C1 | C2 | C3 | C4 | C5 | C6 | Matkul |
|---|---|---|---|---|---|---|---|---|---|
| 1 | A1 | Haniel Wijanarko | 82 | 85 | 80 | 78 | 83 | 60 | Struktur Data |
| 2 | A2 | Farhan | 75 | 80 | 85 | 72 | 77 | 45 | Struktur Data |
| 3 | A3 | Faqih Ardiansyah | 88 | 90 | 90 | 85 | 88 | 70 | Struktur Data |
| 4 | A4 | Pancar | 70 | 72 | 75 | 68 | 71 | 35 | Struktur Data |
| 5 | A5 | Satria | 78 | 82 | 80 | 76 | 79 | 55 | Struktur Data |
| 6 | A6 | Aufa Salsabila | 83 | 79 | 85 | 80 | 81 | 50 | Struktur Data |
| 7 | A7 | Raihan Dwi Ananda H. | 80 | 85 | 88 | 82 | 84 | 65 | Struktur Data |
| 8 | B1 | Ferdi Waskito | 77 | 80 | 78 | 74 | 76 | 40 | Basis Data |
| 9 | B2 | Aufa Salsabila | 83 | 81 | 85 | 80 | 80 | 50 | Basis Data |
| 10 | B3 | Ali Muhammad Firdaus | 72 | 75 | 70 | 70 | 73 | 55 | Basis Data |
| 11 | B4 | Latifa | 79 | 83 | 82 | 77 | 80 | 45 | Basis Data |
| 12 | B5 | Fikry Mumtaz | 85 | 87 | 88 | 83 | 86 | 60 | Basis Data |
| 13 | B6 | Talitha | 74 | 76 | 77 | 72 | 75 | 38 | Basis Data |
| 14 | C1 | Ferdi Waskito | 77 | 80 | 78 | 74 | 76 | 40 | Sistem Operasi |
| 15 | C2 | Fahmi Arif Setiawan | 80 | 83 | 82 | 79 | 81 | 58 | Sistem Operasi |
| 16 | C3 | Izaz Falih | 76 | 78 | 80 | 73 | 77 | 42 | Sistem Operasi |
| 17 | C4 | Salma F | 84 | 86 | 85 | 82 | 83 | 55 | Sistem Operasi |
| 18 | C5 | Biladi | 79 | 82 | 80 | 77 | 80 | 48 | Sistem Operasi |
| 19 | C6 | Nafisah | 73 | 75 | 72 | 71 | 74 | 36 | Sistem Operasi |
| 20 | C7 | Fahri | 81 | 84 | 83 | 79 | 82 | 52 | Sistem Operasi |
| 21 | D1 | Haniel Wijanarko | 82 | 85 | 80 | 78 | 83 | 60 | Progweb I |
| 22 | D2 | Yoga Adi | 78 | 80 | 82 | 76 | 79 | 44 | Progweb I |
| 23 | D3 | Tsaqif Hasbi A.S. | 85 | 88 | 86 | 83 | 86 | 62 | Progweb I |
| 24 | D4 | Gilang Happy D. | 80 | 82 | 84 | 78 | 81 | 50 | Progweb I |
| 25 | D5 | Athaya Raihan | 77 | 79 | 78 | 75 | 78 | 42 | Progweb I |
| 26 | D6 | M. Umar Faiz | 76 | 78 | 80 | 74 | 77 | 40 | Progweb I |

---

## 6. Algoritma TOPSIS — Spesifikasi Komputasi

Mesin kalkulasi TOPSIS diimplementasikan sebagai Service Class terpisah (`TopsisService.php`) agar Controller tetap bersih dan logika matematis dapat diuji secara independen via PHPUnit.

| Step | Nama Langkah | Formula | Keterangan Implementasi |
|---|---|---|---|
| 1 | Matriks Keputusan | X = [xij] (i = alternatif, j = kriteria) | Tabel nilai mentah dari database kandidat. Setiap baris = satu kandidat, setiap kolom = satu kriteria. |
| 2 | Normalisasi Matriks | rij = xij / √(Σ xij²) per kolom j | Normalisasi Euclidean. Setiap nilai dibagi akar dari jumlah kuadrat seluruh nilai pada kolom yang sama. |
| 3 | Pembobotan | vij = wj × rij | Nilai normalisasi dikali bobot kriteria. Total bobot Σ(wj) = 1. Menghasilkan matriks normalisasi terbobot. |
| 4 | Solusi Ideal Positif | A+ = max(vij) jika Benefit; min(vij) jika Cost | Untuk setiap kriteria: ambil nilai terbaik — tertinggi untuk Benefit, terendah untuk Cost. |
| 5 | Solusi Ideal Negatif | A− = min(vij) jika Benefit; max(vij) jika Cost | Untuk setiap kriteria: ambil nilai terburuk — terendah untuk Benefit, tertinggi untuk Cost. |
| 6 | Jarak ke A+ | Di+ = √( Σ (vij − Aj+)² ) | Jarak Euclidean dari setiap alternatif ke solusi ideal positif. Semakin kecil = semakin baik. |
| 7 | Jarak ke A− | Di− = √( Σ (vij − Aj−)² ) | Jarak Euclidean dari setiap alternatif ke solusi ideal negatif. Semakin besar = semakin baik. |
| 8 | Nilai Preferensi | Vi = Di− / (Di+ + Di−) | Skor akhir TOPSIS. Nilai antara 0 dan 1. Semakin tinggi = kandidat semakin unggul secara keseluruhan. |
| 9 | Perankingan | Urutkan Vi secara menurun | Top 3 kandidat per mata kuliah mendapat status DITERIMA secara default (jumlah dapat dikonfigurasi oleh Superadmin). |

**Edge Cases yang Harus Ditangani:**
- Nilai nol pada semua kandidat untuk suatu kriteria (normalisasi = 0, bukan NaN).
- Kandidat tunggal per matkul (Vi selalu 1.0; rekomendasikan sebagai DITERIMA).
- Bobot nol pada suatu kriteria (kolom diabaikan dalam kalkulasi).

---

## 7. Functional Requirements

### 7.1 FR-01: Manajemen Mata Kuliah
*Aktor: Superadmin*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-01.1 | Superadmin dapat membuat mata kuliah baru dengan mengisi kode, nama, deskripsi, dan menugaskan satu atau lebih KoorAsPrak. | Must Have |
| FR-01.2 | Superadmin dapat mengubah data mata kuliah yang sudah ada, termasuk mengganti KoorAsPrak yang ditugaskan. | Must Have |
| FR-01.3 | Superadmin dapat menghapus mata kuliah yang belum memiliki data kandidat terkait. | Must Have |
| FR-01.4 | Sistem menampilkan daftar semua mata kuliah beserta jumlah kandidat terdaftar, status kalkulasi, dan KoorAsPrak yang ditugaskan. | Must Have |
| FR-01.5 | Superadmin dapat mengaktifkan/menonaktifkan mata kuliah untuk periode seleksi tertentu (soft delete). | Should Have |

---

### 7.2 FR-02: Manajemen Kriteria & Bobot
*Aktor: Superadmin*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-02.1 | Superadmin dapat menambah kriteria baru dengan atribut: kode, nama, bobot (0–1), tipe (Benefit/Cost), dan deskripsi. | Must Have |
| FR-02.2 | Superadmin dapat mengubah bobot dan tipe kriteria yang sudah ada. | Must Have |
| FR-02.3 | Sistem memvalidasi secara real-time bahwa total bobot semua kriteria aktif = 1.00 (toleransi ±0.001). | Must Have |
| FR-02.4 | Sistem menampilkan pesan error informatif dan sisa bobot yang tersedia jika total bobot tidak valid. | Must Have |
| FR-02.5 | Superadmin dapat menonaktifkan kriteria tanpa menghapusnya (soft delete) untuk menjaga historis data. | Should Have |
| FR-02.6 | Sistem menyediakan preset kriteria default (C1–C6 sesuai hasil wawancara) sebagai nilai awal instalasi. | Should Have |
| FR-02.7 | KoorAsPrak dan CalonAsPrak hanya dapat melihat (read-only) konfigurasi kriteria aktif; tidak dapat mengubah. | Must Have |

---

### 7.3 FR-03: Manajemen Kandidat & Input Nilai
*Aktor: KoorAsPrak (dalam batas matkul yang ditugaskan), Superadmin (semua matkul)*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-03.1 | KoorAsPrak dapat menambah kandidat secara manual dengan data: Nama Lengkap dan NIM, lalu mengaitkannya ke matkul yang ditugaskan. | Must Have |
| FR-03.2 | Sistem secara otomatis mengaitkan akun CalonAsPrak yang telah mendaftar (FR-07) dengan matkul yang dipilih; KoorAsPrak dapat menyetujui atau menolak pendaftaran tersebut. | Must Have |
| FR-03.3 | KoorAsPrak dapat menginput nilai per kriteria (skala 0–100) untuk setiap kandidat di matkul yang ditugaskan. | Must Have |
| FR-03.4 | Sistem memvalidasi bahwa nilai yang diinput berada dalam rentang 0–100 (bilangan desimal diizinkan). | Must Have |
| FR-03.5 | KoorAsPrak dapat mengubah nilai kandidat yang sudah diinput; perubahan otomatis memicu kalkulasi ulang TOPSIS. | Must Have |
| FR-03.6 | KoorAsPrak dapat menghapus kandidat dari matkul beserta seluruh nilainya (hanya jika hasil belum dikunci oleh Superadmin). | Must Have |
| FR-03.7 | Sistem mendukung impor massal data kandidat dan nilai melalui file Excel/CSV dengan format template yang disediakan. | Should Have |
| FR-03.8 | Sistem menampilkan indikator kelengkapan pengisian nilai (progress bar) per mata kuliah. | Nice to Have |

---

### 7.4 FR-04: Mesin Kalkulasi TOPSIS
*Aktor: Sistem (otomatis), dapat dipicu oleh KoorAsPrak atau Superadmin*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-04.1 | Sistem menjalankan kalkulasi TOPSIS 9 langkah secara otomatis setiap kali data kandidat atau bobot kriteria berubah. | Must Have |
| FR-04.2 | Kalkulasi dilakukan secara terpisah untuk setiap mata kuliah (tidak lintas matkul). | Must Have |
| FR-04.3 | Sistem menyimpan hasil antara (normalisasi, pembobotan, A+, A−, D+, D−) untuk keperluan tampilan audit trail. | Must Have |
| FR-04.4 | Sistem secara default merekomendasikan Top 3 kandidat per mata kuliah sebagai "DITERIMA". | Must Have |
| FR-04.5 | Jumlah kandidat yang direkomendasikan (kuota) dapat dikonfigurasi oleh Superadmin per mata kuliah. | Should Have |
| FR-04.6 | Sistem menangani edge case: nilai nol pada semua kandidat untuk suatu kriteria, kandidat tunggal, bobot nol. | Must Have |
| FR-04.7 | Setelah Superadmin mengunci periode, kalkulasi ulang diblokir dan hasil disimpan permanen sebagai snapshot. | Must Have |

---

### 7.5 FR-05: Dashboard Hasil & Perankingan
*Aktor: Superadmin (semua matkul), KoorAsPrak (matkul yang ditugaskan)*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-05.1 | Sistem menampilkan tabel perankingan kandidat secara real-time, diurutkan berdasarkan skor preferensi (Vi) tertinggi ke terendah, per mata kuliah. | Must Have |
| FR-05.2 | Tabel hasil menampilkan: Nomor urut, Nama, NIM, D+, D−, Skor Preferensi (Vi), Ranking, dan Status Rekomendasi. | Must Have |
| FR-05.3 | Kandidat dengan status DITERIMA ditandai dengan indikator visual yang jelas (ikon centang, warna hijau). | Must Have |
| FR-05.4 | Admin/Superadmin dapat membuka detail perhitungan per kandidat yang mencakup seluruh matriks TOPSIS (audit trail). | Must Have |
| FR-05.5 | Sistem menyediakan fitur ekspor hasil ke format PDF dengan layout laporan yang rapi dan berlogo kampus. | Should Have |
| FR-05.6 | Sistem menyediakan fitur ekspor hasil ke format Excel (.xlsx) dengan semua tahap perhitungan (8 sheet: matriks awal, normalisasi, pembobotan, A+/A−, D+, D−, Vi, ranking). | Should Have |
| FR-05.7 | Superadmin memiliki tampilan Rekap Ranking yang merangkum seluruh mata kuliah dalam satu halaman konsolidasi. | Should Have |

---

### 7.6 FR-06: Autentikasi & Manajemen Pengguna
*Aktor: Superadmin (manajemen), semua peran (login/logout)*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-06.1 | Sistem mengimplementasikan autentikasi berbasis sesi (login/logout) dengan validasi email dan password. | Must Have |
| FR-06.2 | Middleware RBAC memastikan setiap route hanya dapat diakses oleh peran yang berwenang. | Must Have |
| FR-06.3 | Superadmin dapat membuat, mengedit, dan menonaktifkan akun KoorAsPrak beserta penugasan matkulnya. | Must Have |
| FR-06.4 | Superadmin dapat melihat daftar seluruh pengguna aktif dan riwayat login terakhir. | Should Have |
| FR-06.5 | Sistem menyediakan log aktivitas (activity log) untuk setiap perubahan data oleh semua pengguna. | Nice to Have |
| FR-06.6 | Sistem memblokir akses pengguna yang akunnya dinonaktifkan oleh Superadmin secara real-time. | Must Have |

---

### 7.7 FR-07: Self-Registration & Profil CalonAsPrak *(Baru di v2.0)*
*Aktor: CalonAsPrak*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-07.1 | CalonAsPrak dapat mendaftar akun secara mandiri melalui halaman publik dengan mengisi: NIM, nama lengkap, email, dan password. | Must Have |
| FR-07.2 | Sistem memvalidasi keunikan NIM dan email; menolak pendaftaran duplikat dengan pesan error informatif. | Must Have |
| FR-07.3 | CalonAsPrak yang berhasil registrasi mendapat status akun "pending" hingga diverifikasi oleh Superadmin atau KoorAsPrak. | Should Have |
| FR-07.4 | CalonAsPrak dapat memilih mata kuliah yang ingin diikuti seleksinya (hanya ketika periode seleksi sedang terbuka). | Must Have |
| FR-07.5 | CalonAsPrak dapat membatalkan pendaftaran matkul selama periode belum ditutup. | Should Have |
| FR-07.6 | CalonAsPrak dapat memperbarui data profil diri sendiri (nama, email, password). | Must Have |

---

### 7.8 FR-08: Manajemen Periode Seleksi *(Baru di v2.0)*
*Aktor: Superadmin*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-08.1 | Superadmin dapat membuat periode seleksi dengan atribut: nama periode, tanggal mulai, tanggal selesai, dan deskripsi. | Must Have |
| FR-08.2 | Sistem secara otomatis membuka periode (mengizinkan pendaftaran CalonAsPrak) pada tanggal mulai dan menutupnya pada tanggal selesai. | Must Have |
| FR-08.3 | Superadmin dapat menutup periode secara manual sebelum tanggal selesai jika diperlukan. | Should Have |
| FR-08.4 | Sistem hanya mengizinkan satu periode aktif pada satu waktu. | Must Have |
| FR-08.5 | Superadmin dapat mengunci periode yang sudah selesai; setelah dikunci, tidak ada data yang dapat diubah. | Must Have |
| FR-08.6 | Sistem menampilkan countdown waktu tersisa menuju penutupan periode di dashboard admin. | Nice to Have |

---

### 7.9 FR-09: Kendali Publikasi Hasil *(Baru di v2.0)*
*Aktor: Superadmin*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-09.1 | Superadmin dapat mempublikasikan hasil seleksi per matkul atau sekaligus semua matkul dalam satu tindakan. | Must Have |
| FR-09.2 | Sebelum dipublikasikan, CalonAsPrak tidak dapat melihat status apapun (layar "Menunggu Pengumuman"). | Must Have |
| FR-09.3 | Setelah dipublikasikan, CalonAsPrak dapat melihat status rekomendasinya (DITERIMA / TIDAK DITERIMA). | Must Have |
| FR-09.4 | Superadmin dapat mengaktifkan/menonaktifkan visibilitas skor TOPSIS detail (D+, D−, Vi) ke CalonAsPrak secara terpisah dari status rekomendasi. | Should Have |
| FR-09.5 | Superadmin dapat membatalkan publikasi (unpublish) jika terdapat kesalahan, selama periode belum dikunci. | Should Have |

---

### 7.10 FR-10: Dashboard Analitik Lintas Matkul *(Baru di v2.0)*
*Aktor: Superadmin*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-10.1 | Superadmin memiliki dashboard utama yang menampilkan ringkasan semua matkul: jumlah kandidat, status kalkulasi, dan kuota terisi. | Must Have |
| FR-10.2 | Dashboard menampilkan grafik perbandingan distribusi skor preferensi (Vi) antar matkul dalam satu visualisasi. | Should Have |
| FR-10.3 | Dashboard menampilkan daftar kandidat yang lolos seleksi (DITERIMA) dari semua matkul dalam satu tabel rekap. | Should Have |
| FR-10.4 | Dashboard menampilkan statistik proses: total pendaftar, total diterima, persentase kuota terisi per matkul. | Should Have |
| FR-10.5 | Superadmin dapat mengekspor laporan rekap lintas matkul ke format PDF dan Excel. | Should Have |

---

### 7.11 FR-11: Manajemen Akun & Penugasan *(Baru di v2.0)*
*Aktor: Superadmin*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-11.1 | Superadmin dapat membuat akun KoorAsPrak dengan data: nama, email, password sementara, dan langsung menugaskan ke satu atau lebih matkul. | Must Have |
| FR-11.2 | Superadmin dapat mengubah penugasan matkul untuk KoorAsPrak yang sudah ada. | Must Have |
| FR-11.3 | Superadmin dapat menonaktifkan akun KoorAsPrak; akun yang dinonaktifkan tidak dapat login. | Must Have |
| FR-11.4 | Superadmin dapat memverifikasi akun CalonAsPrak yang berstatus "pending" (jika FR-07.3 diaktifkan). | Should Have |
| FR-11.5 | Sistem mengirimkan email notifikasi kepada KoorAsPrak yang baru dibuat, berisi kredensial login sementara. | Nice to Have |

---

### 7.12 FR-12: Sistem Notifikasi *(Baru di v2.0)*
*Aktor: Semua peran (menerima), Superadmin (memicu publikasi)*

| ID | Deskripsi Requirement | Prioritas |
|---|---|---|
| FR-12.1 | CalonAsPrak menerima notifikasi in-app ketika hasil seleksi matkul yang diikutinya dipublikasikan. | Should Have |
| FR-12.2 | KoorAsPrak menerima notifikasi in-app ketika CalonAsPrak baru mendaftar ke matkulnya. | Should Have |
| FR-12.3 | Superadmin menerima notifikasi in-app ketika semua nilai untuk suatu matkul telah diisi (siap kalkulasi final). | Nice to Have |
| FR-12.4 | Sistem mendukung pengiriman email notifikasi untuk event kritis (publikasi hasil, akun baru). | Nice to Have |

---

## 8. Non-Functional Requirements

| ID | Kategori | Spesifikasi | Target Metrik |
|---|---|---|---|
| NFR-01 | Performa | Waktu respons kalkulasi TOPSIS untuk hingga 50 kandidat dan 10 kriteria. | < 2 detik (p95) |
| NFR-02 | Performa | Waktu muat halaman awal dan dashboard hasil setelah login. | < 3 detik pada koneksi 4G standar |
| NFR-03 | Keamanan | Proteksi terhadap serangan SQL Injection, XSS, dan CSRF. | Eloquent ORM, CSRF token, dan sanitasi input bawaan Laravel. |
| NFR-04 | Keamanan | Password pengguna disimpan dalam bentuk ter-hash menggunakan algoritma modern. | bcrypt dengan cost factor minimum 10. |
| NFR-05 | Keamanan | Isolasi data antar peran; KoorAsPrak tidak dapat mengakses data matkul yang bukan tugasannya. | Validasi kepemilikan pada setiap query; middleware `EnsureAssignedToMatkul`. |
| NFR-06 | Ketersediaan | Uptime layanan selama periode seleksi aktif. | ≥ 99.5% per bulan |
| NFR-07 | Skalabilitas | Sistem dapat menangani penambahan jumlah kandidat dan kriteria tanpa perubahan kode. | Mendukung hingga 200 kandidat dan 15 kriteria per matkul tanpa degradasi performa signifikan. |
| NFR-08 | Usabilitas | Pengguna baru dapat menyelesaikan alur kerja seleksi tanpa pelatihan khusus. | < 30 menit orientasi mandiri menggunakan panduan in-app; < 10 menit untuk CalonAsPrak. |
| NFR-09 | Responsivitas | Antarmuka dapat diakses dan digunakan pada perangkat mobile. | Layout responsif pada viewport ≥ 320px; tap target minimum 44×44px. |
| NFR-10 | Pemeliharaan | Kode sumber mengikuti konvensi penamaan dan struktur yang telah ditetapkan. | PascalCase (class); snake_case (tabel/kolom); kebab-case (URL). Coverage unit test TopsisService ≥ 80%. |
| NFR-11 | Kompatibilitas | Sistem berfungsi normal pada browser modern terkini. | Chrome ≥ 110, Firefox ≥ 110, Safari ≥ 16, Edge ≥ 110. |
| NFR-12 | Registrasi | Keamanan proses self-registration CalonAsPrak. | Validasi format NIM (10 digit), email domain kampus opsional; rate limiting 5 req/menit per IP pada endpoint registrasi. |

---

## 9. Arsitektur Sistem & Tech Stack

### 9.1 Tech Stack

| Layer | Teknologi | Justifikasi Pemilihan |
|---|---|---|
| Backend | Laravel 13 (PHP 8.4) | Framework PHP mature dengan ekosistem lengkap; Eloquent ORM mempermudah manipulasi data relasional; Artisan CLI mempercepat scaffolding Controller, Model, dan Migration. |
| Frontend | React.js + Inertia.js | Inertia.js memungkinkan pengalaman SPA tanpa memisahkan backend dan frontend secara penuh; React ideal untuk komponen dashboard yang reaktif dan real-time. |
| Styling | Tailwind CSS | Utility-first CSS framework yang mempercepat pembuatan UI responsif tanpa menulis custom CSS dari nol. |
| Database | MySQL 8.0 | RDBMS yang stabil dan didukung penuh oleh ekosistem Laravel; cocok untuk data terstruktur dengan relasi yang jelas antar kandidat, kriteria, dan matkul. |
| Kalkulasi | PHP Service Class | `TopsisService.php` mengenkapsulasi seluruh logika matematis TOPSIS; diuji dengan PHPUnit secara independen dari Controller. |
| Deployment | Vercel / Hostinger | Opsi fleksibel: Vercel untuk preview deployment otomatis via GitHub Actions; Hostinger untuk hosting PHP tradisional dengan biaya terjangkau. |
| CI/CD | GitHub Actions | Pipeline otomatis: push ke main → lint → PHPUnit test → build assets → deploy ke environment staging/production. |

---

### 9.2 Database Schema (Diperbarui v2.0)

Skema tabel utama pada database MySQL (dibuat via Laravel migrations):

**Tabel Inti (diperbarui dari v1.0)**

| Tabel | Kolom & Keterangan |
|---|---|
| `users` | `id`, `name`, `email`, `password` (bcrypt), `nim` (varchar, nullable — hanya CalonAsPrak), `role` (`superadmin` \| `admin` \| `user`), `is_active` (boolean, default true), `email_verified_at`, `last_login_at`, `created_at`, `updated_at` |
| `courses` | `id`, `code` (varchar, unique), `name`, `description`, `quota` (int, default 3), `is_active` (boolean), `created_at`, `updated_at` |
| `criteria` | `id`, `code` (C1–Cn), `name`, `weight` (decimal 5,4), `type` (`benefit` \| `cost`), `description`, `is_active`, `created_at`, `updated_at` |
| `candidates` | `id`, `user_id` (FK → users, nullable — kandidat manual tidak punya akun), `nim` (varchar), `name`, `created_at`, `updated_at` |
| `candidate_courses` | `id`, `candidate_id` (FK), `course_id` (FK), `status` (`pending` \| `active` \| `rejected`), `created_at` — relasi many-to-many dengan status |
| `candidate_scores` | `id`, `candidate_id` (FK), `course_id` (FK), `criteria_id` (FK), `score` (decimal 5,2), `created_at`, `updated_at` |
| `topsis_results` | `id`, `candidate_id`, `course_id`, `period_id` (FK), `d_plus`, `d_minus`, `preference_score`, `ranking`, `is_accepted`, `calculated_at` |
| `activity_logs` | `id`, `user_id`, `action`, `model_type`, `model_id`, `old_values` (JSON), `new_values` (JSON), `created_at` — audit trail |

**Tabel Baru v2.0**

| Tabel | Kolom & Keterangan |
|---|---|
| `selection_periods` | `id`, `name` (varchar), `description`, `start_date` (datetime), `end_date` (datetime), `is_active` (boolean), `is_locked` (boolean, default false), `is_published` (boolean, default false), `show_scores` (boolean, default false — kendali visibilitas skor detail ke CalonAsPrak), `locked_at`, `published_at`, `created_by` (FK → users), `created_at`, `updated_at` |
| `user_course_assignments` | `id`, `user_id` (FK → users, hanya role `admin`), `course_id` (FK → courses), `assigned_by` (FK → users, harus role `superadmin`), `created_at` — mapping KoorAsPrak ke matkul |
| `applications` | `id`, `user_id` (FK → users, hanya role `user`/CalonAsPrak), `course_id` (FK), `period_id` (FK), `status` (`pending` \| `accepted` \| `rejected`), `applied_at`, `reviewed_at`, `reviewed_by` (FK → users) — pendaftaran mandiri CalonAsPrak |
| `notifications` | `id`, `user_id` (FK — penerima), `type` (varchar, e.g. `result_published`, `application_received`), `title`, `body`, `data` (JSON), `read_at` (nullable), `created_at` |
| `topsis_snapshots` | `id`, `course_id`, `period_id`, `matrix_data` (JSON — menyimpan seluruh matriks antara: normalisasi, pembobotan, A+, A−, D+, D−, Vi), `snapshotted_at` — snapshot permanen setelah periode dikunci |

**Diagram Relasi Ringkas:**

```
selection_periods ──< topsis_results
selection_periods ──< applications
users (superadmin) ──< user_course_assignments >── courses
users (admin) ──< user_course_assignments
users (user) ──< candidates (opsional, jika akun terhubung)
candidates ──< candidate_courses >── courses
candidates ──< candidate_scores >── criteria
courses ──< candidate_courses
```

---

## 10. Hasil Pilot Run — Implementasi Excel (2025/2026)

Berikut adalah hasil perhitungan TOPSIS aktual dari implementasi Excel yang telah diverifikasi dan menjadi *ground truth* untuk validasi web application. Seluruh skor di bawah ini harus dapat direproduksi oleh sistem web dengan **toleransi < 0.0001**.

### 10.1 Struktur Data

| Nama Kandidat | Skor TOPSIS | Ranking | Rekomendasi |
|---|---|---|---|
| Faqih Ardiansyah | 0.7665 | 1 | **DITERIMA** |
| Haniel Wijanarko | 0.6360 | 2 | **DITERIMA** |
| Raihan Dwi Ananda H. | 0.6060 | 3 | **DITERIMA** |
| Aufa Salsabila | 0.5667 | 4 | — |
| Satria | 0.4846 | 5 | — |
| Farhan | 0.3994 | 6 | — |
| Pancar | 0.2335 | 7 | — |

### 10.2 Basis Data

| Nama Kandidat | Skor TOPSIS | Ranking | Rekomendasi |
|---|---|---|---|
| Fikry Mumtaz | 0.7723 | 1 | **DITERIMA** |
| Aufa Salsabila | 0.6525 | 2 | **DITERIMA** |
| Latifa | 0.5984 | 3 | **DITERIMA** |
| Ferdi Waskito | 0.4297 | 4 | — |
| Talitha | 0.2850 | 5 | — |
| Ali Muhammad Firdaus | 0.0613 | 6 | — |

### 10.3 Sistem Operasi

| Nama Kandidat | Skor TOPSIS | Ranking | Rekomendasi |
|---|---|---|---|
| Salma F | 0.7653 | 1 | **DITERIMA** |
| Fahri | 0.6975 | 2 | **DITERIMA** |
| Fahmi Arif Setiawan | 0.5966 | 3 | **DITERIMA** |
| Biladi | 0.5774 | 4 | — |
| Ferdi Waskito | 0.4444 | 5 | — |
| Izaz Falih | 0.3585 | 6 | — |
| Nafisah | 0.2623 | 7 | — |

### 10.4 Pemrograman Web I

| Nama Kandidat | Skor TOPSIS | Ranking | Rekomendasi |
|---|---|---|---|
| Tsaqif Hasbi A.S. | 0.7149 | 1 | **DITERIMA** |
| Haniel Wijanarko | 0.5678 | 2 | **DITERIMA** |
| Gilang Happy D. | 0.4506 | 3 | **DITERIMA** |
| Yoga Adi | 0.3365 | 4 | — |
| Athaya Raihan | 0.2958 | 5 | — |
| M. Umar Faiz | 0.2878 | 6 | — |

---

## 11. Development Phases & Roadmap

| Fase | Nama | Scope Utama | Deliverable Kunci | Estimasi |
|---|---|---|---|---|
| **P1** | Setup & Database | Inisialisasi project Laravel, konfigurasi environment, pembuatan migrasi seluruh tabel v2.0 (13 tabel), seeder kriteria default dan akun Superadmin awal. | Repository GitHub, `.env` template, migration files lengkap, `CriteriaSeeder` untuk C1–C6, `UserSeeder` untuk akun superadmin default, `README` instalasi. | 3–4 hari |
| **P2** | Autentikasi & RBAC | Login/logout untuk 3 peran, middleware role-based (SuperadminMiddleware, AdminMiddleware, EnsureAssignedToMatkul), halaman manajemen akun Superadmin, sistem self-registration CalonAsPrak, manajemen periode seleksi. | Halaman login/register fungsional, 3 middleware RBAC, halaman manajemen pengguna untuk Superadmin, halaman manajemen periode, alur registrasi CalonAsPrak. | 5–6 hari |
| **P3** | Admin Panel & CRUD | Antarmuka CRUD mata kuliah (dengan penugasan KoorAsPrak), kriteria (validasi bobot real-time, hanya Superadmin), manajemen kandidat, dan form input nilai untuk KoorAsPrak. | Halaman Matkul, Kriteria, Kandidat, form input nilai per kandidat per matkul; halaman pendaftaran matkul untuk CalonAsPrak. | 5–7 hari |
| **P4** | TOPSIS Engine | Implementasi `TopsisService.php` dengan 9 langkah kalkulasi, unit test PHPUnit, validasi terhadap ground truth Excel, snapshot setelah periode dikunci. | `TopsisService.php` terverifikasi, test suite ≥ 80% coverage, output identik dengan data pilot run (toleransi < 0.0001), mekanisme snapshot permanen. | 4–5 hari |
| **P5** | Dashboard & Output | Dashboard analitik Superadmin (lintas matkul), dashboard hasil KoorAsPrak (per matkul), audit trail, kendali publikasi, portal hasil CalonAsPrak, ekspor PDF/Excel, notifikasi in-app. | Dashboard lintas matkul Superadmin, dashboard per matkul KoorAsPrak, halaman status CalonAsPrak (dengan/tanpa skor detail), fitur ekspor PDF/Excel, notifikasi in-app. | 5–6 hari |
| **P6** | Finalisasi & Deploy | Pengujian end-to-end untuk seluruh alur 3 peran, perbaikan bug, optimasi performa, penulisan dokumentasi teknis, deployment ke hosting. | Aplikasi live di URL publik, dokumentasi teknis, panduan pengguna per peran (3 dokumen), laporan pengujian final. | 3–4 hari |

**Total Estimasi:** 25–32 hari kerja

---

## 12. Konvensi Kode & Struktur Folder

### 12.1 Konvensi Penamaan

| Elemen | Konvensi | Contoh |
|---|---|---|
| Controllers & Models | PascalCase | `CandidateController`, `TopsisResult`, `SelectionPeriod` |
| Service Classes | PascalCase + suffix `Service` | `TopsisService.php`, `ExportService.php`, `NotificationService.php` |
| Middleware | PascalCase | `EnsureSuperadmin`, `EnsureAdminOrSuperadmin`, `EnsureAssignedToMatkul` |
| Tabel Database | snake_case, plural | `candidate_scores`, `topsis_results`, `user_course_assignments`, `selection_periods` |
| Kolom Database | snake_case | `preference_score`, `d_plus`, `d_minus`, `is_accepted`, `is_published` |
| Routes / URL | kebab-case | `/seleksi-asprak`, `/mata-kuliah/{id}/hasil`, `/pendaftaran-asprak` |
| Komponen React | PascalCase | `RankingTable.jsx`, `CriteriaForm.jsx`, `AuditTrail.jsx`, `CandidatePortal.jsx` |
| Variabel PHP | camelCase | `$preferenceScore`, `$idealPositive`, `$normalizedMatrix`, `$selectionPeriod` |
| Method / Fungsi | camelCase | `calculateTopsis()`, `publishResults()`, `lockPeriod()`, `getAssignedCourses()` |

### 12.2 Struktur Folder Kunci

```
app/
├── Services/
│   ├── TopsisService.php          -- Core kalkulasi TOPSIS (9 langkah + snapshot)
│   ├── ExportService.php          -- Export PDF dan Excel
│   └── NotificationService.php   -- Notifikasi in-app dan email
├── Http/
│   ├── Controllers/
│   │   ├── Auth/                  -- LoginController, RegisterController
│   │   ├── SuperadminController.php
│   │   ├── CourseController.php
│   │   ├── CriteriaController.php
│   │   ├── CandidateController.php
│   │   ├── TopsisController.php
│   │   ├── SelectionPeriodController.php
│   │   ├── ApplicationController.php
│   │   └── NotificationController.php
│   └── Middleware/
│       ├── EnsureSuperadmin.php
│       ├── EnsureAdminOrSuperadmin.php
│       └── EnsureAssignedToMatkul.php
├── Models/
│   ├── User.php
│   ├── Course.php
│   ├── Criteria.php
│   ├── Candidate.php
│   ├── CandidateScore.php
│   ├── TopsisResult.php
│   ├── SelectionPeriod.php
│   ├── Application.php
│   ├── UserCourseAssignment.php
│   └── Notification.php
database/
├── migrations/               -- Semua file migrasi (13 tabel)
└── seeders/
    ├── CriteriaSeeder.php    -- Data default kriteria C1–C6
    └── UserSeeder.php        -- Akun superadmin default
resources/
└── js/
    ├── Pages/
    │   ├── Superadmin/       -- Dashboard, Matkul, Kriteria, Akun, Periode, Rekap
    │   ├── Admin/            -- Dashboard, Kandidat, InputNilai, Hasil
    │   └── Candidate/        -- Register, Dashboard, StatusSeleksi
    └── Components/
        ├── RankingTable.jsx
        ├── AuditTrail.jsx
        ├── CriteriaForm.jsx
        ├── ImportModal.jsx
        ├── PeriodBanner.jsx
        └── NotificationBell.jsx
tests/
├── Unit/
│   └── TopsisServiceTest.php   -- Unit test kalkulasi TOPSIS
└── Feature/
    ├── AuthTest.php
    ├── SuperadminTest.php
    ├── AdminTest.php
    └── CandidateTest.php
```

---

## 13. Strategi Pengujian

| Tipe Pengujian | Cakupan | Skenario Kritis | Tool |
|---|---|---|---|
| Unit Test | `TopsisService.php` (9 langkah kalkulasi) | Validasi output setiap langkah terhadap nilai ground truth pilot run Excel. Toleransi perbedaan < 0.0001. | PHPUnit |
| Unit Test | Validasi total bobot kriteria | Bobot = 1.0 lulus; bobot = 0.99 dan 1.01 ditolak; bobot negatif ditolak otomatis. | PHPUnit |
| Integration Test | Alur CRUD lengkap Superadmin | Buat periode → buat matkul → tugaskan KoorAsPrak → buat kriteria → kunci periode. | Laravel Feature Test |
| Integration Test | Alur CRUD lengkap KoorAsPrak | Login → lihat matkul yang ditugaskan → tambah kandidat → input nilai → lihat hasil → ekspor laporan. | Laravel Feature Test |
| Integration Test | Alur self-registration CalonAsPrak | Registrasi → pilih matkul → lihat status (sebelum dan sesudah publikasi). | Laravel Feature Test |
| Integration Test | Kalkulasi ulang otomatis | Ubah nilai kandidat → ranking berubah secara konsisten; kunci periode → perubahan diblokir. | Laravel Feature Test |
| Integration Test | Isolasi data antar peran | KoorAsPrak A tidak dapat mengakses data matkul KoorAsPrak B; CalonAsPrak tidak dapat melihat skor kandidat lain. | Laravel Feature Test |
| E2E Test | Alur kerja Superadmin | Login → buat matkul → tugaskan KoorAsPrak → publish hasil → logout. | Cypress / Laravel Dusk |
| E2E Test | Alur kerja KoorAsPrak | Login → input nilai 5 kandidat → verifikasi ranking → ekspor PDF. | Cypress / Laravel Dusk |
| E2E Test | Alur kerja CalonAsPrak | Registrasi → pilih matkul → tunggu publikasi → lihat status diri. | Cypress / Laravel Dusk |
| Manual Test | Tampilan & responsivitas | Uji UI di Chrome, Firefox, Safari; verifikasi layout di mobile 375px dan desktop 1920px. | Browser DevTools |
| Security Test | Autentikasi & otorisasi | Akses halaman admin tanpa login harus redirect; KoorAsPrak mencoba akses matkul orang lain harus 403; CSRF token wajib. | Manual + Laravel built-in |
| Security Test | Registrasi & rate limiting | Pendaftaran dengan NIM duplikat ditolak; > 5 request/menit dari IP yang sama diblokir sementara. | Manual + PHPUnit |

---

## 14. Constraints, Assumptions & Risks

### 14.1 Constraints

- Sistem hanya mendukung metode TOPSIS (tidak multi-metode seperti SAW atau AHP) untuk menjaga kesederhanaan dan fokus scope versi 2.0.
- Autentikasi menggunakan session-based (bukan JWT/OAuth) karena tidak ada kebutuhan API publik eksternal.
- Ekspor PDF menggunakan library server-side (DomPDF/Snappy); tidak bergantung pada browser print dialog.
- Tidak ada integrasi dengan sistem informasi akademik (SIAKAD) kampus dalam versi 2.0; data kandidat diinput secara manual atau melalui self-registration.
- Satu periode seleksi aktif pada satu waktu; multi-period paralel tidak didukung di v2.0.
- Kriteria dan bobotnya bersifat global untuk semua matkul dalam satu periode (tidak per-matkul).

### 14.2 Assumptions

- Superadmin (Dosen/KepalaLab) memiliki akses internet stabil selama proses seleksi berlangsung.
- KoorAsPrak telah memiliki akun yang disiapkan oleh Superadmin sebelum periode seleksi dimulai.
- CalonAsPrak memiliki NIM yang valid dan email yang aktif untuk registrasi.
- Data nilai yang diinput KoorAsPrak sudah terverifikasi kebenarannya sebelum dimasukkan ke sistem.
- Jumlah asisten yang diterima per mata kuliah adalah 3 orang (kuota default), namun dapat dikonfigurasi oleh Superadmin.
- Kriteria dan bobotnya tetap konsisten sepanjang satu periode seleksi dan tidak berubah di tengah proses.

### 14.3 Risks & Mitigasi

| Risiko | Dampak | Strategi Mitigasi |
|---|---|---|
| Data nilai yang diinput tidak akurat (garbage in, garbage out) | Tinggi | Sistem menampilkan peringatan bahwa tanggung jawab kebenaran data ada pada KoorAsPrak; sediakan fitur edit nilai selama periode belum dikunci. |
| CalonAsPrak mendaftar dengan NIM atau email palsu | Sedang | Validasi keunikan NIM dan email; Superadmin dapat memverifikasi manual (FR-07.3); opsi: kirim tautan verifikasi ke email. |
| KoorAsPrak tidak mengisi nilai sebelum periode ditutup | Sedang | Notifikasi pengingat otomatis (FR-12.3); indikator progress bar kelengkapan nilai (FR-03.8); Superadmin dapat melihat status pengisian di dashboard. |
| Superadmin mempublikasikan hasil sebelum semua nilai lengkap | Tinggi | Sistem menampilkan peringatan jika ada matkul dengan nilai belum lengkap sebelum tombol publish diaktifkan; konfirmasi dua langkah sebelum publikasi. |
| Pengguna menginput bobot yang tidak berjumlah 100% | Sedang | Validasi real-time di frontend dan backend sebelum penyimpanan; tampilkan sisa bobot yang tersedia secara visual dengan warna. |
| Kebocoran data hasil sebelum publikasi resmi | Tinggi | Hasil hanya terlihat oleh KoorAsPrak dan Superadmin sebelum dipublikasikan; CalonAsPrak melihat layar "Menunggu Pengumuman" (FR-09.2). |
| Library ekspor PDF gagal di environment server tertentu | Sedang | Fallback ke ekspor Excel jika PDF gagal; dokumentasikan requirement server (ekstensi PHP: gd, mbstring, dom). |
| Kandidat yang sama mendaftar ke banyak matkul | Rendah | Relasi many-to-many `candidate_courses` memastikan nilai per matkul tersimpan terpisah; kalkulasi selalu dilakukan per matkul secara independen. |

---

## 15. Referensi

| No | Sumber | Tipe | Tahun |
|---|---|---|---|
| 1 | Permana Gija et al. — *Sistem Pendukung Keputusan untuk Penentuan Asisten Laboratorium Komputer dengan Metode TOPSIS*. LOFIAN Journal. https://ejournal.umbp.ac.id/index.php/lofian/article/view/172 | Jurnal Ilmiah | 2022 |
| 2 | Hasil Wawancara: Daiva Paundra Gevano (Koor Asprak Struktur Data, 17 Mei 2026) — Kriteria dan Bobot Seleksi Asprak. | Wawancara Primer | 2026 |
| 3 | Hasil Wawancara: Irfan Widodo (Koor Asprak Basis Data, 17 Mei 2026) — Kriteria dan Bobot Seleksi Asprak. | Wawancara Primer | 2026 |
| 4 | File `TOPSIS_Seleksi_Asprak.xlsx` — Implementasi TOPSIS Excel sebagai proof-of-concept dan ground truth kalkulasi aktual. | Dokumen Internal | 2026 |
| 5 | Google Form Pengumpulan Nilai (bit.ly/form-asprak-spk) — Data nilai 26 kandidat asprak genap 2025/2026. | Data Primer | 2026 |
| 6 | Google Sheets Jadwal Screening Resmi Asprak Genap 2025/2026 — Daftar nama kandidat dan pilihan matkul. | Dokumen Internal | 2026 |
| 7 | Laravel Documentation — https://laravel.com/docs/13.x | Dok. Resmi | 2025 |
| 8 | Inertia.js Documentation — https://inertiajs.com | Dok. Resmi | 2024 |
| 9 | OWASP Top 10 — https://owasp.org/Top10 | Referensi Keamanan | 2021 |

---

*Dokumen ini disusun oleh Tim Empat Sekawan sebagai bagian dari tugas Mata Kuliah Sistem Pendukung Keputusan Kelas A, Program Studi Informatika, Universitas Jenderal Soedirman, 2026.*

*PRD v2.0 menggantikan v1.0 secara keseluruhan — Juni 2026.*
