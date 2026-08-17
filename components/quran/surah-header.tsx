import React from "react";

interface SurahHeaderProps {
  surahNumber: number;
  surahNameArabic: string;
  surahNameSimple: string;
}

export function SurahHeader({ surahNameArabic }: SurahHeaderProps) {
  return (
    <div className="w-full my-2 sm:my-3 flex items-center justify-center select-none" dir="rtl">
      <div className="relative w-full max-w-[96%] py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg border border-[#D5C2A5] bg-[#FAF3E8]/80 text-center shadow-xs">
        {/* Subtle corner motifs */}
        <span className="absolute top-0.5 right-1.5 text-[10px] text-[#B8A388]">❖</span>
        <span className="absolute top-0.5 left-1.5 text-[10px] text-[#B8A388]">❖</span>
        <span className="absolute bottom-0.5 right-1.5 text-[10px] text-[#B8A388]">❖</span>
        <span className="absolute bottom-0.5 left-1.5 text-[10px] text-[#B8A388]">❖</span>

        {/* Decorative divider lines flanking Surah title */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <span className="h-[1px] flex-1 bg-gradient-to-l from-[#C4B094] to-transparent" />
          <h2
            className="text-base sm:text-xl font-bold text-[#3B3228] px-2 tracking-wide"
            style={{ fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif" }}
          >
            سُورَةُ {surahNameArabic}
          </h2>
          <span className="h-[1px] flex-1 bg-gradient-to-r from-[#C4B094] to-transparent" />
        </div>
      </div>
    </div>
  );
}
