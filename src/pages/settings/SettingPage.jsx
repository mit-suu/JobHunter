import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/home");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-xl p-6">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">Theme:</span>
            <button
              onClick={toggleTheme}
              className="rounded bg-gray-200 px-4 py-2 transition hover:opacity-80 dark:bg-gray-700"
            >
              {theme === "light"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"}
            </button>
          </div>

          <button
            onClick={handleBackHome}
            className="rounded-md bg-gradient-to-r from-[#6A5AE0] via-[#4640DE] to-[#3a35c9] px-6 py-2 font-semibold text-white transition-all duration-200 hover:opacity-90"
          >
            Back to Home
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SettingsPage;
