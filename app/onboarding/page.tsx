import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { getUserProgress } from "@/lib/db/progress";
import { OnboardingForm } from "./onboarding-form";

export const metadata = {
  title: "Setup Awal Tilawah - TilawahKu",
  description: "Tentukan posisi awal tilawah Al-Qur'an kamu di TilawahKu",
};

interface PageProps {
  searchParams: Promise<{ reset?: string }>;
}

export default async function OnboardingPage({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const isReset = resolvedParams.reset === "true";

  // If the user has already completed onboarding and not explicitly resetting, skip to dashboard
  const progress = await getUserProgress(session.user.id);
  if (progress && progress.onboardingCompleted && !isReset) {
    redirect("/dashboard");
  }

  return (
    <main
      className="min-h-[100dvh] w-full bg-[#FBF4EE] py-8 sm:py-12 px-4 sm:px-6 flex flex-col items-center justify-center"
      style={{ background: "#FBF4EE" }}
    >
      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Top bar when resetting */}
        {isReset && (
          <div className="w-full mb-4 flex items-center justify-start">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#628A45] hover:text-[#527739] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Dashboard</span>
            </Link>
          </div>
        )}

        {/* Brand Logo / Header Indicator */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-2xl font-bold text-[#3B342D] tracking-tight">
            Tilawah<span className="text-[#628A45]">Ku</span>
          </span>
        </div>

        {/* Onboarding Form Container */}
        <OnboardingForm userName={session.user.name || "Sobat Tilawah"} />
      </div>
    </main>
  );
}
