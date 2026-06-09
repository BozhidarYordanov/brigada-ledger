import Link from "next/link";

const navigationItems = [
  { href: "/dashboard", label: "Начало" },
  { href: "/days", label: "Дни" },
  { href: "/employees", label: "Служители" },
  { href: "/expenses", label: "Разходи" },
  { href: "/income", label: "Приходи" },
  { href: "/reports", label: "Справки" },
  { href: "/settings", label: "Настройки" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-200 bg-white px-4 py-6 md:flex md:flex-col">
        <Link className="px-3 text-lg font-bold" href="/dashboard">
          Brigada Ledger
        </Link>
        <nav className="mt-8 flex flex-col gap-1">
          {navigationItems.map((item) => (
            <Link
              className="rounded-md px-3 py-3 text-sm font-medium text-zinc-700 transition hover:bg-stone-100 hover:text-zinc-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

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

      <nav className="fixed inset-x-0 bottom-0 border-t border-zinc-200 bg-white px-2 py-2 md:hidden">
        <div className="flex gap-1 overflow-x-auto">
          {navigationItems.map((item) => (
            <Link
              className="flex min-h-12 min-w-24 flex-1 items-center justify-center rounded-md px-3 text-center text-sm font-medium text-zinc-700 transition hover:bg-stone-100 hover:text-zinc-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
