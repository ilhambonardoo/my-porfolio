"use client";
import Hero from "@/src/components/Hero";
import ProjectShowcase from "@/src/components/ProjectShowCase/ProjectShowCaseDekstop";
import ProjectShowCaseMobile from "@/src/components/ProjectShowCase/ProjectShowCaseMobile";
import Profile from "@/src/components/Profile";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkResize = () => {
      if (window.innerWidth < 758) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkResize();

    window.addEventListener("resize", checkResize);

    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, []);

  return (
    <main>
      <Hero />
      <Profile />
      {isMobile ? <ProjectShowCaseMobile /> : <ProjectShowcase />}
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <h2 className="text-4xl font-bold">Another Section</h2>
      </div>
    </main>
  );
}
