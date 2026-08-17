"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Check,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { saveMurojaahPlanAction, getPageVersesAction } from "@/app/actions/murojaah";
import { SURAHS, getSurahByPage, getJuzByPage, JUZ_PAGE_STARTS } from "@/lib/quran/surahs-data";
import { useRouter } from "next/navigation";

interface MurojaahPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
  initialStartVerse?: number;
  initialEndVerse?: number;
  onSuccess?: () => void;
}

export function MurojaahPlanModal({
  isOpen,
  onClose,
  initialPage = 2,
  initialStartVerse,
  initialEndVerse,
  onSuccess,
}: MurojaahPlanModalProps) {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [startVerse, setStartVerse] = useState<number>(initialStartVerse || 1);
  const [endVerse, setEndVerse] = useState<number>(initialEndVerse || 1);

  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [availableVerses, setAvailableVerses] = useState<{ id: number; verseNumber: number; verseKey: string }[]>([]);
  const [surahNumber, setSurahNumber] = useState<number>(1);
  const [surahName, setSurahName] = useState<string>("Al-Fatihah");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load verses whenever pageNumber changes
  useEffect(() => {
    let isCancelled = false;

    async function loadPageVerses() {
      setIsLoadingVerses(true);
      try {
        const res = await getPageVersesAction(pageNumber);
        if (!isCancelled && res.success && res.verses) {
          setAvailableVerses(res.verses);
          setSurahNumber(res.surahNumber || 1);
          setSurahName(res.surahNameSimple || "Surah");

          const firstVerseNum = res.verses[0]?.verseNumber || 1;
          const lastVerseNum = res.verses[res.verses.length - 1]?.verseNumber || 1;

          setStartVerse(firstVerseNum);
          setEndVerse(lastVerseNum);
        }
      } catch (err) {
        console.error("Error loading verses for page:", err);
      } finally {
        if (!isCancelled) {
          setIsLoadingVerses(false);
        }
      }
    }

    if (isOpen) {
      loadPageVerses();
    }

    return () => {
      isCancelled = true;
    };
  }, [pageNumber, isOpen]);

  if (!isOpen) return null;

  const currentSurah = getSurahByPage(pageNumber);
  const currentJuz = getJuzByPage(pageNumber);

  let searchResults: { id: string; title: string; subtitle: string; startPage: number }[] = [];
  const q = searchQuery.toLowerCase().trim();

  if (q) {
    const juzMatch = q.match(/^juz\s*(\d+)$/);
    if (juzMatch) {
      const juzNum = parseInt(juzMatch[1], 10);
      if (juzNum >= 1 && juzNum <= 30) {
        searchResults.push({
          id: `juz-${juzNum}`,
          title: `Juz ${juzNum}`,
          subtitle: `Hal. ${JUZ_PAGE_STARTS[juzNum]}`,
          startPage: JUZ_PAGE_STARTS[juzNum],
        });
      }
    } else {
      const sanitize = (str: string) =>
        str.toLowerCase().replace(/['\-\s]/g, "").replace(/o/g, "a");
      const sq = sanitize(q);

      const filtered = SURAHS.filter(
        (s) =>
          sanitize(s.nameSimple).includes(sq) ||
          sanitize(s.nameTranslated).includes(sq) ||
          s.number.toString() === q ||
          (sq === "yasin" && s.number === 36)
      );

      searchResults = filtered.slice(0, 6).map((s) => ({
        id: `surah-${s.number}`,
        title: `${s.number}. ${s.nameSimple}`,
        subtitle: `Hal. ${s.startPage}`,
        startPage: s.startPage,
      }));
    }
  }

  const handleStepper = (delta: number) => {
    const next = Math.min(Math.max(1, pageNumber + delta), 604);
    setPageNumber(next);
  };

  const handleSubmit = async () => {
    if (isSubmitting || availableVerses.length === 0) return;
    setIsSubmitting(true);

    try {
      const res = await saveMurojaahPlanAction({
        pageNumber,
        surahNumber,
        startVerse,
        endVerse: Math.max(startVerse, endVerse),
      });

      if (res.success) {
        if (onSuccess) onSuccess();
        onClose();
        router.refresh();
      } else {
        alert(res.error || "Gagal menyimpan rencana murojaah");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan rencana");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3B342D]/40 backdrop-blur-sm transition-opacity"
        onClick={isSubmitting ? undefined : onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-[#FFFCF8] rounded-3xl shadow-xl border border-[#E5DDD3] overflow-hidden flex flex-col my-auto max-h-[90dvh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E5DDD3]/60 bg-[#FAF7FD]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E7DCF7] text-[#8B65C9] flex items-center justify-center shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl font-bold text-[#2C261F]">
                Rencana Murojaah
              </h2>
              <p className="text-xs text-[#8A8178]">
                Tentukan target halaman dan ayat yang ingin kamu ulang
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-full bg-[#F3EDE5] hover:bg-[#EAE0D4] text-[#6A6054] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-6 custom-scrollbar">
          {/* Quick Surah Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul atau nomor surah dan juz..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD3] bg-white text-xs sm:text-sm text-[#3B342D] placeholder-[#A0988E] focus:outline-none focus:border-[#8B65C9] transition-all"
            />

            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E5DDD3] rounded-xl shadow-lg max-h-44 overflow-y-auto z-20 p-1 divide-y divide-[#F3EDE5]">
                {searchResults.map((res) => (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => {
                      setPageNumber(res.startPage);
                      setSearchQuery("");
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-[#FAF7FD] text-xs flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-[#2C261F]">
                      {res.title}
                    </span>
                    <span className="text-[#8B65C9] font-medium">
                      {res.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 1: Pilih Halaman Mushaf */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6A6054]">
              1. Pilih Halaman Mushaf (1–604)
            </label>

            {/* Page Number Stepper & Input */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleStepper(-10)}
                className="px-2.5 py-2 rounded-xl bg-[#F5EFE6] hover:bg-[#EAE0D4] text-xs font-bold text-[#5A5044] transition-colors cursor-pointer"
                title="Mundur 10 Halaman"
              >
                -10
              </button>

              <button
                type="button"
                onClick={() => handleStepper(-1)}
                className="p-2 rounded-xl bg-[#F5EFE6] hover:bg-[#EAE0D4] text-[#5A5044] transition-colors cursor-pointer"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center justify-center px-4 py-1 rounded-2xl bg-white border-2 border-[#8B65C9]/40 min-w-[120px] shadow-2xs">
                <span className="text-xs font-semibold text-[#8B65C9]">
                  Halaman
                </span>
                <input
                  type="number"
                  min={1}
                  max={604}
                  value={pageNumber}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      setPageNumber(Math.min(Math.max(1, val), 604));
                    }
                  }}
                  className="w-16 text-center text-xl font-extrabold text-[#2C261F] focus:outline-none bg-transparent"
                />
              </div>

              <button
                type="button"
                onClick={() => handleStepper(1)}
                className="p-2 rounded-xl bg-[#F5EFE6] hover:bg-[#EAE0D4] text-[#5A5044] transition-colors cursor-pointer"
                title="Halaman Selanjutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleStepper(10)}
                className="px-2.5 py-2 rounded-xl bg-[#F5EFE6] hover:bg-[#EAE0D4] text-xs font-bold text-[#5A5044] transition-colors cursor-pointer"
                title="Maju 10 Halaman"
              >
                +10
              </button>
            </div>

            {/* Live Surah & Juz Badge */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#FAF7FD] border border-[#ECE4F7] text-xs">
              <span className="font-bold text-[#734BB8]">
                Surah {currentSurah.nameSimple}
              </span>
              <span className="text-[#8A8178]">Juz {currentJuz}</span>
            </div>
          </div>

          {/* Section 2: Pilih Rentang Ayat */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6A6054]">
                2. Rentang Ayat di Halaman {pageNumber}
              </label>
              {isLoadingVerses && (
                <span className="text-xs text-[#8B65C9] flex items-center gap-1 font-medium">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Memuat ayat...
                </span>
              )}
            </div>

            {isLoadingVerses ? (
              <div className="p-6 rounded-2xl bg-white border border-[#E5DDD3] flex items-center justify-center gap-2 text-xs text-[#8A8178]">
                <Loader2 className="w-4 h-4 animate-spin text-[#8B65C9]" />
                <span>Mengambil data ayat halaman {pageNumber}...</span>
              </div>
            ) : availableVerses.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {/* Ayat Awal */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-[#5A5044]">
                    Ayat Awal:
                  </span>
                  <select
                    value={startVerse}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setStartVerse(val);
                      if (val > endVerse) {
                        setEndVerse(val);
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5DDD3] bg-white text-xs sm:text-sm font-semibold text-[#2C261F] focus:outline-none focus:border-[#8B65C9] cursor-pointer"
                  >
                    {availableVerses.map((v) => (
                      <option key={v.verseKey} value={v.verseNumber}>
                        Ayat {v.verseNumber}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ayat Akhir */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-[#5A5044]">
                    Ayat Akhir:
                  </span>
                  <select
                    value={endVerse}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setEndVerse(val);
                      if (val < startVerse) {
                        setStartVerse(val);
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5DDD3] bg-white text-xs sm:text-sm font-semibold text-[#2C261F] focus:outline-none focus:border-[#8B65C9] cursor-pointer"
                  >
                    {availableVerses.map((v) => (
                      <option key={v.verseKey} value={v.verseNumber}>
                        Ayat {v.verseNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#FFF8F0] border border-[#F3E5D4] text-xs text-[#8A7D6F]">
                Tidak ada ayat ditemukan untuk halaman ini.
              </div>
            )}

            {/* Target Summary Card */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7FD] border border-[#E9DCF8] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-[#8B65C9] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-[#8A8178]">Target yang akan disimpan:</span>
                <span className="font-bold text-[#734BB8] text-sm">
                  {surahName} Ayat {startVerse} – {endVerse} (Halaman {pageNumber})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E5DDD3] flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-1/3 py-3 rounded-2xl border border-[#E5DDD3] bg-[#F7F3EB] hover:bg-[#EFE8DD] text-[#5A5044] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isLoadingVerses || availableVerses.length === 0}
            className="w-2/3 py-3 rounded-2xl bg-[#734BB8] hover:bg-[#633EA3] active:bg-[#53338E] disabled:bg-[#C5BDB3] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Simpan Rencana</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
