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
      className="relative overflow-hidden bg-stone-100 text-stone-900 dark:bg-zinc-950 dark:text-white md:hidden"
    >
      <div
        ref={trackRef}
        className="flex w-max h-screen"
        style={{ width: "100%" }}
      >
        <div className="project-panel relative flex h-screen w-screen shrink-0 items-center justify-center border-r border-stone-300 bg-stone-200 p-6 dark:border-zinc-800 dark:bg-black">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-br from-stone-200/60 via-stone-100/40 to-stone-200/80 dark:from-black/60 dark:via-black/40 dark:to-zinc-950/80" />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="project-first-title text-5xl font-bold tracking-tight text-stone-900 dark:text-white">
              P R O J E C T
            </h2>
            <p className="mt-4 max-w-xs text-sm text-stone-600 dark:text-zinc-400">
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
                <h3 className="project-title mb-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-700 dark:text-zinc-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="tech-badge rounded-full border border-stone-300 bg-white/70 px-3 py-1.5 text-xs font-medium text-stone-700 backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-zinc-100"
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
