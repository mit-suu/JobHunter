import { useEffect, useState } from "react";
import { getJobs } from "../../services/jobService";
import FeaturedJobsItem from "./FeaturedJobsItem";
import { useNavigate } from "react-router-dom";

function FeaturedJobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getJobs();

      // Tiêu chí chọn Featured Job: tỉ lệ applied > 50%
      const featured = data
        .filter((job) => job.applied / job.capacity > 0.5)
        .slice(0, 8); // Giới hạn 8 job

      setJobs(featured);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <section className="mx-[124px] my-9">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-poppins text-[40px] font-bold text-gray-800 dark:text-white">
          Featured <span className="text-blue-600">jobs</span>
        </h2>
        <button
          onClick={() => navigate("/findjobs")}
          className="flex items-center font-medium text-blue-600 hover:underline"
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

      {loading ? (
        <p className="text-gray-500">Loading featured jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No featured jobs available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {jobs.map((job) => (
            <FeaturedJobsItem key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedJobsList;
