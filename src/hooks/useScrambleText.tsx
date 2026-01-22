import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  createScrambleAnimation,
  SYMBOLS_SMALL,
} from "../utils/animationUtils";

export const ScrambleText = ({ text }: { text: string; index: number }) => {
  const elRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (elRef.current) {
      createScrambleAnimation(elRef.current, text, SYMBOLS_SMALL);
    }
  });

  return (
    <div ref={elRef} className="font-semibold text-zinc-300 px-3 py-1 rounded">
      {text}
    </div>
  );
};
