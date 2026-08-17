"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { saveMurojaahPlan, completeMurojaahPlan } from "@/lib/db/murojaah";
import { getQuranPage } from "@/lib/quran/service";

/**
 * Server action to save/update a murojaah plan.
 */
export async function saveMurojaahPlanAction(data: {
  pageNumber: number;
  surahNumber: number;
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

    const { pageNumber, surahNumber, startVerse, endVerse } = data;

    if (!pageNumber || !surahNumber || !startVerse || !endVerse) {
      return { success: false, error: "Data rencana murojaah tidak lengkap" };
    }

    if (startVerse > endVerse) {
      return { success: false, error: "Ayat awal tidak boleh lebih besar dari ayat akhir" };
    }

    const plan = await saveMurojaahPlan(session.user.id, {
      pageNumber: Math.min(Math.max(1, pageNumber), 604),
      surahNumber,
      startVerse,
      endVerse,
    });

    return { success: true, plan };
  } catch (error: any) {
    console.error("Error saving murojaah plan:", error);
    return { success: false, error: error.message || "Gagal menyimpan rencana murojaah" };
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
  } catch (error: any) {
    console.error("Error completing murojaah plan:", error);
    return { success: false, error: error.message || "Gagal menyelesaikan murojaah" };
  }
}

/**
 * Fetch verses list for a specific page number (used by the Murojaah modal).
 */
export async function getPageVersesAction(pageNumber: number) {
  try {
    const safePage = Math.min(Math.max(1, pageNumber), 604);
    const pageData = await getQuranPage(safePage);

    // Format simple verse items
    const verses = pageData.verses.map((v) => ({
      id: v.id,
      verseNumber: v.verseNumber,
      verseKey: v.verseKey,
      pageNumber: v.pageNumber,
    }));

    return {
      success: true,
      pageNumber: safePage,
      surahNumber: pageData.surahNumber,
      surahNameSimple: pageData.surahNameSimple,
      surahNameArabic: pageData.surahNameArabic,
      juzNumber: pageData.juzNumber,
      verses,
    };
  } catch (error: any) {
    console.error("Error getting page verses:", error);
    return { success: false, error: error.message || "Gagal memuat ayat halaman" };
  }
}
