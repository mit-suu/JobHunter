// src/pages/jobs/CategoryPage.jsx
import { motion } from "framer-motion";
import CategoryJob from "../../components/jobs/CategoryJob";
import LatestJobsList from "../../components/home/LatestJobsList";
function CategoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-[#F8F8FD]">
        <section className="mx-auto max-w-7xl px-4 py-1">
          <CategoryJob />
        </section>
        <LatestJobsList />
      </div>
    </motion.div>
  );
}

export default CategoryPage;
