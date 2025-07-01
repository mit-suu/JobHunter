import { countByCategory } from "../../utils/jobUtils";
import { Link } from "react-router-dom";

function CategoryItem({ icon, label, jobs }) {
  const jobCount = countByCategory(jobs, label);

  return (
    <Link to={`/category/${label}`}>
      <div className="group flex cursor-pointer flex-col justify-center gap-y-[24px] rounded-sm bg-white p-[24px] font-poppins text-[#4640DE] transition hover:bg-[#4640DE]">
        <div className="text-2xl group-hover:text-white">{icon}</div>
        <div>
          <h3 className="mb-1 text-base font-semibold text-[#25324B] group-hover:text-white">
            {label}
          </h3>
          <p className="flex items-center gap-1 text-base text-[#7C8493] group-hover:text-[#E0E0E0]">
            {jobCount} jobs available
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CategoryItem;
