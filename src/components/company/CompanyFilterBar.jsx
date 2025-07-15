import { HiSearch } from "react-icons/hi";

function CompanyFilterBar({ onSearchChange, onSortChange }) {
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 md:flex-row">
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search by company name..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border-gray-300 py-2 pl-10 pr-4 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <HiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="w-full md:w-auto">
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-md border-gray-300 py-2 pl-3 pr-8 text-base focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="most-jobs">Sort by Most Jobs</option>
          <option value="name-asc">Sort by Name (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

export default CompanyFilterBar;