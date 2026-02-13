import React from "react";
import { useTranslation } from "../i18n/hooks/useTranslation";
import valoraLogoen from "../assets/logos/V EN.png";
import valoraLogoar from "../assets/logos/V AR.png";


const AboutSection = () => {
  const { t, isArabic } = useTranslation();

  // Brand pillars from your PDF
  const pillars = [
    {
      icon: "📈",
      title: t("about:pillarValue") || "Value",
      description:
        t("about:pillarValueDesc") ||
        "Investments that appreciate over time with enduring quality",
      color: "text-primary-500",
      bgColor: "bg-primary-500/10",
    },
    {
      icon: "👁️",
      title: t("about:pillarVision") || "Vision",
      description:
        t("about:pillarVisionDesc") ||
        "Future-forward architectural designs and strategic planning",
      color: "text-secondary-500",
      bgColor: "bg-secondary-500/10",
    },
    {
      icon: "⚡",
      title: t("about:pillarVitality") || "Vitality",
      description:
        t("about:pillarVitalityDesc") ||
        "Vibrant communities that pulse with energy and life",
      color: "text-success-500",
      bgColor: "bg-success-500/10",
    },
    {
      icon: "🔄",
      title: t("about:pillarVersatility") || "Versatility",
      description:
        t("about:pillarVersatilityDesc") ||
        "Flexible spaces that adapt to modern living needs",
      color: "text-info-500",
      bgColor: "bg-info-500/10",
    },
    {
      icon: "🎯",
      title: t("about:pillarVerity") || "Verity",
      description:
        t("about:pillarVerityDesc") ||
        "Authenticity and transparency in every project",
      color: "text-warning-500",
      bgColor: "bg-warning-500/10",
    },
  ];

  // Statistics
  const stats = [
    { number: "2015", label: t("about:founded") || "Founded", suffix: "" },
    { number: "50+", label: t("about:projects") || "Projects", suffix: "+" },
    {
      number: "2.5",
      label: t("about:investment") || "Investment Value",
      suffix: "B EGP",
    },
    {
      number: "98",
      label: t("about:satisfaction") || "Client Satisfaction",
      suffix: "%",
    },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-linear-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Tagline pill centered across container */}
        <div className="w-full mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-semibold text-primary-500">
              {t("about:tagline") || "About VALORA"}
            </span>
          </span>
        </div>
        </div>

        {/* Section Header */}
        <div dir={isArabic ? "rtl" : "ltr"} className={`max-w-3xl mx-auto text-center mb-16`}>
          <h2 className={`text-2xl md:text-3xl font-bold text-light-900 dark:text-white mb-6 `}>
            {t("about:title") || "Where Value Meets Aura"}
          </h2>

          <p className="text-md text-light-600 dark:text-light-300 leading-relaxed">
            {t("about:subtitle") ||
              "VALORA is more than real estate. We create spaces with character, identity, and growing worth."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 text-center">
          {/* Left Column - Image/Brand Story */}
          <div
            className={`order-2 lg:order-1 lg:col-span-2 flex items-center justify-center ${
              isArabic ? "rtl" : ""
            }`}
          >
            <div className={`relative flex flex-col items-center justify-center`}>
              {/* Brand Logo Display */}
              <div className="mb-8 flex flex-col items-center justify-center">
                <div className="mb-6 mx-auto">
                  <img
                    src={isArabic ? valoraLogoar : valoraLogoen}
                    alt="Valora Logo"
                    className="h-48 md:h-60 w-auto object-contain"
                  />
                </div>
                <div className="text-center" dir={isArabic ? "rtl" : "ltr"}>
                  {
                    // Use two translation keys (brandMeaningDesc and brandMeaningDesc2)
                  }
                  {(() => {
                    const defaultEnFirst = "Our logo, formed from the letter V shaped as five buildings, represents our goal:";
                    const defaultEnSecond = "To deliver refined residential communities that introduce ";
                    const defaultEnSecondPart2 = "a new standard of value to the real estate sector.";
                    const defaultArFirst = "شعارنا المتكون من حرف V على شكل 5 مباني يمثل هدفنا:";
                    const defaultArSecond = "تقديم مجتمعات سكنية راقية لتجربة تمثل قيمة جديدة في هذا المجال.";

                    const first = t("about:brandMeaningDesc") || (isArabic ? defaultArFirst : defaultEnFirst);
                    const second = t("about:brandMeaningDesc2") || (isArabic ? defaultArSecond : defaultEnSecond);
                    const third = isArabic ? "" : defaultEnSecondPart2; 
                    return (
                      <>
                        <h3 className="text-xl md:text-2xl font-bold text-primary-500 dark:text-white mb-0 text-center">
                          {first}
                        </h3>
                        {(() => {
                          if (!isArabic && second) {
                            const marker = "a new standard";
                            const lower = second.toLowerCase();
                            const idx = lower.indexOf(marker);
                            if (idx > 0) {
                              const part1 = second.slice(0, idx).trim();
                              const part2 = second.slice(idx).trim();
                              return (
                                <>
                                  {part1 ? (
                                    <h3 className="text-xl md:text-2xl font-bold text-primary-500 dark:text-white -mt-1 text-center">
                                      {part1}
                                    </h3>
                                  ) : null}
                                  
                                </>
                              );
                            }
                          }
                          return (
                            <h3 className="text-xl md:text-2xl font-bold text-primary-500 dark:text-white -mt-2 text-center">
                              {second}
                            </h3>
                          );
                        })()}
                        <h3 className="text-xl md:text-2xl font-bold text-primary-500 dark:text-white -mt-2 text-center">
                          {third}
                        </h3>
                      </>
                    );
                  })()}
                  <div className="w-full flex flex-col md:flex-row items-center md:items-start">
                    <div className={`text-light-600 dark:text-light-300 max-w-2xl space-y-4 pt-6 md:pt-10 transform ${isArabic ? "ml-auto text-right lg:translate-x-1" : "mr-auto text-left lg:translate-x-40"}`}>

                      {/* Render each brand paragraph if present in locale */}
                      {(
                        [
                          { key: "brandVision", title: t("about:vision") || "Vision" },
                          { key: "brandVitality", title: t("about:vitality") || "Vitality" },
                          { key: "brandCredibility", title: t("about:credibility") || "Credibility" },
                          { key: "brandFlexibility", title: t("about:flexibility") || "Flexibility & Diversity" },
                          { key: "brandIdentity", title: t("about:identity") || "Identity & Sustainability" },
                        ]
                      ).map((s) => {
                        const text = t(`about:${s.key}`);
                        if (!text) return null;
                        return (
                        <div key={s.key}>
                          <p dir={isArabic ? "rtl" : "ltr"} className={`mb-1 leading-relaxed ${isArabic ? "text-right" : "text-left"}`}>
                            <strong className={`${isArabic ? "ml-2" : "mr-2"} text-primary-500`}>{s.title} :</strong>
                            {text}
                          </p>
                        </div>
                      );
                      })}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          {/* <div className="card border-0 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform" />
            <div className="relative p-8">
              <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-light-900 dark:text-white mb-4">
                {t("about:mission") || "Our Mission"}
              </h3>
              <p className="text-light-700 dark:text-light-300">
                {t("about:missionDesc") ||
                  "To create premium real estate developments that deliver lasting value, exceptional living experiences, and solid investment returns for our clients."}
              </p>
            </div>
          </div> */}

          {/* Vision */}
          {/* <div className="card border-0 shadow-xl relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-500/10 rounded-full translate-y-16 -translate-x-16 group-hover:scale-125 transition-transform" />
            <div className="relative p-8">
              <div className="w-16 h-16 rounded-2xl bg-secondary-500/10 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-secondary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-light-900 dark:text-white mb-4">
                {t("about:vision") || "Our Vision"}
              </h3>
              <p className="text-light-700 dark:text-light-300">
                {t("about:visionDesc") ||
                  "To be Egypt's most trusted premium real estate brand, known for creating timeless properties that appreciate in value and enhance lifestyles."}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
