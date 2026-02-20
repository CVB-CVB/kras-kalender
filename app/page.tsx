import { Grid } from "@/src/components/grid";

export default function Page() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-zinc-900 text-white">
      <header className="p-6 text-center">
        <h1 className="text-3xl font-bold">Kras Kalender</h1>
        <p className="text-zinc-400 mt-2">Kras een vakje en ontdek je prijs</p>
      </header>
      <div className="h-full w-full flex items-center justify-center">
        <Grid />
      </div>
    </main>
  );
}
