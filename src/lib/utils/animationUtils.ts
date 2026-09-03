import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SYMBOLS = "!<>-_\\/[]{}—=+*^?#________";
export const SYMBOLS_SMALL = "-=&*^%$#@";

export const scrambleText = (element: HTMLElement, originalText: string) => {
  let progress = 0;
  const duration = 20;
  const interval = setInterval(() => {
    progress++;
    const length = originalText.length;
    let result = "";
    const scrambleIndex = Math.floor((progress / duration) * length);

    for (let j = 0; j < length; j++) {
      if (j < scrambleIndex) {
        result += originalText[j];
      } else {
        result += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      }
    }
    element.innerText = result;

    if (progress >= duration) {
      clearInterval(interval);
      element.innerText = originalText;
    }
  }, 30);
};

export const createScrambleAnimation = (
  element: HTMLElement,
  text?: string,
  symbols: string = SYMBOLS_SMALL,
  triggerElement?: HTMLElement | null,
) => {
  const targetText = text && text.length > 0 ? text : element.innerText;

  element.innerText = targetText;

  const counter = { value: 0 };

  gsap.to(counter, {
    value: 1.1,
    duration: 0.9,
    ease: "none",
    scrollTrigger: {
      trigger: triggerElement ?? element,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    onUpdate: () => {
      if (counter.value === 0) {
        element.innerText = targetText;
        return;
      }

      const length = targetText.length;
      const revealIndex = Math.floor(counter.value * length);
      let result = "";

      for (let i = 0; i < length; i++) {
        const character = targetText[i];

        if (/\s/.test(character)) {
          result += character;
        } else if (i <= length - revealIndex) {
          result += character;
        } else {
          result += symbols[Math.floor(Math.random() * symbols.length)];
        }
      }

      element.innerText = result;
    },
    onComplete: () => {
      element.innerText = targetText;
    },
  });
};
