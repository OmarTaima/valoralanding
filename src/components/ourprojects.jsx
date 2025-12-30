import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/hooks/useTranslation";
import cleopatraLogo from "../assets/logos/Cleopatra.png";
import diarQataryLogo from "../assets/logos/Diar Qatary.png";
import hiltonLogo from "../assets/logos/HiltonHotels.png";
import kempinskiLogo from "../assets/logos/Kempinski.png";
import mallTantaLogo from "../assets/logos/Mall Tanta.png";
import marriottLogo from "../assets/logos/Marriott.svg.png";
import mountainViewLogo from "../assets/logos/Mountain View.png";
import radissonBluLogo from "../assets/logos/Radisson Blu.png";
import tmgLogo from "../assets/logos/TMG.png";
import zero31Logo from "../assets/logos/ZERO31.png";
import { projects as projectsData } from "../data/projects";
import { team } from "../data/team";

const OurProjects = () => {
  const { t, isArabic } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Project categories/filters
  const filters = [
    { id: "all", label: t("projects:all") || "All Projects" },
    { id: "residential", label: t("projects:residential") || "Residential" },
    { id: "commercial", label: t("projects:commercial") || "Commercial" },
    { id: "luxury", label: t("projects:luxury") || "Luxury Villas" },
    { id: "apartments", label: t("projects:apartments") || "Apartments" },
    { id: "completed", label: t("projects:completed") || "Completed" },
    { id: "upcoming", label: t("projects:upcoming") || "Upcoming" },
  ];

  // Sorting options
  const sortOptions = [
    { id: "newest", label: t("projects:newest") || "Newest First" },
    {
      id: "price_high",
      label: t("projects:priceHigh") || "Price: High to Low",
    },
    { id: "price_low", label: t("projects:priceLow") || "Price: Low to High" },
    { id: "size", label: t("projects:size") || "Largest First" },
  ];

  // Sample projects data - Replace with actual API data
  const projects = projectsData;

  // Partners / portfolio logos with names
  const partners = [
    { src: cleopatraLogo, name: "Cleopatra" },
    { src: diarQataryLogo, name: "Diar Qatary" },
    { src: hiltonLogo, name: "Hilton Hotels" },
    { src: kempinskiLogo, name: "Kempinski" },
    { src: mallTantaLogo, name: "Mall Tanta" },
    { src: marriottLogo, name: "Marriott" },
    { src: mountainViewLogo, name: "Mountain View" },
    { src: radissonBluLogo, name: "Radisson Blu" },
    { src: tmgLogo, name: "TMG" },
    { src: zero31Logo, name: "ZERO31" },
  ];

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "completed") return project.status === "completed";
      if (selectedFilter === "upcoming") return project.status === "upcoming";
      return (
        project.category.includes(selectedFilter) ||
        project.type === selectedFilter
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_high":
          return b.priceValue - a.priceValue;
        case "price_low":
          return a.priceValue - b.priceValue;
        case "size":
          return parseInt(b.size) - parseInt(a.size);
        default: // newest
          return new Date(b.completion) - new Date(a.completion);
      }
    });

  const projectsToShow = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  const loadMoreProjects = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProjects((prev) => prev + 6);
      setIsLoading(false);
    }, 800);
  };

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
    setVisibleProjects(6); // Reset to initial count
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div
          className={`max-w-4xl mx-auto text-center mb-12 ${
            isArabic ? "rtl" : ""
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-semibold text-primary-500">
              {t("projects:tagline") || "Premium Developments"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-light-900 dark:text-white mb-6">
            {t("projects:title") || "Our Premium Projects"}
          </h2>

          <p className="text-xl text-light-600 dark:text-light-300 leading-relaxed max-w-3xl mx-auto">
            {t("projects:subtitle") ||
              "Discover VALORA's portfolio of premium real estate developments, each crafted with exceptional quality and enduring value."}
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? "bg-primary-500 text-white shadow-lg"
                      : "bg-light-100 dark:bg-dark-800 text-light-700 dark:text-light-300 hover:bg-light-200 dark:hover:bg-dark-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-light-700 dark:text-light-300 font-medium">
                {t("projects:sortBy") || "Sort by:"}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-dark-800 border border-light-300 dark:border-dark-700 text-light-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Info */}
          <div className="flex items-center justify-between text-sm text-light-600 dark:text-light-400">
            <div>
              {t("projects:showing") || "Showing"}{" "}
              <span className="font-semibold text-primary-500">
                {projectsToShow.length}
              </span>{" "}
              {t("projects:of") || "of"}{" "}
              <span className="font-semibold">{filteredProjects.length}</span>{" "}
              {t("projects:projects") || "projects"}
            </div>
            <div className="flex items-center gap-2">
              {selectedFilter !== "all" && (
                <button
                  onClick={() => handleFilterChange("all")}
                  className="flex items-center gap-1 text-primary-500 hover:text-primary-600"
                >
                  <span>{t("projects:clearFilters") || "Clear filters"}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projectsToShow.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isArabic={isArabic}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreProjects && (
          <div className="text-center">
            <button
              onClick={loadMoreProjects}
              disabled={isLoading}
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {t("projects:loading") || "Loading..."}
                </>
              ) : (
                <>
                  {t("projects:loadMore") || "Load More Projects"}
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
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
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        {/* Empty State */}
        {projectsToShow.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-light-100 dark:bg-dark-800 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-light-400 dark:text-dark-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-light-900 dark:text-white mb-4">
              {t("projects:noProjects") || "No Projects Found"}
            </h3>
            <p className="text-light-600 dark:text-light-400 max-w-md mx-auto mb-8">
              {t("projects:noProjectsDesc") ||
                "Try adjusting your filters to find what you're looking for."}
            </p>
            <button
              onClick={() => handleFilterChange("all")}
              className="btn-primary"
            >
              {t("projects:viewAllProjects") || "View All Projects"}
            </button>
          </div>
        )}

        {/* Partners / Our Portfolio (Arabic title) */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-6">
            {isArabic ? "شركاء نجاحنا" : "Our Protofolio"}
          </h3>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
              {partners.map((p, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-dark-700 rounded-lg"
                >
                  <img
                    src={p.src}
                    alt={p.name}
                    className="h-12 object-contain mb-2"
                  />
                  <p className="text-sm text-center text-light-700 dark:text-light-300">
                    {p.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-center mb-6">
            {isArabic ? "فريقنا" : "Our Team"}
          </h3>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              {team.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-col items-center text-center p-4 bg-white/50 dark:bg-dark-700 rounded-lg w-64"
                >
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-32 h-32 object-cover rounded-full mb-3"
                  />
                  <h4 className="font-semibold text-light-900 dark:text-white">
                    {m.name}
                  </h4>
                  <p className="text-sm text-light-700 dark:text-light-300">
                    {m.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project, isArabic }) => {
  return (
    <Link to={`/projects/${project.slug}`} className="block">
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              project.status === "completed"
                ? "bg-success-500/20 text-success-500"
                : project.status === "ongoing"
                ? "bg-warning-500/20 text-warning-500"
                : "bg-info-500/20 text-info-500"
            }`}
          >
            {project.status === "completed"
              ? "Completed"
              : project.status === "ongoing"
              ? "Ongoing"
              : "Upcoming"}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-500 text-xs font-semibold">
              Featured
            </span>
          </div>
        )}

        {/* Image */}
        <div className="h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-900/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.category.map((cat, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-light-100 dark:bg-dark-700 text-light-600 dark:text-light-400 text-xs rounded"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title & Location */}
          <h3 className="text-xl font-bold text-light-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
            {project.title}
          </h3>

          <div className="flex items-center gap-2 text-light-600 dark:text-light-400 mb-4">
            <svg
              className="w-4 h-4"
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
            <span className="text-sm">{project.location}</span>
          </div>

          {/* Description */}
          <p className="text-light-700 dark:text-light-300 text-sm mb-6 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OurProjects;
