"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { saveConfirmedReading } from "@/lib/db/progress";

export async function confirmReadingSessionAction(data: {
  surahNumber: number;
  endVerse: number;
  pageNumber: number;
  durationSeconds?: number;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const { surahNumber, endVerse, pageNumber, durationSeconds } = data;

    if (!surahNumber || !endVerse || !pageNumber) {
      return { success: false, error: "Invalid data" };
    }

    const progress = await saveConfirmedReading(
      session.user.id,
      surahNumber,
      endVerse,
      pageNumber,
      durationSeconds || 0
    );

    return { success: true, progress };
  } catch (error: any) {
    console.error("Error confirming reading session:", error);
    return { success: false, error: error.message || "Failed to save reading session" };
  }
}
