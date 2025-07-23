// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import vi from './vi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi }
    },
    lng: 'en', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Nếu không tìm thấy thì dùng tiếng Anh

    interpolation: {
      escapeValue: false // Không escape HTML
    }
  });

export default i18n;
