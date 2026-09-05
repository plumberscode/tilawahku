// Skeleton ini dirender langsung oleh Next.js begitu navigasi ke /dashboard
// dimulai (mis. setelah "Simpan Bacaan"), tanpa menunggu query DB di page.tsx
// selesai. Ini yang membuat transisi terasa instan meski data masih di-fetch
// di server — sebelumnya layar terasa "diam" sampai seluruh RSC payload siap.
export default function DashboardLoading() {
  return (
    <main
      className="min-h-[100dvh] w-full bg-[#FBF4EE] pt-6 sm:pt-10 pb-28 sm:pb-32 px-4 sm:px-6 flex flex-col items-center"
      style={{ background: "#FBF4EE" }}
    >
      <div className="w-full max-w-lg sm:max-w-xl flex flex-col gap-5 sm:gap-6 animate-pulse">
        {/* Header */}
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-28 rounded-full bg-[#EAE2D8]" />
            <div className="h-7 w-40 rounded-full bg-[#EAE2D8]" />
            <div className="h-3 w-32 rounded-full bg-[#EAE2D8]" />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#EAE2D8]" />
        </div>

        {/* Hero card */}
        <div className="w-full h-44 rounded-3xl bg-[#F2ECE1] border border-[#E9E1D6]" />

        {/* Perjalananmu card */}
        <div className="w-full h-40 rounded-3xl bg-[#F2ECE1] border border-[#E9E1D6]" />

        {/* Murojaah card */}
        <div className="w-full h-28 rounded-3xl bg-[#F2ECE1] border border-[#E9E1D6]" />

        {/* Aktivitas card */}
        <div className="w-full h-32 rounded-3xl bg-[#F2ECE1] border border-[#E9E1D6]" />
      </div>
    </main>
  );
}
