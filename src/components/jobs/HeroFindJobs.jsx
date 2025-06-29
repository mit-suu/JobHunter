import { Link } from "react-router-dom";
import { CATEGORY_OPTIONS } from "../../contants/filters";

function HeroFindJobs() {
  const displayedCategories = CATEGORY_OPTIONS.slice(0, 4);

  return (
    <section className="relative bg-[#F8F8FD] py-16">
      <div className="absolute inset-0 z-0">
        <img
          src="/img/bg1.svg"
          alt="Background"
          className="h-full w-full object-cover opacity-15"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-poppins text-[533px] font-extrabold leading-tight text-gray-900 md:text-5xl">
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
          <p className="my-10 text-base text-gray-500 md:text-lg">
            Discover your next career adventure at top-tier companies like
            HubSpot, Nike, Dropbox.
          </p>
        </div>

        {/* Top Categories */}
        <div className="mt-10 w-full">
          <h3 className="mb-6 text-left font-poppins text-3xl font-bold text-gray-700">
            Top Categories
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayedCategories.map((category, index) => (
              <Link
                to={`/category/${category.label}`} // HOẶC `/category/${category.slug}` nếu bạn có slug chuẩn SEO
                key={index}
                className="group relative flex items-center justify-between overflow-hidden rounded-sm border border-gray-200 p-4 transition-all hover:bg-[#4640DE] hover:text-white"
              >
                {/* Normal Content */}
                <div className="flex items-center gap-4 transition-all group-hover:opacity-0">
                  <div className="text-blue-600 group-hover:text-white">
                    {category.icon}
                  </div>
                  <span className="text-lg font-medium text-gray-800 group-hover:text-white">
                    {category.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400 group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex translate-x-[-100%] items-center justify-center opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
                  <span className="text-lg font-semibold text-white">
                    Explore Now
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5 text-white"
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
          <p className="mt-9 font-Epilogue text-base font-light text-[#202430]">
            Popular roles by Tuan Hiep: UI Designer · UX Researcher · Front-end
            Developer · Admin
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroFindJobs;
