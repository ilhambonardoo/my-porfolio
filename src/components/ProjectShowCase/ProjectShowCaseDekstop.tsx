"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { projects } from "../../lib/data/project";
import { UseProjectAnimation } from "../../hooks/useProjectAnimation";
import Link from "next/link";
import useMounted from "@/src/hooks/useMounted";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(".project-panel") as HTMLElement[];

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          if (trackRef.current) {
            UseProjectAnimation(slides, trackRef.current, projects.length);
          }
        },
        "(max-width: 767px)": () => {
          if (trackRef.current) {
            UseProjectAnimation(slides, trackRef.current, projects.length);
          }
        },
      });
    },
    { scope: containerRef, dependencies: [mounted] },
  );

  if (!mounted) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-stone-100 text-stone-900 dark:bg-zinc-950 dark:text-white"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row w-full md:h-screen h-auto"
        style={{ width: "100%" }}
      >
        <div className="relative flex h-screen w-full shrink-0 items-center justify-center overflow-hidden border-b border-stone-300 bg-stone-200 p-6 dark:border-zinc-800 dark:bg-black md:h-full md:w-screen md:border-b-0 md:border-r md:p-24">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-br from-stone-200/30 via-stone-100/10 to-stone-200/50 dark:from-black/60 dark:via-black/40 dark:to-zinc-950/80" />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="project-first-title text-6xl font-bold tracking-tight text-stone-900 dark:text-white">
              P R O J E C T
            </h2>
            <p className="mt-4 max-w-xs text-lg text-stone-800 dark:text-zinc-400">
              Scroll down to see my project.
            </p>
          </div>
        </div>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-panel relative w-full h-screen md:w-screen md:h-full flex items-center justify-center p-6 md:p-24  bg-linear-to-br ${project.bg} shrink-0`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-12">
              <div className="project-info w-full md:w-1/2 flex flex-col gap-6 items-start z-10">
                <div className="overflow-hidden">
                  <h2 className="project-title mb-2 text-5xl font-bold tracking-tight text-stone-900 dark:text-white md:text-7xl">
                    {project.title}
                  </h2>
                </div>
                <p className="max-w-lg text-lg leading-relaxed text-stone-600 dark:text-zinc-300 md:text-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="tech-badge rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-zinc-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-image w-full md:w-1/2 relative aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                <Link
                  className="absolute inset-0 bg-neutral-900 flex items-center justify-center cursor-pointer"
                  href={project.Link || "#"}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100 dark:opacity-80"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
