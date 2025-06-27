// src/components/JobsPage.jsx
import { useState } from 'react';
import FilterSidebar from './FilterSideBar';
import JobList from './JobList';

function JobsPage() {
  const [filters, setFilters] = useState({
    type: [],
    categories: [],
    level: [],
    salaryRange: []
  });
 const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    scrollToJobList();
  };

  const scrollToJobList = () => {
    const el = document.getElementById('job-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div  className=" flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 border-r-2 pr-4">
        <FilterSidebar onFilterChange={setFilters} />
      </aside>

      {/* Main content */}
      <main  className=" flex-1">
        <JobList filters={filters} />
      </main>
    </div>
  );
}

export default JobsPage;
