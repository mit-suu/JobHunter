import { useState, useEffect } from "react";
import { getJobs } from "../../services/jobService";
import {
  CATEGORY_OPTIONS,
  LEVEL_OPTIONS,
  SALARY_OPTIONS,
  TYPE_OPTIONS,
} from "../../contants/filters";
import {
  countByType,
  countByCategory,
  countByLevel,
  countBySalary,
} from "../../utils/jobUtils";
function FilterSidebar({ onFilterChange }) {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: [],
    categories: [],
    level: [],
    salaryRange: [],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getJobs();
      setAllJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  const handleCheckboxChange = (section, value) => {
    setFilters((prev) => {
      const currentValues = prev[section];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      const updated = { ...prev, [section]: newValues };
      onFilterChange(updated);
      return updated;
    });
  };

  const handleClearAll = () => {
    const cleared = {
      type: [],
      categories: [],
      level: [],
      salaryRange: [],
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="space-y-6 text-sm text-gray-700 dark:text-gray-400">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold dark:text-white">Filters</h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-blue-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Type of Employment */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
          Type of Employment
        </h3>
        {TYPE_OPTIONS.map((type, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={`type-${index}`}
              onChange={() => handleCheckboxChange("type", type)}
              checked={filters.type.includes(type)}
              className="h-4 w-4 cursor-pointer rounded border-[#D6DDEB] text-[#E9EBFD] checked:border-[#4640DE] checked:bg-[#4640DE] focus:ring-0"
            />
            <label
              htmlFor={`type-${index}`}
              className="ml-3 flex flex-1 cursor-pointer justify-between text-sm"
            >
              <span>{type}</span>
              <span className="text-gray-400 dark:text-gray-500">
                {countByType(allJobs, type)}
              </span>
            </label>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="mt-5">
        <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
          Categories
        </h3>
        {CATEGORY_OPTIONS.map((cat, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={`cat-${index}`}
              onChange={() => handleCheckboxChange("categories", cat.label)}
              checked={filters.categories.includes(cat.label)}
              className="h-4 w-4 cursor-pointer rounded border-[#D6DDEB] text-[#E9EBFD] checked:border-[#4640DE] checked:bg-[#4640DE] focus:ring-0"
            />
            <label
              htmlFor={`cat-${index}`}
              className="ml-3 flex flex-1 cursor-pointer justify-between text-sm"
            >
              <span className="flex items-center gap-2">{cat.label}</span>
              <span className="text-gray-400 dark:text-gray-500">
                {countByCategory(allJobs, cat.label)}
              </span>
            </label>
          </div>
        ))}
      </div>

      {/* Job Level */}
      <div className="mt-5">
        <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
          Job Level
        </h3>
        {LEVEL_OPTIONS.map((level, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={`level-${index}`}
              onChange={() => handleCheckboxChange("level", level)}
              checked={filters.level.includes(level)}
              className="h-4 w-4 cursor-pointer rounded border-[#D6DDEB] text-[#E9EBFD] checked:border-[#4640DE] checked:bg-[#4640DE] focus:ring-0"
            />
            <label
              htmlFor={`level-${index}`}
              className="ml-3 flex flex-1 cursor-pointer justify-between text-sm"
            >
              <span>{level}</span>
              <span className="text-gray-400 dark:text-gray-500">
                {countByLevel(allJobs, level)}
              </span>
            </label>
          </div>
        ))}
      </div>

      {/* Salary Range */}
      <div className="mt-5">
        <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
          Salary Range
        </h3>
        {SALARY_OPTIONS.map((sal, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={`salary-${index}`}
              onChange={() => handleCheckboxChange("salaryRange", sal)}
              checked={filters.salaryRange.includes(sal)}
              className="h-4 w-4 cursor-pointer rounded border-[#D6DDEB] text-[#E9EBFD] checked:border-[#4640DE] checked:bg-[#4640DE] focus:ring-0"
            />
            <label
              htmlFor={`salary-${index}`}
              className="ml-3 flex flex-1 cursor-pointer justify-between text-sm"
            >
              <span>{sal}</span>
              <span className="text-gray-400 dark:text-gray-500">
                {countBySalary(allJobs, sal)}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterSidebar;
