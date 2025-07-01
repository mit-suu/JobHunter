import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NotFoundPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("role") !== null;

  const handleGoBack = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-[#202430] p-6 text-center">
        <h1 className="mb-4 text-7xl font-bold text-[#4640DE]">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
          Page Not Found
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          className="rounded-md bg-gradient-to-r from-[#6A5AE0] via-[#4640DE] to-[#3a35c9] px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90"
          onClick={handleGoBack}
        >
          Go Home
        </button>
      </div>
    </motion.div>
  );
}

export default NotFoundPage;
