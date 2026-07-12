"use client";
import Hero from "@/src/components/Hero";
import ProjectShowcase from "@/src/components/ProjectShowCase/ProjectShowCaseDekstop";
import ProjectShowCaseMobile from "@/src/components/ProjectShowCase/ProjectShowCaseMobile";
import Profile from "@/src/components/Profile";
import { useEffect, useState } from "react";
import Education from "../components/Education";
import Capabilities from "../components/Capabilities";

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
      <Capabilities />
      <Education />
      {isMobile ? <ProjectShowCaseMobile /> : <ProjectShowcase />}
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div></div>
      </div>
    </main>
  );
}
