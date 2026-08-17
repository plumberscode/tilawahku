export interface SurahInfo {
  number: number;
  nameArabic: string;
  nameSimple: string;
  nameTranslated: string;
  versesCount: number;
  startPage: number;
  revelationPlace: "makkah" | "madinah";
}

export const SURAHS: SurahInfo[] = [
  { number: 1, nameArabic: "الفاتحة", nameSimple: "Al-Fatihah", nameTranslated: "Pembukaan", versesCount: 7, startPage: 1, revelationPlace: "makkah" },
  { number: 2, nameArabic: "البقرة", nameSimple: "Al-Baqarah", nameTranslated: "Sapi Betina", versesCount: 286, startPage: 2, revelationPlace: "madinah" },
  { number: 3, nameArabic: "آل عمران", nameSimple: "Ali 'Imran", nameTranslated: "Keluarga Imran", versesCount: 200, startPage: 50, revelationPlace: "madinah" },
  { number: 4, nameArabic: "النساء", nameSimple: "An-Nisa'", nameTranslated: "Wanita", versesCount: 176, startPage: 77, revelationPlace: "madinah" },
  { number: 5, nameArabic: "المائدة", nameSimple: "Al-Ma'idah", nameTranslated: "Jamuan Hidangan", versesCount: 120, startPage: 106, revelationPlace: "madinah" },
  { number: 6, nameArabic: "الأنعام", nameSimple: "Al-An'am", nameTranslated: "Binatang Ternak", versesCount: 165, startPage: 128, revelationPlace: "makkah" },
  { number: 7, nameArabic: "الأعراف", nameSimple: "Al-A'raf", nameTranslated: "Tempat-Tempat Tinggi", versesCount: 206, startPage: 151, revelationPlace: "makkah" },
  { number: 8, nameArabic: "الأنفال", nameSimple: "Al-Anfal", nameTranslated: "Rampasan Perang", versesCount: 75, startPage: 177, revelationPlace: "madinah" },
  { number: 9, nameArabic: "التوبة", nameSimple: "At-Tawbah", nameTranslated: "Pengampunan", versesCount: 129, startPage: 187, revelationPlace: "madinah" },
  { number: 10, nameArabic: "يونس", nameSimple: "Yunus", nameTranslated: "Nabi Yunus", versesCount: 109, startPage: 208, revelationPlace: "makkah" },
  { number: 11, nameArabic: "هود", nameSimple: "Hud", nameTranslated: "Nabi Hud", versesCount: 123, startPage: 221, revelationPlace: "makkah" },
  { number: 12, nameArabic: "يوسف", nameSimple: "Yusuf", nameTranslated: "Nabi Yusuf", versesCount: 111, startPage: 235, revelationPlace: "makkah" },
  { number: 13, nameArabic: "الرعد", nameSimple: "Ar-Ra'd", nameTranslated: "Guruh", versesCount: 43, startPage: 249, revelationPlace: "madinah" },
  { number: 14, nameArabic: "إبراهيم", nameSimple: "Ibrahim", nameTranslated: "Nabi Ibrahim", versesCount: 52, startPage: 255, revelationPlace: "makkah" },
  { number: 15, nameArabic: "الحجر", nameSimple: "Al-Hijr", nameTranslated: "Negeri Hijr", versesCount: 99, startPage: 262, revelationPlace: "makkah" },
  { number: 16, nameArabic: "النحل", nameSimple: "An-Nahl", nameTranslated: "Lebah", versesCount: 128, startPage: 267, revelationPlace: "makkah" },
  { number: 17, nameArabic: "الإسراء", nameSimple: "Al-Isra'", nameTranslated: "Perjalanan Malam", versesCount: 111, startPage: 282, revelationPlace: "makkah" },
  { number: 18, nameArabic: "الكهف", nameSimple: "Al-Kahf", nameTranslated: "Gua", versesCount: 110, startPage: 293, revelationPlace: "makkah" },
  { number: 19, nameArabic: "مريم", nameSimple: "Maryam", nameTranslated: "Siti Maryam", versesCount: 98, startPage: 305, revelationPlace: "makkah" },
  { number: 20, nameArabic: "طه", nameSimple: "Ta-Ha", nameTranslated: "Tha-Ha", versesCount: 135, startPage: 312, revelationPlace: "makkah" },
  { number: 21, nameArabic: "الأنبياء", nameSimple: "Al-Anbiya'", nameTranslated: "Para Nabi", versesCount: 112, startPage: 322, revelationPlace: "makkah" },
  { number: 22, nameArabic: "الحج", nameSimple: "Al-Hajj", nameTranslated: "Haji", versesCount: 78, startPage: 332, revelationPlace: "madinah" },
  { number: 23, nameArabic: "المؤمنون", nameSimple: "Al-Mu'minun", nameTranslated: "Orang-Orang Mukmin", versesCount: 118, startPage: 342, revelationPlace: "makkah" },
  { number: 24, nameArabic: "النور", nameSimple: "An-Nur", nameTranslated: "Cahaya", versesCount: 64, startPage: 350, revelationPlace: "madinah" },
  { number: 25, nameArabic: "الفرقان", nameSimple: "Al-Furqan", nameTranslated: "Pembeda", versesCount: 77, startPage: 359, revelationPlace: "makkah" },
  { number: 26, nameArabic: "الشعراء", nameSimple: "Ash-Shu'ara'", nameTranslated: "Para Penyair", versesCount: 227, startPage: 367, revelationPlace: "makkah" },
  { number: 27, nameArabic: "النمل", nameSimple: "An-Naml", nameTranslated: "Semut", versesCount: 93, startPage: 377, revelationPlace: "makkah" },
  { number: 28, nameArabic: "القصص", nameSimple: "Al-Qasas", nameTranslated: "Kisah-Kisah", versesCount: 88, startPage: 385, revelationPlace: "makkah" },
  { number: 29, nameArabic: "العنكبوت", nameSimple: "Al-'Ankabut", nameTranslated: "Laba-Laba", versesCount: 69, startPage: 396, revelationPlace: "makkah" },
  { number: 30, nameArabic: "الروم", nameSimple: "Ar-Rum", nameTranslated: "Bangsa Romawi", versesCount: 60, startPage: 404, revelationPlace: "makkah" },
  { number: 31, nameArabic: "لقمان", nameSimple: "Luqman", nameTranslated: "Luqman", versesCount: 34, startPage: 411, revelationPlace: "makkah" },
  { number: 32, nameArabic: "السجدة", nameSimple: "As-Sajdah", nameTranslated: "Sujud", versesCount: 30, startPage: 415, revelationPlace: "makkah" },
  { number: 33, nameArabic: "الأحزاب", nameSimple: "Al-Ahzab", nameTranslated: "Golongan yang Bersekutu", versesCount: 73, startPage: 418, revelationPlace: "madinah" },
  { number: 34, nameArabic: "سبإ", nameSimple: "Saba'", nameTranslated: "Kaum Saba'", versesCount: 54, startPage: 428, revelationPlace: "makkah" },
  { number: 35, nameArabic: "فاطر", nameSimple: "Fatir", nameTranslated: "Pencipta", versesCount: 45, startPage: 434, revelationPlace: "makkah" },
  { number: 36, nameArabic: "يس", nameSimple: "Ya-Sin", nameTranslated: "Ya Sin", versesCount: 83, startPage: 440, revelationPlace: "makkah" },
  { number: 37, nameArabic: "الصافات", nameSimple: "As-Saffat", nameTranslated: "Barisan-Barisan", versesCount: 182, startPage: 446, revelationPlace: "makkah" },
  { number: 38, nameArabic: "ص", nameSimple: "Sad", nameTranslated: "Shad", versesCount: 88, startPage: 453, revelationPlace: "makkah" },
  { number: 39, nameArabic: "الزمر", nameSimple: "Az-Zumar", nameTranslated: "Rombongan-Rombongan", versesCount: 75, startPage: 458, revelationPlace: "makkah" },
  { number: 40, nameArabic: "غافر", nameSimple: "Ghafir", nameTranslated: "Maha Pengampun", versesCount: 85, startPage: 467, revelationPlace: "makkah" },
  { number: 41, nameArabic: "فصلت", nameSimple: "Fussilat", nameTranslated: "Yang Dijelaskan", versesCount: 54, startPage: 477, revelationPlace: "makkah" },
  { number: 42, nameArabic: "الشورى", nameSimple: "Ash-Shura", nameTranslated: "Musyawarah", versesCount: 53, startPage: 483, revelationPlace: "makkah" },
  { number: 43, nameArabic: "الزخرف", nameSimple: "Az-Zukhruf", nameTranslated: "Perhiasan", versesCount: 89, startPage: 489, revelationPlace: "makkah" },
  { number: 44, nameArabic: "الدخان", nameSimple: "Ad-Dukhan", nameTranslated: "Kabut", versesCount: 59, startPage: 496, revelationPlace: "makkah" },
  { number: 45, nameArabic: "الجاثية", nameSimple: "Al-Jathiyah", nameTranslated: "Yang Berlutut", versesCount: 37, startPage: 499, revelationPlace: "makkah" },
  { number: 46, nameArabic: "الأحقاف", nameSimple: "Al-Ahqaf", nameTranslated: "Bukit-Bukit Pasir", versesCount: 35, startPage: 502, revelationPlace: "makkah" },
  { number: 47, nameArabic: "محمد", nameSimple: "Muhammad", nameTranslated: "Nabi Muhammad", versesCount: 38, startPage: 507, revelationPlace: "madinah" },
  { number: 48, nameArabic: "الفتح", nameSimple: "Al-Fath", nameTranslated: "Kemenangan", versesCount: 29, startPage: 511, revelationPlace: "madinah" },
  { number: 49, nameArabic: "الحجرات", nameSimple: "Al-Hujurat", nameTranslated: "Kamar-Kamar", versesCount: 18, startPage: 515, revelationPlace: "madinah" },
  { number: 50, nameArabic: "ق", nameSimple: "Qaf", nameTranslated: "Qaf", versesCount: 45, startPage: 518, revelationPlace: "makkah" },
  { number: 51, nameArabic: "الذاريات", nameSimple: "Adh-Dhariyat", nameTranslated: "Angin yang Menerbangkan", versesCount: 60, startPage: 520, revelationPlace: "makkah" },
  { number: 52, nameArabic: "الطور", nameSimple: "At-Tur", nameTranslated: "Bukit Tursina", versesCount: 49, startPage: 523, revelationPlace: "makkah" },
  { number: 53, nameArabic: "النجم", nameSimple: "An-Najm", nameTranslated: "Bintang", versesCount: 62, startPage: 526, revelationPlace: "makkah" },
  { number: 54, nameArabic: "القمر", nameSimple: "Al-Qamar", nameTranslated: "Bulan", versesCount: 55, startPage: 528, revelationPlace: "makkah" },
  { number: 55, nameArabic: "الرحمن", nameSimple: "Ar-Rahman", nameTranslated: "Maha Pemurah", versesCount: 78, startPage: 531, revelationPlace: "madinah" },
  { number: 56, nameArabic: "الواقعة", nameSimple: "Al-Waqi'ah", nameTranslated: "Hari Kiamat", versesCount: 96, startPage: 534, revelationPlace: "makkah" },
  { number: 57, nameArabic: "الحديد", nameSimple: "Al-Hadid", nameTranslated: "Besi", versesCount: 29, startPage: 537, revelationPlace: "madinah" },
  { number: 58, nameArabic: "المجادلة", nameSimple: "Al-Mujadilah", nameTranslated: "Gugatan", versesCount: 22, startPage: 542, revelationPlace: "madinah" },
  { number: 59, nameArabic: "الحشر", nameSimple: "Al-Hashr", nameTranslated: "Pengusiran", versesCount: 24, startPage: 545, revelationPlace: "madinah" },
  { number: 60, nameArabic: "الممتحنة", nameSimple: "Al-Mumtahanah", nameTranslated: "Wanita yang Diuji", versesCount: 13, startPage: 549, revelationPlace: "madinah" },
  { number: 61, nameArabic: "الصف", nameSimple: "As-Saff", nameTranslated: "Barisan", versesCount: 14, startPage: 551, revelationPlace: "madinah" },
  { number: 62, nameArabic: "الجمعة", nameSimple: "Al-Jumu'ah", nameTranslated: "Hari Jum'at", versesCount: 11, startPage: 553, revelationPlace: "madinah" },
  { number: 63, nameArabic: "المنافقون", nameSimple: "Al-Munafiqun", nameTranslated: "Orang-Orang Munafik", versesCount: 11, startPage: 554, revelationPlace: "madinah" },
  { number: 64, nameArabic: "التغابن", nameSimple: "At-Taghabun", nameTranslated: "Hari Ditampakkan Kesalahan", versesCount: 18, startPage: 556, revelationPlace: "madinah" },
  { number: 65, nameArabic: "الطلاق", nameSimple: "At-Talaq", nameTranslated: "Talak", versesCount: 12, startPage: 558, revelationPlace: "madinah" },
  { number: 66, nameArabic: "التحريم", nameSimple: "At-Tahrim", nameTranslated: "Mengharamkan", versesCount: 12, startPage: 560, revelationPlace: "madinah" },
  { number: 67, nameArabic: "الملك", nameSimple: "Al-Mulk", nameTranslated: "Kerajaan", versesCount: 30, startPage: 562, revelationPlace: "makkah" },
  { number: 68, nameArabic: "القلم", nameSimple: "Al-Qalam", nameTranslated: "Pena", versesCount: 52, startPage: 564, revelationPlace: "makkah" },
  { number: 69, nameArabic: "الحاقة", nameSimple: "Al-Haqqah", nameTranslated: "Hari Kiamat", versesCount: 52, startPage: 566, revelationPlace: "makkah" },
  { number: 70, nameArabic: "المعارج", nameSimple: "Al-Ma'arij", nameTranslated: "Tempat Naik", versesCount: 44, startPage: 568, revelationPlace: "makkah" },
  { number: 71, nameArabic: "نوح", nameSimple: "Nuh", nameTranslated: "Nabi Nuh", versesCount: 28, startPage: 570, revelationPlace: "makkah" },
  { number: 72, nameArabic: "الجن", nameSimple: "Al-Jinn", nameTranslated: "Jin", versesCount: 28, startPage: 572, revelationPlace: "makkah" },
  { number: 73, nameArabic: "المزمل", nameSimple: "Al-Muzzammil", nameTranslated: "Orang yang Berselimut", versesCount: 20, startPage: 574, revelationPlace: "makkah" },
  { number: 74, nameArabic: "المدثر", nameSimple: "Al-Muddaththir", nameTranslated: "Orang yang Berkemul", versesCount: 56, startPage: 575, revelationPlace: "makkah" },
  { number: 75, nameArabic: "القيامة", nameSimple: "Al-Qiyamah", nameTranslated: "Hari Kiamat", versesCount: 40, startPage: 577, revelationPlace: "makkah" },
  { number: 76, nameArabic: "الإنسان", nameSimple: "Al-Insan", nameTranslated: "Manusia", versesCount: 31, startPage: 578, revelationPlace: "madinah" },
  { number: 77, nameArabic: "المرسلات", nameSimple: "Al-Mursalat", nameTranslated: "Malaikat yang Diutus", versesCount: 50, startPage: 580, revelationPlace: "makkah" },
  { number: 78, nameArabic: "النبإ", nameSimple: "An-Naba'", nameTranslated: "Berita Besar", versesCount: 40, startPage: 582, revelationPlace: "makkah" },
  { number: 79, nameArabic: "النازعات", nameSimple: "An-Nazi'at", nameTranslated: "Malaikat Pencabut", versesCount: 46, startPage: 583, revelationPlace: "makkah" },
  { number: 80, nameArabic: "عبس", nameSimple: "'Abasa", nameTranslated: "Bermuka Masam", versesCount: 42, startPage: 585, revelationPlace: "makkah" },
  { number: 81, nameArabic: "التكوير", nameSimple: "At-Takwir", nameTranslated: "Menggulung", versesCount: 29, startPage: 586, revelationPlace: "makkah" },
  { number: 82, nameArabic: "الانفطار", nameSimple: "Al-Infitar", nameTranslated: "Terbelah", versesCount: 19, startPage: 587, revelationPlace: "makkah" },
  { number: 83, nameArabic: "المطففين", nameSimple: "Al-Mutaffifin", nameTranslated: "Orang yang Curang", versesCount: 36, startPage: 587, revelationPlace: "makkah" },
  { number: 84, nameArabic: "الانشقاق", nameSimple: "Al-Inshiqaq", nameTranslated: "Terbelah", versesCount: 25, startPage: 589, revelationPlace: "makkah" },
  { number: 85, nameArabic: "البروج", nameSimple: "Al-Buruj", nameTranslated: "Gugusan Bintang", versesCount: 22, startPage: 590, revelationPlace: "makkah" },
  { number: 86, nameArabic: "الطارق", nameSimple: "At-Tariq", nameTranslated: "Bintang yang Datang Malam", versesCount: 17, startPage: 591, revelationPlace: "makkah" },
  { number: 87, nameArabic: "الأعلى", nameSimple: "Al-A'la", nameTranslated: "Maha Tinggi", versesCount: 19, startPage: 591, revelationPlace: "makkah" },
  { number: 88, nameArabic: "الغاشية", nameSimple: "Al-Ghashiyah", nameTranslated: "Hari Pembalasan", versesCount: 26, startPage: 592, revelationPlace: "makkah" },
  { number: 89, nameArabic: "الفجر", nameSimple: "Al-Fajr", nameTranslated: "Fajar", versesCount: 30, startPage: 593, revelationPlace: "makkah" },
  { number: 90, nameArabic: "البلد", nameSimple: "Al-Balad", nameTranslated: "Negeri", versesCount: 20, startPage: 594, revelationPlace: "makkah" },
  { number: 91, nameArabic: "الشمس", nameSimple: "Ash-Shams", nameTranslated: "Matahari", versesCount: 15, startPage: 595, revelationPlace: "makkah" },
  { number: 92, nameArabic: "الليل", nameSimple: "Al-Layl", nameTranslated: "Malam", versesCount: 21, startPage: 595, revelationPlace: "makkah" },
  { number: 93, nameArabic: "الضحى", nameSimple: "Ad-Duha", nameTranslated: "Waktu Dhuha", versesCount: 11, startPage: 596, revelationPlace: "makkah" },
  { number: 94, nameArabic: "الشرح", nameSimple: "Ash-Sharh", nameTranslated: "Kelapangan", versesCount: 8, startPage: 596, revelationPlace: "makkah" },
  { number: 95, nameArabic: "التين", nameSimple: "At-Tin", nameTranslated: "Buah Tin", versesCount: 8, startPage: 597, revelationPlace: "makkah" },
  { number: 96, nameArabic: "العلق", nameSimple: "Al-'Alaq", nameTranslated: "Segumpal Darah", versesCount: 19, startPage: 597, revelationPlace: "makkah" },
  { number: 97, nameArabic: "القدر", nameSimple: "Al-Qadr", nameTranslated: "Kemuliaan", versesCount: 5, startPage: 598, revelationPlace: "makkah" },
  { number: 98, nameArabic: "البينة", nameSimple: "Al-Bayyinah", nameTranslated: "Bukti Nyata", versesCount: 8, startPage: 598, revelationPlace: "madinah" },
  { number: 99, nameArabic: "الزلزلة", nameSimple: "Az-Zalzalah", nameTranslated: "Kegoncangan", versesCount: 8, startPage: 599, revelationPlace: "madinah" },
  { number: 100, nameArabic: "العاديات", nameSimple: "Al-'Adiyat", nameTranslated: "Kuda Perang", versesCount: 11, startPage: 599, revelationPlace: "makkah" },
  { number: 101, nameArabic: "القارعة", nameSimple: "Al-Qari'ah", nameTranslated: "Hari Kiamat", versesCount: 11, startPage: 600, revelationPlace: "makkah" },
  { number: 102, nameArabic: "التكاثر", nameSimple: "At-Takathur", nameTranslated: "Bermegah-Megahan", versesCount: 8, startPage: 600, revelationPlace: "makkah" },
  { number: 103, nameArabic: "العصر", nameSimple: "Al-'Asr", nameTranslated: "Masa / Waktu", versesCount: 3, startPage: 601, revelationPlace: "makkah" },
  { number: 104, nameArabic: "الهمزة", nameSimple: "Al-Humazah", nameTranslated: "Pengumpat", versesCount: 9, startPage: 601, revelationPlace: "makkah" },
  { number: 105, nameArabic: "الفيل", nameSimple: "Al-Fil", nameTranslated: "Gajah", versesCount: 5, startPage: 601, revelationPlace: "makkah" },
  { number: 106, nameArabic: "قريش", nameSimple: "Quraysh", nameTranslated: "Suku Quraisy", versesCount: 4, startPage: 602, revelationPlace: "makkah" },
  { number: 107, nameArabic: "الماعون", nameSimple: "Al-Ma'un", nameTranslated: "Barang yang Berguna", versesCount: 7, startPage: 602, revelationPlace: "makkah" },
  { number: 108, nameArabic: "الكوثر", nameSimple: "Al-Kawthar", nameTranslated: "Nikmat yang Berlimpah", versesCount: 3, startPage: 602, revelationPlace: "makkah" },
  { number: 109, nameArabic: "الكافرون", nameSimple: "Al-Kafirun", nameTranslated: "Orang-Orang Kafir", versesCount: 6, startPage: 603, revelationPlace: "makkah" },
  { number: 110, nameArabic: "النصر", nameSimple: "An-Nasr", nameTranslated: "Pertolongan", versesCount: 3, startPage: 603, revelationPlace: "madinah" },
  { number: 111, nameArabic: "المسد", nameSimple: "Al-Masad", nameTranslated: "Gejolak Api / Sabut", versesCount: 5, startPage: 603, revelationPlace: "makkah" },
  { number: 112, nameArabic: "الإخلاص", nameSimple: "Al-Ikhlas", nameTranslated: "Memurnikan Keesaan Allah", versesCount: 4, startPage: 604, revelationPlace: "makkah" },
  { number: 113, nameArabic: "الفلق", nameSimple: "Al-Falaq", nameTranslated: "Waktu Subuh", versesCount: 5, startPage: 604, revelationPlace: "makkah" },
  { number: 114, nameArabic: "الناس", nameSimple: "An-Nas", nameTranslated: "Manusia", versesCount: 6, startPage: 604, revelationPlace: "makkah" },
];

export const SURAH_MAP: Record<number, SurahInfo> = SURAHS.reduce((acc, surah) => {
  acc[surah.number] = surah;
  return acc;
}, {} as Record<number, SurahInfo>);

export const JUZ_PAGE_STARTS: Record<number, number> = {
  1: 1,
  2: 22,
  3: 42,
  4: 62,
  5: 82,
  6: 102,
  7: 121,
  8: 142,
  9: 162,
  10: 182,
  11: 201,
  12: 222,
  13: 242,
  14: 262,
  15: 282,
  16: 302,
  17: 322,
  18: 342,
  19: 362,
  20: 382,
  21: 402,
  22: 422,
  23: 442,
  24: 462,
  25: 482,
  26: 502,
  27: 522,
  28: 542,
  29: 562,
  30: 582,
};

/**
 * Get Surah information for any given Mushaf Madinah page number (1-604).
 */
export function getSurahByPage(pageNumber: number): SurahInfo {
  const safePage = Math.min(Math.max(1, pageNumber), 604);
  let found = SURAHS[0];

  for (const surah of SURAHS) {
    if (surah.startPage <= safePage) {
      found = surah;
    } else {
      break;
    }
  }

  return found;
}

/**
 * Get Juz number for any given Mushaf Madinah page number (1-604).
 */
export function getJuzByPage(pageNumber: number): number {
  const safePage = Math.min(Math.max(1, pageNumber), 604);
  for (let juz = 30; juz >= 1; juz--) {
    if (safePage >= (JUZ_PAGE_STARTS[juz] || 1)) {
      return juz;
    }
  }
  return 1;
}

