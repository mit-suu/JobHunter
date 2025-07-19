import React from "react";
import { Link } from "react-router-dom";

function LatestJobItem({ job }) {
  const { id, logo, title, company, location, type, categories } = job;

  return (
    <Link to={`/jobs/${id}`} className="block">
      <div className="bg-white p-6 transition duration-300 hover:shadow-md rounded-lg">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center">
            <img src={logo} alt={company} className="h-12 w-12 object-contain" />
          </div>

          {/* Nội dung */}
          <div className="flex flex-1 flex-col">
            <h3 className="text-lg font-semibold text-[#25324B]">{title}</h3>
            <p className="text-sm text-[#7C8493]">
              {company} • {location}
            </p>

            {/* Type & Categories */}
            <div className="mt-3 flex flex-wrap items-center gap-4">
              {/* Type */}
              <span className="rounded-full bg-[rgba(86,205,173,0.1)] px-3 py-1 text-xs font-semibold text-[#56CDAD]">
                {type}
              </span>

              {/* Đường kẻ dọc */}
              <span className="h-4 w-[1px] bg-gray-300"></span>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, index) => (
                  <span
                    key={index}
                    className={`box-border rounded-full border-2 px-3 py-1 text-xs font-semibold ${
                      index % 2 === 0
                        ? "border-[#FFB836] text-[#FFB836]"
                        : "border-[#6666FF] text-[#6666FF]"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LatestJobItem;
