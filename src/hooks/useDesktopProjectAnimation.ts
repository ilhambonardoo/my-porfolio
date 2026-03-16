import gsap from "gsap";
import {
  createScrambleAnimation,
  SYMBOLS_SMALL,
} from "../utils/animationUtils";

export const UseDesktopProjectAnimation = (
  slides: HTMLElement[],
  trackRef: React.RefObject<HTMLDivElement>,
  projectsLength: number,
) => {
  const totalPanels = projectsLength + 1;

  const firstTitle = trackRef.current?.querySelector(
    ".project-first-title",
  ) as HTMLElement;
  if (firstTitle) {
    createScrambleAnimation(firstTitle, "P R O J E CT", SYMBOLS_SMALL);
  }

  const scrollTween = gsap.to(trackRef.current, {
    xPercent: -100 * (totalPanels - 1),
    ease: "none",
    scrollTrigger: {
      trigger: trackRef.current?.parentElement,
      pin: true,
      scrub: 1,
      start: "top top",
      end: `+=${(totalPanels - 1) * 3000}`,
      snap: 1 / (totalPanels - 1),
    },
  });

  slides.forEach((slide) => {
    const title = slide.querySelector(".project-title") as HTMLElement;
    if (!title) return;

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
};
