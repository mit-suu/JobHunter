// src/components/JobsPage.jsx
import { useState } from "react";
import FilterSidebar from "./FilterSideBar";
import JobList from "./JobList";

function JobsPage() {
  const [filters, setFilters] = useState({
    type: [],
    categories: [],
    level: [],
    salaryRange: [],
  });
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    scrollToJobList();
  };

  const scrollToJobList = () => {
    setTimeout(() => {
      const el = document.getElementById("job-list");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 md:flex-row">
      {/* Sidebar */}
      <aside className="w-full border-r-2 pr-4 md:w-1/4">
        <FilterSidebar onFilterChange={handleFilterChange} />
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <JobList filters={filters} />
      </main>
    </div>
  );
}

export default JobsPage;
