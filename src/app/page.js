import Hero from "@/components/sections/Hero";
import SearchBox from "@/components/sections/SearchBox";
import CategoriesSection from "@/components/sections/CategoriesSection";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] px-6 py-10 bg-[#fafafa] dark:bg-zinc-950 transition-colors">

      {/* Componente externo */}
      <Hero />

      {/* Buscador */}
      <div className="max-w-7xl mx-auto mt-12">
        <SearchBox />
      </div>

      {/* Categorías */}
      <CategoriesSection />
    </main>
  );
}