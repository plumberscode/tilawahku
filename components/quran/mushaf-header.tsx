import React from "react";

interface MushafHeaderProps {
  surahNameArabic: string;
  juzNumber: number;
}

// Convert numbers to Arabic numerals (e.g. 1 -> ١, 2 -> ٢)
function toArabicNumerals(num: number): string {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((d) => arabicDigits[parseInt(d, 10)] ?? d)
    .join("");
}

export function MushafHeader({ surahNameArabic, juzNumber }: MushafHeaderProps) {
  return (
    <header
      className="w-full flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 border-b border-[#E8DEC8] text-[#7A6E60] select-none text-xs sm:text-sm font-medium tracking-wide"
      dir="rtl"
      aria-label="Mushaf Page Header"
    >
      {/* Right side (RTL start): Surah Name */}
      <div className="flex items-center gap-1.5">
        <span className="text-[#A89880] text-[10px] sm:text-xs">سُورَةُ</span>
        <span
          className="text-[#4A4035] font-semibold text-xs sm:text-sm"
          style={{ fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif" }}
        >
          {surahNameArabic}
        </span>
      </div>

      {/* Center ornament / quiet indicator */}
      <div className="flex items-center gap-1 opacity-60 text-[#B5A58D] text-[10px]">
        <span>✦</span>
      </div>

      {/* Left side (RTL end): Juz Information */}
      <div className="flex items-center gap-1.5">
        <span className="text-[#A89880] text-[10px] sm:text-xs">الجُزْءُ</span>
        <span
          className="text-[#4A4035] font-semibold text-xs sm:text-sm"
          style={{ fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif" }}
        >
          {toArabicNumerals(juzNumber)}
        </span>
      </div>
    </header>
  );
}
