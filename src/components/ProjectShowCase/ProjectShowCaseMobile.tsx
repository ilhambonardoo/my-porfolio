"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../../lib/constant/project";
import { UseProjectAnimation } from "../../hooks/useProjectAnimation";
import useMounted from "@/src/hooks/useMounted";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectShowCaseMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!trackRef.current) return;
      const slides = gsap.utils.toArray(".project-panel") as HTMLElement[];

      if (trackRef.current && slides.length > 0) {
        UseProjectAnimation(slides, trackRef.current, projects.length);
      }
    },
    { scope: sectionRef, dependencies: [mounted] },
  );

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="md:hidden relative bg-zinc-950 text-white overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex w-max h-screen"
        style={{ width: "100%" }}
      >
        <div className="project-panel relative w-screen h-screen shrink-0 flex items-center justify-center p-6 bg-black border-r border-zinc-800">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/40 to-zinc-950/80" />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="project-first-title text-5xl font-bold text-white tracking-tight">
              P R O J E C T
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-xs">
              Scroll down to see my project.
            </p>
          </div>
        </div>

        {projects.map((project) => (
          <article
            key={project.id}
            className={`project-panel relative w-screen h-screen shrink-0 flex items-center justify-center p-6 bg-linear-to-br ${project.bg}`}
          >
            <div className="w-full max-w-md flex flex-col gap-4">
              <div className="project-image relative aspect-video rounded-xl overflow-hidden ring-1 ring-white/10 group">
                <Link
                  href={project.Link || "#"}
                  target="_blank"
                  className="absolute inset-0 bg-neutral-900 flex items-center justify-center"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="100vw"
                  />
                </Link>
              </div>

              <div className="project-info">
                <h3 className="project-title text-3xl font-bold tracking-tight text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="tech-badge px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-zinc-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
