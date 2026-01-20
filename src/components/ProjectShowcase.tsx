"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { projects } from "../constant/project";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SYMBOLS = "!<>-_\\/[]{}—=+*^?#________";

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(".project-panel") as HTMLElement[];

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          const scrollTween = gsap.to(trackRef.current, {
            xPercent: -100 * (projects.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              start: "top top",
              end: `+=${3000}`,
              snap: 1 / (projects.length - 1),
            },
          });

          slides.forEach((slide) => {
            const title = slide.querySelector(".project-title") as HTMLElement;
            const originalText = title.innerText;

            gsap.fromTo(
              slide.querySelector(".project-info"),
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left center",
                  toggleActions: "play none none reverse",
                },
              },
            );

            ScrollTrigger.create({
              trigger: slide,
              containerAnimation: scrollTween,
              start: "left center",
              onEnter: () => {
                let progress = 0;
                const duration = 20;
                const interval = setInterval(() => {
                  progress++;
                  const length = originalText.length;
                  let result = "";
                  const scrambleIndex = Math.floor(
                    (progress / duration) * length,
                  );

                  for (let j = 0; j < length; j++) {
                    if (j < scrambleIndex) {
                      result += originalText[j];
                    } else {
                      result +=
                        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                    }
                  }
                  title.innerText = result;

                  if (progress >= duration) {
                    clearInterval(interval);
                    title.innerText = originalText;
                  }
                }, 30);
              },
            });

            const badges = slide.querySelectorAll(".tech-badge");
            gsap.from(badges, {
              opacity: 0,
              y: 20,
              stagger: 0.1,
              duration: 0.5,
              scrollTrigger: {
                trigger: slide,
                containerAnimation: scrollTween,
                start: "left center",
                toggleActions: "play none none reverse",
              },
            });

            gsap.from(slide.querySelector(".project-image"), {
              scale: 0.8,
              opacity: 0.5,
              duration: 1,
              scrollTrigger: {
                trigger: slide,
                containerAnimation: scrollTween,
                start: "left center",
                toggleActions: "play none none reverse",
              },
            });
          });
        },

        "(max-width: 767px)": function () {
          slides.forEach((slide) => {
            const title = slide.querySelector(".project-title") as HTMLElement;
            const originalText = title.innerText;

            ScrollTrigger.create({
              trigger: slide,
              start: "top 80%",
              onEnter: () => {
                let progress = 0;
                const duration = 20;
                const interval = setInterval(() => {
                  progress++;
                  const length = originalText.length;
                  let result = "";
                  const scrambleIndex = Math.floor(
                    (progress / duration) * length,
                  );

                  for (let j = 0; j < length; j++) {
                    if (j < scrambleIndex) {
                      result += originalText[j];
                    } else {
                      result +=
                        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                    }
                  }
                  title.innerText = result;
                  if (progress >= duration) {
                    clearInterval(interval);
                    title.innerText = originalText;
                  }
                }, 30);
              },
            });

            const badges = slide.querySelectorAll(".tech-badge");
            gsap.from(badges, {
              opacity: 0,
              y: 20,
              stagger: 0.1,
              scrollTrigger: {
                trigger: slide,
                start: "top 70%",
              },
            });
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-zinc-950 text-white overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row w-full md:h-screen md:w-[300%] h-auto"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-panel relative w-full h-screen md:w-screen md:h-full flex items-center justify-center p-6 md:p-24 border-b md:border-b-0 md:border-r border-zinc-800 bg-linear-to-br ${project.color}`}
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
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
