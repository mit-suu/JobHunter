import { Link } from "react-router-dom";
import { CATEGORY_OPTIONS } from '../../contants/filters';

function HeroFindJobs() {
  const displayedCategories = CATEGORY_OPTIONS.slice(0, 4);

  return (
    <section className="bg-[#F8F8FD] py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-[533px] md:text-5xl font-extrabold text-gray-900 leading-tight font-poppins">
            Find your{" "}
            <span className="relative inline-block text-[#26A4FF]">
              dream job
              <img
                src="/img/underline.png"
                alt="underline"
                className="absolute left-0 w-full"
              />
            </span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg my-10">
            Discover your next career adventure at top-tier companies like
            HubSpot, Nike, Dropbox.
          </p>
        </div>

        {/* Top Categories */}
        <div className="w-full mt-10">
          <h3 className="text-gray-700 text-3xl font-bold font-poppins text-left mb-6">
            Top Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCategories.map((category, index) => (
              <Link
                to="/home"
                key={index}
                className="group relative flex items-center justify-between border border-gray-200 rounded-sm p-4 overflow-hidden transition-all hover:bg-[#4640DE] hover:text-white"
              >
                {/* Normal Content */}
                <div className="flex items-center gap-4 transition-all group-hover:opacity-0">
                  <div className="text-blue-600 group-hover:text-white">{category.icon}</div>
                  <span className="text-gray-800 group-hover:text-white font-medium text-lg">
                    {category.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400 group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-x-[-100%] group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <span className="text-white text-lg font-semibold">Explore Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-2 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Popular Roles */}
          <p className="font-Epilogue text-[#202430] mt-9 font-light text-base">
            Popular roles by Tuan Hiep: UI Designer · UX Researcher · Front-end Developer · Admin
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroFindJobs;
