import React from "react";

interface MushafFooterProps {
  pageNumber: number;
}

// Convert numbers to Arabic numerals (e.g. 2 -> ٢, 3 -> ٣)
function toArabicNumerals(num: number): string {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((d) => arabicDigits[parseInt(d, 10)] ?? d)
    .join("");
}

export function MushafFooter({ pageNumber }: MushafFooterProps) {
  return (
    <footer
      className="w-full flex items-center justify-center pt-1.5 sm:pt-2 border-t border-[#E8DEC8] text-[#7A6E60] select-none text-xs sm:text-sm"
      dir="rtl"
      aria-label="Mushaf Page Footer"
    >
      <div className="inline-flex items-center gap-2 text-[#8A7D6F]">
        <span className="text-[#C4B49F] text-[9px] sm:text-[10px]">❖</span>
        <span
          className="font-bold text-[#3B3228] text-xs sm:text-sm px-1.5"
          style={{ fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif" }}
        >
          {toArabicNumerals(pageNumber)}
        </span>
        <span className="text-[#C4B49F] text-[9px] sm:text-[10px]">❖</span>
      </div>
    </footer>
  );
}
