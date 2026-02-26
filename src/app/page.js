import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold">
        Página principal
      </h1>

      {/* Subtítulo */}
      <p className="mt-2 text-zinc-600">
        Practicando estructura con React y Tailwind.
      </p>

      {/* Separador visual */}
      <div className="my-8 h-px bg-zinc-200" />

      {/* Componente externo */}
      <Hero />
    </main>
  );
}