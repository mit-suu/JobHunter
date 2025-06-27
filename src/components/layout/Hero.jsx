import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="bg-[#F8F8FD] py-16">
      <div className="max-w-5xl mx-auto ">
        <h1 className="text-[533px] md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight font-poppins text-left">
          Discover more than <br />
          <span className="relative inline-block text-blue-500">
            5000+ Jobs
            <img
              src="/img/underline.png"
              alt="underline"
              className="absolute left-0  w-full"
            />
          </span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg text-left my-10">
          Great platform for the job seeker that searching for new career
          heights and passionate about startups.
        </p>
        <div>
          <p className="text-gray-700 text-2xl  font-bold font-poppins  tracking-wide">
            Have you wanted to find a new job for yourself?
          </p>
          <div className="mt-3">
            <Link
              to="/findjobs"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-base font-bold rounded-3xl shadow hover:bg-blue-700 transition font-poppins "
            >
              Let Started
            </Link>
          </div>
           <p className="font-Epilogue text-[#202430] mt-9 font-light text-base">
            Popular roles by Tuan Hiep: UI Designer · UX Researcher · Front-end Developer · Admin
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
