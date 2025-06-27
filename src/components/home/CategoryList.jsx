import React from "react";
import { CATEGORY_OPTIONS } from "../../contants/filters";
import CategoryItem from "./CategoryItem";
import { useJobs } from "../../hooks/useJobs"; // hoặc truyền props jobs

import { useNavigate } from "react-router-dom";

function CategoryList() {
  const { jobs } = useJobs(); // nếu bạn có custom hook để lấy jobs
  const navigate = useNavigate();

  return (
    <section className="mx-[124px] my-9 ">
      <div className="flex justify-between items-center mb-6 space-y-16">
        <h2 className="font-bold text-gray-800 text-[40px] font-poppins dark:text-white">
          Explore by <span className="text-blue-600">category</span>
        </h2>
        <button
          onClick={() => navigate("/findjobs")}
          className="flex items-center text-blue-600 font-medium hover:underline"
        >
          Show all jobs
          <svg
            className="w-4 h-4 ml-1"
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
