"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { saveInitialProgress } from "@/lib/db/progress";

export interface OnboardingResult {
  success: boolean;
  error?: string;
  redirectUrl?: string;
  nextReadingPage?: number;
  isCompleted?: boolean;
}

/**
 * Server action to save the user's initial onboarding progress.
 */
export async function submitOnboardingProgress(
  completedPage: number
): Promise<OnboardingResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      error: "User tidak terautentikasi. Silakan login terlebih dahulu.",
    };
  }

  const safePage = Math.round(completedPage);

  if (isNaN(safePage) || safePage < 0 || safePage > 604) {
    return {
      success: false,
      error: "Nomor halaman tidak valid (harus antara 0–604).",
    };
  }

  try {
    const updated = await saveInitialProgress(session.user.id, safePage);

    let redirectUrl = `/prototype/quran-reader?page=${updated.currentPage}`;

    // If already finished the entire Quran (604 pages), redirect to dashboard to celebrate
    if (updated.isCompleted) {
      redirectUrl = "/dashboard";
    }

    return {
      success: true,
      redirectUrl,
      nextReadingPage: updated.currentPage,
      isCompleted: updated.isCompleted,
    };
  } catch (err) {
    console.error("Failed to save onboarding progress:", err);
    return {
      success: false,
      error: "Gagal menyimpan progress. Silakan coba lagi.",
    };
  }
}
