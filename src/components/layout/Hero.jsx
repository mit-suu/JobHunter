import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="relative bg-[#F8F8FD] py-16">
      <div className="absolute inset-0 z-0">
        <img
          src="/img/bg1.svg"
          alt="Background"
          className="h-full w-full object-cover opacity-15"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl">
        <h1 className="mb-4 text-left font-poppins text-[533px] font-extrabold leading-tight text-gray-900 md:text-5xl">
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
        <p className="my-10 text-left text-base text-gray-500 md:text-lg">
          Great platform for the job seeker that searching for new career
          heights and passionate about startups.
        </p>
        <div>
          <p className="font-poppins text-2xl font-bold tracking-wide text-gray-700">
            Have you wanted to find a new job for yourself?
          </p>
          <div className="mt-3">
            <Link
              to="/findjobs"
              className="inline-block rounded-3xl bg-blue-600 px-6 py-3 font-poppins text-base font-bold text-white shadow transition hover:bg-blue-700"
            >
              Let Started
            </Link>
          </div>
          <p className="mt-9 font-Epilogue text-base font-light text-[#202430]">
            Popular roles by Tuan Hiep: UI Designer · UX Researcher · Front-end
            Developer · Admin
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
