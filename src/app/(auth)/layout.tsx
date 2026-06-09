export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 py-10 text-zinc-950">
      {children}
    </main>
  );
}
