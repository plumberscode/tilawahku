"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import { GoogleIcon } from "@/components/icons";

export default function Home() {
  return (
    <main
      className="flex min-h-[100dvh] flex-col lg:flex-row items-center justify-center bg-background mx-auto w-full max-w-md lg:max-w-5xl gap-4 lg:gap-16 px-6 py-8 lg:py-0"
      style={{ background: "#FBF4EE" }}
    >
      {/* Hero Animation — fills top of screen on mobile, left side on desktop */}
      <div className="relative w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center max-w-md lg:max-w-lg">
        {/* Video: autoplay, muted, loop, playsInline */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full object-cover"
          style={{ display: "block" }}
        >
          <source src="/tilawahku-homepage-720p.webm" type="video/webm" />
        </video>

        {/* Overlay: menyembunyikan tepi video dengan warna background — statis, tidak ikut animasi */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 40%, #FBF4EE 75%)",
          }}
        />
      </div>

      {/* Content area */}
      <div className="flex flex-col w-full lg:w-1/2 max-w-md lg:max-w-lg gap-7 pb-10 pt-4 lg:py-10">
        {/* Headline & Supporting Text */}
        <div className="text-center lg:text-left flex flex-col gap-3">
          <h1 className="text-[2rem] lg:text-[2.5rem] leading-[1.2] font-bold tracking-tight text-foreground">
            Yuk, <span className="text-primary">lanjutkan lagi</span>
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>tilawah-mu
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-[#8A8178]">
            Catat, lacak, dan jaga konsistensi bacaan Quran setiap hari.
          </p>
        </div>

        {/* Authentication Actions */}
        <div className="flex flex-col gap-3 w-full">
          {/* Primary: Login */}
          <Link href="/login" className="w-full">
            <Button
              className="h-[52px] rounded-[16px] text-base font-semibold bg-[#628A45] text-white hover:bg-[#527739] active:bg-[#4a6c33] focus-visible:ring-[#628A45] transition-colors w-full cursor-pointer"
              size="lg"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
              Login
            </Button>
          </Link>

          {/* Separator */}
          <div className="flex items-center gap-3 w-full py-1">
            <Separator className="flex-1" style={{ background: "#E5DDD3" }} />
            <span className="text-sm text-[#8A8178] whitespace-nowrap">
              atau login dengan
            </span>
            <Separator className="flex-1" style={{ background: "#E5DDD3" }} />
          </div>

          {/* Google Button */}
          <Button
            variant="outline"
            className="h-[52px] rounded-[16px] bg-[#FFFCF8] border-[#E5DDD3] text-[#3B342D] hover:bg-[#F3EDE7] active:bg-[#EDE6DF] text-base font-semibold transition-colors w-full cursor-pointer"
            size="lg"
            onClick={async () => {
              await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
              });
            }}
          >
            <GoogleIcon className="h-5 w-5 flex-shrink-0" />
            Google
          </Button>
        </div>

        {/* Privacy Reassurance */}
        <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#8A8178]">
          <ShieldCheck className="h-[15px] w-[15px] flex-shrink-0" strokeWidth={1.8} />
          <span className="text-sm">Data aman dan hanya untukmu</span>
        </div>

        {/* Registration Link */}
        <div className="text-center lg:text-left text-[#3B342D] text-sm -mt-2">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-[#628A45] font-semibold hover:underline inline-flex items-center"
          >
            Daftar{" "}
            <ChevronRight
              className="h-[14px] w-[14px] ml-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
