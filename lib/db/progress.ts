import { eq } from "drizzle-orm";
import { db } from "./index";
import { readingProgress } from "./schema";

export type UserProgress = typeof readingProgress.$inferSelect;

/**
 * Get reading progress for a specific user.
 */
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  const records = await db
    .select()
    .from(readingProgress)
    .where(eq(readingProgress.userId, userId))
    .limit(1);

  return records[0] || null;
}

/**
 * Save the initial onboarding progress.
 *
 * Rules:
 * - completedPage = 0 ("Belum mulai"):
 *   initialPage = 0, completedPages = 0, currentPage = 1, isCompleted = false, onboardingCompleted = true
 *
 * - completedPage = 187 (Contoh):
 *   initialPage = 187, completedPages = 187, currentPage = 188, isCompleted = false, onboardingCompleted = true
 *
 * - completedPage = 604 ("Khatam"):
 *   initialPage = 604, completedPages = 604, currentPage = 604, isCompleted = true, onboardingCompleted = true
 */
export async function saveInitialProgress(
  userId: string,
  completedPage: number
): Promise<UserProgress> {
  const safePage = Math.min(Math.max(0, completedPage), 604);

  const initialPage = safePage;
  const completedPages = safePage;
  let currentPage = 1;
  let isCompleted = false;

  if (safePage === 0) {
    currentPage = 1;
    isCompleted = false;
  } else if (safePage >= 604) {
    currentPage = 604; // Edge case: tidak boleh menjadi 605
    isCompleted = true;
  } else {
    currentPage = safePage + 1; // Halaman berikutnya untuk "Lanjutkan Tilawah"
    isCompleted = false;
  }

  const existing = await getUserProgress(userId);

  if (existing) {
    const [updated] = await db
      .update(readingProgress)
      .set({
        initialPage,
        completedPages,
        currentPage,
        isCompleted,
        onboardingCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(readingProgress.userId, userId))
      .returning();

    return updated;
  }

  const [inserted] = await db
    .insert(readingProgress)
    .values({
      id: crypto.randomUUID(),
      userId,
      initialPage,
      completedPages,
      currentPage,
      isCompleted,
      onboardingCompleted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return inserted;
}

/**
 * Save a confirmed reading session and update overall progress.
 */
export async function saveConfirmedReading(
  userId: string,
  surahNumber: number,
  endVerse: number,
  pageNumber: number,
  durationSeconds: number = 0
) {
  const { readingRecord } = await import("./schema");
  const { SURAH_MAP } = await import("@/lib/quran/surahs-data");

  // 1. Dapatkan surah info
  const surahInfo = SURAH_MAP[surahNumber];
  if (!surahInfo) throw new Error("Invalid surah number");

  let nextSurah = surahNumber;
  let nextVerse = endVerse + 1;
  let isCompleted = false;

  // Cek apakah mencapai akhir surah
  if (nextVerse > surahInfo.versesCount) {
    if (surahNumber === 114) {
      // Khatam!
      nextSurah = 114;
      nextVerse = 6;
      isCompleted = true;
    } else {
      // Lanjut ke surah berikutnya, ayat 1
      nextSurah = surahNumber + 1;
      nextVerse = 1;
    }
  }

  // 2. Dapatkan halaman dari nextSurah & nextVerse
  let nextPage = 604;
  if (!isCompleted) {
    try {
      const res = await fetch(`https://api.quran.com/api/v4/verses/by_key/${nextSurah}:${nextVerse}?fields=page_number`);
      if (res.ok) {
        const data = await res.json();
        if (data?.verse?.page_number) {
          nextPage = data.verse.page_number;
        }
      }
    } catch (e) {
      console.error("Failed to fetch next page", e);
      // Fallback if fetch fails
      nextPage = pageNumber; 
    }
  }

  const existing = await getUserProgress(userId);
  let startVerse = null;
  if (existing && existing.lastSurah === surahNumber) {
    startVerse = existing.lastVerse ? existing.lastVerse + 1 : 1;
  }

  // 3. Insert Reading Record
  await db.insert(readingRecord).values({
    id: crypto.randomUUID(),
    userId,
    surahNumber,
    startVerse,
    endVerse,
    pageNumber,
    durationSeconds,
    createdAt: new Date(),
  });

  // 4. Update Reading Progress
  if (existing) {
    const [updated] = await db
      .update(readingProgress)
      .set({
        lastSurah: surahNumber,
        lastVerse: endVerse,
        nextSurah: nextSurah,
        nextVerse: nextVerse,
        currentPage: nextPage,
        completedPages: isCompleted ? 604 : pageNumber,
        isCompleted: isCompleted,
        updatedAt: new Date(),
      })
      .where(eq(readingProgress.userId, userId))
      .returning();

    return updated;
  } else {
    // If somehow onboarding isn't done, but they read
    const [inserted] = await db
      .insert(readingProgress)
      .values({
        id: crypto.randomUUID(),
        userId,
        lastSurah: surahNumber,
        lastVerse: endVerse,
        nextSurah: nextSurah,
        nextVerse: nextVerse,
        currentPage: nextPage,
        completedPages: isCompleted ? 604 : pageNumber,
        isCompleted: isCompleted,
        initialPage: 0,
        onboardingCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
      
    return inserted;
  }
}

/**
 * Get user's reading activity for the last 7 days.
 * Returns an array of 7 items (from 6 days ago to today), e.g. { day: "Sen", completed: true }
 */
export async function getUserWeeklyActivity(userId: string) {
  const { readingRecord, murojaahPlan } = await import("./schema");
  const { gte, and, eq } = await import("drizzle-orm");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sixDaysAgo = new Date(today);
  sixDaysAgo.setDate(today.getDate() - 6);

  // Fetch reading records for the last 7 days
  const records = await db
    .select({ createdAt: readingRecord.createdAt })
    .from(readingRecord)
    .where(
      and(
        eq(readingRecord.userId, userId),
        gte(readingRecord.createdAt, sixDaysAgo)
      )
    );

  // Fetch murojaah plan completion for the last 7 days (if completed)
  const plans = await db
    .select({ completedAt: murojaahPlan.completedAt })
    .from(murojaahPlan)
    .where(
      and(
        eq(murojaahPlan.userId, userId),
        eq(murojaahPlan.completed, true),
        gte(murojaahPlan.completedAt, sixDaysAgo)
      )
    );

  const activitySet = new Set<string>();

  // Add reading records
  records.forEach((r) => {
    if (r.createdAt) {
      const d = new Date(r.createdAt);
      activitySet.add(d.toISOString().split("T")[0]);
    }
  });

  // Add murojaah completions
  plans.forEach((p) => {
    if (p.completedAt) {
      const d = new Date(p.completedAt);
      activitySet.add(d.toISOString().split("T")[0]);
    }
  });

  const daysStr = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    result.push({
      day: daysStr[d.getDay()],
      completed: activitySet.has(dateStr),
    });
  }

  return result;
}
