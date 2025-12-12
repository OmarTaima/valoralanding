import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/hooks/useTranslation";

const HeroSection = () => {
  const { t, isArabic } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - Replace with actual VALORA property image */}
        <div className="absolute inset-0 bg-linear-to-br from-primary-900/20 via-primary-800/10 to-transparent" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMi4yIDAtNCAxLjgtNCA0czEuOCA0IDQgNCA0LTEuOCA0LTQtMS44LTQtNC00em0wIDJjMS4xIDAgMiAuOSAyIDJzLS45IDItMiAyLTItLjktMi0yIC45LTIgMi0yeiIgZmlsbD0iIzAwMCIvPjwvZz48L3N2Zz4=')]" />

        {/* Dark gradient for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-dark-900 via-dark-900/70 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 backdrop-blur-sm border border-primary-500/20">
              <span className="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse" />
              <span className="text-sm font-semibold text-primary-500 tracking-wide">
                {t("home:premium") || "Premium Real Estate"}
              </span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white">
              {t("home:heroTitle") || "Live with Value"}
            </span>
            <span className="block text-primary-300 mt-2">
              {t("home:heroSubtitle") || "Where Every Space Tells a Story"}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-light-200 dark:text-dark-200 mb-10 max-w-3xl leading-relaxed">
            {t("home:heroDescription") ||
              "VALORA represents premium real estate that combines enduring value with timeless aura. We create spaces that appreciate in worth while enriching lives."}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 mb-12 ${
              isArabic ? "rtl:space-x-reverse" : ""
            }`}
          >
            <Link
              to="/projects"
              className="btn-primary inline-flex items-center justify-center gap-2 group"
            >
              <span>{t("home:exploreProjects") || "Explore Projects"}</span>
              <svg
                className={`w-5 h-5 transform transition-transform group-hover:translate-x-1 ${
                  isArabic ? "rtl:rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isArabic
                      ? "M10 19l-7-7m0 0l7-7m-7 7h18"
                      : "M14 5l7 7m0 0l-7 7m7-7H3"
                  }
                />
              </svg>
            </Link>

            <Link
              to="/contact"
              className="btn-outline inline-flex items-center justify-center gap-2 backdrop-blur-sm border-white/30 text-white hover:bg-white/10"
            >
              <span>
                {t("home:scheduleConsultation") || "Schedule Consultation"}
              </span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </Link>
          </div>

          {/* Stats / Social Proof */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              {
                value: "50+",
                label: t("home:projectsCompleted") || "Projects",
              },
              {
                value: "AED 2.5B",
                label: t("home:totalInvestment") || "Investment",
              },
              {
                value: "98%",
                label: t("home:clientSatisfaction") || "Satisfaction",
              },
              { value: "15+", label: t("home:yearsExperience") || "Years" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-light-300 dark:text-dark-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Background Image - You'll replace this with actual image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')`,
        }}
      />
    </section>
  );
};

export default HeroSection;
