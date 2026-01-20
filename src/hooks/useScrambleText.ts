"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const SYMBOLS = "!<>-_\\/[]{}—=+*^?#________";

export const useScrambleText = (text: string) => {
  const [displayText, setDisplayText] = useState(text);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const scramble = useCallback(() => {
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const length = text.length;
    const counter = { value: 0 };

    tweenRef.current = gsap.to(counter, {
      duration: 1,
      value: length,
      ease: "none",
      onUpdate: () => {
        const progress = Math.floor(counter.value);
        let result = "";

        for (let i = 0; i < length; i++) {
          if (i < progress) {
            result += text[i];
          } else {
            result += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          }
        }
        setDisplayText(result);
      },
      onComplete: () => {
        setDisplayText(text);
      },
    });
  }, [text]);

  const replay = useCallback(() => {
    scramble();
  }, [scramble]);

  useEffect(() => {
    scramble();

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [scramble]);

  return { displayText, replay };
};
