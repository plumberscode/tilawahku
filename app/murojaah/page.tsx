import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMurojaahPlan } from "@/lib/db/murojaah";
import { getQuranPage } from "@/lib/quran/service";
import { MurojaahFocusView } from "@/components/murojaah/murojaah-focus-view";

export const metadata = {
  title: "Murojaah Focus Mode - TilawahKu",
  description: "Mode fokus mengulang hafalan Al-Qur'an",
};

export default async function MurojaahPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const plan = await getMurojaahPlan(session.user.id);

  // If user doesn't have an active plan yet, redirect to dashboard so they can create one
  if (!plan) {
    redirect("/dashboard");
  }

  // Fetch page data for the target page
  const pageData = await getQuranPage(plan.pageNumber);

  return <MurojaahFocusView plan={plan} pageData={pageData} />;
}
