"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Check, SlidersHorizontal, Sparkles, Loader2 } from "lucide-react";
import { QuranPageData } from "@/lib/quran/types";
import { MurojaahPlan } from "@/lib/db/murojaah";
import { MushafPage } from "@/components/quran/mushaf-page";
import { MurojaahPlanModal } from "./murojaah-plan-modal";
import { completeMurojaahPlanAction } from "@/app/actions/murojaah";
import { useRouter } from "next/navigation";

import { SURAH_MAP } from "@/lib/quran/surahs-data";

interface MurojaahFocusViewProps {
  plan: MurojaahPlan;
  pageData: QuranPageData;
}

export function MurojaahFocusView({ plan, pageData }: MurojaahFocusViewProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompletedState, setIsCompletedState] = useState(plan.completed);

  const startSurahInfo = plan ? SURAH_MAP[plan.surahNumber] : null;
  const endSurahInfo = plan && plan.endSurahNumber ? SURAH_MAP[plan.endSurahNumber] : startSurahInfo;
  const isMultiSurah = plan && plan.endSurahNumber && plan.endSurahNumber !== plan.surahNumber;

  const bannerTitle = isMultiSurah
    ? `Mode Murojaah: ${startSurahInfo?.nameSimple} & ${endSurahInfo?.nameSimple}`
    : `Mode Murojaah: ${startSurahInfo?.nameSimple || pageData.surahNameSimple}`;

  const bannerSubtitle = isMultiSurah
    ? `${startSurahInfo?.nameSimple} (${plan.startVerse}) – ${endSurahInfo?.nameSimple} (${plan.endVerse}) (Hal. ${plan.pageNumber})`
    : `Ayat ${plan.startVerse} – ${plan.endVerse} (Hal. ${plan.pageNumber})`;

  const handleComplete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);

    try {
      const res = await completeMurojaahPlanAction();
      if (res.success) {
        setIsCompletedState(true);
      }
    } catch (e) {
      console.error("Error completing murojaah plan:", e);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <>
      <main
        className="min-h-screen w-full bg-[#FBF4EE] py-4 sm:py-6 px-3 sm:px-6 flex flex-col items-center justify-between"
        style={{ background: "#FBF4EE" }}
      >
        {/* Top Minimalist Header */}
        <div className="w-full max-w-[620px] mb-4 sm:mb-6 flex items-center justify-between gap-2 flex-wrap">
          {/* Back to Dashboard */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B65C9] hover:text-[#6E49AE] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>

          {/* Rencana Murojaah Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7FD] hover:bg-[#F3EDFB] border border-[#E9DCF8] text-xs font-bold text-[#734BB8] transition-colors cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Rencana Murojaah</span>
          </button>
        </div>

        {/* Target Murojaah Banner */}
        <div className="w-full max-w-[580px] mb-3 px-4 py-2.5 rounded-2xl bg-[#FAF7FD] border border-[#ECE4F7] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8B65C9]" />
            <span className="font-bold text-[#734BB8]">
              {bannerTitle}
            </span>
          </div>
          <span className="text-[#6A6054] font-medium">
            {bannerSubtitle}
          </span>
        </div>

        {/* Main Mushaf Content (Single Page Focus Mode) */}
        <div className="w-full flex-1 flex flex-col items-center justify-center my-auto py-2">
          <div className="w-full max-w-[580px] flex justify-center">
            <MushafPage pageData={pageData} />
          </div>
        </div>

        {/* Bottom Focus Actions */}
        <div className="w-full max-w-[580px] mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FFFCF8] border border-[#EAE2D8] shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#6A6054]">
            <Sparkles className="w-4 h-4 text-[#8B65C9] flex-shrink-0" />
            <span>
              {isCompletedState
                ? "Alhamdulillah, target ini sudah ditandai selesai!"
                : "Ulangi bacaan sampai lancar dan mutqin."}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isCompletedState && (
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#E8F5E1] hover:bg-[#D7EDCC] text-[#486B30] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isCompleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>Tandai Selesai</span>
              </button>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#734BB8] hover:bg-[#633EA3] active:bg-[#53338E] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>Atur Target Baru</span>
            </button>
          </div>
        </div>
      </main>

      {/* Plan Modal for next target */}
      <MurojaahPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialPage={plan.pageNumber}
        initialStartVerse={plan.startVerse}
        initialEndVerse={plan.endVerse}
        initialSurahNumber={plan.surahNumber}
        initialEndSurahNumber={plan.endSurahNumber ?? undefined}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </>
  );
}
