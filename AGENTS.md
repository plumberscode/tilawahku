<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Siap. Aku susun dengan prinsip bahwa `AGENTS.md` ini menjadi **source of truth untuk coding agent**: bukan cuma aturan coding, tapi juga konteks produk dan keputusan UX yang sudah kita sepakati.

# CatatanTilawah.com — Agent Guidelines

## 1. Product Overview

CatatanTilawah.com adalah web app untuk membantu pengguna mencatat, melihat, dan menjaga konsistensi membaca Al-Qur'an.

Produk ini bukan sekadar tracker atau database pencatatan bacaan. Tujuan utamanya adalah menciptakan pengalaman yang membuat pengguna:

* senang menggunakan aplikasi,
* merasa didukung,
* dapat melihat perjalanan tilawah mereka secara visual,
* termotivasi untuk kembali membaca Al-Qur'an,
* tidak merasa dihakimi atau ditekan ketika progresnya tidak konsisten.

### Product Principle

> **Support, not pressure.**

CatatanTilawah harus terasa seperti teman yang mendukung perjalanan tilawah pengguna, bukan aplikasi yang menilai atau menyalahkan mereka.

---

## 2. Core UX Principles

Semua keputusan UI/UX harus mengikuti prinsip berikut.

### Calm

Interface harus terasa tenang, bersih, dan tidak ramai.

Hindari:

* terlalu banyak warna,
* terlalu banyak badge,
* terlalu banyak angka,
* animasi yang mengganggu,
* visual hierarchy yang membingungkan.

### Warm

Gunakan visual yang terasa hangat, ramah, dan welcoming.

### Encouraging

Progress harus mendorong pengguna untuk melanjutkan.

Gunakan bahasa seperti:

* "Yuk, lanjutkan lagi tilawah-mu."
* "Kamu sudah sejauh ini."
* "Yuk, lanjut lagi."
* "Masya Allah, perjalananmu sudah ..."

Hindari bahasa yang terasa menghakimi seperti:

* "Kamu tertinggal."
* "Target belum tercapai."
* "Kamu gagal menjaga streak."

### Focused

Setiap halaman atau layar harus mempunyai satu tujuan utama.

> One screen, one primary goal.

### Delightful

Gunakan ilustrasi, animasi, dan micro-interaction untuk memberikan rasa menyenangkan.

Namun:

> Delight should support the Quran-reading experience, never compete with it.

---

## 3. Core Product Concepts

Ada dua aktivitas utama dalam CatatanTilawah.

### 3.1 Tilawah Runtun

Pengguna membaca Al-Qur'an secara berurutan dari awal hingga akhir.

Contoh:

Al-Baqarah ayat 1 → ayat berikutnya → halaman berikutnya → dan seterusnya.

Sistem harus dapat mengetahui posisi bacaan pengguna.

### 3.2 Murojaah

Murojaah adalah aktivitas mengulang hafalan Al-Qur'an.

Murojaah memiliki dua konteks:

1. Mengulang hafalan yang sudah dimiliki.
2. Mengulang hafalan baru / tambahan hafalan.

Kedua aktivitas tersebut merupakan bagian dari satu perjalanan ibadah pengguna, bukan sekadar dua fitur yang berdiri sendiri.

---

## 4. Dashboard Philosophy

Setelah login, jangan memaksa pengguna memilih mode setiap kali membuka aplikasi.

Jangan membuat flow seperti:

> "Mau Tilawah atau Murojaah?"

sebagai pertanyaan wajib setiap kali membuka aplikasi.

Sebaliknya, dashboard harus memahami konteks pengguna dan menampilkan aktivitas yang relevan.

Contoh:

> "Assalamualaikum, Henry 👋"

> "Yuk lanjutkan tilawahmu."

Kemudian tampilkan aktivitas yang dapat dilanjutkan.

Contoh:

* Lanjutkan Tilawah
* Murojaah hari ini
* Progress perjalanan tilawah

Jika pengguna terakhir menggunakan Tilawah, prioritaskan "Lanjutkan Tilawah".

Jika pengguna lebih aktif melakukan murojaah, tampilkan aktivitas murojaah secara relevan.

---

## 5. Homepage / Landing Page

Homepage adalah halaman sebelum login.

Tujuan utamanya adalah memberikan welcome moment yang sederhana dan menyenangkan.

### Struktur utama

Urutan elemen:

1. Ilustrasi Quran
2. Headline
3. Supporting text
4. Primary Login button
5. Google login
6. Privacy reassurance
7. Link daftar akun

Headline:

> **Yuk, lanjutkan lagi tilawah-mu**

Supporting text:

> Catat, lacak, dan jaga konsistensi bacaan Quran setiap hari.

CTA:

> Login

Social login:

> Google

Registration:

> Belum punya akun? Daftar

Privacy reassurance:

> Data aman dan hanya untukmu

### Visual

Homepage menggunakan:

* warm cream background,
* ilustrasi Quran,
* ilustrasi tanaman,
* lantern,
* Islamic arch,
* decorative stars/hearts/sparkles,
* banyak whitespace,
* visual yang lembut dan tidak agresif.

Background utama:

```text
#FBF4EE
```

### Illustration Rules

Ilustrasi harus:

* clean,
* friendly,
* soft,
* Islamic-inspired,
* tidak berlebihan,
* mudah dipisahkan dari UI jika diperlukan.

Quran **tidak boleh memiliki mata, mulut, atau lingkaran merah/pipi**.

Jangan mengubah Quran menjadi karakter dengan wajah.

Elemen ilustrasi tidak perlu memiliki bayangan berat. Flat/soft illustration lebih disukai agar mudah digunakan sebagai asset frontend.

---

## 6. Authentication UX

Login harus sesingkat mungkin.

Primary action:

> Login

Alternative:

> Google

Untuk user yang belum memiliki akun:

> Belum punya akun? Daftar

Jangan meminta informasi yang belum dibutuhkan.

### Registration Principle

Saat user melakukan pendaftaran, kumpulkan data minimum terlebih dahulu.

Informasi tambahan mengenai kebiasaan membaca, preferensi, atau aktivitas tilawah dapat dikumpulkan setelah user berhasil masuk jika memang diperlukan.

> Do not make users fill forms before they understand the value of the product.

---

## 7. Reading Data Model

Jangan hanya menyimpan jumlah halaman sebagai data utama.

Simpan data bacaan dalam bentuk data Quran yang lebih fundamental, seperti:

* surah,
* ayat awal,
* ayat akhir,
* timestamp,
* aktivitas,
* metadata relevan.

Contoh konseptual:

```text
Surah: Al-Baqarah
Start Ayah: 1
End Ayah: 15
Activity: tilawah
Timestamp: ...
```

Kemudian sistem dapat menghitung:

* halaman,
* juz,
* progress,
* statistik,
* riwayat,
* visualisasi.

### Why

Data mentah harus tetap tersedia agar aplikasi dapat menghasilkan berbagai jenis analitik di masa depan tanpa mengubah data historis.

---

## 8. Quran Page Mapping

CatatanTilawah menggunakan konsep **halaman** sebagai satuan progress yang terlihat oleh pengguna.

Pengguna dapat memasukkan range ayat.

Sistem kemudian melakukan mapping:

> Ayat → Halaman Mushaf

Mapping harus menggunakan referensi mushaf yang jelas dan konsisten.

Untuk versi yang ditetapkan saat ini, gunakan referensi **Mushaf Madinah**.

Jangan hard-code asumsi seperti:

> "10 ayat = 1 halaman."

Jumlah ayat per halaman berbeda-beda tergantung posisi ayat dan surah.

Sediakan data referensi yang memetakan ayat ke halaman.

### Important

Jangan menyimpan hanya:

```text
pages_read = 5
```

sebagai sumber kebenaran utama.

Lebih baik:

```text
reading_record
    ├── surah
    ├── start_ayah
    ├── end_ayah
    ├── activity
    └── timestamp
```

Kemudian halaman dihitung dari Quran page mapping.

---

## 9. Progress Visualization

Progress bukan sekadar angka.

Tujuannya adalah memberikan pengguna perasaan:

> "Ternyata aku sudah sejauh ini."

Visualisasi dapat mencakup:

* jumlah halaman,
* perjalanan dari waktu ke waktu,
* kalender aktivitas,
* progress per juz,
* progress mushaf,
* riwayat bacaan,
* reading journey.

Gunakan visualisasi yang informatif tetapi tetap calm.

Jangan membuat dashboard terlihat seperti dashboard KPI perusahaan.

---

## 10. Reading Journey

Gunakan konsep:

> **Reading Journey**

bukan sekadar:

> Activity Tracker.

Pengguna harus dapat melihat perjalanan mereka dalam jangka panjang.

Contoh:

> "Tahun ini kamu sudah membaca 1.240 halaman."

Visualisasi harus memberikan rasa pencapaian dan motivasi tanpa menjadi kompetisi.

---

## 11. MVP Scope

MVP harus fokus.

Prioritas versi pertama:

### 1. Homepage

* welcome illustration,
* headline,
* login,
* Google login,
* registration.

### 2. Authentication

* login,
* registration,
* Google authentication.

### 3. Dashboard

* aktivitas hari ini,
* lanjutkan tilawah,
* informasi murojaah,
* progress utama.

### 4. Tilawah

* input range ayat,
* pencatatan bacaan,
* konversi ayat → halaman,
* progress.

### 5. Progress

* total halaman,
* history,
* visualisasi sederhana.

Jangan menambahkan fitur hanya karena secara teknis mudah dibuat.

Prioritaskan fitur berdasarkan kontribusinya terhadap pengalaman membaca dan konsistensi pengguna.

---

## 12. Design System

### Colors

```text
background:         #FBF4EE
foreground:         #3B342D
primary:            #628A45
primary-foreground: #FFFFFF
secondary:          #E8E0D6
muted:              #8A8178
border:             #E5DDD3
card:               #FFFCF8
```

Warna dapat berkembang, tetapi perubahan harus konsisten dan terdokumentasi.

### Typography

Primary font:

```text
Plus Jakarta Sans
```

Hierarchy:

```text
H1:   32px / 40px / bold
H2:   24px / 32px / semibold
H3:   20px / 28px / semibold
Body: 16px / 24px
Small: 14px / 20px
```

Jangan menggunakan terlalu banyak jenis font.

### Border Radius

```text
sm:   8px
md:   12px
lg:   16px
xl:   24px
full: 9999px
```

Default button:

```text
16px
```

Default card:

```text
16px - 20px
```

### Spacing

Gunakan spacing berbasis 4px:

```text
4
8
12
16
20
24
32
40
48
64
```

Hindari spacing arbitrary jika tidak diperlukan.

### Shadows

Gunakan shadow secara minimal.

Prioritaskan:

* surface,
* border,
* spacing,
* hierarchy.

Daripada shadow yang berat.

---

## 13. Component Architecture

Gunakan **shadcn/ui sebagai foundation**, bukan sebagai visual identity.

Struktur konseptual:

```text
components/
├── ui/
│   ├── button
│   ├── card
│   ├── dialog
│   ├── input
│   ├── progress
│   └── ...
│
├── brand/
│   ├── logo
│   ├── quran-illustration
│   └── page-header
│
└── tilawah/
    ├── reading-progress
    ├── reading-streak
    ├── continue-reading
    └── reading-history
```

### Rules

`ui/`:

Komponen generik dan reusable.

`brand/`:

Komponen yang merepresentasikan identitas CatatanTilawah.

`tilawah/`:

Komponen khusus domain produk.

Jangan mengubah semua komponen shadcn secara global hanya untuk satu kebutuhan spesifik.

Jangan membuat komponen baru jika komponen existing dapat digunakan dengan extension yang sederhana.

Sebaliknya, jangan memaksa komponen shadcn jika kebutuhan UX memang membutuhkan komponen domain-specific.

---

## 14. Frontend Philosophy

Project menggunakan pendekatan modern React/Next.js dan TypeScript.

Prioritas:

1. UX clarity
2. Accessibility
3. Maintainability
4. Performance
5. Visual polish

Jangan mengorbankan UX hanya karena implementasi teknis lebih mudah.

Jangan mengorbankan maintainability hanya demi membuat demo terlihat bagus.

---

## 15. Agent Behavior

Sebelum mengimplementasikan fitur besar:

1. Pahami tujuan UX.
2. Periksa design system.
3. Periksa komponen existing.
4. Jangan membuat pola baru jika pola existing sudah tersedia.
5. Implementasikan solusi paling sederhana yang memenuhi kebutuhan.
6. Pastikan responsive.
7. Pastikan accessibility.
8. Jalankan lint/typecheck/test yang relevan.
9. Review hasil implementasi terhadap prinsip desain CatatanTilawah.

Jika requirement tidak jelas, **jangan menebak untuk keputusan produk yang signifikan**.

Untuk detail kecil yang tidak berdampak pada UX atau architecture, gunakan judgment yang konsisten dengan design system.

---

## 16. Things To Avoid

Jangan:

* membuat UI seperti dashboard SaaS generik,
* menggunakan terlalu banyak warna,
* menggunakan terlalu banyak card,
* membuat gamification terasa seperti game,
* menggunakan streak sebagai mekanisme tekanan,
* menyalahkan user karena tidak konsisten,
* meminta user memasukkan data yang sebenarnya bisa dihitung sistem,
* menyimpan derived data sebagai satu-satunya source of truth,
* menambahkan fitur tanpa alasan UX,
* membuat halaman penuh informasi hanya karena data tersedia,
* mengganti design token tanpa alasan,
* mengabaikan responsive mobile,
* mengubah visual identity hanya karena default shadcn terlihat bagus.

---

## 17. Decision Making

Ketika terdapat dua pilihan implementasi, prioritaskan:

```text
User value
    ↓
UX simplicity
    ↓
Consistency with design system
    ↓
Maintainability
    ↓
Implementation convenience
```

Jangan membalik prioritas tersebut.

Kemudahan coding bukan alasan yang cukup untuk memilih UX yang lebih buruk.

---

## 18. Current Product Direction

CatatanTilawah saat ini sedang berada pada tahap **product/design exploration**.

Jangan menganggap semua detail sudah final.

Namun keputusan berikut dianggap sebagai baseline:

* Support, not pressure.
* Homepage sederhana dan welcoming.
* Dashboard berbasis "hari ini".
* Tilawah dan murojaah merupakan dua aktivitas utama.
* Reading Journey lebih penting daripada sekadar activity tracker.
* Halaman adalah satuan progress yang terlihat oleh user.
* Data bacaan disimpan pada level ayat/range ayat.
* Page mapping menggunakan referensi Mushaf Madinah.
* shadcn/ui digunakan sebagai foundation.
* Visual identity dibuat khusus untuk CatatanTilawah.
* Mobile experience adalah prioritas.
* UX didahulukan sebelum menambah fitur.

Jika keputusan produk baru dibuat, update dokumentasi ini agar agent berikutnya memiliki konteks yang sama.
