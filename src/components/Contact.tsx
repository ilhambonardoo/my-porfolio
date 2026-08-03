import { contact } from "../constant/profile";

const Contact = () => {
  return (
    <>
      <section className="min-h-screen flex justify-center items-center bg-neutral-950 text-white px-5 md:px-0">
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0">
            <div className="text-center md:text-left">
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-nb font-semibold tracking-tight">
                CONTACT
              </h1>
              <div className="flex flex-col justify-center items-center gap-4 mt-4 md:mt-2">
                <p className="font-light text-neutral-300 text-sm md:text-base">
                  Email : ilhambonardomarpaung@gmail.com
                </p>
                <p className="font-light text-neutral-300 text-sm md:text-base">
                  Phone : 085884153418
                </p>
              </div>
            </div>

            <div className="flex gap-5 px-0 md:px-15 justify-center">
              {contact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index}>
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="cursor-pointer hover:scale-110 transition-transform duration-300 w-9.5 h-9.5 md:w-11.25 md:h-11.25" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
