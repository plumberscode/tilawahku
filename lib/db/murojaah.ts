import { eq } from "drizzle-orm";
import { db } from "./index";
import { murojaahPlan } from "./schema";

export type MurojaahPlan = typeof murojaahPlan.$inferSelect;

/**
 * Get active murojaah plan for a specific user.
 */
export async function getMurojaahPlan(userId: string): Promise<MurojaahPlan | null> {
  const records = await db
    .select()
    .from(murojaahPlan)
    .where(eq(murojaahPlan.userId, userId))
    .limit(1);

  return records[0] || null;
}

/**
 * Save or update murojaah plan for a user.
 */
export async function saveMurojaahPlan(
  userId: string,
  data: {
    pageNumber: number;
    surahNumber: number;
    startVerse: number;
    endVerse: number;
  }
): Promise<MurojaahPlan> {
  const existing = await getMurojaahPlan(userId);

  if (existing) {
    const [updated] = await db
      .update(murojaahPlan)
      .set({
        pageNumber: data.pageNumber,
        surahNumber: data.surahNumber,
        startVerse: data.startVerse,
        endVerse: data.endVerse,
        completed: false,
        completedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(murojaahPlan.userId, userId))
      .returning();

    return updated;
  }

  const [inserted] = await db
    .insert(murojaahPlan)
    .values({
      id: crypto.randomUUID(),
      userId,
      pageNumber: data.pageNumber,
      surahNumber: data.surahNumber,
      startVerse: data.startVerse,
      endVerse: data.endVerse,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return inserted;
}

/**
 * Mark active murojaah plan as completed.
 */
export async function completeMurojaahPlan(userId: string): Promise<MurojaahPlan | null> {
  const existing = await getMurojaahPlan(userId);
  if (!existing) return null;

  const [updated] = await db
    .update(murojaahPlan)
    .set({
      completed: true,
      completedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(murojaahPlan.userId, userId))
    .returning();

  return updated;
}
