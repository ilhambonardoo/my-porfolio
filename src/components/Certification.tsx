import { certifications } from "../lib/data/profile";
import Image from "next/image";

const Certification = () => {
  return (
    <section className="relative overflow-hidden bg-stone-50 text-stone-900 dark:bg-neutral-950 dark:text-white">
      <div className="relative mx-auto w-full max-w-7xl md:px-10 px-5">
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <div className="min-h-20 md:min-h-22">
            <h2 className="text-5xl font-semibold font-nb text-left leading-none">
              Certification
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          {certifications.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8 md:gap-16`}
            >
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative group p-4 bg-gray-50 rounded-2xl transition-all duration-500 hover:shadow-xl hover:bg-white border border-gray-100">
                  <Image
                    src={item.logo}
                    width={400}
                    height={400}
                    alt={item.title}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="w-full md:w-3/5 text-center md:text-left">
                <h3 className="font-plenty mb-6 text-2xl font-semibold leading-tight text-stone-900 dark:text-white md:text-3xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-700 text-justify dark:text-white md:text-left md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certification;
