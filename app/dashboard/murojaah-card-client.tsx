"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, BookOpen, ArrowRight, Sparkles, SlidersHorizontal } from "lucide-react";
import { MurojaahPlanModal } from "@/components/murojaah/murojaah-plan-modal";
import { SURAH_MAP } from "@/lib/quran/surahs-data";
import { MurojaahPlan } from "@/lib/db/murojaah";

interface MurojaahCardClientProps {
  plan: MurojaahPlan | null;
}

export function MurojaahCardClient({ plan }: MurojaahCardClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const surahInfo = plan ? SURAH_MAP[plan.surahNumber] : null;

  return (
    <>
      <section className="w-full p-5 sm:p-6 rounded-3xl bg-[#FFFCF8] border border-[#EAE2D8] shadow-xs flex flex-col gap-3.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E5EFE0] text-[#628A45] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#2C261F]">
              Murojaah Hari Ini
            </h3>
          </div>

          {plan && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-[#628A45] hover:text-[#527739] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Ubah Rencana</span>
            </button>
          )}
        </div>

        {/* Inner Card State */}
        {!plan ? (
          /* Empty State: Belum Ada Rencana */
          <div className="bg-[#F8FBF6] border border-[#D5E6CA] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-[#D5E6CA] text-[#628A45] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#628A45]" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-[#2C261F]">
                  Belum ada rencana murojaah
                </span>
                <span className="text-xs text-[#8A8178]">
                  Tentukan target ayat yang ingin kamu ulang hari ini.
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#628A45] hover:bg-[#527739] active:bg-[#486b30] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <span>Buat Rencana</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Active State: Rencana Sudah Ada */
          <div className="bg-[#F8FBF6] border border-[#D5E6CA] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-[#D5E6CA] text-[#628A45] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <BookOpen className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-[#2C261F]">
                  Surah {surahInfo?.nameSimple || `Surah ${plan.surahNumber}`}
                </span>
                <span className="text-xs font-semibold text-[#5A5044]">
                  Ayat {plan.startVerse} – {plan.endVerse} • Halaman {plan.pageNumber}
                </span>
                <span className="text-[11px] text-[#8A8178] mt-0.5">
                  Ulangi dan kuatkan ingatanmu
                </span>
              </div>
            </div>

            <Link
              href="/murojaah"
              className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-[#628A45]/40 bg-white/90 hover:bg-[#F2F7EF] active:bg-[#E8F2E3] text-[#628A45] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <span>Mulai Murojaah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* Plan / Change Plan Modal */}
      <MurojaahPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialPage={plan?.pageNumber || 2}
        initialStartVerse={plan?.startVerse}
        initialEndVerse={plan?.endVerse}
      />
    </>
  );
}
