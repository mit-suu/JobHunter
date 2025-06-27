import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/home');
  };

  return (
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
          className="w-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:opacity-90 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
