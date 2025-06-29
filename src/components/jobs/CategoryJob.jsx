// src/components/jobs/CategoryJob.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JobCardByCat from "./JobCardByCat";
import Pagination from "../common/Pagination";
import { getJobs } from "../../services/jobService";

function CategoryJob() {
  const { categoryName } = useParams();
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

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
    if (allJobs.length > 0) {
      const result = allJobs.filter((job) =>
        job.categories.some(
          (cat) => cat.toLowerCase() === categoryName.toLowerCase(),
        ),
      );
      setFilteredJobs(result);
      setCurrentPage(1);
    }
  }, [categoryName, allJobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h2 className="my-14 font-poppins text-[40px] font-bold text-gray-800 dark:text-white">
        Jobs in <span className="text-blue-600">{categoryName}</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : currentJobs.length === 0 ? (
        <p className="text-center text-gray-500">
          No jobs found for this category.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {currentJobs.map((job) => (
              <JobCardByCat key={job.id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CategoryJob;
