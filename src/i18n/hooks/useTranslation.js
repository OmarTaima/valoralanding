import { useTranslation as useI18nTranslation } from "react-i18next";

/**
 * Custom hook for translation with additional utilities
 */
export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const currentLanguage = i18n.language;
  const isArabic = currentLanguage === "ar";

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const newLang = isArabic ? "en" : "ar";
    changeLanguage(newLang);
  };

  const translate = (key, options = {}) => {
    return t(key, options);
  };

  return {
    t: translate,
    i18n,
    currentLanguage,
    isArabic,
    changeLanguage,
    toggleLanguage,
  };
};
