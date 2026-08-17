import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ArrowRight,
  BarChart2,
  Calendar,
  ChevronRight,
  Check,
  Minus,
  Sparkles,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getUserProgress } from "@/lib/db/progress";
import { getMurojaahPlan } from "@/lib/db/murojaah";
import { getSurahByPage, getJuzByPage } from "@/lib/quran/surahs-data";
import { ProfileMenu } from "./profile-menu";
import { BottomNav } from "./bottom-nav";
import { MurojaahCardClient } from "./murojaah-card-client";

export const metadata = {
  title: "Dashboard - TilawahKu",
  description: "Dashboard perjalanan tilawah Al-Qur'an harian kamu",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user reading progress and active murojaah plan from database
  const [progress, murojaahPlan] = await Promise.all([
    getUserProgress(session.user.id),
    getMurojaahPlan(session.user.id),
  ]);

  // If new user and onboarding is not yet completed, redirect to onboarding
  if (!progress || !progress.onboardingCompleted) {
    redirect("/onboarding");
  }

  const completedPages = progress.completedPages;
  const currentPage = progress.currentPage || 1;
  const isKhatam = progress.isCompleted || completedPages >= 604;
  const progressPercent = Math.min(Math.round((completedPages / 604) * 100), 100);

  const currentSurah = progress.nextSurah
    ? (await import("@/lib/quran/surahs-data")).SURAH_MAP[progress.nextSurah]
    : getSurahByPage(currentPage);
  const currentJuz = getJuzByPage(currentPage);

  // Circular gauge calculations (radius 28, stroke 5)
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Juz slider percentage
  const juzPercent = Math.min(Math.max((currentJuz / 30) * 100, 3), 97);

  // Real 7 days activity data (Sen - Min)
  const { getUserWeeklyActivity } = await import("@/lib/db/progress");
  const activityDays = await getUserWeeklyActivity(session.user.id);

  return (
    <main
      className="min-h-[100dvh] w-full bg-[#FBF4EE] pt-6 sm:pt-10 pb-28 sm:pb-32 px-4 sm:px-6 flex flex-col items-center"
      style={{ background: "#FBF4EE" }}
    >
      <div className="w-full max-w-lg sm:max-w-xl flex flex-col gap-5 sm:gap-6">
        {/* ======================================================== */}
        {/* TOP HEADER / GREETING BAR */}
        {/* ======================================================== */}
        <header className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold text-[#4E6B34]">
              Assalamualaikum,
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C261F] tracking-tight flex items-center gap-1.5 mt-0.5">
              <span>{session.user.name || "Henry"}</span>
              <span>👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#8A8178] mt-0.5">
              Yuk lanjutkan tilawah-mu
            </p>
          </div>

          <ProfileMenu
            userName={session.user.name || "Henry"}
            userEmail={session.user.email}
          />
        </header>

        {/* ======================================================== */}
        {/* CARD 1: HERO - LANJUTKAN TILAWAH */}
        {/* ======================================================== */}
        <section className="w-full">
          {isKhatam ? (
            /* Special Khatam State */
            <div
              className="w-full p-6 rounded-3xl bg-[#F7F3EB] border border-[#E9E1D6] shadow-xs flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E5EFE0] text-[#4E6B34] flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4E6B34]">
                    Pencapaian Istimewa
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#2C261F]">
                    Masya Allah, Khatam Al-Qur&apos;an! 🎉
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6A6054] leading-relaxed">
                Kamu telah menyelesaikan 604 halaman Al-Qur&apos;an. Semoga berkah selalu menyertai setiap langkahmu.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <Link
                  href="/prototype/quran-reader?page=1"
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#4A6434] hover:bg-[#3D542B] text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Mulai Putaran Baru (Halaman 1)</span>
                </Link>

                <Link
                  href="/prototype/quran-reader?page=604"
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#FFFCF8] hover:bg-[#F6EFE6] border border-[#E5DDD3] text-[#3B342D] font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#4E6B34]" />
                  <span>Lihat Halaman 604</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Active Reading Hero Card matching Design */
            <div
              className="w-full p-4 sm:p-5 rounded-3xl bg-[#F7F3EB] border border-[#E9E1D6] shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative overflow-hidden"
            >
              {/* Quran on Rehal Illustration */}
              <div className="w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0 flex items-center justify-center relative">
                <Image
                  src="/images/quran-rehal.jpg"
                  alt="Al-Qur'an dan Rehal"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain rounded-2xl drop-shadow-sm"
                  priority
                />
              </div>

              {/* Right Content */}
              <div className="w-full flex-1 flex flex-col justify-center gap-2.5">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8E2D7] text-[#4E6B34] text-xs font-bold w-fit">
                  <BookOpen className="w-3.5 h-3.5 text-[#4E6B34]" />
                  <span>Lanjutkan Tilawah</span>
                </div>

                {/* Surah Title */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C261F] tracking-tight">
                    {currentSurah.nameSimple}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6A6054] font-medium mt-0.5">
                    Ayat {progress.nextVerse || 16} • Halaman {currentPage}
                  </p>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1 h-2 rounded-full bg-[#E5DDD3] overflow-hidden">
                    <div
                      className="h-full bg-[#4E6B34] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#4A4035] min-w-[28px] text-right">
                    {progressPercent}%
                  </span>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/prototype/quran-reader?page=${currentPage}`}
                  className="w-full py-3 px-5 rounded-2xl bg-[#4A6434] hover:bg-[#3D542B] active:bg-[#324522] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs mt-1 cursor-pointer group"
                >
                  <span>Lanjutkan Tilawah</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* ======================================================== */}
        {/* CARD 2: PERJALANANMU (PROGRESS & STATS) */}
        {/* ======================================================== */}
        <section className="w-full p-5 sm:p-6 rounded-3xl bg-[#FFFCF8] border border-[#EAE2D8] shadow-xs flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E5EFE0] text-[#4E6B34] flex items-center justify-center flex-shrink-0">
                <BarChart2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#2C261F]">
                Perjalananmu
              </h3>
            </div>

            {/* Reset / Sesuaikan Posisi Tilawah */}
            <Link
              href="/onboarding?reset=true"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F7F3EB] hover:bg-[#EFE8DD] active:bg-[#E5DDCF] border border-[#E5DDD3] text-xs font-semibold text-[#6A6054] hover:text-[#2C261F] transition-colors cursor-pointer group shadow-2xs"
              title="Perbarui posisi bacaan jika membaca lewat mushaf fisik atau ingin reset"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#4E6B34] group-hover:-rotate-45 transition-transform" />
              <span>Sesuaikan Posisi</span>
            </Link>
          </div>

          {/* Stats Row (3 Columns) */}
          <div className="grid grid-cols-12 items-center gap-2 py-1">
            {/* Left: Total Pages */}
            <div className="col-span-5 flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#2C261F] tracking-tight leading-none">
                {completedPages || 127}
              </span>
              <span className="text-xs font-bold text-[#3B342D] mt-1.5">
                halaman
              </span>
              <span className="text-[11px] text-[#8A8178] mt-0.5">
                dari 604 halaman
              </span>
            </div>

            {/* Center: Circular Progress Gauge */}
            <div className="col-span-3 flex items-center justify-center">
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 68 68">
                  {/* Background Circle */}
                  <circle
                    cx="34"
                    cy="34"
                    r={radius}
                    fill="transparent"
                    stroke="#F0EAE1"
                    strokeWidth="6"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="34"
                    cy="34"
                    r={radius}
                    fill="transparent"
                    stroke="#4E6B34"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                {/* Center Percentage Label */}
                <span className="absolute text-xs sm:text-sm font-extrabold text-[#2C261F]">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Right: Juz Info (Separated with dashed left border) */}
            <div className="col-span-4 border-l border-dashed border-[#E5DDD3] pl-4 sm:pl-6 flex flex-col justify-center">
              <div className="w-6 h-6 rounded-md bg-[#E5EFE0] text-[#4E6B34] flex items-center justify-center mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm sm:text-base font-extrabold text-[#2C261F] leading-tight">
                Juz {currentJuz}
              </span>
              <span className="text-[11px] text-[#8A8178] mt-0.5">
                dari 30 Juz
              </span>
            </div>
          </div>

          {/* Bottom Linear Juz Slider / Progress Track */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="relative w-full h-1.5 bg-[#EFE8DE] rounded-full">
              <div
                className="h-full bg-[#4E6B34] rounded-full transition-all duration-500"
                style={{ width: `${juzPercent}%` }}
              />
              <div
                className="w-3.5 h-3.5 bg-[#4A6434] border-2 border-white rounded-full absolute top-1/2 -translate-y-1/2 shadow-xs transition-all duration-500"
                style={{ left: `calc(${juzPercent}% - 7px)` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-semibold text-[#9A9086]">
              <span>Juz 1</span>
              <span>Juz 30</span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CARD 3: MUROJAAH HARI INI (PLAN & FOCUS MODE TRIGGER) */}
        {/* ======================================================== */}
        <MurojaahCardClient plan={murojaahPlan} />

        {/* ======================================================== */}
        {/* CARD 4: AKTIVITAS 7 HARI TERAKHIR */}
        {/* ======================================================== */}
        <section className="w-full p-5 sm:p-6 rounded-3xl bg-[#FFFCF8] border border-[#EAE2D8] shadow-xs flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E5EFE0] text-[#4E6B34] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#2C261F]">
                Aktivitas 7 Hari Terakhir
              </h3>
            </div>
          </div>

          {/* 7 Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {activityDays.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-[#7A6E60]">
                  {item.day}
                </span>

                {item.completed ? (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#4A6434] text-white flex items-center justify-center shadow-2xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F5EFE6] text-[#A89D91] flex items-center justify-center">
                    <Minus className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ======================================================== */}
      {/* FIXED BOTTOM NAVIGATION BAR */}
      {/* ======================================================== */}
      <BottomNav currentPage={currentPage} />
    </main>
  );
}
