<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# TilawahKu — Agent Guidelines

## 1. Product Overview

TilawahKu adalah web app untuk membantu pengguna mencatat, melihat, dan menjaga konsistensi tilawah Al-Qur'an.

Produk ini bukan sekadar tracker atau database pencatatan.

Tujuan utama produk:

* membuat pengguna senang menggunakan aplikasi,
* membuat pengguna merasa didukung,
* membantu pengguna melihat perjalanan tilawah secara visual,
* memotivasi pengguna untuk kembali membaca Al-Qur'an,
* membantu murojaah,
* menghindari pengalaman yang terasa menghakimi atau menekan.

### Core Product Principle

> **Support, not pressure.**

TilawahKu harus terasa seperti teman yang mendukung perjalanan tilawah, bukan aplikasi yang menilai pengguna.

---

# 2. UX Principles

Semua keputusan UI/UX harus mengikuti prinsip berikut.

## Calm

Interface harus tenang, bersih, dan tidak ramai.

Hindari:

* terlalu banyak warna,
* terlalu banyak badge,
* terlalu banyak angka,
* animasi berlebihan,
* visual hierarchy yang membingungkan.

## Warm

Gunakan visual yang hangat, ramah, dan welcoming.

## Encouraging

Progress harus memberikan motivasi.

Gunakan bahasa seperti:

* "Yuk, lanjutkan lagi tilawah-mu."
* "Kamu sudah sejauh ini."
* "Yuk, lanjut lagi."
* "Masya Allah, perjalananmu sudah ..."

Hindari bahasa yang menghakimi:

* "Kamu tertinggal."
* "Target belum tercapai."
* "Kamu gagal menjaga streak."

## Focused

Setiap layar mempunyai satu tujuan utama.

> One screen, one primary goal.

## Delightful

Gunakan ilustrasi, animasi, dan micro-interaction untuk memberikan rasa menyenangkan.

Namun:

> Delight must support the Quran-reading experience, never compete with it.

---

# 3. Core Activities

TilawahKu memiliki dua aktivitas utama.

## 3.1 Tilawah Runtun

Pengguna membaca Al-Qur'an secara berurutan.

Contoh:

```text
Al-Baqarah ayat 1
→ ayat berikutnya
→ halaman berikutnya
→ seterusnya
```

Sistem harus dapat mengetahui posisi terakhir pengguna.

## 3.2 Murojaah

Murojaah adalah aktivitas mengulang hafalan Al-Qur'an.

Murojaah memiliki dua konteks:

1. Mengulang hafalan yang sudah dimiliki.
2. Mengulang hafalan baru / tambahan hafalan.

Keduanya merupakan bagian dari satu perjalanan ibadah pengguna.

---

# 4. Dashboard Philosophy

Setelah login, jangan meminta pengguna memilih mode setiap kali membuka aplikasi.

Jangan membuat flow wajib:

> "Mau Tilawah atau Murojaah?"

Dashboard harus memahami konteks pengguna dan menampilkan aktivitas yang relevan.

Contoh:

> Assalamualaikum 👋
> Yuk lanjutkan tilawahmu.

Kemudian:

* Lanjutkan Tilawah
* Murojaah hari ini
* Progress perjalanan tilawah

Jika pengguna terakhir melakukan tilawah, prioritaskan "Lanjutkan Tilawah".

Jika pengguna memiliki murojaah yang perlu dilakukan, tampilkan secara relevan tanpa mengalahkan primary action.

---

# 5. Homepage

Homepage adalah halaman sebelum login.

Tujuan homepage:

> Membuat pengguna merasa disambut dan ingin melanjutkan tilawah.

Homepage harus sederhana.

### Struktur

Urutan utama:

1. Hero illustration / animation
2. Headline
3. Supporting text
4. Login
5. Google
6. Privacy reassurance
7. Registration

Headline:

> **Yuk, lanjutkan lagi tilawah-mu**

Supporting text:

> Catat, lacak, dan jaga konsistensi bacaan Quran setiap hari.

Primary CTA:

> Login

Google:

> Google

Registration:

> Belum punya akun? Daftar

Privacy:

> Data aman dan hanya untukmu

### Background

```text
#FBF4EE
```

### Hero

Homepage menggunakan animasi Quran yang lembut.

Video:

* autoplay,
* muted,
* loop,
* playsInline,
* no controls,
* no audio.

Gunakan WebM jika tersedia dan MP4 sebagai fallback.

Jika `prefers-reduced-motion` aktif, gunakan static image.

---

# 6. Authentication UX

Authentication harus sesingkat mungkin.

Primary:

> Login

Secondary:

> Google

Registration:

> Belum punya akun? Daftar

Jangan menggunakan Apple login.

Jangan meminta data yang belum dibutuhkan.

### Registration principle

Kumpulkan data minimum saat pendaftaran.

Data tambahan mengenai kebiasaan tilawah dapat dikumpulkan setelah pengguna masuk jika memang diperlukan.

> Do not make users fill unnecessary forms before they understand the value of the product.

---

# 7. Dashboard Information Hierarchy

Prioritas dashboard:

1. **Lanjutkan Tilawah**
2. **Perjalananmu**
3. **Murojaah Hari Ini**
4. **Aktivitas Hari Ini**
5. Statistik/detail tambahan

Dashboard bukan dashboard KPI.

Dashboard adalah tempat untuk kembali membaca.

---

# 8. Continue Reading

Komponen utama dashboard adalah:

> **Lanjutkan Tilawah**

Contoh:

```text
Lanjutkan Tilawah

Al-Baqarah
Ayat 16
Halaman 4

[Lanjutkan →]
```

Jika pengguna kembali:

* sistem harus mengetahui posisi terakhir,
* pengguna tidak perlu memilih ulang surah,
* pengguna tidak perlu memilih ulang halaman,
* pengguna tidak perlu memasukkan data yang sudah diketahui sistem.

### New user

Jika belum ada history:

> **Mulai perjalanan tilawahmu**

> Catat bacaan pertamamu dan mulai melihat perjalananmu.

CTA:

> Mulai Tilawah

Jangan menampilkan empty state yang terasa seperti error.

---

# 9. Reading Journey

Gunakan konsep:

> **Reading Journey**

bukan sekadar Activity Tracker.

Pengguna harus dapat melihat perjalanan mereka dalam jangka panjang.

Contoh:

> 127 halaman

> 3 juz telah kamu baca

Visualisasi dapat berupa:

* progress halaman,
* progress juz,
* kalender,
* reading history,
* mushaf journey,
* statistik jangka panjang.

Progress harus menimbulkan perasaan:

> "Ternyata aku sudah sejauh ini."

Bukan:

> "Aku masih kurang."

---

# 10. Gamification

Gamification harus subtle.

Jangan membuat UI seperti:

```text
🔥 17 Day Streak
🏆 Level 8
⭐ 2340 XP
🎖 Badge
```

Gamification tidak boleh menggeser motivasi dari:

> membaca Al-Qur'an

menjadi:

> mengumpulkan poin.

Gunakan reward psikologis yang lebih natural:

> "Masya Allah, minggu ini kamu sudah membaca 32 halaman."

atau:

> "Perjalananmu terus bertumbuh."

---

# 11. Quran Foundation Integration

TilawahKu menggunakan Quran Foundation sebagai sumber data Quran dan layanan Quran-related tertentu.

Quran Foundation **bukan identity provider utama TilawahKu**.

Authentication utama pengguna tetap menjadi milik TilawahKu.

Quran Foundation digunakan terutama untuk:

* Quran content,
* Quran page/layout data,
* Quran font/page rendering,
* search jika diperlukan,
* audio/content-related API jika diperlukan.

Quran Foundation Content API tidak membutuhkan Quran.com user account/OAuth user session dan harus dipanggil dari backend. Search juga membutuhkan backend.

---

# 12. Quran Foundation SDK

Gunakan runtime-specific SDK entrypoints.

## Backend

```ts
import { createServerClient } from "@quranjs/api/server";
```

Gunakan untuk:

* Content APIs,
* Search APIs,
* confidential OAuth2 operations jika suatu saat diperlukan,
* server-side rendering,
* cron jobs,
* workers.

Quran Foundation secara eksplisit merekomendasikan `@quranjs/api/server` untuk Content dan Search.

## Frontend

```ts
import { createPublicClient } from "@quranjs/api/public";
```

Gunakan **hanya jika memang membutuhkan browser/mobile-safe OAuth atau user-session flow dari Quran Foundation**.

Jangan menggunakan `@quranjs/api/public` untuk Content API atau Search.

Jika kebutuhan tersebut belum ada, tidak perlu menambahkan public client hanya demi kelengkapan.

Quran Foundation memisahkan server dan public entrypoint untuk membuat runtime boundary jelas.

---

# 13. Quran Foundation Credentials

Environment variables:

```text
QF_CLIENT_ID
QF_CLIENT_SECRET
```

`QF_CLIENT_SECRET` adalah server-only secret.

### NEVER

Jangan pernah:

* memasukkan `client_secret` ke browser,
* memasukkan secret ke client component,
* memasukkan secret ke public environment variable,
* commit secret ke Git,
* mengirim secret ke frontend.

Browser tidak boleh menerima `QF_CLIENT_SECRET`.

Quran Foundation secara eksplisit mencantumkan exposing `client_secret` di browser sebagai kesalahan umum.

---

# 14. Token Model

Bedakan dua token Quran Foundation.

## App Token

Digunakan untuk app-level reads:

* Quran Content,
* Search.

Backend mendapatkan app token menggunakan client credentials.

## User Token

Digunakan untuk personal Quran Foundation User APIs:

* bookmarks,
* collections,
* notes,
* reading progress,
* goals,
* preferences,
* QuranReflect-related user data.

Jangan mencampurkan kedua token tersebut.

Quran Foundation menjelaskan bahwa Content/Search dan User APIs mempunyai token path yang berbeda.

---

# 15. TilawahKu Authentication vs Quran Foundation OAuth

TilawahKu sudah mempunyai authentication sendiri.

Untuk MVP:

```text
TilawahKu Auth
    ↓
TilawahKu User
    ↓
TilawahKu Database
```

Jangan mengganti authentication TilawahKu dengan Quran Foundation OAuth hanya untuk mendapatkan akses Quran Content.

Quran Foundation User APIs hanya digunakan jika TilawahKu benar-benar membutuhkan integrasi dengan fitur personal Quran.com.

Jangan menduplikasi identity system tanpa alasan produk yang jelas.

---

# 16. Quran Data Ownership

### Quran Foundation

Source of truth untuk Quran content dan metadata yang kita konsumsi dari API.

Contoh:

* chapters,
* verses,
* page mapping,
* Quran font data,
* layout metadata,
* translations,
* tafsir,
* audio,
* search.

### TilawahKu Database

Source of truth untuk data perjalanan pengguna.

Contoh:

```text
users
reading_records
murojaah_records
reading_progress
goals
preferences
```

Jangan menyimpan derived progress sebagai satu-satunya source of truth.

---

# 17. Reading Record Data Model

Simpan data bacaan pada level Quran yang fundamental.

Contoh:

```text
reading_record
├── user_id
├── activity_type
├── chapter_id
├── start_verse
├── end_verse
├── started_at
└── completed_at
```

Jangan hanya menyimpan:

```text
pages_read = 5
```

sebagai sumber kebenaran utama.

Page number adalah derived information berdasarkan Mushaf/layout yang digunakan.

---

# 18. Mushaf Reference

Untuk target Mushaf Madinah yang telah dipilih:

```text
Mushaf ID: 1
QCF V2
604 pages
```

Gunakan mapping dari Quran Foundation.

Jangan membuat asumsi seperti:

> 10 ayat = 1 halaman.

Jumlah ayat per halaman tidak konstan.

Page mapping harus berasal dari data Mushaf yang digunakan.

---

# 19. Quran Reader Architecture

Untuk Quran Reader utama, gunakan pendekatan:

> **QCF V2 + page layout data**

Jangan menggunakan gambar 604 halaman sebagai fondasi utama reader.

Target rendering:

```text
Quran Content
      ↓
page_number
line_number
code_v2
      ↓
QCF V2 font
      ↓
Mushaf page renderer
```

QCF V2 digunakan untuk menghasilkan tampilan Mushaf yang sangat dekat dengan layout Mushaf fisik.

---

# 20. Page-Level Rendering

Reader harus memahami struktur:

```text
Page
 ├── Line 1
 ├── Line 2
 ├── Line 3
 ├── ...
 └── Line N
```

Jangan berasumsi:

```text
Verse = Line
```

Satu ayat dapat berhubungan dengan struktur line/page yang berbeda.

Rendering harus mengikuti metadata page/line yang disediakan oleh Quran Foundation.

---

# 21. Quran Reader MVP Strategy

Jangan langsung membangun reader 604 halaman.

Tahap pertama:

> **Prototype satu halaman Mushaf Madinah.**

Target:

1. Next.js
2. Next.js backend route/server function
3. `@quranjs/api/server`
4. Mushaf ID 1
5. satu page
6. `code_v2`
7. QCF V2 font
8. RTL
9. line grouping
10. responsive mobile rendering

Setelah satu halaman benar:

```text
Page 1 ↔ Page 2 ↔ Page 3
```

Kemudian:

```text
Page 1 → Page 604
```

Baru setelah itu integrasikan reading progress.

---

# 22. Quran Reader Performance

Jangan memuat seluruh resource Quran reader sekaligus.

Gunakan:

* on-demand loading,
* caching,
* prefetch halaman terdekat jika diperlukan.

Prioritaskan:

```text
Current page
     ↓
Previous page
     ↓
Next page
```

Hindari memuat 604 halaman sekaligus.

---

# 23. Content Sync

Jangan menganggap Content Sync sebagai mekanisme untuk otomatis menyimpan seluruh core Quran reader secara lokal.

Content Sync dapat digunakan untuk resource tertentu yang memang didukung oleh layanan tersebut, seperti resource content yang memerlukan synchronization/offline cache.

Untuk core Quran reader MVP:

> gunakan Content API + caching yang sesuai.

Jangan memperkenalkan Content Sync sebelum ada kebutuhan produk yang jelas.

---

# 24. Quran Search

Jika fitur search dibangun:

```text
Browser
   ↓
TilawahKu backend
   ↓
@quranjs/api/server
   ↓
Quran Foundation Search
```

Jangan memanggil Quran Foundation Search langsung dari browser menggunakan public client.

Search memerlukan permission yang sesuai pada Developer Console.

---

# 25. Accessibility

Quran Reader harus mempertimbangkan dua kebutuhan.

## Mushaf Mode

Prioritas:

* kesetiaan terhadap layout Mushaf,
* QCF V2,
* page-level rendering,
* RTL.

## Accessible Text Mode

Jika user membutuhkan ukuran teks besar atau layout yang lebih fleksibel:

* prioritaskan readability,
* jangan memaksakan pixel-perfect Mushaf layout,
* gunakan text rendering yang responsif.

Jangan mengorbankan accessibility hanya demi mempertahankan layout visual.

---

# 26. Design System

## Colors

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

## Typography

UI font:

```text
Geist
```

Weights:

```text
Heading:    700
Subheading: 600
Body:       400
Button:     500–600
Caption:    400–500
```

Quran Arabic font/rendering harus diperlakukan sebagai sistem typography terpisah dari UI font.

---

# 27. Border Radius

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
16px–20px
```

---

# 28. Spacing

Gunakan sistem 4px:

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

Hindari arbitrary spacing jika tidak diperlukan.

---

# 29. Shadows

Gunakan shadow secara minimal.

Prioritaskan:

* surface,
* border,
* whitespace,
* hierarchy.

Jangan membuat UI terasa seperti dashboard SaaS dengan heavy shadows.

---

# 30. shadcn / Base UI

Project menggunakan:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Base UI

shadcn/Base UI digunakan sebagai component foundation.

Namun:

> **shadcn is not the visual identity of TilawahKu.**

Gunakan component foundation untuk behavior/accessibility/reusability.

Visual identity berasal dari design system TilawahKu.

Jangan membiarkan default styling library menentukan seluruh tampilan aplikasi.

---

# 31. Component Architecture

Gunakan struktur konseptual:

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
    ├── continue-reading
    ├── reading-progress
    ├── reading-journey
    ├── reading-history
    ├── murojaah-summary
    └── quran-reader
```

`ui/`:

Generic reusable UI components.

`brand/`:

TilawahKu brand-specific components.

`tilawah/`:

Domain-specific components.

---

# 32. Frontend Architecture

Priorities:

1. UX clarity
2. Accessibility
3. Maintainability
4. Performance
5. Visual polish

Do not sacrifice UX because an implementation is easier.

Do not sacrifice maintainability merely to make a demo look impressive.

---

# 33. Responsive Design

Mobile is the primary experience.

Target mobile widths:

```text
360px
390px
412px
```

The application must remain usable on larger screens.

Avoid hard-coded absolute positioning when responsive layout can solve the problem.

Prefer:

* flex,
* grid,
* max-width,
* responsive padding,
* responsive typography.

---

# 34. Agent Workflow

Before implementing a significant feature:

1. Understand the product goal.
2. Read relevant `AGENTS.md` instructions.
3. Inspect existing architecture.
4. Inspect existing components.
5. Inspect existing design tokens.
6. Reuse existing patterns.
7. Implement the smallest correct solution.
8. Test responsive behavior.
9. Test accessibility.
10. Run lint/typecheck/tests.
11. Compare the result against the intended UX/design.

Do not create new architecture unnecessarily.

---

# 35. Product Decisions vs Implementation Decisions

Agent may make reasonable implementation decisions for:

* variable names,
* component extraction,
* internal helper functions,
* minor spacing adjustments,
* implementation details.

Agent must not silently change significant product decisions such as:

* homepage structure,
* dashboard hierarchy,
* primary CTA,
* authentication flow,
* Quran reader architecture,
* Mushaf reference,
* design system colors,
* product UX philosophy.

If a significant change appears beneficial, explain the reason before changing it.

---

# 36. Things To Avoid

Do not:

* build a generic SaaS dashboard,
* use excessive colors,
* use excessive cards,
* make gamification feel like a game,
* use streaks as pressure,
* shame users for inconsistency,
* ask users for data the system can derive,
* store derived page progress as the only source of truth,
* call Quran Content API directly from the browser,
* call Quran Search directly from the browser,
* expose Quran Foundation client secrets,
* use `@quranjs/api/public` for Content/Search,
* start new Quran Foundation integrations with the legacy root `QuranClient`,
* load all 604 Quran pages/resources at once,
* replace QCF page rendering with arbitrary HTML text when Mushaf fidelity is required,
* create a 604-image reader without a specific product/performance reason,
* add features simply because the underlying API supports them,
* introduce Quran Foundation OAuth unless the product actually needs its User APIs,
* add features without a UX reason.

---

# 37. Testing Quran Reader

Before considering Quran Reader implementation complete, verify:

### Data

* correct Mushaf ID,
* correct page number,
* correct verse range,
* correct line grouping,
* correct `code_v2`.

### Rendering

* correct QCF V2 font,
* RTL,
* correct page proportions,
* mobile readability,
* no text clipping,
* no unexpected wrapping.

### Navigation

* previous page,
* next page,
* direct page navigation,
* loading state,
* error state.

### Performance

* current page loads quickly,
* nearby page prefetching works if enabled,
* no unnecessary 604-page loading,
* caching behaves correctly.

### Tracking

Reader position must be convertible into TilawahKu reading progress without requiring duplicate manual input.

---

# 38. MVP Scope

Version 1 should focus on:

## Homepage

* welcome illustration/animation,
* Login,
* Google,
* registration.

## Authentication

* login,
* registration,
* Google authentication.

## Dashboard

* Continue Reading,
* today's activity,
* Reading Journey,
* Murojaah summary.

## Tilawah

* record reading range,
* verse-to-page mapping,
* reading progress.

## Quran Reader Prototype

First implement:

> one QCF V2 Mushaf Madinah page.

Then expand to multi-page navigation.

## Progress

* pages read,
* history,
* basic visual journey.

Do not implement every Quran Foundation API feature in MVP.

---

# 39. Current Architecture

The current target architecture is:

```text
                         TILAWAHKU
                             │
              ┌──────────────┴──────────────┐
              │                             │
        TilawahKu Auth                TilawahKu DB
              │                             │
              │                     ┌───────┼────────┐
              │                     │       │        │
              │                 Tilawah  Murojaah  Progress
              │
              └──────────────┬──────────────┘
                             │
                       Next.js App
                             │
                 ┌───────────┴───────────┐
                 │                       │
             Frontend                Backend
                 │                       │
                 │              @quranjs/api/server
                 │                       │
                 │                       ↓
                 │              Quran Foundation
                 │                       │
                 │           ┌───────────┼───────────┐
                 │           │           │           │
                 │        Content      Pages       Search
                 │           │           │           │
                 └───────────┴──────┬────┴───────────┘
                                    ↓
                              Quran Reader
                                    │
                              QCF V2 Rendering
                                    │
                             Mushaf Madinah
                              604 pages
```

If a Quran Foundation public OAuth/user-session feature is later required, use:

```text
Frontend
   ↓
@quranjs/api/public
```

while keeping confidential/server operations in:

```text
Backend
   ↓
@quranjs/api/server
```

---

# 40. Current Product Direction

The following decisions are baseline decisions:

* Support, not pressure.
* Homepage is simple and welcoming.
* Dashboard is based around "today".
* Tilawah and Murojaah are the two primary activities.
* Reading Journey is more important than a generic activity tracker.
* Page is the primary visible unit of Quran reading progress.
* Reading records should preserve verse/range-level data.
* Mushaf Madinah / QCF V2 is the target Mushaf rendering.
* Quran Foundation is the Quran data provider.
* TilawahKu owns user identity and user journey data.
* Content/Search use Quran Foundation server APIs.
* Quran Foundation `client_secret` is server-only.
* shadcn/Base UI is a foundation, not the visual identity.
* Geist is the UI font.
* Mobile experience is the priority.
* UX comes before feature count.
* Quran Reader should be proven with one page before expanding to 604 pages.

---

# 41. Source of Truth for New Decisions

When a new product or technical decision is made:

1. Prefer the latest explicit product decision from the project owner.
2. Check existing architecture before introducing a new pattern.
3. Check the current Quran Foundation documentation for Quran Foundation integrations.
4. Update this file when a decision becomes a stable project rule.
5. Do not silently overwrite established product decisions.

For Quran Foundation integration, prefer the current official documentation and runtime-specific SDK guidance over older examples or legacy integrations.

Official references:

* Developer Journey: https://api-docs.quran.foundation/docs/developer-journey/
* JavaScript SDK: https://api-docs.quran.foundation/docs/sdk/javascript/
* App Shapes: https://api-docs.quran.foundation/docs/sdk/javascript/app-shapes/
* Runtime Matrix: https://api-docs.quran.foundation/docs/sdk/javascript/runtime-matrix/
* Auth Matrix: https://api-docs.quran.foundation/docs/sdk/javascript/auth-matrix/
* Font Rendering: https://api-docs.quran.foundation/docs/tutorials/fonts/font-rendering/
* Page Layout: https://api-docs.quran.foundation/docs/tutorials/fonts/page-layout/
* Content Sync: https://api-docs.quran.foundation/docs/tutorials/content-sync/getting-started/

---

# 42. Final Product Principle

Every feature should answer:

> **Does this help the user continue their Quran journey with less friction and more encouragement?**

If the answer is no, question whether the feature belongs in TilawahKu.
