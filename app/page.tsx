import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import HomeClient from "./home-client";
import { GoogleOneTap } from "@/components/auth/google-one-tap";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <>
      <GoogleOneTap />
      <HomeClient />
    </>
  );
}
