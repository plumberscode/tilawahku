"use client";

import React from "react";
import Link from "next/link";
import { Home, BookOpen, Calendar, User } from "lucide-react";

interface BottomNavProps {
  currentPage: number;
}

export function BottomNav({ currentPage }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-1 pointer-events-none"
      aria-label="Navigasi Utama Bawah"
    >
      <div className="pointer-events-auto max-w-md sm:max-w-lg mx-auto bg-[#FFFCF8]/95 backdrop-blur-md border border-[#EBE4DA] rounded-3xl shadow-xl px-4 py-1.5 flex items-center justify-between">
        {/* Tab 1: Beranda (Active) */}
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 text-[#4A6434] hover:text-[#384E26] transition-colors flex-1"
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold">Beranda</span>
        </Link>

        {/* Tab 2: Qur'an */}
        <Link
          href={`/prototype/quran-reader?page=${currentPage}`}
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 text-[#8A8178] hover:text-[#4A6434] transition-colors flex-1"
        >
          <BookOpen className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium">Qur&apos;an</span>
        </Link>

        {/* Center Floating Action Button (Mulai Membaca) */}
        <div className="flex flex-col items-center justify-center px-1 flex-1">
          <Link
            href={`/prototype/quran-reader?page=${currentPage}`}
            className="w-13 h-13 -mt-6 rounded-full bg-[#4A6434] hover:bg-[#3D542B] active:bg-[#324522] text-white flex items-center justify-center shadow-lg border-[3.5px] border-[#FBF4EE] transition-all hover:scale-105 active:scale-95 cursor-pointer group"
            title="Lanjutkan Tilawah"
          >
            <BookOpen className="w-5 h-5 text-[#FAF6F0] group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Tab 4: Murojaah */}
        <Link
          href="/murojaah"
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 text-[#8A8178] hover:text-[#4A6434] transition-colors flex-1"
        >
          <Calendar className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium">Murojaah</span>
        </Link>

        {/* Tab 5: Profil */}
        <Link
          href="/onboarding?reset=true"
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 text-[#8A8178] hover:text-[#4A6434] transition-colors flex-1"
        >
          <User className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium">Profil</span>
        </Link>
      </div>
    </nav>
  );
}
