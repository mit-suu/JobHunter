import { useState } from "react";
import Hero from "../../components/layout/Hero";
import CategoryList from "../../components/home/CategoryList";
import CTA from "../../components/home/CTA";
import FeaturedJobsList from "../../components/home/FeaturedJobsList";
import LatestJobsList from "../../components/home/LatestJobsList";
import ChatToggleButton from "../../components/chatbot/ChatToggleButton";
import ChatBox from "../../components/chatbot/ChatBox";
import { motion } from "framer-motion";

function HomePage() {
   const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dark:bg-[#202430]">
         <>
     <ChatToggleButton onToggle={toggleChat} isOpen={showChat} />
<ChatBox isVisible={showChat} onClose={toggleChat} />
    </>
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
