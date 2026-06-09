import { AppNavigation } from "@/src/components/layout/app-navigation";
import Link from "next/link";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-950">
      <AppNavigation />

      <div className="flex min-h-screen flex-col md:pl-64">
        <header className="border-b border-zinc-200 bg-white px-5 py-4 md:hidden">
          <Link className="text-base font-bold" href="/dashboard">
            Brigada Ledger
          </Link>
        </header>

        <main className="flex-1 px-5 pb-28 pt-6 sm:px-8 md:px-10 md:pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
