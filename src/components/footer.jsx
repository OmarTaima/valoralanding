import React from "react";
import { useTranslation } from "../i18n/hooks/useTranslation";
import valoraLogo from "../assets/logos/Valora Logo.png";
import valoraLogo2 from "../assets/logos/Valora Logo 2.png";

const Footer = () => {
  const { t, isArabic } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Localize Western digits to Arabic-Indic when Arabic is active
  const localizeDigits = (input) => {
    if (!isArabic || !input) return String(input);
    const map = {
      0: "٠",
      1: "١",
      2: "٢",
      3: "٣",
      4: "٤",
      5: "٥",
      6: "٦",
      7: "٧",
      8: "٨",
      9: "٩",
    };
    return String(input).replace(/\d/g, (d) => map[d] ?? d);
  };

  const displayedYear = String(currentYear);
  const rawPhone = t("contact:phoneNumber") || "+2 010 2048 9251";
  // When Arabic is active, replace normal spaces with non-breaking spaces
  // so grouping (country code / blocks) doesn't reorder in RTL rendering.
  const displayedPhone = isArabic
    ? String(rawPhone).replace(/ /g, "\u00A0")
    : rawPhone; // keep ascii digits for phone and render LTR span
  const rawEmail = t("contact:emailAddress") || "info@valora-egypt.com";
  const registeredRaw =
    t("footer:registered") ||
    "VALORA Real Estate Development • Company Registration: 123456";

  // When Arabic is active, render ASCII digit sequences inside LTR spans
  // so numbers (and + signs) keep natural left-to-right ordering.
  const renderWithLtrNumbers = (rawText) => {
    if (!rawText) return rawText;
    if (!isArabic) return rawText;
    const parts = String(rawText).split(/(\d+)/g);
    return parts.map((part, idx) => {
      if (/^\d+$/.test(part)) {
        return (
          <span
            key={idx}
            dir="ltr"
            className="inline-block font-sans text-lg font-semibold"
          >
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Google Maps embed URL for VALORA location (coordinates: 30.7963614, 30.9932368)
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=30.7963614,30.9932368&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Contact & Location Section */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Brand & Description */}
            <div className={`space-y-6 ${isArabic ? "rtl" : ""}`}>
              <div className="flex items-center gap-3">
                <img
                  src={valoraLogo2}
                  alt="Valora Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>

              <p className="text-light-300 text-sm leading-relaxed">
                {t("footer:description") ||
                  "Premium real estate developments that combine enduring value with timeless aura."}
              </p>

              {/* Business Hours */}
              <div className="pt-4 border-t border-dark-800">
                <h5 className="text-lg font-semibold text-white mb-3">
                  {t("contact:officeHoursTitle") || "Business Hours"}
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-light-400">
                      {t("footer:sunThu") || "Sunday - Thursday"}
                    </span>
                    <span className="text-light-300">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-400">
                      {t("footer:friSat") || "Friday & Saturday"}
                    </span>
                    <span className="text-light-300">
                      {t("contact:weekend") || "By appointment"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4 border-t border-dark-800">
                <h5 className="text-lg font-semibold text-white mb-3">
                  {t("footer:followUs") || "Follow Us"}
                </h5>
                <div className="flex gap-3">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/valorarealestate.eg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200 group"
                  >
                    <svg
                      className="w-5 h-5 text-light-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/valorarealestate.eg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 flex items-center justify-center transition-all duration-200 group"
                  >
                    <svg
                      className="w-5 h-5 text-light-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/valorarealestate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200 group"
                  >
                    <svg
                      className="w-5 h-5 text-light-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  {/* TikTok - No href for now */}
                  <div className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200 cursor-not-allowed opacity-50 group">
                    <svg
                      className="w-5 h-5 text-light-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`space-y-6 ${isArabic ? "rtl" : ""}`}>
              <h4 className="text-xl font-bold text-white">
                {t("contact:contactInfoTitle") || "Get in Touch"}
              </h4>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-light-300 font-medium mb-1">
                      {t("contact:phoneTitle") || "Phone"}
                    </p>
                    <a
                      href="tel:+201020489251"
                      className="text-lg font-medium text-white hover:text-primary-300 transition-colors duration-200"
                    >
                      <span
                        dir={isArabic ? "ltr" : undefined}
                        className="inline-block font-sans text-lg font-semibold"
                      >
                        {displayedPhone}
                      </span>
                    </a>
                    <p className="text-light-400 text-sm mt-1">
                      {t("footer:callUs") || "Call us for inquiries"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-light-300 font-medium mb-1">
                      {t("contact:emailTitle") || "Email"}
                    </p>
                    <a
                      href="mailto:info@valora-egypt.com"
                      className="text-lg font-medium text-white hover:text-primary-300 transition-colors duration-200"
                    >
                      <span dir="ltr" className="inline-block">
                        {rawEmail}
                      </span>
                    </a>
                    <p className="text-light-400 text-sm mt-1">
                      {t("footer:emailUs") || "Email for general inquiries"}
                    </p>
                  </div>
                </div>

                {/* WhatsApp (Optional but recommended for Egypt) */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-light-300 font-medium mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/201020489251"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-white hover:text-green-300 transition-colors duration-200"
                    >
                      <span
                        dir={isArabic ? "ltr" : undefined}
                        className="inline-block font-sans text-lg font-semibold"
                      >
                        {displayedPhone}
                      </span>
                    </a>
                    <p className="text-light-400 text-sm mt-1">
                      {t("footer:whatsappUs") || "Message us on WhatsApp"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & REAL Map */}
            <div className={`space-y-6 ${isArabic ? "rtl" : ""}`}>
              <h4 className="text-xl font-bold text-white">
                {t("contact:findUs") || "Visit Our Office"}
              </h4>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-light-300 font-medium mb-1">
                      {t("contact:addressTitle") || "Headquarters"}
                    </p>
                    <a
                      href="https://www.google.com/maps?q=30.7963614,30.9958117&z=17&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-300 leading-relaxed hover:text-primary-300 transition-colors duration-200 inline-block"
                    >
                      {t("contact:address") ||
                        "El-gharbia Tanta , El-nady St infornt of Tanta Club Gate, Above Waffle Art"}
                    </a>
                    <p className="text-light-300 font-medium mb-1 mt-4">
                      {t("contact:secondaryAddressTitle") || "Secondary Office"}
                    </p>
                    <a
                      href="https://www.google.com/maps?q=30.057616,31.4741683&z=17&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-300 leading-relaxed hover:text-primary-300 transition-colors duration-200 inline-block"
                    >
                      {t("contact:secondaryAddress") ||
                        "Villa 191, El-Banafseg, 5 1st settlement"}
                    </a>
                  </div>
                </div>

                {/* REAL Google Map Embed */}
                <div className="rounded-xl overflow-hidden border-2 border-dark-700 shadow-lg">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VALORA Location - El-gharbia Tanta, Egyptt"
                    className="w-full h-64 md:h-56 lg:h-64"
                  />
                  <div className="bg-dark-800 px-4 py-3 flex justify-between items-center">
                    <div>
                      <p className="text-light-300 font-medium text-sm">
                        VALORA Headquarters
                      </p>
                      <p className="text-light-400 text-xs">
                        El-gharbia Tanta, Egypt
                      </p>
                    </div>
                    <a
                      href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.5942477999997!2d30.9932368!3d30.7963614!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c9516e045121%3A0x2b295f1b4d2e5d5c!2s30%C2%B047%2746.9%22N%2030%C2%B059%2744.9%22E!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm px-4 py-2 transition-colors duration-200"
                    >
                      {t("footer:openMaps") || "Open Maps"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div
              className={`text-center md:text-left ${isArabic ? "rtl" : ""}`}
            >
              <p className="text-light-400 text-sm">
                ©{" "}
                <span dir={isArabic ? "ltr" : undefined}>{displayedYear}</span>{" "}
                {t("common:brandName")}.{" "}
                {t("footer:allRights") || "All rights reserved."}
              </p>
              <p className="text-light-500 text-xs mt-1">
                {isArabic
                  ? renderWithLtrNumbers(
                      t("footer:registered") ||
                        "فالورا للتطوير العقاري • رقم السجل: 123456"
                    )
                  : t("footer:registered") ||
                    "VALORA Real Estate Development • Company Registration: 123456"}
              </p>
            </div>

            {/* Minimal Links */}
            <div className="flex gap-6">
              <a
                href="#privacy"
                className="text-light-400 hover:text-primary-300 transition-colors duration-200 text-sm"
              >
                {t("common:privacyPolicy") || "Privacy"}
              </a>
              <a
                href="#terms"
                className="text-light-400 hover:text-primary-300 transition-colors duration-200 text-sm"
              >
                {t("common:termsOfService") || "Terms"}
              </a>
              <a
                href="#accessibility"
                className="text-light-400 hover:text-primary-300 transition-colors duration-200 text-sm"
              >
                {t("footer:accessibility") || "Accessibility"}
              </a>
            </div>
          </div>
        </div>

        {/* Created By Section */}
        <div className="border-t border-dark-800 py-4">
          <div className="text-center">
            <p className="text-light-500 text-xs">
              {isArabic
                ? "ينشئ بواسطة SABERGROUPSTUDIOS © www.sabergroup-eg.com"
                : "Created by SABERGROUPSTUDIOS © www.sabergroup-eg.com"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
