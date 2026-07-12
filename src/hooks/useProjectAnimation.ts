import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrambleText } from "../utils/animationUtils";

export const UseProjectAnimation = (
  slides: HTMLElement[],
  trackElement: HTMLDivElement | null,
  projectsLength: number,
) => {
  if (!trackElement) return;

  const totalPanels = projectsLength + 1;

  const scrollTween = gsap.to(trackElement, {
    xPercent: -120 * (totalPanels - 1),
    ease: "none",
    scrollTrigger: {
      trigger: trackElement.parentElement,
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => `+=${trackElement.scrollWidth - window.innerWidth}`,
      snap: 1 / (totalPanels - 1),
    },
  });

  slides.forEach((slide) => {
    const title = slide.querySelector(".project-title") as HTMLElement | null;

    if (title) {
      const originalText = title.innerText;

      ScrollTrigger.create({
        trigger: slide,
        containerAnimation: scrollTween,
        start: "left center",
        onEnter: () => scrambleText(title, originalText),
      });
    }
    const info = slide.querySelector(".project-info") as HTMLElement;
    if (info) {
      gsap.fromTo(
        info,
        { opacity: 0, y: 40 },
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
    }

    const badges = slide.querySelectorAll(".tech-badge");

    if (badges.length > 0) {
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
    }

    const image = slide.querySelector(".project-image") as HTMLElement;
    if (image) {
      gsap.from(image, {
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
    }
  });
};
