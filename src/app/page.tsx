"use client";
import Hero from "@/src/components/Hero";
import ProjectShowcase from "@/src/components/ProjectShowCase/ProjectShowCaseDekstop";
import ProjectShowCaseMobile from "@/src/components/ProjectShowCase/ProjectShowCaseMobile";
import { useEffect, useState } from "react";
import Education from "../components/Education";
import Capabilities from "../components/Capabilities";
import Certification from "../components/Certification";
import Contact from "../components/Contact";

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
      <Capabilities />
      <Education />
      {isMobile ? <ProjectShowCaseMobile /> : <ProjectShowcase />}
      <div className="min-h-screen text-white bg-neutral-950 flex items-center justify-center">
        <div>
          <Certification />
        </div>
      </div>
      <Contact />
    </main>
  );
}
