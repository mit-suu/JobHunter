import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative bg-[#F8F8FD] py-16 dark:bg-[#202430]">
      <div className="absolute inset-0 z-0 block dark:hidden">
        <img
          src="/img/bg1.svg"
          alt="Background"
          className="h-full w-full object-cover opacity-15"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-full sm:max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-5xl px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8">
        <h1 className="mb-10 text-left font-poppins text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Discover more than <br />
          <span className="relative inline-block text-blue-500">
            5000+ Jobs
            <img
              src="/img/underline.png"
              alt="underline"
              className="absolute left-0 w-full"
            />
          </span>
        </h1>

        <p className="my-6 text-left text-sm sm:text-base md:text-lg text-gray-500">
          Great platform for the job seeker that searching for new career
          heights and passionate about startups.
        </p>

        <div>
          <p className="font-poppins text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-gray-700 dark:text-white">
            Have you wanted to find a new job for yourself?
          </p>

          <div className="mt-3">
            <Link
              to="/findjobs"
              className="inline-block rounded-3xl bg-blue-600 px-5 py-2 sm:px-6 sm:py-3 font-poppins text-sm sm:text-base font-bold text-white shadow transition hover:bg-blue-700"
            >
              Let Started
            </Link>
          </div>

          <p className="mt-6 sm:mt-9 font-Epilogue text-sm sm:text-base font-light text-[#202430] dark:text-white/80">
            Popular roles by Tuan Hiep: UI Designer · UX Researcher · Front-end
            Developer · Admin
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
