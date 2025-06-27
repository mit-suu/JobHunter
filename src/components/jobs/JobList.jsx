import { useEffect, useState } from "react";
import { getJobs } from "../../services/jobService";
import JobCard from "./JobCard";
import Pagination from "../common/Pagination";

function JobList({ filters }) {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 7;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getJobs();
      setAllJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const result = allJobs.filter((job) => {
      const typeMatch = filters.type.includes(job.type);
      const categoryMatch = filters.categories.some((cat) =>
        job.categories.includes(cat)
      );
      const levelMatch = filters.level.includes(job.level);
      const salaryMatch = filters.salaryRange.includes(job.salaryRange);

      const hasAnyFilter =
        filters.type.length > 0 ||
        filters.categories.length > 0 ||
        filters.level.length > 0 ||
        filters.salaryRange.length > 0;

      return (
        !hasAnyFilter || typeMatch || categoryMatch || levelMatch || salaryMatch
      );
    });

    setFilteredJobs(result);
    setCurrentPage(1);
  }, [filters, allJobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="flex-1 ">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        All Jobs
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading jobs...
        </p>
      ) : currentJobs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No jobs found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default JobList;
