import Link from "next/link";

const features = [
  "работници",
  "дневни надници",
  "разходи",
  "приходи",
  "месечни отчети",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <p className="text-base font-semibold">Brigada Ledger</p>
          <Link
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-500"
            href="/login"
          >
            Вход
          </Link>
        </header>

        <div className="flex flex-1 flex-col justify-center gap-10 py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase text-emerald-700">
              Оперативен дневник за малки екипи
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Следете работата и парите на бригадата без сложна счетоводна
              система.
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-700">
              Brigada Ledger помага на малки фирми и бригади да записват
              работници, дневни надници, разходи, приходи и месечни отчети на
              едно ясно място.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="flex min-h-12 items-center justify-center rounded-md bg-emerald-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-800"
              href="/register"
            >
              Регистрация
            </Link>
            <Link
              className="flex min-h-12 items-center justify-center rounded-md border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition hover:border-zinc-500"
              href="/login"
            >
              Вход
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feature) => (
              <div
                className="rounded-md border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-800"
                key={feature}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
