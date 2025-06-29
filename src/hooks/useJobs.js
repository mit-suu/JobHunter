import { useState, useEffect } from "react";
import { getJobs } from "../services/jobService";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return { jobs, loading };
};
