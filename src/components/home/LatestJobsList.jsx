import { useEffect, useState } from "react";
import { getJobs } from "../../services/jobService";
import LatestJobItem from "./LatestJobItem";
import { useNavigate } from "react-router-dom";

function LatestJobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getJobs();
      const latest = [...data].sort((a, b) => b.id - a.id).slice(0, 8);
      setJobs(latest);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="relative px-[124px] py-[80px] overflow-hidden">
      {/* Background image: chỉ light mode */}
      <div
        className="absolute inset-0 z-0 block dark:hidden"
        style={{
          backgroundImage: 'url("/img/Desktop.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative z-10">
       <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-col md:flex-col lg:flex-row lg:items-center">
  <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
    Latest <span className="text-blue-600">jobs open</span>
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
          <p className="text-gray-500">Loading latest jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No latest jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <LatestJobItem key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LatestJobsList;
