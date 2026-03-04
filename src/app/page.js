import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import SearchSection from "@/components/sections/SearchSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
        <Products />
        <SearchSection />
      </div>
    </main>
  );
}