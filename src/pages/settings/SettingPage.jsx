import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LanguageSwitcher from "../../components/language/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function SettingsPage() {
  const { t } = useTranslation();
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
        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
          {t("settings.title")}
        </h1>

        <div className="flex flex-col gap-6">
          {/* Theme toggle */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {t("settings.theme")}
            </span>
            <button
              onClick={toggleTheme}
              className="rounded bg-gray-200 px-4 py-2 transition hover:opacity-80 dark:bg-[#202430] dark:text-white dark:shadow-sm"
            >
              {theme === "light"
                ? t("settings.switch_to_dark")
                : t("settings.switch_to_light")}
            </button>

            {/* Language switcher */}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {t("settings.language")}
              </span>
              <LanguageSwitcher />
            </div>
          </div>
          {/* Back to home */}
          <button
            onClick={handleBackHome}
            className="rounded-md bg-gradient-to-r from-[#6A5AE0] via-[#4640DE] to-[#3a35c9] px-6 py-2 font-semibold text-white transition-all duration-200 hover:opacity-90"
          >
            {t("settings.back_home")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SettingsPage;
