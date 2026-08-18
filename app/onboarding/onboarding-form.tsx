"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  BookmarkCheck,
  ArrowRight,
  Search,
  Sparkles,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { SURAHS, getSurahByPage, getJuzByPage } from "@/lib/quran/surahs-data";
import { submitOnboardingProgress } from "@/app/actions/progress";

interface OnboardingFormProps {
  userName: string;
}

type OnboardingChoice = "not_started" | "has_read";

export function OnboardingForm({ userName }: OnboardingFormProps) {
  const [choice, setChoice] = useState<OnboardingChoice | null>(null);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [pageInputValue, setPageInputValue] = useState<string>("1");
  const [surahSearch, setSurahSearch] = useState<string>("");
  const [isSearchingSurah, setIsSearchingSurah] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Derived metadata for the currently selected page
  const currentSurah = getSurahByPage(selectedPage);
  const currentJuz = getJuzByPage(selectedPage);
  const nextReadingPage = selectedPage >= 604 ? 604 : selectedPage + 1;

  // Filter surahs for quick search jump
  const filteredSurahs = SURAHS.filter(
    (s) =>
      s.nameSimple.toLowerCase().includes(surahSearch.toLowerCase()) ||
      s.nameTranslated.toLowerCase().includes(surahSearch.toLowerCase()) ||
      s.number.toString() === surahSearch.trim()
  ).slice(0, 6);

  const handlePageChange = (num: number) => {
    const clamped = Math.min(Math.max(1, num), 604);
    setSelectedPage(clamped);
    setPageInputValue(clamped.toString());
  };

  const handleInputBlur = () => {
    const parsed = parseInt(pageInputValue, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 604) {
      setSelectedPage(parsed);
    } else {
      setPageInputValue(selectedPage.toString());
    }
  };

  const handleSubmit = () => {
    if (!choice) {
      setErrorMessage("Silakan pilih salah satu opsi di bawah untuk melanjutkan.");
      return;
    }

    setErrorMessage(null);
    const completedPage = choice === "not_started" ? 0 : selectedPage;

    startTransition(async () => {
      const res = await submitOnboardingProgress(completedPage);

      if (!res.success) {
        setErrorMessage(res.error || "Terjadi kesalahan saat menyimpan progress.");
        return;
      }

      if (res.redirectUrl) {
        router.push(res.redirectUrl);
      }
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
      {/* Welcome & Question Header */}
      <div className="text-center flex flex-col gap-2">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBCC]/60 text-[#628A45] text-xs font-semibold mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Selamat Datang, {userName}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#3B342D] tracking-tight">
          Sudah membaca sampai halaman berapa?
        </h1>

        <p className="text-sm sm:text-base text-[#8A8178] leading-relaxed">
          Pilih halaman terakhir yang sudah selesai kamu baca agar TilawahKu dapat mencatat perjalananmu dengan tepat.
        </p>
      </div>

      {/* Error notification if any */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm text-center">
          {errorMessage}
        </div>
      )}

      {/* Option Cards */}
      <div className="flex flex-col gap-3.5">
        {/* Option A: "Saya belum mulai" */}
        <button
          type="button"
          onClick={() => {
            setChoice("not_started");
            setErrorMessage(null);
          }}
          className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
            choice === "not_started"
              ? "border-[#628A45] bg-[#F4F8F0] shadow-sm ring-2 ring-[#628A45]/20"
              : "border-[#E5DDD3] bg-[#FFFCF8] hover:bg-[#F9F3EC] active:bg-[#F3EDE5]"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                choice === "not_started"
                  ? "bg-[#628A45] text-white"
                  : "bg-[#EADBCC]/60 text-[#628A45]"
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-base text-[#3B342D]">
                Saya belum mulai
              </span>
              <span className="text-xs text-[#8A8178] mt-0.5">
                Mulai perjalanan tilawah dari awal (Halaman 1)
              </span>
            </div>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              choice === "not_started"
                ? "border-[#628A45] bg-[#628A45] text-white"
                : "border-[#D4C4B2] bg-white"
            }`}
          >
            {choice === "not_started" && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </button>

        {/* Option B: "Sudah membaca sampai halaman tertentu" */}
        <button
          type="button"
          onClick={() => {
            setChoice("has_read");
            setErrorMessage(null);
          }}
          className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
            choice === "has_read"
              ? "border-[#628A45] bg-[#F4F8F0] shadow-sm ring-2 ring-[#628A45]/20"
              : "border-[#E5DDD3] bg-[#FFFCF8] hover:bg-[#F9F3EC] active:bg-[#F3EDE5]"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                choice === "has_read"
                  ? "bg-[#628A45] text-white"
                  : "bg-[#EADBCC]/60 text-[#628A45]"
              }`}
            >
              <BookmarkCheck className="w-5 h-5" />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-base text-[#3B342D]">
                Sudah membaca sampai halaman tertentu
              </span>
              <span className="text-xs text-[#8A8178] mt-0.5">
                Pilih halaman terakhir yang sudah selesai dibaca
              </span>
            </div>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              choice === "has_read"
                ? "border-[#628A45] bg-[#628A45] text-white"
                : "border-[#D4C4B2] bg-white"
            }`}
          >
            {choice === "has_read" && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </button>
      </div>

      {/* Page Selector Area (Smoothly displayed when Option B is active) */}
      {choice === "has_read" && (
        <div className="p-5 rounded-2xl bg-[#FFFCF8] border border-[#E5DDD3] shadow-xs flex flex-col gap-4 animate-in fade-in-50 zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <label
              htmlFor="page-number-input"
              className="text-xs font-bold text-[#3B342D] uppercase tracking-wider"
            >
              Pilih Nomor Halaman (1 – 604):
            </label>
            <button
              type="button"
              onClick={() => setIsSearchingSurah(!isSearchingSurah)}
              className="text-xs font-semibold text-[#628A45] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              {isSearchingSurah ? "Tutup Cari Surah" : "Cari Berdasarkan Surah"}
            </button>
          </div>

          {/* Quick Surah Search Jump */}
          {isSearchingSurah && (
            <div className="p-3 rounded-xl bg-[#F6EFE7] border border-[#E5DDD3] flex flex-col gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8A7D6F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={surahSearch}
                  onChange={(e) => setSurahSearch(e.target.value)}
                  placeholder="Ketik nama surah (contoh: Yasin, Al-Kahf)..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#DCD1C3] bg-white text-[#3B342D] focus:outline-hidden focus:ring-1 focus:ring-[#628A45]"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto pr-1">
                {filteredSurahs.map((surah) => (
                  <button
                    key={surah.number}
                    type="button"
                    onClick={() => {
                      handlePageChange(surah.startPage);
                      setIsSearchingSurah(false);
                    }}
                    className="p-1.5 rounded-lg bg-white hover:bg-[#FAF4ED] border border-[#E5DDD3] text-left text-xs transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="font-semibold text-[#3B342D] truncate">
                      {surah.number}. {surah.nameSimple}
                    </span>
                    <span className="text-[10px] text-[#8A7D6F] flex-shrink-0 ml-1">
                      Hal {surah.startPage}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Number Input & Steppers */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(selectedPage - 10)}
              disabled={selectedPage <= 10}
              className="px-2.5 py-2.5 rounded-xl border border-[#E5DDD3] bg-[#F7EFE6] hover:bg-[#EDE3D6] disabled:opacity-30 text-xs font-bold text-[#3B342D] transition-colors cursor-pointer"
            >
              -10
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(selectedPage - 1)}
              disabled={selectedPage <= 1}
              className="px-3 py-2.5 rounded-xl border border-[#E5DDD3] bg-[#F7EFE6] hover:bg-[#EDE3D6] disabled:opacity-30 text-xs font-bold text-[#3B342D] transition-colors cursor-pointer"
            >
              -1
            </button>

            <div className="flex-1 relative">
              <input
                id="page-number-input"
                type="number"
                min={1}
                max={604}
                value={pageInputValue}
                onChange={(e) => {
                  setPageInputValue(e.target.value);
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1 && val <= 604) {
                    setSelectedPage(val);
                  }
                }}
                onBlur={handleInputBlur}
                className="w-full text-center py-2.5 px-3 text-lg font-bold text-[#3B342D] rounded-xl border-2 border-[#D4C4B2] bg-[#FFFEFA] focus:outline-hidden focus:border-[#628A45]"
              />
            </div>

            <button
              type="button"
              onClick={() => handlePageChange(selectedPage + 1)}
              disabled={selectedPage >= 604}
              className="px-3 py-2.5 rounded-xl border border-[#E5DDD3] bg-[#F7EFE6] hover:bg-[#EDE3D6] disabled:opacity-30 text-xs font-bold text-[#3B342D] transition-colors cursor-pointer"
            >
              +1
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(selectedPage + 10)}
              disabled={selectedPage >= 595}
              className="px-2.5 py-2.5 rounded-xl border border-[#E5DDD3] bg-[#F7EFE6] hover:bg-[#EDE3D6] disabled:opacity-30 text-xs font-bold text-[#3B342D] transition-colors cursor-pointer"
            >
              +10
            </button>
          </div>

          {/* Slider for quick dragging across 604 pages */}
          <div className="flex flex-col gap-1 px-1">
            <input
              type="range"
              min={1}
              max={604}
              value={selectedPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
              className="w-full accent-[#628A45] cursor-pointer h-2 bg-[#EADBCC] rounded-lg"
            />
            <div className="flex items-center justify-between text-[11px] text-[#8A7D6F]">
              <span>Hal. 1</span>
              <span>Hal. 300 (Juz 15)</span>
              <span>Hal. 604 (Khatam)</span>
            </div>
          </div>

          {/* Live Feedback Preview Card */}
          <div className="p-3 rounded-xl bg-[#F4F8F0] border border-[#D5E6CA] flex flex-col gap-1 text-xs">
            <div className="flex items-center justify-between font-bold text-[#3B342D]">
              <span className="text-[#628A45]">
                Halaman {selectedPage} dari 604
              </span>
              <span
                className="text-[#4A4035] text-sm"
                style={{ fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif" }}
              >
                {currentSurah.nameArabic}
              </span>
            </div>

            <div className="text-[#6A6054]">
              Surah {currentSurah.nameSimple} ({currentSurah.nameTranslated}) • Juz {currentJuz}
            </div>

            <div className="pt-1.5 mt-1 border-t border-[#D5E6CA] text-[11px] text-[#557A3C] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                {selectedPage >= 604
                  ? "Status: Menandai seluruh Al-Qur'an (604 halaman) telah selesai dibaca 🎉"
                  : `Lanjutkan membaca akan dimulai dari Halaman ${nextReadingPage}`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!choice || isPending}
          className="w-full h-[52px] rounded-2xl text-base font-semibold bg-[#628A45] text-white hover:bg-[#527739] active:bg-[#486b30] disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:cursor-not-allowed"
        >
          <span>
            {isPending
              ? "Menyimpan..."
              : choice === "not_started"
              ? "Mulai Tilawah"
              : selectedPage >= 604
              ? "Simpan & Selesai"
              : `Simpan & Lanjutkan ke Hal. ${nextReadingPage}`}
          </span>
          {!isPending && <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="text-center text-xs text-[#8A7D6F] flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Posisi ini dapat kamu perbarui kapan saja saat membaca.</span>
        </p>
      </div>
    </div>
  );
}
