import React from "react";
import { getQuranPage } from "@/lib/quran/service";
import { QuranReaderView } from "@/components/quran/quran-reader-view";

export const metadata = {
  title: "Quran Reader - Tilawahku",
  description: "Digital Quran Reader Mushaf Madinah QCF V2 (Halaman 1–604)",
};

interface PageProps {
  searchParams: Promise<{ page?: string; mode?: string }>;
}

export default async function QuranReaderPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const rawPage = parseInt(resolvedParams.page || "2", 10);
  const currentPage = Math.min(Math.max(1, isNaN(rawPage) ? 2 : rawPage), 604);
  const displayMode = (resolvedParams.mode === "single" ? "single" : "spread") as "single" | "spread";

  // Calculate spread pages based on physical Mushaf Madinah:
  // Odd pages (1, 3, 5...) are on the RIGHT side.
  // Even pages (2, 4, 6...) are on the LEFT side.
  const rightPageNum = currentPage % 2 === 1 ? currentPage : currentPage - 1;
  const leftPageNum = Math.min(rightPageNum + 1, 604);

  // Fetch page data
  let primaryPageData = await getQuranPage(currentPage);
  let rightPageData = primaryPageData;
  let leftPageData = null;

  if (displayMode === "spread") {
    if (rightPageNum === currentPage) {
      rightPageData = primaryPageData;
      if (leftPageNum <= 604 && leftPageNum !== rightPageNum) {
        leftPageData = await getQuranPage(leftPageNum);
      }
    } else {
      rightPageData = await getQuranPage(rightPageNum);
      leftPageData = primaryPageData;
    }
  }

  // Navigation URLs
  const prevPageUrl =
    displayMode === "spread"
      ? `/prototype/quran-reader?page=${Math.max(1, rightPageNum - 2)}&mode=${displayMode}`
      : `/prototype/quran-reader?page=${Math.max(1, currentPage - 1)}&mode=${displayMode}`;

  const nextPageUrl =
    displayMode === "spread"
      ? `/prototype/quran-reader?page=${Math.min(604, rightPageNum + 2)}&mode=${displayMode}`
      : `/prototype/quran-reader?page=${Math.min(604, currentPage + 1)}&mode=${displayMode}`;

  const canGoPrev = displayMode === "spread" ? rightPageNum > 1 : currentPage > 1;
  const canGoNext = displayMode === "spread" ? leftPageNum < 604 : currentPage < 604;

  return (
    <QuranReaderView
      currentPage={currentPage}
      displayMode={displayMode}
      primaryPageData={primaryPageData}
      rightPageData={rightPageData}
      leftPageData={leftPageData}
      prevPageUrl={prevPageUrl}
      nextPageUrl={nextPageUrl}
      canGoPrev={canGoPrev}
      canGoNext={canGoNext}
    />
  );
}
