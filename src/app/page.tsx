import Hero from "@/src/components/Hero";
import ProjectShowcase from "@/src/components/ProjectShowcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectShowcase />
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <h2 className="text-4xl font-bold">Another Section</h2>
      </div>
    </main>
  );
}
