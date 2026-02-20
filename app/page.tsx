import Link from "next/link";

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold font-elephant">
            Class Performance Dashboard
          </h1>
          <p className="text-sm text-[#023E8A]">
            Choose your role to view the analytics.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Link
            href="/student"
            className="rounded-lg border border-zinc-200 bg-[#90E0EF] p-4 text-left hover:border-zinc-400"
          >
            <p className="text-xs font-medium uppercase text-[#023E8A]">
              Student
            </p>
            <p className="mt-2 text-sm font-semibold">
              See score distribution
            </p>
          </Link>

          <Link
            href="/professor"
            className="rounded-lg border border-zinc-200 bg-[#90E0EF] p-4 text-left hover:border-zinc-400"
          >
            <p className="text-xs font-medium uppercase text-[#023E8A]">
              Professor
            </p>
            <p className="mt-2 text-sm font-semibold">
              Subject-wise performance and class marks.
            </p>
          </Link>

          <Link
            href="/hod"
            className="rounded-lg border border-zinc-200 bg-[#90E0EF] p-4 text-left hover:border-zinc-400"
          >
            <p className="text-xs font-medium uppercase text-[#023E8A]">
              HOD
            </p>
            <p className="mt-2 text-sm font-semibold">
              Strongest and weakest subjects.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
