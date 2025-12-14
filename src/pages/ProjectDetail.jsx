import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "../i18n/hooks/useTranslation";
import Footer from "../components/footer";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t, isArabic } = useTranslation();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // Contact form state for Interested section
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    projectInterest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-light-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-light-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow shadow-sm";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = t("contact:nameRequired") || "Name is required";
    if (!formData.email.trim())
      newErrors.email = t("contact:emailRequired") || "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email =
        t("contact:emailInvalid") || "Please enter a valid email";
    if (!formData.phone.trim())
      newErrors.phone = t("contact:phoneRequired") || "Phone is required";
    if (!formData.message.trim())
      newErrors.message = t("contact:messageRequired") || "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        projectInterest: "",
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setErrors({
        submit:
          t("contact:submitError") || "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample project data - Replace with API call
  const projectsData = [
    {
      id: 1,
      slug: "valora-towers-new-cairo",
      title: t("projects:towersTitle") || "VALORA Towers - New Cairo",
      subtitle:
        t("projects:towersSubtitle") || "Luxury Twin Towers in New Cairo",
      category: ["luxury", "residential"],
      status: "completed",
      type: "luxury",
      price: "EGP 4,200,000",
      priceValue: 4200000,
      size: "380 sqm",
      location: t("projects:newCairo") || "New Cairo, Egypt",
      description:
        t("projects:towersDesc") ||
        "Luxury twin towers with panoramic views, premium amenities, and smart home technology.",
      fullDescription:
        t("projects:towersFullDesc") ||
        "VALORA Towers represent the pinnacle of luxury living in New Cairo. These twin towers offer breathtaking panoramic views of the city, with each unit meticulously designed to provide the ultimate living experience. Featuring smart home technology, premium finishes, and world-class amenities, this development sets a new standard for luxury residential living in Egypt.",
      images: [
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      ],
      completion: "2024",
      units: "120 Unit",
      features: [
        "Pool",
        "Gym",
        "Security",
        "Parking",
        "Garden",
        "Smart Home",
        "Concierge",
        "Spa",
        "Business Center",
        "Kids Play Area",
      ],
      amenities: [
        {
          icon: "🏊",
          title: "Infinity Pool",
          description: "Rooftop infinity pool with city views",
        },
        {
          icon: "🏋️",
          title: "Fitness Center",
          description: "State-of-the-art gym with personal trainers",
        },
        {
          icon: "🌿",
          title: "Green Spaces",
          description: "Landscaped gardens and green rooftops",
        },
        {
          icon: "🏢",
          title: "Business Center",
          description: "Fully equipped business facilities",
        },
        {
          icon: "👶",
          title: "Kids Area",
          description: "Dedicated play areas for children",
        },
        {
          icon: "🚗",
          title: "Valet Parking",
          description: "24/7 valet parking service",
        },
      ],
      specifications: [
        { label: "Project Type", value: "Residential Towers" },
        { label: "Total Area", value: "45,000 sqm" },
        { label: "Number of Towers", value: "2" },
        { label: "Floors", value: "35" },
        { label: "Unit Types", value: "Apartments, Penthouses" },
        { label: "Parking Spaces", value: "300" },
        { label: "Construction", value: "Reinforced Concrete" },
        { label: "Finishes", value: "Premium International" },
      ],
      paymentPlans: [
        { phase: "Down Payment", percentage: "10%", timing: "Upon Signing" },
        {
          phase: "During Construction",
          percentage: "60%",
          timing: "Over 36 months",
        },
        { phase: "Upon Delivery", percentage: "30%", timing: "Handover" },
      ],
      locationFeatures: [
        "5 minutes from Cairo Festival City",
        "10 minutes from American University",
        "15 minutes from Cairo International Airport",
        "Close to major hospitals and schools",
      ],
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.837254155114!2d31.395294315113705!3d29.96696328190566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d5c8f2e5b5f%3A0x1a50e5b5b5b5b5b5!2sNew%20Cairo%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1629999999999!5m2!1sen!2seg",
      brochureUrl: "#",
      virtualTourUrl: "#",
      contactPerson: "Ahmed Saber",
      contactPhone: "+2 010 2048 9251",
      contactEmail: "sales@valora-egypt.com",
      featured: true,
    },
    // Add other projects similarly...
  ];

  // Tabs for project details
  const tabs = [
    { id: "overview", label: t("projectDetail:overview") || "Overview" },
    { id: "amenities", label: t("projectDetail:amenities") || "Amenities" },
    {
      id: "specifications",
      label: t("projectDetail:specifications") || "Specifications",
    },
    { id: "location", label: t("projectDetail:location") || "Location" },
    // { id: "payment", label: t("projectDetail:payment") || "Payment Plans" },
    { id: "gallery", label: t("projectDetail:gallery") || "Gallery" },
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const foundProject = projectsData.find((p) => p.slug === slug);

    setTimeout(() => {
      setProject(foundProject);
      if (foundProject) {
        setFormData((prev) => ({
          ...prev,
          projectInterest: foundProject.title,
        }));
      }
      setIsLoading(false);
    }, 500);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-light-700 dark:text-light-300">
            {t("projectDetail:loading") || "Loading project details..."}
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-light-900 dark:text-white mb-4">
            {t("projectDetail:notFound") || "Project Not Found"}
          </h2>
          <Link to="/projects" className="btn-primary">
            {t("projectDetail:backToProjects") || "Back to Projects"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-50 dark:bg-dark-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Main Image */}
        <div className="absolute inset-0">
          <img
            src={project.images[activeImage]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent" />
        </div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="flex justify-between items-center">
              <Link
                to="/projects"
                className="flex items-center gap-2 text-white hover:text-primary-300 transition-colors"
              >
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
                    d={
                      isArabic
                        ? "M14 5l7 7m0 0l-7 7m7-7H3"
                        : "M10 19l-7-7m0 0l7-7m-7 7h18"
                    }
                  />
                </svg>
                <span>
                  {t("projectDetail:backToProjects") || "Back to Projects"}
                </span>
              </Link>

              {/* Status Badge */}
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  project.status === "completed"
                    ? "bg-success-500 text-white"
                    : project.status === "ongoing"
                    ? "bg-warning-500 text-white"
                    : "bg-info-500 text-white"
                }`}
              >
                {project.status === "completed"
                  ? "Completed"
                  : project.status === "ongoing"
                  ? "Under Construction"
                  : "Upcoming"}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 md:px-6 pb-12">
            <div className="max-w-4xl">
              <div className="mb-6">
                <span className="px-4 py-2 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 text-primary-300 text-sm font-medium">
                  {project.category.join(" • ")}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>

              <p className="text-xl text-light-200 mb-8 max-w-3xl">
                {project.subtitle}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {project.price}
                  </div>
                  <div className="text-sm text-light-300">Starting Price</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {project.size}
                  </div>
                  <div className="text-sm text-light-300">Unit Size</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {project.completion}
                  </div>
                  <div className="text-sm text-light-300">Delivery</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {project.units}
                  </div>
                  <div className="text-sm text-light-300">Total Units</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Thumbnails */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-2">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeImage === index
                    ? "bg-primary-500 scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass rounded-3xl overflow-hidden">
            {/* Sticky Navigation Tabs */}
            <div className="sticky top-0 z-30 bg-white dark:bg-dark-800 border-b border-light-200 dark:border-dark-700">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 px-6 py-4 text-sm md:text-base font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-primary-500 border-b-2 border-primary-500"
                        : "text-light-700 dark:text-light-300 hover:text-primary-500"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8 lg:p-12">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-light-900 dark:text-white mb-6">
                      {t("projectDetail:projectOverview") || "Project Overview"}
                    </h2>
                    <p className="text-lg text-light-700 dark:text-light-300 leading-relaxed mb-8">
                      {project.fullDescription}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-2xl font-bold text-light-900 dark:text-white mb-6">
                      {t("projectDetail:keyFeatures") || "Key Features"}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 rounded-xl bg-light-100 dark:bg-dark-800"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-primary-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-light-900 dark:text-white">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === "amenities" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-light-900 dark:text-white mb-8">
                    {t("projectDetail:premiumAmenities") || "Premium Amenities"}
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="glass rounded-2xl p-6 text-center hover:transform hover:scale-[1.02] transition-all duration-300"
                      >
                        <div className="text-3xl mb-4">{amenity.icon}</div>
                        <h4 className="text-xl font-bold text-light-900 dark:text-white mb-2">
                          {amenity.title}
                        </h4>
                        <p className="text-light-700 dark:text-light-300">
                          {amenity.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === "specifications" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-light-900 dark:text-white mb-8">
                    {t("projectDetail:technicalSpecs") ||
                      "Technical Specifications"}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      {project.specifications
                        .slice(0, Math.ceil(project.specifications.length / 2))
                        .map((spec, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-4 border-b border-light-200 dark:border-dark-700"
                          >
                            <span className="text-light-700 dark:text-light-300 font-medium">
                              {spec.label}
                            </span>
                            <span className="text-light-900 dark:text-white font-semibold">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className="space-y-6">
                      {project.specifications
                        .slice(Math.ceil(project.specifications.length / 2))
                        .map((spec, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-4 border-b border-light-200 dark:border-dark-700"
                          >
                            <span className="text-light-700 dark:text-light-300 font-medium">
                              {spec.label}
                            </span>
                            <span className="text-light-900 dark:text-white font-semibold">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Location Tab */}
              {activeTab === "location" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-light-900 dark:text-white mb-8">
                    {t("projectDetail:strategicLocation") ||
                      "Strategic Location"}
                  </h2>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Map */}
                    <div className="rounded-xl overflow-hidden border border-light-200 dark:border-dark-700">
                      <iframe
                        src={project.mapEmbedUrl}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${project.title} Location`}
                        className="w-full h-full"
                      />
                    </div>

                    {/* Location Features */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-light-900 dark:text-white mb-4">
                          {t("projectDetail:keyDistances") || "Key Distances"}
                        </h4>
                        <ul className="space-y-3">
                          {project.locationFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <svg
                                className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-light-700 dark:text-light-300">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="glass rounded-xl p-6">
                        <h4 className="text-xl font-bold text-light-900 dark:text-white mb-4">
                          {t("projectDetail:areaBenefits") || "Area Benefits"}
                        </h4>
                        <p className="text-light-700 dark:text-light-300">
                          Located in the heart of New Cairo, this prime location
                          offers easy access to international schools, premium
                          shopping malls, medical facilities, and entertainment
                          venues, making it the perfect choice for families and
                          professionals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Plans Tab */}
              {/* {activeTab === "payment" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-light-900 dark:text-white mb-8">
                    {t("projectDetail:flexiblePayment") ||
                      "Flexible Payment Plans"}
                  </h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    {project.paymentPlans.map((plan, index) => (
                      <div
                        key={index}
                        className="glass rounded-2xl p-6 text-center"
                      >
                        <div className="text-4xl font-bold text-primary-500 mb-2">
                          {plan.percentage}
                        </div>
                        <h4 className="text-xl font-bold text-light-900 dark:text-white mb-2">
                          {plan.phase}
                        </h4>
                        <p className="text-light-700 dark:text-light-300">
                          {plan.timing}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="glass rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-light-900 dark:text-white mb-4">
                      {t("projectDetail:paymentTerms") || "Payment Terms"}
                    </h4>
                    <ul className="space-y-3 text-light-700 dark:text-light-300">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mt-2"></span>
                        <span>5% down payment upon reservation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mt-2"></span>
                        <span>Flexible installment plans over 5 years</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mt-2"></span>
                        <span>Bank financing options available</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mt-2"></span>
                        <span>Special discounts for cash payments</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )} */}

              {/* Gallery Tab */}
              {activeTab === "gallery" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-light-900 dark:text-white mb-8">
                    {t("projectDetail:projectGallery") || "Project Gallery"}
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className="relative overflow-hidden rounded-xl aspect-square group"
                      >
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 glass rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-4">
                  {t("projectDetail:interested") ||
                    "Interested in this Project?"}
                </h3>
                <p className="text-lg text-light-700 dark:text-light-300 mb-6">
                  {t("projectDetail:contactDesc") ||
                    "Contact our sales team for more information, site visits, or personalized consultations."}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-light-900 dark:text-white font-medium">
                      {project.contactPerson}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href={`tel:${project.contactPhone}`}
                      className="text-light-900 dark:text-white hover:text-primary-500"
                    >
                      {project.contactPhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${project.contactEmail}`}
                      className="text-light-900 dark:text-white hover:text-primary-500"
                    >
                      {project.contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {submitSuccess ? (
                  <div className="p-6 rounded-2xl bg-success-500/10 border border-success-500/20">
                    <h4 className="text-xl font-bold text-success-500">
                      {t("contact:successTitle") ||
                        "Message Sent Successfully!"}
                    </h4>
                    <p className="text-success-600 dark:text-success-400">
                      {t("contact:successMessage") ||
                        "Thank you for contacting VALORA. We'll get back to you within 24 hours."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("contact:name") || "Full Name"} *
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={
                          inputClass +
                          (errors.name
                            ? " border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                            : "")
                        }
                        placeholder={
                          t("contact:namePlaceholder") || "Enter your full name"
                        }
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-danger-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("contact:email") || "Email Address"} *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={
                          inputClass +
                          (errors.email
                            ? " border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                            : "")
                        }
                        placeholder={
                          t("contact:emailPlaceholder") ||
                          "Enter your email address"
                        }
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-danger-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("contact:phone") || "Phone Number"} *
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={
                          inputClass +
                          (errors.phone
                            ? " border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                            : "")
                        }
                        placeholder={
                          t("contact:phonePlaceholder") ||
                          "Enter your phone number"
                        }
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-danger-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("contact:projectInterest") || "Project of Interest"}
                      </label>
                      <input
                        name="projectInterest"
                        value={project.title}
                        readOnly
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t("contact:message") || "Message"} *
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={
                          inputClass +
                          (errors.message
                            ? " border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                            : "")
                        }
                        placeholder={
                          t("contact:messagePlaceholder") ||
                          "Tell us about your inquiry..."
                        }
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-danger-500">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {errors.submit && (
                      <div className="p-4 rounded-lg bg-danger-500/10 border border-danger-500/20">
                        <p className="text-danger-500 text-sm">
                          {errors.submit}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-3 text-lg"
                    >
                      {isSubmitting
                        ? t("contact:sending") || "Sending..."
                        : t("contact:sendMessage") || "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
