"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  href: string;
  label: string;
  match: "exact" | "section";
};

const desktopNavigationItems: NavigationItem[] = [
  { href: "/dashboard", label: "Начало", match: "exact" },
  { href: "/days", label: "Дни", match: "section" },
  { href: "/employees", label: "Служители", match: "section" },
  { href: "/expenses", label: "Разходи", match: "section" },
  { href: "/income", label: "Приходи", match: "section" },
  { href: "/reports", label: "Справки", match: "section" },
  { href: "/settings", label: "Настройки", match: "exact" },
];

const mobileNavigationItems: NavigationItem[] = [
  { href: "/dashboard", label: "Начало", match: "exact" },
  { href: "/days", label: "Дни", match: "section" },
  { href: "/employees", label: "Служители", match: "section" },
  { href: "/reports", label: "Справки", match: "section" },
  { href: "/settings", label: "Още", match: "exact" },
];

function isActiveItem(pathname: string, item: NavigationItem) {
  if (item.match === "exact") {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function getNavItemClassName(isActive: boolean, variant: "desktop" | "mobile") {
  const activeClassName = "bg-emerald-50 text-emerald-700";
  const inactiveClassName =
    "text-zinc-700 hover:bg-stone-100 hover:text-zinc-950";

  if (variant === "desktop") {
    return [
      "rounded-md px-3 py-3 text-sm font-medium transition",
      isActive ? activeClassName : inactiveClassName,
    ].join(" ");
  }

  return [
    "flex min-h-12 min-w-0 items-center justify-center rounded-md px-1 text-center text-xs font-medium transition",
    isActive ? activeClassName : inactiveClassName,
  ].join(" ");
}

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-200 bg-white px-4 py-6 md:flex md:flex-col">
        <Link className="px-3 text-lg font-bold" href="/dashboard">
          Brigada Ledger
        </Link>
        <nav className="mt-8 flex flex-col gap-1">
          {desktopNavigationItems.map((item) => {
            const isActive = isActiveItem(pathname, item);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={getNavItemClassName(isActive, "desktop")}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 border-t border-zinc-200 bg-white px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavigationItems.map((item) => {
            const isActive = isActiveItem(pathname, item);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={getNavItemClassName(isActive, "mobile")}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
