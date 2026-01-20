import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SYMBOLS = "-=&*^%$#@";

export const ScrambleText = ({ text }: { text: string; index: number }) => {
  const elRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        start: "top 50%",
        end: "bottom top",
        scrub: true,
        pin: false,
      },
    });

    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 1,
        ease: "none",
        onUpdate: () => {
          const progress = counter.value;
          const length = text.length;
          let result = "";

          const scrambleIndex = Math.floor(progress * length);

          for (let i = 0; i < length; i++) {
            if (i < scrambleIndex) {
              result += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            } else {
              result += text[i];
            }
          }

          if (elRef.current) {
            elRef.current.innerText = result;
          }
        },
      },
      0,
    );

    tl.to(
      elRef.current,
      {
        opacity: 0,
        ease: "none",
      },
      0,
    );
  });

  return (
    <div ref={elRef} className="font-semibold text-zinc-300 px-3 py-1 rounded">
      {text}
    </div>
  );
};
