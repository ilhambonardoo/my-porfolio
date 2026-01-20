"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SYMBOLS = "!<>-_\\/[]{}—=+*^?#________";

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
          y: "30%",
          ease: "none",
        },
        0,
      );

      const counter = { value: 0 };
      tl.to(
        counter,
        {
          value: 1,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            const progress = counter.value;
            const length = originalText.length;
            let result = "";

            const scrambleIndex = Math.floor(progress * length);

            for (let i = 0; i < length; i++) {
              if (i < scrambleIndex) {
                result += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
              } else {
                result += originalText[i];
              }
            }

            if (textRef.current) {
              textRef.current.innerText = result;
            }
          },
        },
        0,
      );

      tl.to(
        textRef.current,
        {
          opacity: 0,
          ease: "none",
        },
        0,
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white flex items-center justify-center"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-linear-to-br bg-black"
        style={{ transform: "scale(1.2)" }}
      ></div>

      <div className="relative z-10 text-center px-4">
        <h1
          ref={textRef}
          className="text-5xl md:text-8xl font-bold tracking-tighter"
        >
          {originalText}
        </h1>
        <p className="mt-4 text-zinc-400 text-lg md:text-xl opacity-80">
          Scroll down to see the effect
        </p>
      </div>
    </div>
  );
}
