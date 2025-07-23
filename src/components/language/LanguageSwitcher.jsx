// src/components/LanguageSwitcher.jsx
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded bg-gray-200 px-4 py-2 transition hover:opacity-80 dark:bg-[#202430] dark:text-white dark:shadow-sm"
    >
      {i18n.language === "en" ? "Switch to Vietnamese" : "Chuyển sang Tiếng Anh"}
    </button>
  );
}

export default LanguageSwitcher;
