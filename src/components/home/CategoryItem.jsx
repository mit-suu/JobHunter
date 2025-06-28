
import { countByCategory } from "../../utils/jobUtils";
import { Link } from "react-router-dom";

function CategoryItem({ icon, label, jobs }) {
  const jobCount = countByCategory(jobs, label);

  return (
    <Link to="/home">

    <div className="group border rounded-sm p-[24px] bg-white text-[#4640DE] hover:bg-[#4640DE] flex justify-center flex-col gap-y-[24px] transition font-poppins">
      <div className="text-2xl group-hover:text-white">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1 text-[px] text-[#25324B] group-hover:text-white ">
          {label}
        </h3>
        <p className="text-base flex items-center gap-1 text-[#7C8493] group-hover:text-[#E0E0E0]">
          {jobCount} jobs available
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
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
