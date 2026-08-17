"use client";

import React from "react";
import { QuranWord } from "@/lib/quran/types";

interface MushafWordProps {
  word: QuranWord;
  fontName: string;
  isFontLoaded: boolean;
}

export function MushafWord({ word, fontName, isFontLoaded }: MushafWordProps) {
  const isVerseEnd = word.charTypeName === "end";
  const tooltipText = word.translation?.text
    ? `${word.transliteration?.text ? `[${word.transliteration.text}] ` : ""}${word.translation.text}`
    : word.location;

  if (isFontLoaded) {
    return (
      <span
        title={tooltipText}
        className={`inline-flex items-center justify-center cursor-pointer transition-colors duration-100 select-none px-[1px] py-0.5 rounded-sm hover:bg-[#628A45]/10 ${
          isVerseEnd ? "text-[#557A3C]" : "text-[#221C16]"
        }`}
        style={{
          fontFamily: `'${fontName}', 'UthmanicHafs', serif`,
        }}
        dangerouslySetInnerHTML={{ __html: word.codeV2 }}
      />
    );
  }

  // Fallback while QCF font is loading (using text_qpc_hafs / text_uthmani with UthmanicHafs font)
  return (
    <span
      title={tooltipText}
      className={`inline-flex items-center justify-center cursor-pointer select-none px-[2px] py-0.5 opacity-90 transition-opacity ${
        isVerseEnd ? "text-[#557A3C] text-sm font-semibold" : "text-[#221C16]"
      }`}
      style={{
        fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif",
      }}
    >
      {word.textQpcHafs || word.textUthmani || word.codeV2}
    </span>
  );
}
