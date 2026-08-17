export interface QuranWord {
  id: number;
  position: number;
  audioUrl?: string | null;
  charTypeName: "word" | "end" | string;
  codeV2: string;
  lineNumber: number;
  pageNumber: number;
  textUthmani?: string;
  textQpcHafs?: string;
  location?: string;
  verseKey?: string;
  translation?: {
    text?: string;
    languageName?: string;
  };
  transliteration?: {
    text?: string | null;
    languageName?: string;
  };
}

export interface QuranVerse {
  id: number;
  verseNumber: number;
  verseKey: string;
  juzNumber: number;
  hizbNumber: number;
  rubNumber: number;
  pageNumber: number;
  words: QuranWord[];
}

export interface QuranLine {
  lineNumber: number;
  pageNumber: number;
  words: QuranWord[];
}

export interface QuranPageData {
  pageNumber: number;
  juzNumber: number;
  surahNumber: number;
  surahNameArabic: string;
  surahNameSimple: string;
  verses: QuranVerse[];
  lines: QuranLine[];
  hasBismillah: boolean;
  hasSurahHeader: boolean;
}
