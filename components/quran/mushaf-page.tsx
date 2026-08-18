"use client";

import React from "react";
import { QuranPageData } from "@/lib/quran/types";
import { useQcfFont } from "./use-qcf-font";
import { MushafHeader } from "./mushaf-header";
import { MushafFooter } from "./mushaf-footer";
import { SurahHeader } from "./surah-header";
import { Bismillah } from "./bismillah";
import { MushafWord } from "./mushaf-word";

interface MushafPageProps {
  pageData: QuranPageData;
}

export function MushafPage({ pageData }: MushafPageProps) {
  const { isLoaded, fontName } = useQcfFont(pageData.pageNumber);

  return (
    <div className="w-full h-full max-w-[580px] mx-auto flex flex-col items-center">
      {/* 
        Outer Mushaf Page Container (The Parchment Sheet)
        Maintains consistent aspect ratio and proportions across all pages.
      */}
      <div
        className="w-full h-full bg-[#FFFCF8] rounded-2xl sm:rounded-3xl border border-[#E8DFD3] p-2 sm:p-3 md:p-4 flex flex-col min-h-[580px] sm:min-h-[760px] md:min-h-[820px] overflow-hidden"
        style={{
          boxShadow: "0 4px 24px -4px rgba(70, 50, 30, 0.06), 0 1px 4px rgba(70, 50, 30, 0.02)",
        }}
      >
        {/* 
          Inner Mushaf Frame (Double Hairline Traditional Frame)
        */}
        <div className="w-full flex-1 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#D8C7B0] p-1 sm:p-1.5 bg-[#FFFEFA] relative">
          {/* Inset delicate hairline */}
          <div className="w-full h-full flex-1 flex flex-col justify-between rounded-lg sm:rounded-xl border border-[#EADBCC] p-1.5 sm:p-2 bg-[#FFFEFA]">
            {/* Top Header: Surah & Juz metadata */}
            <MushafHeader
              surahNameArabic={pageData.surahNameArabic}
              juzNumber={pageData.juzNumber}
            />

            {/* Main Quran Text Area */}
            <main
              className="w-full flex-1 flex flex-col justify-start my-auto py-1 sm:py-2 text-[1.1rem] sm:text-[1.32rem] md:text-[1.42rem] lg:text-[1.35rem] xl:text-[1.48rem] leading-[2.0] sm:leading-[2.35]"
              dir="rtl"
              aria-label={`Quran Page ${pageData.pageNumber}`}
            >
              {/* 
                Dynamic Line Grouping:
                Renders whatever line numbers are returned by the API.
                - Regular lines (>= 6 words) use justify-between to cleanly align to margins without overflowing.
                - Truly short lines (< 6 words, like Page 2 Line 8) use justify-start (right-aligned in RTL) with natural gap.
              */}
              <div className="w-full flex flex-col">
                {pageData.lines.map((line) => {
                  if (line.type === "surah_header") {
                    return (
                      <SurahHeader
                        key={`header-${line.surahNumber}-${line.lineNumber}`}
                        surahNumber={line.surahNumber!}
                        surahNameArabic={line.surahNameArabic!}
                        surahNameSimple={line.surahNameSimple!}
                      />
                    );
                  }
                  
                  if (line.type === "bismillah") {
                    return <Bismillah key={`bismillah-${line.lineNumber}`} />;
                  }

                  // Only treat lines with very few words as incomplete/short lines (e.g. end of section)
                  const isShortLine = line.words.length < 6;

                  return (
                    <div
                      key={`line-${line.lineNumber}`}
                      className={`mushaf-line flex items-center w-full min-h-[34px] sm:min-h-[44px] my-[1px] px-1 ${
                        isShortLine ? "justify-start gap-1.5 sm:gap-2" : "justify-between"
                      }`}
                    >
                      {line.words.map((word) => (
                        <MushafWord
                          key={word.id}
                          word={word}
                          fontName={fontName}
                          isFontLoaded={isLoaded}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </main>

            {/* Bottom Footer: Minimal subtle page number */}
            <MushafFooter pageNumber={pageData.pageNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
