import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const LanguageSwitcher = ({ className = "" }) => {
  const { currentLanguage, toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className={`px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
      aria-label={`Switch to ${
        currentLanguage === "en" ? "Arabic" : "English"
      }`}
    >
      {currentLanguage === "en" ? "عربي" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
