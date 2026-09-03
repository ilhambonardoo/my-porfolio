"use client";
import { useState } from "react";
import { skills } from "../lib/constant/profile";
import { FaAngleUp } from "react-icons/fa";

const Capabilities = () => {
  const [openExperience, setIsShowExperience] = useState(true);

  const showExperience = () => {
    setIsShowExperience((prev) => !prev);
  };

  return (
    <section className="mx-auto w-full bg-stone-100 py-14 text-stone-900 dark:bg-neutral-950 dark:text-white lg:px-56">
      <div className="rounded-2xl p-6 md:p-8 lg:w-full">
        <div className="flex gap-2">
          <h3 className="text-5xl font-semibold tracking-tight">
            CAPABILITIES
          </h3>
          <button
            className="cursor-pointer ml-1 transition-colors duration-200 hover:text-zinc-400"
            onClick={showExperience}
            aria-expanded={openExperience}
          >
            <FaAngleUp
              className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                openExperience ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            openExperience
              ? "max-h-250 opacity-100 mt-6"
              : "max-h-0 opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {skills.map((skill, index) => (
              <article
                key={`${skill.title}-${index}`}
                className="rounded-xl border border-stone-300 bg-white p-5 transition-colors duration-300 hover:border-stone-400 hover:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25 dark:hover:bg-white/10"
                style={{
                  opacity: openExperience ? 1 : 0,
                  transform: openExperience
                    ? "translateY(0px)"
                    : "translateY(-10px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "380ms",
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: openExperience
                    ? `${index * 70}ms`
                    : `${(skills.length - 1 - index) * 45}ms`,
                }}
              >
                <h4 className="text-base font-semibold text-stone-900 dark:text-white">
                  {skill.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 text-justify dark:text-zinc-400">
                  {skill.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
