"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/components/icons";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setError(error.message || "Pendaftaran gagal. Silakan coba lagi.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-8" style={{ background: "#FBF4EE" }}>
      <div className="w-full max-w-md bg-[#FFFCF8] rounded-[24px] p-8 shadow-sm border border-[#E5DDD3]">
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold text-foreground">Buat Akun</h1>
          <p className="text-sm text-[#8A8178]">Mulai catat dan jaga konsistensi tilawah Anda hari ini.</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-left">
            <Label htmlFor="name" className="text-sm font-semibold text-[#3B342D]">Nama Panggilan</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Fulan" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 rounded-[12px] border-[#E5DDD3] focus-visible:ring-[#628A45]"
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <Label htmlFor="email" className="text-sm font-semibold text-[#3B342D]">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="nama@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-[12px] border-[#E5DDD3] focus-visible:ring-[#628A45]"
            />
          </div>
          
          <div className="flex flex-col gap-2 text-left">
            <Label htmlFor="password" className="text-sm font-semibold text-[#3B342D]">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="h-12 rounded-[12px] border-[#E5DDD3] focus-visible:ring-[#628A45]"
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium text-left">{error}</p>}

          <Button 
            type="submit" 
            disabled={loading}
            className="h-[52px] rounded-[16px] text-base font-semibold bg-[#628A45] text-white hover:bg-[#527739] active:bg-[#4a6c33] focus-visible:ring-[#628A45] mt-2 transition-colors cursor-pointer"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </Button>
        </form>

        <div className="flex items-center gap-3 w-full py-6">
          <Separator className="flex-1" style={{ background: "#E5DDD3" }} />
          <span className="text-xs text-[#8A8178] whitespace-nowrap uppercase tracking-wider font-semibold">Atau</span>
          <Separator className="flex-1" style={{ background: "#E5DDD3" }} />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="h-[52px] rounded-[16px] bg-[#FFFCF8] border-[#E5DDD3] text-[#3B342D] hover:bg-[#F3EDE7] active:bg-[#EDE6DF] text-base font-semibold w-full transition-colors cursor-pointer"
        >
          <GoogleIcon className="h-5 w-5 flex-shrink-0" />
          Daftar dengan Google
        </Button>

        <div className="mt-8 text-center text-sm text-[#3B342D]">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#628A45] font-semibold hover:underline">
            Masuk di sini
          </Link>
        </div>
      </div>
      
      <Link href="/" className="mt-8 text-sm text-[#8A8178] hover:text-[#3B342D] inline-flex items-center transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Kembali ke Halaman Utama
      </Link>
    </main>
  );
}
