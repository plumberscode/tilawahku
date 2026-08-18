"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Bookmark, Loader2 } from "lucide-react";
import { confirmReadingSessionAction } from "@/app/actions/reading-session";
import { QuranVerse } from "@/lib/quran/types";
import { SURAH_MAP } from "@/lib/quran/surahs-data";

interface ReadingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  verses: QuranVerse[];
  currentPage: number;
}

export function ReadingConfirmationModal({
  isOpen,
  onClose,
  onDiscard,
  verses,
  currentPage,
}: ReadingConfirmationModalProps) {
  const router = useRouter();
  const [selectedVerseKey, setSelectedVerseKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Flatten verses if they span multiple pages or surahs
  // We want to show a clean list to the user
  const verseOptions = verses.map((v) => {
    const [surahNum, verseNum] = v.verseKey.split(":").map(Number);
    const surahName = SURAH_MAP[surahNum]?.nameSimple || `Surah ${surahNum}`;
    
    // Extract a small snippet (first 3-4 words) for context
    const snippetWords = v.words
      .filter((w) => w.charTypeName === "word")
      .slice(0, 4)
      .map((w) => w.textQpcHafs || w.textUthmani || "")
      .join(" ");

    return {
      verseKey: v.verseKey,
      surahNum,
      verseNum,
      surahName,
      snippet: snippetWords + "...",
      pageNumber: v.pageNumber,
    };
  });

  const handleSave = async () => {
    if (!selectedVerseKey || isSubmitting) return;
    
    setIsSubmitting(true);
    const selected = verseOptions.find((v) => v.verseKey === selectedVerseKey);
    if (!selected) {
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await confirmReadingSessionAction({
        surahNumber: selected.surahNum,
        endVerse: selected.verseNum,
        pageNumber: selected.pageNumber || currentPage,
      });

      if (res.success) {
        router.push("/dashboard");
      } else {
        console.error("Failed to save session:", res.error);
        setIsSubmitting(false);
      }
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    if (isSubmitting) return;
    onDiscard();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#3B342D]/40 backdrop-blur-sm transition-opacity"
        onClick={isSubmitting ? undefined : onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-md bg-[#FFFCF8] rounded-3xl shadow-xl border border-[#E5DDD3] overflow-hidden flex flex-col max-h-[90dvh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6 relative border-b border-[#E5DDD3]/60 bg-[#FBF4EE]/50">
          <div className="w-12 h-12 rounded-2xl bg-[#EADBCC]/60 text-[#628A45] flex items-center justify-center mb-4">
            <Bookmark className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#3B342D] text-center mb-1">
            Catat bacaanmu
          </h2>
          <p className="text-sm text-[#8A8178] text-center">
            Kamu tadi membaca sampai ayat mana?
          </p>
        </div>

        {/* Scrollable Verse List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          <div className="flex flex-col gap-2">
            {verseOptions.map((opt) => {
              const isSelected = selectedVerseKey === opt.verseKey;
              return (
                <button
                  key={opt.verseKey}
                  onClick={() => setSelectedVerseKey(opt.verseKey)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#628A45] bg-[#F2F7EF] shadow-sm"
                      : "border-[#E5DDD3] bg-white hover:border-[#D5E6CA] hover:bg-[#F8FBF6]"
                  }`}
                >
                  <div className="flex flex-col items-start text-left gap-1">
                    <span className={`font-semibold text-sm ${isSelected ? "text-[#486b30]" : "text-[#3B342D]"}`}>
                      {opt.surahName} • Ayat {opt.verseNum}
                    </span>
                    <span 
                      dir="rtl" 
                      className={`text-lg opacity-80 ${isSelected ? "text-[#628A45]" : "text-[#5A5044]"}`}
                      style={{ fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif" }}
                    >
                      {opt.snippet}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    isSelected ? "bg-[#628A45] border-[#628A45]" : "border-[#C5BDB3]"
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E5DDD3] flex flex-col gap-3">
          <button
            onClick={handleSave}
            disabled={!selectedVerseKey || isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-[#628A45] hover:bg-[#527739] active:bg-[#486b30] disabled:bg-[#C5BDB3] disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>Simpan Bacaan</span>
            )}
          </button>
          
          <button
            onClick={handleDiscard}
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-transparent hover:bg-[#FFF5F5] text-[#D9534F] font-semibold text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Keluar tanpa menyimpan
          </button>
        </div>
      </div>
    </div>
  );
}
