"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { persons } from "../lib/constant/project";
import { ScrambleText } from "../hooks/useScrambleText";
import { createScrambleAnimation, SYMBOLS } from "../lib/utils/animationUtils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const originalText = "B O N A R D O";

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: false,
        },
      });

      tl.to(
        bgRef.current,
        {
          y: "100%",
          ease: "none",
        },
        0,
      );

      if (textRef.current) {
        createScrambleAnimation(
          textRef.current,
          originalText,
          SYMBOLS,
          containerRef.current,
        );
      }
    },

    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-stone-100 text-stone-900 dark:bg-zinc-950 dark:text-white"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 scale-110 bg-stone-200 md:scale-125 dark:bg-black"
      >
        <Image
          src="/person/ilham2.png"
          alt="background-hero"
          fill
          className="object-cover object-[70%_20%] md:object-center opacity-30 md:opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 dark:to-zinc-950" />
      </div>

      <div className="relative z-10 text-center px-4">
        <h1
          ref={textRef}
          className="text-5xl md:text-8xl font-bold tracking-tighter"
        >
          {originalText}
        </h1>
        <div className="flex flex-wrap gap-6 justify-center max-w-2xl mx-auto">
          {persons.map((person, index) => (
            <ScrambleText key={person.id} text={person.hobby} index={index} />
          ))}
        </div>
        <p className="mt-4 text-lg text-stone-100 opacity-80 md:text-xl dark:text-zinc-400">
          Scroll down to see my experience
        </p>
      </div>
    </div>
  );
}
