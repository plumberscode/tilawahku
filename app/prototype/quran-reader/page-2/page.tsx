import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getQuranPage } from "@/lib/quran/service";
import { MushafPage } from "@/components/quran/mushaf-page";

export const metadata = {
  title: "Quran Reader Prototype (Page 2) - Tilawahku",
  description: "Prototype Quran Reader Mushaf Madinah QCF V2 (Page 2)",
};

export default async function QuranReaderPage2() {
  const pageData = await getQuranPage(2);

  return (
    <main
      className="min-h-screen w-full bg-[#FBF4EE] py-6 sm:py-10 px-3 sm:px-6 flex flex-col items-center"
      style={{ background: "#FBF4EE" }}
    >
      {/* Top Navigation & Tab Switcher */}
      <div className="w-full max-w-[580px] mb-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#628A45] hover:text-[#527739] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>

          {/* Page Switcher Tabs for Comparison */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#EADBCC]/60 border border-[#D8C7B5]">
            <Link
              href="/prototype/quran-reader/page-2"
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#FFFCF8] text-[#628A45] shadow-xs"
            >
              Halaman 2
            </Link>
            <Link
              href="/prototype/quran-reader/page-3"
              className="px-3 py-1 text-xs font-medium text-[#8A8178] hover:text-[#3B342D] transition-colors"
            >
              Halaman 3
            </Link>
          </div>
        </div>
      </div>

      {/* Mushaf Page 2 Display */}
      <MushafPage pageData={pageData} />
    </main>
  );
}
