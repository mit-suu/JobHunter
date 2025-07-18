import Button from "../common/Button";
import {Link } from 'react-router-dom';

const CATEGORY_STYLES = {
  Design: "border-[#FFB836] text-[#FFB836]",
  Technology: "border-[#6666FF] text-[#6666FF]",
  Marketing: "border-[#28A745] text-[#28A745]",
  Animation: "border-[#6F42C1] text-[#6F42C1]",
  Product: "border-[#FF6347] text-[#FF6347]",
  Branding: "border-[#20C997] text-[#20C997]",
  "Video Editing": "border-[#FF69B4] text-[#FF69B4]",
};

function JobCardByCat({ job }) {
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
    

    <Link to={`/jobs/${job.id}`} className="block">
        <div className="flex h-full min-h-[250px] flex-col justify-between space-y-10 rounded border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* TOP: Logo + Info */}
      <div className="mb-4 flex items-start gap-4">
        <div className="h-12 w-12 flex-shrink-0">
          <img
            src={logo}
            alt={company}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {company} • {location}
          </p>
          <span className="mt-2 inline-block w-fit rounded-full bg-[rgba(86,205,173,0.1)] px-3 py-1 text-xs font-bold text-[#56CDAD]">
            {type}
          </span>
        </div>
      </div>

      {/* BOTTOM: Categories + Apply */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`rounded-full border px-3 py-[4px] text-xs font-semibold ${
                CATEGORY_STYLES[cat] || "border-red-300 text-red-500"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Button>Apply</Button>
          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-sm bg-green-400"
              style={{ width: `${appliedPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{applied} applied</span> of{" "}
            {capacity} capacity
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default JobCardByCat;
