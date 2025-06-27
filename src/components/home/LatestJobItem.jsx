import React from 'react';

function LatestJobItem({ job }) {
  const { logo, title, company, location, type, categories } = job;

  return (
    <div className="bg-white p-6  hover:shadow-md transition duration-300">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
          <img src={logo} alt={company} className="w-12 h-12 object-contain" />
        </div>

        {/* Nội dung */}
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-[#25324B]">{title}</h3>
          <p className="text-sm text-[#7C8493]">{company} • {location}</p>

          {/* Type & Categories */}
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {/* Type */}
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[rgba(86,205,173,0.1)] text-[#56CDAD]">
              {type}
            </span>

            {/* Đường kẻ dọc */}
            <span className="w-[1px] h-4 bg-gray-300"></span>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat, index) => (
                <span
                  key={index}
                  className={`
                    text-xs font-semibold px-3 py-1 rounded-full box-border border-2
                    ${
                      index % 2 === 0
                        ? 'border-[#FFB836] text-[#FFB836]'
                        : 'border-[#6666FF] text-[#6666FF]'
                    }
                  `}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestJobItem;
