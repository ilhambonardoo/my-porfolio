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
) => {
  const targetText = text && text.length > 0 ? text : element.innerText;
  const initialHeight = element.offsetHeight;
  if (initialHeight > 0) {
    element.style.minHeight = `${initialHeight}px`;
  }

  const counter = { value: 0 };
  gsap.to(counter, {
    value: 1.1,
    duration: 0.9,
    ease: "power1.out",
    scrollTrigger: {
      trigger: element,
      start: "top 75%",
      toggleActions: "play none none none",
      scrub: true,
    },
    onUpdate: () => {
      const progress = counter.value;
      const length = targetText.length;
      const revealIndex = Math.floor(progress * length);
      let result = "";

      for (let i = 0; i < length; i++) {
        const char = targetText[i];

        if (/\s/.test(char)) {
          result += char;
          continue;
        }

        if (i < revealIndex) {
          result += char;
        } else {
          result += symbols[Math.floor(Math.random() * symbols.length)];
        }
      }

      element.innerText = result;
    },
    onComplete: () => {
      element.innerText = targetText;
      if (initialHeight > 0) {
        element.style.minHeight = "";
      }
    },
  });
};
