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
    <div className="mb-4 flex items-center justify-between rounded-sm border border-gray-200 bg-white p-4 transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      {/* Left - Info */}
      <div className="flex items-center gap-6 font-Epilogue">
        <div className="flex h-14 w-14 items-center justify-center">
          <img src={logo} alt={company} className="h-10 w-10 object-contain" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400">
            {company} • {location}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[rgba(86,205,173,0.1)] px-4 py-[6px] text-sm font-bold text-[#56CDAD]">
              {type}
            </span>
            <span className="h-4 w-[1px] bg-gray-300"></span>
            {/* Categories */}
            {categories.map((cat, index) => (
              <span
                key={index}
                className={`box-border rounded-full border-2 px-3 py-[6px] text-xs font-semibold ${
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

      {/* Right - Apply */}
      <div className="flex w-48 flex-col items-end gap-2">
        <Button>Apply</Button>

        <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-sm bg-green-400"
            style={{ width: `${appliedPercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <span className="font-semibold">{applied} applied</span> of{capacity}{" "}
          capacity
        </p>
      </div>
    </div>
  );
}

export default JobCard;
