"use client";

import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

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
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5DDD3] bg-[#FFFCF8] hover:bg-red-50 hover:border-red-200 text-[#8A7D6F] hover:text-red-600 text-xs font-semibold transition-colors cursor-pointer"
      title="Keluar dari akun"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>Keluar</span>
    </button>
  );
}
