import Hero from "../../components/layout/Hero";
import CategoryList from "../../components/home/CategoryList";
import CTA from "../../components/home/CTA";
import FeaturedJobsList from "../../components/home/FeaturedJobsList";
import LatestJobsList from "../../components/home/LatestJobsList";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dark:bg-[#202430]">
        <Hero />
        <CategoryList />
        <CTA />
        <FeaturedJobsList />
        <LatestJobsList />
      </div>
    </motion.div>
  );
}

export default HomePage;
