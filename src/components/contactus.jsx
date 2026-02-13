import React, { useState, useEffect } from "react";
import { useTranslation } from "../i18n/hooks/useTranslation";
import axios from "axios";
import Swal from "sweetalert2";
import { addLead } from "../api";

const ContactUs = () => {
  const { t, isArabic } = useTranslation();
  const [project, setProject] = useState(null);
  const [projectsList, setProjectsList] = useState([]);
  const [projectOptions, setProjectOptions] = useState([
    { value: "", label: t("contact:selectProject") || "Select project" },
  ]);

  // Location data state
  const [countries, setCountries] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    government: "",
    city: "",
    phone: "",
    projectInterest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Unified input styling
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-light-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-light-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow shadow-sm";

  // Contact information cards
  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t("contact:addressTitle") || "Address",
      content:
        t("contact:address") ||
        "El-gharbia Tanta , El-nady St infornt of Tanta Club Gate, Above Waffle Art",
      link: "https://www.google.com/maps?q=30.7963614,30.9958117&z=17&hl=en",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: t("contact:phoneTitle") || "Phone",
      content: t("contact:phoneNumber") || "17740",
      link: "tel:17740",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t("contact:emailTitle") || "Email",
      content: t("contact:emailAddress") || "info@valora-rs.com",
      link: "mailto:info@valora-rs.com",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("contact:officeHoursTitle") || "Office Hours",
      content: t("contact:officeHours") || "Sunday - Thursday: 9:00 AM - 6:00 PM",
      subcontent: t("contact:weekend") || "Friday & Saturday: By appointment only",
    },
  ];

  // Fetch countries and cities on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_LOCATION_API_URL}/country/public`, {
          params: {
            deleted: false,
            PageCount: 1000,
            page: 1,
          },
        });

        const countriesData = res.data.data || [];
        setCountries(countriesData);

        // Set default country to Egypt
        const egypt = countriesData.find((c) => c.name?.toLowerCase() === "egypt" || c.name?.toLowerCase() === "مصر");
        if (egypt) {
          setFormData((prev) => ({ ...prev, country: egypt._id }));
          // Fetch governorates for Egypt
          fetchGovernorates(egypt._id);
        }
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };

    const fetchAllCities = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_LOCATION_API_URL}/city/public`, {
          params: {
            deleted: false,
            PageCount: 1000,
            page: 1,
          },
        });

        setAllCities(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    };

    fetchCountries();
    fetchAllCities();
  }, []);

  // Fetch governorates when country changes
  const fetchGovernorates = async (countryId) => {
    if (!countryId) {
      setGovernorates([]);
      setCities([]);
      setFormData((prev) => ({ ...prev, government: "", city: "" }));
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_LOCATION_API_URL}/government/public`, {
        params: {
          deleted: false,
          PageCount: 1000,
          page: 1,
          country: countryId,
        },
      });

      setGovernorates(res.data.data || []);
      setFormData((prev) => ({ ...prev, government: "", city: "" }));
    } catch (err) {
      console.error("Failed to fetch governorates:", err);
      setGovernorates([]);
    }
  };

  // Fetch projects once on mount and handle slug-based preselection
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_CRM_BACKEND_URL}/project/public`, {
          params: {
            deleted: false,
            company: import.meta.env.VITE_CRM_COMPANY_ID,
            PageCount: 100,
            page: 1,
          },
        });

        const items = res.data.data || [];
        setProjectsList(items);

        const options = [
          { value: "", label: t("contact:selectProject") || "Select project (optional)" },
          ...items.map((p) => ({
            value: p._id,
            label: (p.name && (p.name.ar || p.name.en)) || p.name || p.slug,
          })),
        ];

        setProjectOptions(options);

        // Check if a project slug is provided in query string and pre-select it
        const params = new URLSearchParams(window.location.search);
        const slug = params.get("project");
        if (slug) {
          const found = items.find((p) => p.slug === slug);
          if (found) {
            const subCategories =
              (Array.isArray(found.subCategories) && found.subCategories.length > 0)
                ? found.subCategories.map((s) => (typeof s === "string" ? s : s._id)).filter(Boolean)
                : (found.subCategory ? [(typeof found.subCategory === "string" ? found.subCategory : found.subCategory._id)] : []);

            setProject({ id: found._id, title: (found.name && (found.name.ar || found.name.en)) || found.name || found.slug, subCategories });
            setFormData((prev) => ({ ...prev, projectInterest: found._id }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  // Filter out unwanted country names from the selection
  const filteredCountries = countries.filter((c) => {
    const name = (c.name || "").toString().trim().toLowerCase();
    return name !== "اونلاين" && name !== "غير محدد";
  });

  // Return true when the currently selected country is Egypt (مصر)
  const isEgyptSelected = (() => {
    if (!formData.country) return false;
    const sel = countries.find((c) => c._id === formData.country);
    if (!sel) return false;
    const name = (sel.name || "").toString().trim().toLowerCase();
    return name === "egypt" || name === "مصر";
  })();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle cascading location dropdowns
    if (name === "country") {
      // Only fetch governorates when Egypt is selected; otherwise clear governorate/city
      const selected = countries.find((c) => c._id === value);
      const selName = (selected?.name || "").toString().trim().toLowerCase();
      if (selName === "egypt" || selName === "مصر") {
        fetchGovernorates(value);
      } else {
        setGovernorates([]);
        setCities([]);
        setFormData((prev) => ({ ...prev, government: "", city: "" }));
      }
    } else if (name === "government") {
      // Filter cities based on selected government
      const filteredCities = allCities.filter((city) => {
        // Handle different possible property names from API
        return city.government === value || 
               city.governmentId === value || 
               city.governorate === value || 
               city.government?._id === value;
      });
      setCities(filteredCities);
      setFormData((prev) => ({ ...prev, city: "" }));
    }

    // if user selected a project, set the project state to the selected project's details
    if (name === "projectInterest") {
      const found = projectsList.find((p) => p._id === value);
      if (found) {
        const subCategories =
          (Array.isArray(found.subCategories) && found.subCategories.length > 0)
            ? found.subCategories.map((s) => (typeof s === "string" ? s : s._id)).filter(Boolean)
            : (found.subCategory ? [(typeof found.subCategory === "string" ? found.subCategory : found.subCategory._id)] : []);

        setProject({ id: found._id, title: (found.name && (found.name.ar || found.name.en)) || found.name || found.slug, subCategories });
      } else {
        setProject(null);
      }
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact:nameRequired") || "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact:emailRequired") || "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact:emailInvalid") || "Invalid email address";
    }

    if (!formData.country || !formData.country.trim()) {
      newErrors.country = t("contact:countryRequired") || "Country is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("contact:phoneRequired") || "Phone is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.debug('Form validation errors:', validationErrors);
      
      // Get the first error and scroll to it
      const firstErrorKey = Object.keys(validationErrors)[0];
      const firstErrorMessage = validationErrors[firstErrorKey];
      
      // Scroll to the error field
      const errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          errorElement.focus();
        }, 300);
      }
      
      // Show alert after scroll
      setTimeout(async () => {
        await Swal.fire({
          icon: 'warning',
          title: t('contact:validationError') || 'Validation Error',
          text: firstErrorMessage,
          confirmButtonText: t('common:ok') || 'OK',
          confirmButtonColor: '#f59e0b',
        });
      }, 300);
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedProjectId = formData.projectInterest || (project && project.id) || null;

      const payload = {
        name: formData.name,
        email: formData.email || "",
        phone: formData.phone,
        otherPhones: [],
        status: "Pending",
        addresses: [
          {
            area: "",
            landmark: "",
            street: "",
            deleted: false,
          },
        ],
        country: formData.country || "",
        // Only include government/city when provided to avoid validation errors
        ...(formData.government ? { government: formData.government } : {}),
        ...(formData.city ? { city: formData.city } : {}),
        subCategories: (project && project.subCategories && project.subCategories.length > 0) ? project.subCategories : [],
        campaigns: [],
        channels: [],
        projects: selectedProjectId ? [selectedProjectId] : [],
        files: [],
        prevOrders: [],
        sales: [],
        // Only include message when the user provided content
        ...(formData.message && formData.message.trim() ? { message: { message: formData.message.trim() } } : {}),
        company: import.meta.env.VITE_CRM_COMPANY_ID,
        branch: import.meta.env.VITE_CRM_BRANCH_ID,
        deleted: false,
        isWhatsapp: false,
      };

      await addLead(payload);

      await Swal.fire({
        icon: 'success',
        title: t('contact:successTitle') || 'Message Sent Successfully!',
        text: t('contact:successMessage') || "Thank you for contacting VALORA. We'll get back to you within 24 hours.",
        confirmButtonText: t('common:ok') || 'OK',
        confirmButtonColor: '#10b981',
      });

      setSubmitSuccess(true);
      // Reset form but keep Egypt as default country
      const egypt = countries.find((c) => c.name?.toLowerCase() === "egypt" || c.name?.toLowerCase() === "مصر");
      setFormData({ 
        name: "", 
        email: "", 
        country: egypt?._id || "", 
        government: "", 
        city: "", 
        phone: "", 
        projectInterest: "", 
        message: "" 
      });
      if (egypt) {
        fetchGovernorates(egypt._id);
      }
      setProject(null);
      setErrors({});
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.debug("Form submission error:", error);
      console.debug("Error response:", error?.response?.data);
      const errorMessage = error?.response?.data?.message || t("contact:submitError") || "An error occurred. Please try again.";
      setErrors({ submit: errorMessage });
      await Swal.fire({
        icon: 'error',
        title: t('contact:error') || 'Error',
        text: errorMessage,
        confirmButtonText: t('common:ok') || 'OK',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 ${isArabic ? "rtl" : ""}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-semibold text-primary-500">{t("contact:tagline") || "Get in Touch"}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-light-900 dark:text-white mb-6">{t("contact:title") || "Contact VALORA"}</h2>

          <p className="text-xl text-light-600 dark:text-light-300 leading-relaxed max-w-3xl mx-auto">{t("contact:subtitle") || "Reach out to our team for inquiries, project information, or investment opportunities. We're here to help you find your perfect space."}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <div className={`order-2 lg:order-1 ${isArabic ? "rtl" : ""}`}>
            <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-8">{t("contact:contactInfoTitle") || "Contact Information"}</h3>

            {/* Contact Cards */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 hover:border-primary-500 transition-colors group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">{info.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-light-900 dark:text-white mb-2">{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} target={info.link.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="text-light-700 dark:text-light-300 hover:text-primary-500 transition-colors block">{info.content}</a>
                    ) : (
                      <p className="text-light-700 dark:text-light-300">{info.content}</p>
                    )}
                    {info.subcontent && <p className="text-sm text-light-600 dark:text-light-400 mt-1">{info.subcontent}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold text-light-900 dark:text-white mb-6">{t("contact:socialMediaTitle") || "Follow Us"}</h4>
              <div className="flex gap-4">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                    link: "https://www.facebook.com/valorarealestate.eg",
                    color: "bg-blue-600 hover:bg-blue-700",
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                    link: "https://www.instagram.com/valorarealestate.eg/",
                    color: "bg-pink-600 hover:bg-pink-700",
                  },
                  {
                    name: "LinkedIn",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                    link: "https://www.linkedin.com/company/valorarealestate",
                    color: "bg-blue-700 hover:bg-blue-800",
                  },
                  {
                    name: "TikTok",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    ),
                    link: "https://www.tiktok.com/@valorarealestate.eg",
                    color: "bg-black hover:bg-neutral-800",
                  },
                ].map((social, index) => (
                  social.link ? (
                    <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className={`${social.color} text-white w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-110`} aria-label={`Follow us on ${social.name}`}>
                      {social.icon}
                    </a>
                  ) : (
                    <div key={index} className={`${social.color} text-white w-12 h-12 rounded-xl flex items-center justify-center`} aria-label={social.name}>{social.icon}</div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="glass rounded-3xl p-8 md:p-10">
              <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-8">{t("contact:formTitle") || "Send us a Message"}</h3>

              {submitSuccess ? (
                <div className="mb-8 p-6 rounded-2xl bg-success-500/10 border border-success-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-success-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-success-500">{t("contact:successTitle") || "Message Sent Successfully!"}</h4>
                      <p className="text-success-600 dark:text-success-400">{t("contact:successMessage") || "Thank you for contacting VALORA. We'll get back to you within 24 hours."}</p>
                    </div>
                  </div>
                  <button onClick={() => setSubmitSuccess(false)} className="text-sm text-success-600 dark:text-success-400 hover:text-success-700">{t("contact:sendAnother") || "Send another message"}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label block mb-2">{t("contact:name") || "Full Name"} *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t("contact:namePlaceholder") || "Enter your full name"} className={`${inputClass} ${errors.name ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : ""}`} />
                      {errors.name && <p className="mt-2 text-sm text-danger-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label block mb-2">{t("contact:email") || "Email"} *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder={t("contact:emailPlaceholder") || "Enter your email"} className={`${inputClass} ${errors.email ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : ""}`} />
                      {errors.email && <p className="mt-2 text-sm text-danger-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="country" className="form-label block mb-2">{t("contact:country") || "Country"} *</label>
                      <select id="country" name="country" value={formData.country} onChange={handleChange} className={`${inputClass} ${errors.country ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : ""}`}>
                        <option value="">{t("contact:selectCountry") || "Select a country"}</option>
                        {filteredCountries.map((c) => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </select>
                      {errors.country && <p className="mt-2 text-sm text-danger-500">{errors.country}</p>}
                    </div>
                    {isEgyptSelected ? (
                      <div>
                        <label htmlFor="government" className="form-label block mb-2">{t("contact:government") || "Governorate"} *</label>
                        <select id="government" name="government" value={formData.government} onChange={handleChange} disabled={!formData.country} className={`${inputClass} ${errors.government ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : ""} disabled:opacity-50 disabled:cursor-not-allowed`}>
                          <option value="">{t("contact:selectGovernment") || "Select a governorate"}</option>
                          {governorates.map((g) => (
                            <option key={g._id} value={g._id}>{g.name}</option>
                          ))}
                        </select>
                        {errors.government && <p className="mt-2 text-sm text-danger-500">{errors.government}</p>}
                      </div>
                    ) : null}
                  </div>

                  {isEgyptSelected && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="form-label block mb-2">{t("contact:city") || "City"} *</label>
                        <select id="city" name="city" value={formData.city} onChange={handleChange} disabled={!formData.government} className={`${inputClass} ${errors.city ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : ""} disabled:opacity-50 disabled:cursor-not-allowed`}>
                          <option value="">{t("contact:selectCity") || "Select a city"}</option>
                          {cities.map((c) => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                          ))}
                        </select>
                        {errors.city && <p className="mt-2 text-sm text-danger-500">{errors.city}</p>}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <label htmlFor="phone" className="form-label block mb-2">{t("contact:phone") || "Phone Number"} *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder={t("contact:phonePlaceholder") || "Enter your phone number"} className={`${inputClass} ${errors.phone ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : ""}`} />
                    {errors.phone && <p className="mt-2 text-sm text-danger-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="projectInterest" className="form-label block mb-2">{t("contact:projectInterest") || "Project of Interest"}</label>
                    <select id="projectInterest" name="projectInterest" value={formData.projectInterest} onChange={handleChange} className={inputClass}>
                      {projectOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label block mb-2">{t("contact:message") || "Message"}</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" placeholder={t("contact:messagePlaceholder") || "Tell us more about your inquiry..."} className={inputClass} />
                  </div>

                  {errors.submit && (
                    <div className="p-4 rounded-lg bg-danger-500/10 border border-danger-500/20">
                      <p className="text-danger-500 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t("contact:sending") || "Sending..."}
                      </>
                    ) : (
                      <>
                        {t("contact:sendMessage") || "Send Message"}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-sm text-light-600 dark:text-light-400 text-center">{t("contact:privacyNote") || "By submitting this form, you agree to our Privacy Policy and Terms of Service."}</p>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-8 text-center">{t("contact:findUs") || "Find Us"}</h3>

          <div className="glass rounded-3xl overflow-hidden">
            <div className="h-96">
              <iframe src="https://maps.google.com/maps?q=30.7963611,30.9958056&z=15&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="VALORA Location" className="filter grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-8 text-center">{t("contact:faqTitle") || "Frequently Asked Questions"}</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                question: t("contact:faq1Q") || "What is VALORA's minimum investment?",
                answer: t("contact:faq1A") || "Our projects start from EGP 1.9M with flexible payment plans.",
              },
              {
                question: t("contact:faq2Q") || "How can I schedule a site visit?",
                answer: t("contact:faq2A") || "Contact our sales team to book a personalized site tour.",
              },
              {
                question: t("contact:faq3Q") || "Do you offer after-sales services?",
                answer: t("contact:faq3A") || "Yes, we provide comprehensive after-sales support and property management.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white/50 dark:bg-dark-700/50 p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-light-900 dark:text-white mb-3">{faq.question}</h4>
                <p className="text-light-700 dark:text-light-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#faq" className="text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center gap-2">{t("contact:viewAllFAQ") || "View all FAQ"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
