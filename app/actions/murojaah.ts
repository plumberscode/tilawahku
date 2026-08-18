"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { saveMurojaahPlan, completeMurojaahPlan } from "@/lib/db/murojaah";
import { getQuranPage } from "@/lib/quran/service";

import { SURAH_MAP } from "@/lib/quran/surahs-data";

/**
 * Server action to save/update a murojaah plan.
 */
export async function saveMurojaahPlanAction(data: {
  pageNumber: number;
  surahNumber: number;
  endSurahNumber?: number;
  startVerse: number;
  endVerse: number;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const { pageNumber, surahNumber, endSurahNumber, startVerse, endVerse } = data;

    if (!pageNumber || !surahNumber || !startVerse || !endVerse) {
      return { success: false, error: "Data rencana murojaah tidak lengkap" };
    }

    const plan = await saveMurojaahPlan(session.user.id, {
      pageNumber: Math.min(Math.max(1, pageNumber), 604),
      surahNumber,
      endSurahNumber: endSurahNumber ?? surahNumber,
      startVerse,
      endVerse,
    });

    revalidatePath("/dashboard");
    revalidatePath("/murojaah");

    return { success: true, plan };
  } catch (error: unknown) {
    console.error("Error saving murojaah plan:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message || "Gagal menyimpan rencana murojaah" };
  }
}

/**
 * Server action to complete active murojaah plan.
 */
export async function completeMurojaahPlanAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const plan = await completeMurojaahPlan(session.user.id);
    return { success: true, plan };
  } catch (error: unknown) {
    console.error("Error completing murojaah plan:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message || "Gagal menyelesaikan murojaah" };
  }
}

/**
 * Fetch verses list and distinct surahs for a specific page number (used by the Murojaah modal).
 */
export async function getPageVersesAction(pageNumber: number) {
  try {
    const safePage = Math.min(Math.max(1, pageNumber), 604);
    const pageData = await getQuranPage(safePage);

    // Map of unique surahs on this page with their start & end verses
    const surahMap = new Map<number, {
      number: number;
      nameSimple: string;
      nameArabic: string;
      startVerse: number;
      endVerse: number;
    }>();

    const verses = pageData.verses.map((v) => {
      const [surahStr] = v.verseKey.split(":");
      const sNum = parseInt(surahStr, 10) || pageData.surahNumber;
      const sMeta = SURAH_MAP[sNum];
      const sName = sMeta?.nameSimple || `Surah ${sNum}`;

      if (!surahMap.has(sNum)) {
        surahMap.set(sNum, {
          number: sNum,
          nameSimple: sName,
          nameArabic: sMeta?.nameArabic || "",
          startVerse: v.verseNumber,
          endVerse: v.verseNumber,
        });
      } else {
        const curr = surahMap.get(sNum)!;
        curr.endVerse = Math.max(curr.endVerse, v.verseNumber);
        curr.startVerse = Math.min(curr.startVerse, v.verseNumber);
      }

      return {
        id: v.id,
        verseNumber: v.verseNumber,
        verseKey: v.verseKey,
        surahNumber: sNum,
        surahNameSimple: sName,
        pageNumber: v.pageNumber,
      };
    });

    const surahs = Array.from(surahMap.values());

    return {
      success: true,
      pageNumber: safePage,
      surahNumber: pageData.surahNumber,
      surahNameSimple: pageData.surahNameSimple,
      surahNameArabic: pageData.surahNameArabic,
      juzNumber: pageData.juzNumber,
      verses,
      surahs,
    };
  } catch (error: unknown) {
    console.error("Error getting page verses:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message || "Gagal memuat ayat halaman" };
  }
}
