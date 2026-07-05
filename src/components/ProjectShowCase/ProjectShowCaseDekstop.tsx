"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { projects } from "../../constant/project";
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
      className="relative bg-zinc-950 text-white overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row w-full md:h-screen h-auto"
        style={{ width: "100%" }}
      >
        <div className="w-full h-screen md:w-screen md:h-full flex items-center justify-center p-6 md:p-24 border-b md:border-b-0 md:border-r bg-black border-zinc-800 shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={"/bgSlide/bg1.jpeg"}
              fill
              alt="background"
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/40 to-zinc-950/80" />
          </div>
          <h2 className="project-first-title text-5xl md:text-7xl z-50 font-bold text-white text-center tracking-tight hidden md:block">
            P R O J E C T
          </h2>
          <h2 className="text-5xl md:text-7xl z-50 font-bold text-white text-center tracking-tight md:hidden">
            P R O J E C T
          </h2>
        </div>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-panel relative w-full h-screen md:w-screen md:h-full flex items-center justify-center p-6 md:p-24  bg-linear-to-br ${project.bg} shrink-0`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-12">
              <div className="project-info w-full md:w-1/2 flex flex-col gap-6 items-start z-10">
                <div className="overflow-hidden">
                  <h2 className="project-title text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
                    {project.title}
                  </h2>
                </div>
                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="tech-badge px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-zinc-100"
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
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
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
