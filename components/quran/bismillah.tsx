import React from "react";

export function Bismillah() {
  return (
    <div className="w-full text-center py-1 sm:py-2 select-none" dir="rtl">
      <p
        className="text-base sm:text-xl text-[#3B3228] tracking-wide"
        style={{
          fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif",
          lineHeight: 1.6,
        }}
      >
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </p>
    </div>
  );
}
