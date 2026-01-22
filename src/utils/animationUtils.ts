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
  text: string,
  symbols: string = SYMBOLS_SMALL,
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 42%",
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
            result += symbols[Math.floor(Math.random() * symbols.length)];
          } else {
            result += text[i];
          }
        }

        if (element) {
          element.innerText = result;
        }
      },
    },
    0,
  );

  tl.to(
    element,
    {
      opacity: 0,
      ease: "none",
    },
    0,
  );
};
