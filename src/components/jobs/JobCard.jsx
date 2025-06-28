import Button from ".././common/Button";

function JobCard({ job }) {
  const {
    logo,
    title,
    company,
    location,
    type,
    categories,
    applied,
    capacity,
  } = job;

  const appliedPercent = Math.min((applied / capacity) * 100, 100);

  return (
    <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-sm p-4 mb-4 hover:shadow-md transition bg-white dark:bg-gray-800">
      {/* Left - Info */}
      <div className="flex items-center gap-6 font-Epilogue">
        <div className="w-14 h-14 flex items-center justify-center">
          <img src={logo} alt={company} className="w-10 h-10 object-contain" />
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            {company} • {location}
          </p>

          <div className="flex gap-2 mt-2 flex-wrap items-center">
            <span className="text-sm font-bold px-4 py-[6px] rounded-full bg-[rgba(86,205,173,0.1)] text-[#56CDAD]">
              {type}
            </span>
            <span className="w-[1px] h-4 bg-gray-300"></span>
            {/* Categories */}
            {categories.map((cat, index) => (
              <span
                key={index}
                className={`text-xs font-semibold px-3 py-[6px] rounded-full box-border border-2 ${
                  index % 2 === 0
                    ? "text-[#FFB836] border-[#FFB836]"
                    : "text-[#6666FF] border-[#6666FF]"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Apply */}
      <div className="flex flex-col items-end gap-2 w-48">
        <Button>Apply</Button>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-sm h-2">
          <div
            className="bg-green-400 h-2 rounded-sm"
            style={{ width: `${appliedPercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <span className="font-semibold">{applied} applied</span > of{capacity}{" "}
          capacity
        </p>
      </div>
    </div>
  );
}

export default JobCard;
