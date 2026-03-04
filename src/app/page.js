import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] px-6 py-10 bg-[#fafafa] dark:bg-zinc-950 transition-colors">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50">
        Página principal
      </h1>

      {/* Subtítulo */}
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Practicando estructura con React y Tailwind.
      </p>

      {/* Separador visual */}
      <div className="my-8 h-px bg-zinc-200 dark:bg-zinc-800 transition-colors" />

      {/* Componente externo */}
      <Hero />
    </main>
  );
}