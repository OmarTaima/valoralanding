/**
 * Utility functions for handling RTL/LTR direction
 */

// Get current text direction based on language
export const getDirection = (language) => {
  return language === "ar" ? "rtl" : "ltr";
};

// Check if current language is RTL
export const isRTL = (language) => {
  return getDirection(language) === "rtl";
};

// Get opposite language
export const getOppositeLanguage = (currentLang) => {
  return currentLang === "en" ? "ar" : "en";
};

// Get appropriate margin/padding class based on direction
export const getMarginClass = (language, baseClass) => {
  const direction = getDirection(language);
  return direction === "rtl"
    ? `${baseClass.replace("left", "right")}`
    : baseClass;
};

// Format numbers for RTL languages
export const formatNumber = (number, language) => {
  if (language === "ar") {
    return number.toLocaleString("ar-EG");
  }
  return number.toLocaleString("en-US");
};

// Format date for RTL languages
export const formatDate = (date, language) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (language === "ar") {
    return new Date(date).toLocaleDateString("ar-EG", options);
  }
  return new Date(date).toLocaleDateString("en-US", options);
};
