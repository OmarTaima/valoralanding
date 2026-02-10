import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import commonEN from "./locales/en/common.json";
import navigationEN from "./locales/en/navigation.json";
import homeEN from "./locales/en/home.json";
import contactEN from "./locales/en/contact.json";
import aboutEN from "./locales/en/about.json";
import projectsEN from "./locales/en/projects.json";
import projectDetailEN from "./locales/en/projectDetail.json";
import footerEN from "./locales/en/footer.json";
import joinUsEN from "./locales/en/joinUs.json";
import commonAR from "./locales/ar/common.json";
import navigationAR from "./locales/ar/navigation.json";
import homeAR from "./locales/ar/home.json";
import contactAR from "./locales/ar/contact.json";
import aboutAR from "./locales/ar/about.json";
import projectsAR from "./locales/ar/projects.json";
import projectDetailAR from "./locales/ar/projectDetail.json";
import footerAR from "./locales/ar/footer.json";
import joinUsAR from "./locales/ar/joinUs.json";

// Translation resources
const resources = {
  en: {
    common: commonEN,
    navigation: navigationEN,
    home: homeEN,
    contact: contactEN,
    about: aboutEN,
    projects: projectsEN,
    projectDetail: projectDetailEN,
    footer: footerEN,
    joinUs: joinUsEN,
  },
  ar: {
    common: commonAR,
    navigation: navigationAR,
    home: homeAR,
    contact: contactAR,
    about: aboutAR,
    projects: projectsAR,
    projectDetail: projectDetailAR,
    footer: footerAR,
    joinUs: joinUsAR,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ar",
    lng: "ar", // Default language
    supportedLngs: ["en", "ar"],
    defaultNS: "common",
    ns: [
      "common",
      "navigation",
      "home",
      "contact",
      "about",
      "projects",
      "projectDetail",
      "footer",
      "joinUs",
    ],

    // Detection options
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },

    // React options
    react: {
      useSuspense: false,
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Custom configuration
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

// Language change handler to update HTML direction
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";

  // Also update font family for Arabic
  if (lng === "ar") {
    document.body.classList.add("font-arabic");
  } else {
    document.body.classList.remove("font-arabic");
  }

  // Save to localStorage
  localStorage.setItem("valora-language", lng);
});

export default i18n;
