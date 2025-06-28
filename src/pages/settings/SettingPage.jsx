import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/home');
  };

  return (
     <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >

    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="font-medium">Theme:</span>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
          >
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
        </div>

        <button
          onClick={handleBackHome}
          className="px-6 py-2 bg-gradient-to-r from-[#6A5AE0] via-[#4640DE] to-[#3a35c9] text-white font-semibold rounded-md hover:opacity-90 transition-all duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
    </motion.div>
  );
}

export default SettingsPage;
