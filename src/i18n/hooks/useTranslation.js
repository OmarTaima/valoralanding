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

  const mapEmploymentType = (val) => {
    if (!val) return '';
    const en = {
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      'contract': 'Contract',
      'internship': 'Internship',
    };
    const ar = {
      'full-time': 'دوام كامل',
      'part-time': 'دوام جزئي',
      'contract': 'تعاقد مؤقت',
      'internship': 'تدريب',
    };
    return isArabic ? (ar[val] || val) : (en[val] || val);
  };

  const mapWorkArrangement = (val) => {
    if (!val) return '';
    const en = {
      'on-site': 'On-site',
      'remote': 'Remote',
      'hybrid': 'Hybrid',
    };
    const ar = {
      'on-site': 'من المكتب',
      'remote': 'من المنزل',
      'hybrid': 'هايبرد',
    };
    return isArabic ? (ar[val] || val) : (en[val] || val);
  };

  return {
    t: translate,
    i18n,
    currentLanguage,
    isArabic,
    changeLanguage,
    toggleLanguage,
    mapEmploymentType,
    mapWorkArrangement,
  };
};
