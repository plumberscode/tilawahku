"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  BookOpen,
  FileText,
  LayoutGrid,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { SURAHS, SurahInfo } from "@/lib/quran/surahs-data";

interface ReaderMenuProps {
  currentPage: number;
  displayMode: "single" | "spread";
  currentSurahName: string;
}

type TabType = "page" | "surah" | "display";

export function ReaderMenu({
  currentPage,
  displayMode,
  currentSurahName,
}: ReaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("page");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageInput, setPageInput] = useState(currentPage.toString());
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Filter surahs based on search query
  const filteredSurahs = SURAHS.filter(
    (s) =>
      s.nameSimple.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameTranslated.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameArabic.includes(searchQuery) ||
      s.number.toString() === searchQuery.trim()
  );

  const navigateTo = (page: number, mode: "single" | "spread" = displayMode) => {
    const safePage = Math.min(Math.max(1, page), 604);
    startTransition(() => {
      router.push(`/prototype/quran-reader?page=${safePage}&mode=${mode}`);
      setIsOpen(false);
    });
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 604) {
      navigateTo(parsed);
    }
  };

  return (
    <>
      {/* 
        The Menu Trigger Button 
        Replaces the static 'Mode desktop' box
      */}
      <button
        onClick={() => {
          setPageInput(currentPage.toString());
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFFCF8] hover:bg-[#F7EFE6] active:bg-[#EFE6DB] border border-[#E5DDD3] shadow-xs text-xs sm:text-sm font-medium text-[#3B342D] transition-all cursor-pointer group"
        aria-label="Buka Menu Navigasi & Tampilan"
      >
        <Menu className="w-4 h-4 text-[#628A45] group-hover:scale-105 transition-transform" />
        <span className="font-semibold text-[#3B342D]">Menu</span>
        <span className="hidden sm:inline-block text-[#B5A898]">•</span>
        <span className="hidden sm:inline-block text-[#7A6E60]">
          Hal. {currentPage}
        </span>
      </button>

      {/* 
        Smooth Animated Modal / Drawer 
      */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Card Content */}
          <div
            className="relative w-full max-w-lg bg-[#FFFCF8] rounded-2xl sm:rounded-3xl border border-[#E5DDD3] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden z-10 animate-in zoom-in-95 duration-200 text-[#3B342D]"
            style={{
              boxShadow: "0 20px 40px -8px rgba(60, 45, 30, 0.15)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBE2D7]">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-base sm:text-lg font-bold text-[#3B342D] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#628A45]" />
                  Navigasi & Tampilan
                </h2>
                <p className="text-xs text-[#8A7D6F]">
                  Sedang membaca: Hal. {currentPage} ({currentSurahName})
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[#8A7D6F] hover:text-[#3B342D] hover:bg-[#F3EDE5] transition-colors cursor-pointer"
                aria-label="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Segmented Tab Navigation */}
            <div className="flex items-center p-1.5 mx-4 mt-3 rounded-xl bg-[#F4EDE4] border border-[#E5DDD3]">
              <button
                onClick={() => setActiveTab("page")}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "page"
                    ? "bg-[#FFFCF8] text-[#628A45] shadow-xs"
                    : "text-[#8A7D6F] hover:text-[#3B342D]"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Halaman
              </button>

              <button
                onClick={() => setActiveTab("surah")}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "surah"
                    ? "bg-[#FFFCF8] text-[#628A45] shadow-xs"
                    : "text-[#8A7D6F] hover:text-[#3B342D]"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Surah
              </button>

              <button
                onClick={() => setActiveTab("display")}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "display"
                    ? "bg-[#FFFCF8] text-[#628A45] shadow-xs"
                    : "text-[#8A7D6F] hover:text-[#3B342D]"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Tampilan
              </button>
            </div>

            {/* Tab 1: Halaman (Page Navigation) */}
            {activeTab === "page" && (
              <div className="p-5 flex flex-col gap-5 overflow-y-auto">
                {/* Direct Number Input */}
                <form onSubmit={handlePageSubmit} className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#6A6054]">
                    Lompat ke Nomor Halaman (1 – 604):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={604}
                      value={pageInput}
                      onChange={(e) => setPageInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DCD1C3] bg-[#FFFEFA] text-base font-semibold text-[#3B342D] focus:outline-hidden focus:ring-2 focus:ring-[#628A45]"
                      placeholder="Masukkan halaman (1-604)"
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="px-5 py-2.5 rounded-xl bg-[#628A45] hover:bg-[#527739] text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      Buka
                    </button>
                  </div>
                </form>

                {/* Stepper / Quick Navigation */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#6A6054]">
                    Navigasi Cepat:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => navigateTo(currentPage - 10)}
                      disabled={currentPage <= 10}
                      className="py-2 px-2 rounded-xl bg-[#F7EFE6] hover:bg-[#EDE3D6] disabled:opacity-40 text-xs font-semibold text-[#3B342D] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <ChevronsLeft className="w-3.5 h-3.5" /> -10 Hal
                    </button>
                    <button
                      onClick={() => navigateTo(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="py-2 px-2 rounded-xl bg-[#F7EFE6] hover:bg-[#EDE3D6] disabled:opacity-40 text-xs font-semibold text-[#3B342D] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> -1 Hal
                    </button>
                    <button
                      onClick={() => navigateTo(currentPage + 1)}
                      disabled={currentPage >= 604}
                      className="py-2 px-2 rounded-xl bg-[#F7EFE6] hover:bg-[#EDE3D6] disabled:opacity-40 text-xs font-semibold text-[#3B342D] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      +1 Hal <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigateTo(currentPage + 10)}
                      disabled={currentPage >= 595}
                      className="py-2 px-2 rounded-xl bg-[#F7EFE6] hover:bg-[#EDE3D6] disabled:opacity-40 text-xs font-semibold text-[#3B342D] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      +10 Hal <ChevronsRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Favorite Landmarks / Juz Quick Jumps */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#6A6054] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#628A45]" />
                    Pilihan Populer:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <button
                      onClick={() => navigateTo(1)}
                      className="p-2.5 rounded-xl border border-[#E5DDD3] bg-[#FFFEFA] hover:bg-[#F7EFE6] text-left transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#3B342D]">Al-Fatihah</div>
                      <div className="text-[11px] text-[#8A7D6F]">Halaman 1</div>
                    </button>
                    <button
                      onClick={() => navigateTo(2)}
                      className="p-2.5 rounded-xl border border-[#E5DDD3] bg-[#FFFEFA] hover:bg-[#F7EFE6] text-left transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#3B342D]">Al-Baqarah</div>
                      <div className="text-[11px] text-[#8A7D6F]">Halaman 2</div>
                    </button>
                    <button
                      onClick={() => navigateTo(293)}
                      className="p-2.5 rounded-xl border border-[#E5DDD3] bg-[#FFFEFA] hover:bg-[#F7EFE6] text-left transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#3B342D]">Al-Kahf</div>
                      <div className="text-[11px] text-[#8A7D6F]">Halaman 293</div>
                    </button>
                    <button
                      onClick={() => navigateTo(440)}
                      className="p-2.5 rounded-xl border border-[#E5DDD3] bg-[#FFFEFA] hover:bg-[#F7EFE6] text-left transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#3B342D]">Ya-Sin</div>
                      <div className="text-[11px] text-[#8A7D6F]">Halaman 440</div>
                    </button>
                    <button
                      onClick={() => navigateTo(562)}
                      className="p-2.5 rounded-xl border border-[#E5DDD3] bg-[#FFFEFA] hover:bg-[#F7EFE6] text-left transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#3B342D]">Al-Mulk</div>
                      <div className="text-[11px] text-[#8A7D6F]">Halaman 562</div>
                    </button>
                    <button
                      onClick={() => navigateTo(582)}
                      className="p-2.5 rounded-xl border border-[#E5DDD3] bg-[#FFFEFA] hover:bg-[#F7EFE6] text-left transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#3B342D]">Juz 30 (Amma)</div>
                      <div className="text-[11px] text-[#8A7D6F]">Halaman 582</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Surah Navigation (Searchable 114 Surahs) */}
            {activeTab === "surah" && (
              <div className="p-4 flex flex-col gap-3 flex-1 overflow-hidden">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-[#8A7D6F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari surah (nama / nomor)..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#DCD1C3] bg-[#FFFEFA] text-sm text-[#3B342D] focus:outline-hidden focus:ring-2 focus:ring-[#628A45]"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7D6F] hover:text-[#3B342D]"
                    >
                      Hapus
                    </button>
                  )}
                </div>

                {/* Surah List */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1 max-h-[380px]">
                  {filteredSurahs.length === 0 ? (
                    <div className="text-center py-8 text-xs text-[#8A7D6F]">
                      Tidak ada surah yang cocok dengan &quot;{searchQuery}&quot;
                    </div>
                  ) : (
                    filteredSurahs.map((surah: SurahInfo) => (
                      <button
                        key={surah.number}
                        onClick={() => navigateTo(surah.startPage)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F6EFE6] active:bg-[#EDE3D6] border border-[#EADBCC]/60 transition-colors text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#EADBCC]/70 text-[#628A45] font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {surah.number}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm text-[#3B342D] group-hover:text-[#628A45] transition-colors">
                              {surah.nameSimple}
                            </span>
                            <span className="text-[11px] text-[#8A7D6F]">
                              {surah.nameTranslated} • {surah.versesCount} ayat • Hal. {surah.startPage}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className="text-base text-[#4A4035] font-semibold"
                            style={{ fontFamily: "'UthmanicHafs', 'Traditional Arabic', serif" }}
                          >
                            {surah.nameArabic}
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#B5A898] group-hover:text-[#628A45] transition-colors" />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Display Mode (1 Halaman vs 2 Halaman) */}
            {activeTab === "display" && (
              <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                <span className="text-xs font-semibold text-[#6A6054]">
                  Pilih Mode Tampilan Mushaf:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Mode 1 Halaman */}
                  <button
                    onClick={() => navigateTo(currentPage, "single")}
                    className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                      displayMode === "single"
                        ? "border-[#628A45] bg-[#F1F6EC] shadow-xs"
                        : "border-[#E5DDD3] bg-[#FFFEFA] hover:bg-[#F7EFE6]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-[#628A45]/15 flex items-center justify-center text-[#628A45]">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      {displayMode === "single" && (
                        <span className="text-[11px] font-bold text-[#628A45] px-2 py-0.5 rounded-full bg-[#628A45]/10">
                          Aktif
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#3B342D]">
                        1 Halaman (Single Page)
                      </span>
                      <span className="text-xs text-[#8A7D6F] leading-relaxed mt-0.5">
                        Menampilkan satu halaman penuh. Sangat nyaman untuk mobile atau membaca terfokus.
                      </span>
                    </div>
                  </button>

                  {/* Mode 2 Halaman */}
                  <button
                    onClick={() => navigateTo(currentPage, "spread")}
                    className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                      displayMode === "spread"
                        ? "border-[#628A45] bg-[#F1F6EC] shadow-xs"
                        : "border-[#E5DDD3] bg-[#FFFEFA] hover:bg-[#F7EFE6]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-[#628A45]/15 flex items-center justify-center text-[#628A45]">
                        <Monitor className="w-4 h-4" />
                      </div>
                      {displayMode === "spread" && (
                        <span className="text-[11px] font-bold text-[#628A45] px-2 py-0.5 rounded-full bg-[#628A45]/10">
                          Aktif
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#3B342D]">
                        2 Halaman (Two-Page Spread)
                      </span>
                      <span className="text-xs text-[#8A7D6F] leading-relaxed mt-0.5">
                        Menampilkan 2 halaman berdampingan (RTL) pada layar desktop seperti membuka buku mushaf fisik.
                      </span>
                    </div>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F6EFE7]/80 border border-[#E8DDD0] text-xs text-[#8A7D6F] leading-relaxed">
                  💡 <strong>Catatan:</strong> Pada layar smartphone kecil, tampilan akan otomatis dioptimalkan dalam format 1 kolom vertikal agar nyaman dibaca.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
