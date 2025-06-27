import { useEffect, useState } from 'react';
import { getJobs } from '../../services/jobService';
import LatestJobItem from './LatestJobItem';
import { useNavigate } from 'react-router-dom';

function LatestJobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getJobs();

      // Sắp xếp theo id giảm dần và lấy 8 job mới nhất
      const latest = [...data]
        .sort((a, b) => b.id - a.id)
        .slice(0, 8);

      setJobs(latest);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div
      className="px-[124px] py-[80px]"
      style={{
        backgroundImage: 'url("/img/Desktop.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-bold text-gray-800 text-[40px] font-poppins dark:text-white">
          Latest <span className="text-blue-600">jobs open</span>
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading latest jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No latest jobs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <LatestJobItem key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestJobsList;
