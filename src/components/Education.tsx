"use client";

import { educations } from "../lib/constant/profile";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white py-14 md:py-28">
      <div className="relative mx-auto w-full max-w-7xl md:px-10">
        <div className="mb-12 md:mb-16 mx-5">
          <div className="min-h-20 md:min-h-22">
            <h2 className="title-panel text-5xl font-semibold font-nb text-right leading-none">
              EDUCATION
            </h2>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-0 mx-5 lg:grid-cols-2 lg:grid lg:gap-5 lg:w-full">
          {educations.map((education) => (
            <article
              key={education.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-sm hover:bg-white/10 hover:border-white/25"
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div className="shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <FaGraduationCap className="text-xl md:text-2xl text-zinc-300" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <h3 className="education-panel text-xl md:text-2xl font-semibold tracking-tight text-white">
                      {education.institution}
                    </h3>
                    <span className="text-sm md:text-base text-zinc-400 font-helvetica">
                      {education.period}
                    </span>
                  </div>
                  <p className="text-base md:text-lg font-medium text-zinc-300">
                    {education.program}
                  </p>
                  <p className="text-sm md:text-base text-zinc-300 font-medium mb-3">
                    {education.gpa}
                  </p>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-helvetica">
                    {education.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Education;
