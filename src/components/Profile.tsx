import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import {
  createScrambleAnimation,
  SYMBOLS_SMALL,
} from "../utils/animationUtils";

const Profile = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-950 text-white py-14"
    >
      <div className="relative mx-auto w-full max-w-7xl md:px-10">
        <div className="mb-12 md:mb-16 mx-5">
          <div className="min-h-20 md:min-h-22">
            <h2 className="text-5xl font-semibold font-nb text-right leading-none">
              DEFINITION
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
      </div>
    </section>
  );
};

export default Profile;
