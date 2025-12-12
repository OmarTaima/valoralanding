import React from "react";
import { useTranslation } from "../i18n/hooks/useTranslation";

const Footer = () => {
  const { t, isArabic } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Google Maps embed URL for VALORA location (New Cairo)
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.837254155114!2d31.395294315113705!3d29.96696328190566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d5c8f2e5b5f%3A0x1a50e5b5b5b5b5b5!2sNew%20Cairo%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1629999999999!5m2!1sen!2seg";

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Contact & Location Section */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Brand & Description */}
            <div className={`space-y-6 ${isArabic ? "rtl" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">V</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {t("common:brandName")}
                  </h3>
                  <p className="text-primary-300 text-sm">
                    {t("common:tagline")}
                  </p>
                </div>
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
                      className="text-lg font-medium text-white hover:text-primary-300 transition-colors"
                    >
                      {t("contact:phoneNumber") || "+2 010 2048 9251"}
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
                      className="text-lg font-medium text-white hover:text-primary-300 transition-colors"
                    >
                      {t("contact:emailAddress") || "info@valora-egypt.com"}
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
                      className="text-lg font-medium text-white hover:text-green-300 transition-colors"
                    >
                      {t("contact:phoneNumber") || "+2 010 2048 9251"}
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
                    <p className="text-light-300">
                      VALORA Tower, 123 Business District
                    </p>
                    <p className="text-light-300">
                      New Cairo, Cairo Governorate
                    </p>
                    <p className="text-light-300">Egypt</p>
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
                    title="VALORA Location - New Cairo, Egypt"
                    className="w-full h-64 md:h-56 lg:h-64"
                  />
                  <div className="bg-dark-800 px-4 py-3 flex justify-between items-center">
                    <div>
                      <p className="text-light-300 font-medium text-sm">
                        VALORA Headquarters
                      </p>
                      <p className="text-light-400 text-xs">New Cairo, Egypt</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=VALORA+Tower+New+Cairo+Cairo+Egypt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm px-4 py-2"
                    >
                      {t("footer:openMaps") || "Open Maps"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Minimal */}
        <div className="border-t border-dark-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div
              className={`text-center md:text-left ${isArabic ? "rtl" : ""}`}
            >
              <p className="text-light-400 text-sm">
                © {currentYear} {t("common:brandName")}.{" "}
                {t("footer:allRights") || "All rights reserved."}
              </p>
              <p className="text-light-500 text-xs mt-1">
                {t("footer:registered") ||
                  "VALORA Real Estate Development • Company Registration: 123456"}
              </p>
            </div>

            {/* Minimal Links */}
            <div className="flex gap-6">
              <a
                href="#privacy"
                className="text-light-400 hover:text-primary-300 transition-colors text-sm"
              >
                {t("common:privacyPolicy") || "Privacy"}
              </a>
              <a
                href="#terms"
                className="text-light-400 hover:text-primary-300 transition-colors text-sm"
              >
                {t("common:termsOfService") || "Terms"}
              </a>
              <a
                href="#accessibility"
                className="text-light-400 hover:text-primary-300 transition-colors text-sm"
              >
                {t("footer:accessibility") || "Accessibility"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
