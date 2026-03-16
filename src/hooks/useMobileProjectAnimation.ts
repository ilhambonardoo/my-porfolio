import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrambleText } from "../utils/animationUtils";

export const UseMobileProjectAnimation = (slides: HTMLElement[]) => {
  slides.forEach((slide) => {
    const title = slide.querySelector(".project-title") as HTMLElement;
    const originalText = title.innerText;

    ScrollTrigger.create({
      trigger: slide,
      start: "top 80%",
      onEnter: () => scrambleText(title, originalText),
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
};
