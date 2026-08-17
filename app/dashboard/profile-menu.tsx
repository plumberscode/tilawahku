"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface ProfileMenuProps {
  userName: string;
  userEmail?: string | null;
}

export function ProfileMenu({ userName, userEmail }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EAE2D8] hover:bg-[#DFD6CA] text-[#5A5044] flex items-center justify-center border border-[#DFD6CA] shadow-2xs transition-colors cursor-pointer"
        aria-label="Menu Pengguna"
        title={userName}
      >
        <User className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#FFFCF8] rounded-2xl border border-[#E5DDD3] shadow-lg p-2 z-50 flex flex-col gap-1 text-sm text-[#3B342D] animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 border-b border-[#E5DDD3]/60 mb-1">
            <p className="font-bold text-sm text-[#2C261F] truncate">{userName}</p>
            {userEmail && <p className="text-xs text-[#8A8178] truncate">{userEmail}</p>}
          </div>

          <Link
            href="/onboarding?reset=true"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F4ECE3] text-[#5A5044] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#4E6B34]" />
            <span>Atur Ulang Posisi</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>
        </div>
      )}
    </div>
  );
}
