import React from "react";
import { CATEGORY_OPTIONS } from "../../contants/filters";
import CategoryItem from "./CategoryItem";
import { useJobs } from "../../hooks/useJobs";
import { useNavigate } from "react-router-dom";

function CategoryList() {
  const { jobs } = useJobs();
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-9">
      <div className="mb-6 flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center">
        <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          Explore by <span className="text-[#26A4FF]">category</span>
        </h2>
        <button
          onClick={() => navigate("/findjobs")}
          className="flex items-center font-medium text-[#26A4FF] hover:underline"
        >
          Show all jobs
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
        {CATEGORY_OPTIONS.map((item, index) => (
          <CategoryItem
            key={index}
            icon={item.icon}
            label={item.label}
            jobs={jobs}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryList;
