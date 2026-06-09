import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-5 py-8 text-zinc-950">
      <section className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-medium text-emerald-700">Brigada Ledger</p>
        <h1 className="mt-3 text-3xl font-bold">Табло</h1>
        <p className="mt-4 text-base leading-7 text-zinc-700">
          Това е временна страница за бъдещото табло на приложението.
        </p>
        <Link
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 font-semibold text-zinc-900 transition hover:border-zinc-500"
          href="/"
        >
          Към началото
        </Link>
      </section>
    </main>
  );
}
