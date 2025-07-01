import HeroFindJobs from "../../components/jobs/HeroFindJobs";
import JobsPage from "../../components/jobs/JobsPage";
import { motion } from "framer-motion";
function FindJobsPages() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dark:bg-[#202430]">
        <HeroFindJobs />
        <div id="job-list">
          <JobsPage />
        </div>
      </div>
    </motion.div>
  );
}

export default FindJobsPages;
