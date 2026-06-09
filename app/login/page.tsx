import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 py-10 text-zinc-950">
      <section className="w-full max-w-md rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-emerald-700">Brigada Ledger</p>
        <h1 className="mt-3 text-3xl font-bold">Вход</h1>
        <p className="mt-4 text-base leading-7 text-zinc-700">
          Страницата за вход ще бъде добавена в следваща стъпка.
        </p>
        <Link
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
          href="/"
        >
          Към началото
        </Link>
      </section>
    </main>
  );
}
