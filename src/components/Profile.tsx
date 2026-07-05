import Image from "next/image";
import { skills } from "../constant/profile";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import {
  createScrambleAnimation,
  SYMBOLS_SMALL,
} from "../utils/animationUtils";
import { FaAngleDown } from "react-icons/fa";

const Profile = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openExperience, setOpenExperience] = useState(true);

  useGSAP(
    () => {
      const textPanels =
        sectionRef.current?.querySelectorAll(".description-panel");

      textPanels?.forEach((panel) => {
        const textElement = panel as HTMLElement;
        const originalText = textElement.innerText;
        createScrambleAnimation(textElement, originalText, SYMBOLS_SMALL);
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  const showExperience = () => {
    setOpenExperience((prev) => !prev);
  };
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-950 text-white py-14 md:py-28 "
    >
      <div className="relative mx-auto w-full max-w-7xl md:px-10">
        <div className="mb-12 md:mb-16 mx-5">
          <div className="min-h-20 md:min-h-22">
            <h2 className="text-5xl font-semibold font-nb text-right leading-none">
              Tentang Saya
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="lg:col-span-2">
            <div className="flex gap-5 ">
              <div className="relative md:w-full ml-6 w-59.25 h-45.5 lg:w-100 lg:h-70  max-w-sm aspect-4/5 rounded-2xl overflow-hidden ring-1 ring-white/15 bg-zinc-900 shadow-2xl">
                <Image
                  src="/person/ilham2.png"
                  alt="Foto profil Ilham"
                  fill
                  className="object-cover "
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
              </div>
              <div className="flex flex-col gap-12 mt-2 mx-auto text-center">
                <p className="font-helvetica font-semibold">06</p>
                <p className="font-helvetica font-semibold">12</p>
                <p className="font-helvetica font-semibold">2004</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="rounded-2xl  p-6 md:p-8 backdrop-blur-sm">
              <h3 className="description-panel text-2xl font-nb font-semibold tracking-tight text-left">
                Ilham Bonardo Marpaung
              </h3>
              <p className="mt-4 text-zinc-300 text-justify lg:text-left leading-relaxed text-base md:text-lg font-helvetica">
                Mahasiswa semester 6 Sekolah Vokasi IPB University program studi
                Teknologi Rekayasa Komputer dengan fokus keahlian di bidang
                Software Development. Memiliki pengalaman praktis sebagai
                freelance web developer dalam merancang dan membangun website
                fungsional menggunakan Codeigneter4, Next.js, Laravel, dan
                Nuxt.js. Memiliki ketertarikan dan mengintegrasikan dalam
                pengembangan IoT (Internet Of Things), khususnya dalam
                mengintegrasikan perangkat keras dengan sistem berbasis web
                (Dashboard & Monitoring). Memiliki kemampuan untuk
                mengintegrasikan Machine Learning dengan Web seperti memprediksi
                suatu masalah dan sistem deteksi menggunakan citra.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-6 md:p-8 lg:w-full">
          <div className="flex gap-2">
            <h3 className="text-2xl font-semibold tracking-tight">Skills</h3>
            <button
              className="cursor-pointer ml-1 transition-colors duration-200 hover:text-zinc-400"
              onClick={showExperience}
              aria-expanded={openExperience}
            >
              <FaAngleDown
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
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <article
                  key={`${skill.title}-${skill.title}`}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-white/25 transition-colors duration-300"
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
                  <h4 className="mt-2 text-base font-semibold text-white">
                    {skill.title}{" "}
                  </h4>
                  <span className="mt-2 text-zinc-400 leading-relaxed text-sm">
                    {skill.level}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
