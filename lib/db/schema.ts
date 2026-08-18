import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull()
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id)
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull()
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at")
});

/**
 * Reading progress model for TilawahKu
 * - initialPage: Posisi halaman yang user klaim sudah selesai dibaca sebelum menggunakan TilawahKu (0-604)
 * - completedPages: Jumlah halaman yang sudah selesai dibaca (0-604)
 * - currentPage: Posisi halaman bacaan berikutnya untuk "Lanjutkan Tilawah" (1-604)
 * - lastSurah: Surah terakhir yang dibaca (verse-level source of truth)
 * - lastVerse: Ayat terakhir yang dibaca
 * - nextSurah: Surah dari ayat berikutnya
 * - nextVerse: Ayat berikutnya yang harus dibaca
 * - isCompleted: Status khatam (halaman 604 selesai)
 * - onboardingCompleted: Penanda bahwa user sudah menyelesaikan setup awal
 */
export const readingProgress = pgTable("reading_progress", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
	lastSurah: integer("last_surah"),
	lastVerse: integer("last_verse"),
	nextSurah: integer("next_surah"),
	nextVerse: integer("next_verse"),
	initialPage: integer("initial_page").notNull().default(0),
	completedPages: integer("completed_pages").notNull().default(0),
	currentPage: integer("current_page").notNull().default(1),
	isCompleted: boolean("is_completed").notNull().default(false),
	onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Reading record: Mencatat setiap sesi membaca yang dikonfirmasi oleh user.
 */
export const readingRecord = pgTable("reading_record", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	surahNumber: integer("surah_number").notNull(),
	startVerse: integer("start_verse"),
	endVerse: integer("end_verse").notNull(),
	pageNumber: integer("page_number").notNull(),
	durationSeconds: integer("duration_seconds").default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Murojaah Plan: Menyimpan target rencana pengulangan hafalan aktif per user.
 */
export const murojaahPlan = pgTable("murojaah_plan", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
	pageNumber: integer("page_number").notNull(),
	surahNumber: integer("surah_number").notNull(),
	endSurahNumber: integer("end_surah_number"),
	startVerse: integer("start_verse").notNull(),
	endVerse: integer("end_verse").notNull(),
	completed: boolean("completed").notNull().default(false),
	completedAt: timestamp("completed_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

