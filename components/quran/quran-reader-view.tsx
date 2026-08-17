"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { QuranPageData } from "@/lib/quran/types";
import { MushafPage } from "./mushaf-page";
import { ReaderMenu } from "./reader-menu";
import { ReadingConfirmationModal } from "./reading-confirmation-modal";

interface QuranReaderViewProps {
  currentPage: number;
  displayMode: "single" | "spread";
  primaryPageData: QuranPageData;
  rightPageData: QuranPageData;
  leftPageData: QuranPageData | null;
  prevPageUrl: string;
  nextPageUrl: string;
  canGoPrev: boolean;
  canGoNext: boolean;
}

const STORAGE_KEY = "tilawahku_quran_zoom";
const MIN_ZOOM = 0.65;
const MAX_ZOOM = 1.35;
const STEP = 0.05;

export function QuranReaderView({
  currentPage,
  displayMode,
  primaryPageData,
  rightPageData,
  leftPageData,
  prevPageUrl,
  nextPageUrl,
  canGoPrev,
  canGoNext,
}: QuranReaderViewProps) {
  // Zoom scale state (default 1.0 = 100%)
  const [zoom, setZoom] = useState<number>(1.0);
  const [isMounted, setIsMounted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sessionStartTime] = useState<number>(Date.now());
  const [initialPage] = useState<number>(currentPage);

  // Load saved zoom level on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed) && parsed >= MIN_ZOOM && parsed <= MAX_ZOOM) {
          setZoom(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const changeZoom = (newZoom: number) => {
    const clamped = Math.round(Math.min(Math.max(MIN_ZOOM, newZoom), MAX_ZOOM) * 100) / 100;
    setZoom(clamped);
    try {
      localStorage.setItem(STORAGE_KEY, clamped.toString());
    } catch {
      // Ignore storage errors
    }
  };

  const handleZoomIn = () => changeZoom(zoom + STEP);
  const handleZoomOut = () => changeZoom(zoom - STEP);
  const handleResetZoom = () => changeZoom(1.0);

  const zoomPercent = Math.round(zoom * 100);

  const handleBackToDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    const timeSpent = (Date.now() - sessionStartTime) / 1000;
    const hasUnconfirmedActivity = currentPage !== initialPage || timeSpent > 5;
    
    if (hasUnconfirmedActivity) {
      setShowConfirmation(true);
    } else {
      window.location.href = "/dashboard";
    }
  };

  // Combine verses for the modal
  let modalVerses = displayMode === "single" ? primaryPageData.verses : [...rightPageData.verses];
  if (displayMode === "spread" && leftPageData) {
    modalVerses = [...modalVerses, ...leftPageData.verses];
  }

  return (
    <>
    <main
      className="min-h-[100dvh] w-full bg-[#FBF4EE] pt-6 pb-10 sm:py-8 px-3 sm:px-6 flex flex-col items-center justify-between transition-colors"
      style={{ background: "#FBF4EE" }}
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-[1240px] mb-6 sm:mb-8 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#628A45] hover:text-[#527739] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </button>

          {/* Right Action Group: Zoom Controls + Menu */}
          <div className="flex items-center gap-2">
            {/* Zoom-In & Zoom-Out Controls */}
            <div
              className="inline-flex items-center p-1 rounded-xl bg-[#FFFCF8] border border-[#E5DDD3] shadow-xs select-none"
              aria-label="Kontrol Ukuran Tampilan Halaman"
            >
              {/* Zoom Out Button */}
              <button
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
                title="Perkecil Halaman (Zoom Out)"
                className="p-1 sm:p-1.5 rounded-lg text-[#7A6E60] hover:text-[#3B342D] hover:bg-[#F3EDE5] active:bg-[#EAE0D4] disabled:opacity-30 transition-colors cursor-pointer"
                aria-label="Perkecil Halaman"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Zoom Percentage / Reset Button */}
              <button
                onClick={handleResetZoom}
                title="Klik untuk reset ke 100%"
                className="px-1.5 sm:px-2 py-0.5 text-[11px] sm:text-xs font-semibold text-[#5A5044] hover:text-[#628A45] transition-colors cursor-pointer"
              >
                {isMounted ? `${zoomPercent}%` : "100%"}
              </button>

              {/* Zoom In Button */}
              <button
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
                title="Perbesar Halaman (Zoom In)"
                className="p-1 sm:p-1.5 rounded-lg text-[#7A6E60] hover:text-[#3B342D] hover:bg-[#F3EDE5] active:bg-[#EAE0D4] disabled:opacity-30 transition-colors cursor-pointer"
                aria-label="Perbesar Halaman"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Interactive Menu Button */}
            <ReaderMenu
              currentPage={currentPage}
              displayMode={displayMode}
              currentSurahName={primaryPageData.surahNameSimple}
            />
          </div>
        </div>
      </div>

      {/* 
        Main Mushaf Reader Content:
        Zoom scaling applies ONLY to this Quran page area and its contents.
        Using CSS zoom & max-width container scaling for ultra-sharp typography.
      */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto overflow-x-auto py-2">
        <div
          className="w-full flex justify-center items-center origin-top"
          style={{
            zoom: zoom !== 1.0 ? zoom : undefined,
          }}
        >
          {displayMode === "single" ? (
            /* Single Page Mode */
            <div className="w-full max-w-[580px] flex justify-center">
              <MushafPage pageData={primaryPageData} />
            </div>
          ) : (
            /* Two-Page Spread Mode (Desktop side-by-side, mobile stacked) */
            <div
              className="w-full max-w-[1240px] flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-4 xl:gap-8"
              dir="rtl"
            >
              {/* Right Page (Odd / Opening Page) */}
              <div className="w-full lg:w-1/2 flex justify-center items-stretch">
                <MushafPage pageData={rightPageData} />
              </div>

              {/* Left Page (Even / Facing Page) */}
              {leftPageData && (
                <div className="w-full lg:w-1/2 flex justify-center items-stretch">
                  <MushafPage pageData={leftPageData} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating / Sticky Navigation Bar (RTL Reading Order: Next on Left, Prev on Right) */}
      <div className="w-full max-w-[1240px] mt-8 sm:mt-8 flex items-center justify-between text-xs sm:text-sm text-[#7A6E60]">
        {/* Left Side: Next Page/Spread (Maju ke kiri dalam RTL) */}
        {canGoNext ? (
          <Link
            href={nextPageUrl}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#FFFCF8] hover:bg-[#F6EFE6] active:bg-[#EDE3D6] border border-[#E5DDD3] shadow-xs text-[#3B342D] font-medium transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#628A45]" />
            <span>
              <span className="hidden sm:inline">{displayMode === "spread" ? "Lembar " : "Halaman "}</span>
              Selanjutnya
            </span>
          </Link>
        ) : (
          <div />
        )}

        {/* Center: Current Page Info */}
        <div className="text-center text-xs text-[#8A7D6F] font-medium px-2">
          {displayMode === "spread" && leftPageData
            ? `Hal. ${rightPageData.pageNumber} – ${leftPageData.pageNumber} dari 604`
            : `Hal. ${currentPage} dari 604`}
        </div>

        {/* Right Side: Previous Page/Spread (Mundur ke kanan dalam RTL) */}
        {canGoPrev ? (
          <Link
            href={prevPageUrl}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#FFFCF8] hover:bg-[#F6EFE6] active:bg-[#EDE3D6] border border-[#E5DDD3] shadow-xs text-[#3B342D] font-medium transition-colors cursor-pointer"
          >
            <span>
              <span className="hidden sm:inline">{displayMode === "spread" ? "Lembar " : "Halaman "}</span>
              Sebelumnya
            </span>
            <ChevronRight className="w-4 h-4 text-[#628A45]" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
    <ReadingConfirmationModal
      isOpen={showConfirmation}
      onClose={() => setShowConfirmation(false)}
      onDiscard={() => {
        window.location.href = "/dashboard";
      }}
      verses={modalVerses}
      currentPage={currentPage}
    />
    </>
  );
}
