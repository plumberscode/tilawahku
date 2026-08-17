import { QuranPageData, QuranVerse, QuranWord, QuranLine } from "./types";
import { SURAH_MAP } from "./surahs-data";

interface ApiWordResponse {
  id: number;
  position: number;
  audio_url?: string | null;
  char_type_name: string;
  code_v2: string;
  line_number: number;
  page_number: number;
  text_uthmani?: string;
  text_qpc_hafs?: string;
  location?: string;
  translation?: {
    text?: string;
    language_name?: string;
  };
  transliteration?: {
    text?: string | null;
    language_name?: string;
  };
}

interface ApiVerseResponse {
  id: number;
  verse_number: number;
  verse_key: string;
  juz_number: number;
  hizb_number: number;
  rub_number: number;
  page_number: number;
  words: ApiWordResponse[];
}

interface ApiPageResponse {
  verses: ApiVerseResponse[];
}

/**
 * Server-side data fetcher for Quran pages with QCF V2 (Mushaf 1).
 * Credentials (QF_CLIENT_SECRET) remain strictly server-side.
 * Supports all pages 1–604.
 */
export async function getQuranPage(pageNumber: number = 2): Promise<QuranPageData> {
  const safePageNumber = Math.min(Math.max(1, pageNumber), 604);
  const wordFields = "code_v2,text_qpc_hafs,text_uthmani,line_number,page_number,location";
  const url = `https://api.quran.com/api/v4/verses/by_page/${safePageNumber}?mushaf=1&words=true&word_fields=${wordFields}`;

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  // If Quran Foundation credentials exist in environment, attach them on server-side
  if (process.env.QF_CLIENT_ID) {
    headers["x-client-id"] = process.env.QF_CLIENT_ID;
  }
  if (process.env.QF_ACCESS_TOKEN) {
    headers["x-auth-token"] = process.env.QF_ACCESS_TOKEN;
  }

  const response = await fetch(url, {
    headers,
    // Next.js caching: revalidate daily (86400s)
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Quran page ${safePageNumber}: ${response.status} ${response.statusText}`);
  }

  const data: ApiPageResponse = await response.json();
  const rawVerses = data.verses || [];

  if (rawVerses.length === 0) {
    throw new Error(`No verses found for page ${safePageNumber}`);
  }

  // Parse verses into clean types
  const verses: QuranVerse[] = rawVerses.map((v) => ({
    id: v.id,
    verseNumber: v.verse_number,
    verseKey: v.verse_key,
    juzNumber: v.juz_number,
    hizbNumber: v.hizb_number,
    rubNumber: v.rub_number,
    pageNumber: v.page_number,
    words: (v.words || []).map((w) => ({
      id: w.id,
      position: w.position,
      audioUrl: w.audio_url,
      charTypeName: w.char_type_name,
      codeV2: w.code_v2,
      lineNumber: w.line_number,
      pageNumber: w.page_number,
      textUthmani: w.text_uthmani,
      textQpcHafs: w.text_qpc_hafs,
      location: w.location,
      verseKey: v.verse_key,
      translation: w.translation ? {
        text: w.translation.text,
        languageName: w.translation.language_name,
      } : undefined,
      transliteration: w.transliteration ? {
        text: w.transliteration.text,
        languageName: w.transliteration.language_name,
      } : undefined,
    })),
  }));

  // Flatten all words across verses
  const allWords: QuranWord[] = [];
  for (const verse of verses) {
    for (const word of verse.words) {
      allWords.push(word);
    }
  }

  // Dynamically group all words by line_number (preserves exact API order)
  const lineMap = new Map<number, QuranWord[]>();
  for (const word of allWords) {
    const lineNum = word.lineNumber;
    if (!lineMap.has(lineNum)) {
      lineMap.set(lineNum, []);
    }
    lineMap.get(lineNum)!.push(word);
  }

  const sortedLineNumbers = Array.from(lineMap.keys()).sort((a, b) => a - b);
  const lines: QuranLine[] = sortedLineNumbers.map((lineNum) => ({
    lineNumber: lineNum,
    pageNumber: safePageNumber,
    words: lineMap.get(lineNum)!,
  }));

  // Extract Surah & Juz metadata from first verse
  const firstVerse = verses[0];
  const [surahStr] = firstVerse.verseKey.split(":");
  const surahNumber = parseInt(surahStr, 10) || 1;
  const juzNumber = firstVerse.juzNumber || 1;

  const surahMeta = SURAH_MAP[surahNumber] || {
    number: surahNumber,
    nameArabic: `سورة ${surahNumber}`,
    nameSimple: `Surah ${surahNumber}`,
    nameTranslated: `Surah ${surahNumber}`,
    versesCount: 0,
    startPage: safePageNumber,
    revelationPlace: "makkah" as const,
  };

  // Determine if this page contains the start of a Surah
  const startsSurah = verses.some((v) => v.verseNumber === 1);
  const hasSurahHeader = startsSurah;
  // Surah At-Tawbah (9) does not have Bismillah; Surah Al-Fatihah (1) has Bismillah as verse 1
  const hasBismillah = startsSurah && surahNumber !== 9 && surahNumber !== 1;

  return {
    pageNumber: safePageNumber,
    juzNumber,
    surahNumber,
    surahNameArabic: surahMeta.nameArabic,
    surahNameSimple: surahMeta.nameSimple,
    verses,
    lines,
    hasBismillah,
    hasSurahHeader,
  };
}
