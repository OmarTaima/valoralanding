import React, { useState } from "react";
import { useTranslation } from "../i18n/hooks/useTranslation";

const ContactUs = () => {
  const { t, isArabic } = useTranslation();
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

  // Contact information
  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      title: t("contact:addressTitle") || "Address",
      content: t("contact:address") || "VALORA Tower, New Cairo, Cairo, Egypt",
      link: "https://maps.google.com/?q=VALORA+Tower+New+Cairo+Cairo+Egypt",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      title: t("contact:phoneTitle") || "Phone",
      content: t("contact:phoneNumber") || "+2 010 2048 9251",
      link: "tel:+201020489251",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      title: t("contact:emailTitle") || "Email",
      content: t("contact:emailAddress") || "info@valora-egypt.com",
      link: "mailto:info@valora-egypt.com",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t("contact:officeHoursTitle") || "Office Hours",
      content:
        t("contact:officeHours") || "Sunday - Thursday: 9:00 AM - 6:00 PM",
      subcontent:
        t("contact:weekend") || "Friday & Saturday: By appointment only",
    },
  ];

  // Subject options
  const subjectOptions = [
    { value: "", label: t("contact:selectSubject") || "Select a subject" },
    {
      value: "general",
      label: t("contact:generalInquiry") || "General Inquiry",
    },
    {
      value: "investment",
      label: t("contact:investment") || "Investment Opportunity",
    },
    {
      value: "project",
      label: t("contact:projectInfo") || "Project Information",
    },
    { value: "sales", label: t("contact:sales") || "Sales Inquiry" },
    {
      value: "partnership",
      label: t("contact:partnership") || "Business Partnership",
    },
    { value: "careers", label: t("contact:careers") || "Career Opportunities" },
  ];

  // Project interest options
  const projectOptions = [
    {
      value: "",
      label: t("contact:selectProject") || "Select project (optional)",
    },
    { value: "valora-towers", label: "VALORA Towers" },
    { value: "aurora-park", label: "AURORA Business Park" },
    { value: "vista-residences", label: "VISTA Residences" },
    { value: "serenity-villas", label: "Serenity Villas" },
    { value: "nexus-mixed", label: "NEXUS Mixed-Use" },
    { value: "other", label: t("contact:other") || "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      newErrors.email =
        t("contact:emailInvalid") || "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("contact:phoneRequired") || "Phone is required";
    }

    if (!formData.subject) {
      newErrors.subject =
        t("contact:subjectRequired") || "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact:messageRequired") || "Message is required";
    }

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
      // In a real application, you would send this data to your backend
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        projectInterest: "",
      });
      setErrors({});
      setSubmitSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({
        submit:
          t("contact:submitError") || "An error occurred. Please try again.",
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
        <div
          className={`max-w-4xl mx-auto text-center mb-16 ${
            isArabic ? "rtl" : ""
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-semibold text-primary-500">
              {t("contact:tagline") || "Get in Touch"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-light-900 dark:text-white mb-6">
            {t("contact:title") || "Contact VALORA"}
          </h2>

          <p className="text-xl text-light-600 dark:text-light-300 leading-relaxed max-w-3xl mx-auto">
            {t("contact:subtitle") ||
              "Reach out to our team for inquiries, project information, or investment opportunities. We're here to help you find your perfect space."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <div className={`order-2 lg:order-1 ${isArabic ? "rtl" : ""}`}>
            <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-8">
              {t("contact:contactInfoTitle") || "Contact Information"}
            </h3>

            {/* Contact Cards */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 hover:border-primary-500 transition-colors group"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-light-900 dark:text-white mb-2">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        target={
                          info.link.startsWith("http") ? "_blank" : "_self"
                        }
                        rel="noopener noreferrer"
                        className="text-light-700 dark:text-light-300 hover:text-primary-500 transition-colors block"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-light-700 dark:text-light-300">
                        {info.content}
                      </p>
                    )}
                    {info.subcontent && (
                      <p className="text-sm text-light-600 dark:text-light-400 mt-1">
                        {info.subcontent}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold text-light-900 dark:text-white mb-6">
                {t("contact:socialMediaTitle") || "Follow Us"}
              </h4>
              <div className="flex gap-4">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                    link: "https://facebook.com/valora",
                    color: "bg-blue-600 hover:bg-blue-700",
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                    link: "https://instagram.com/valora",
                    color: "bg-pink-600 hover:bg-pink-700",
                  },
                  {
                    name: "LinkedIn",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                    link: "https://linkedin.com/company/valora",
                    color: "bg-blue-700 hover:bg-blue-800",
                  },
                  {
                    name: "WhatsApp",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                      </svg>
                    ),
                    link: "https://wa.me/201020489251",
                    color: "bg-green-600 hover:bg-green-700",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-110`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="glass rounded-3xl p-8 md:p-10">
              <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-8">
                {t("contact:formTitle") || "Send us a Message"}
              </h3>

              {submitSuccess ? (
                <div className="mb-8 p-6 rounded-2xl bg-success-500/10 border border-success-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-success-500/20 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-success-500"
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
                    <div>
                      <h4 className="text-xl font-bold text-success-500">
                        {t("contact:successTitle") ||
                          "Message Sent Successfully!"}
                      </h4>
                      <p className="text-success-600 dark:text-success-400">
                        {t("contact:successMessage") ||
                          "Thank you for contacting VALORA. We'll get back to you within 24 hours."}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-sm text-success-600 dark:text-success-400 hover:text-success-700"
                  >
                    {t("contact:sendAnother") || "Send another message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        {t("contact:name") || "Full Name"} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={
                          t("contact:namePlaceholder") || "Enter your full name"
                        }
                        className={`form-input ${
                          errors.name
                            ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                            : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-danger-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="form-label">
                        {t("contact:email") || "Email Address"} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={
                          t("contact:emailPlaceholder") ||
                          "Enter your email address"
                        }
                        className={`form-input ${
                          errors.email
                            ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                            : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-danger-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="form-label">
                        {t("contact:phone") || "Phone Number"} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={
                          t("contact:phonePlaceholder") ||
                          "Enter your phone number"
                        }
                        className={`form-input ${
                          errors.phone
                            ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                            : ""
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-danger-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="form-label">
                        {t("contact:subject") || "Subject"} *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`form-input ${
                          errors.subject
                            ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                            : ""
                        }`}
                      >
                        {subjectOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="mt-2 text-sm text-danger-500">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Interest */}
                  <div>
                    <label htmlFor="projectInterest" className="form-label">
                      {t("contact:projectInterest") || "Project of Interest"}
                    </label>
                    <select
                      id="projectInterest"
                      name="projectInterest"
                      value={formData.projectInterest}
                      onChange={handleChange}
                      className="form-input"
                    >
                      {projectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="form-label">
                      {t("contact:message") || "Message"} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder={
                        t("contact:messagePlaceholder") ||
                        "Tell us about your inquiry..."
                      }
                      className={`form-input ${
                        errors.message
                          ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                          : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-danger-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-4 rounded-lg bg-danger-500/10 border border-danger-500/20">
                      <p className="text-danger-500 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
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
                        {t("contact:sending") || "Sending..."}
                      </>
                    ) : (
                      <>
                        {t("contact:sendMessage") || "Send Message"}
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="text-sm text-light-600 dark:text-light-400 text-center">
                    {t("contact:privacyNote") ||
                      "By submitting this form, you agree to our Privacy Policy and Terms of Service."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-8 text-center">
            {t("contact:findUs") || "Find Us"}
          </h3>

          <div className="glass rounded-3xl overflow-hidden">
            {/* Google Maps Embed */}
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.837254155114!2d31.395294315113705!3d29.96696328190566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d5c8f2e5b5f%3A0x1a50e5b5b5b5b5b5!2sNew%20Cairo%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1629999999999!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VALORA Location"
                className="filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="p-8 bg-white dark:bg-dark-800">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    30 min
                  </div>
                  <div className="text-light-700 dark:text-light-300">
                    {t("contact:fromAirport") || "From Cairo Airport"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    15 min
                  </div>
                  <div className="text-light-700 dark:text-light-300">
                    {t("contact:fromDowntown") || "From Downtown Cairo"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    24/7
                  </div>
                  <div className="text-light-700 dark:text-light-300">
                    {t("contact:security") || "Security & Support"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ/Quick Links */}
        <div className="glass rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-light-900 dark:text-white mb-8 text-center">
            {t("contact:faqTitle") || "Frequently Asked Questions"}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                question:
                  t("contact:faq1Q") || "What is VALORA's minimum investment?",
                answer:
                  t("contact:faq1A") ||
                  "Our projects start from AED 1.9M with flexible payment plans.",
              },
              {
                question:
                  t("contact:faq2Q") || "How can I schedule a site visit?",
                answer:
                  t("contact:faq2A") ||
                  "Contact our sales team to book a personalized site tour.",
              },
              {
                question:
                  t("contact:faq3Q") || "Do you offer after-sales services?",
                answer:
                  t("contact:faq3A") ||
                  "Yes, we provide comprehensive after-sales support and property management.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-dark-700/50 p-6 rounded-2xl"
              >
                <h4 className="text-lg font-semibold text-light-900 dark:text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-light-700 dark:text-light-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#faq"
              className="text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center gap-2"
            >
              {t("contact:viewAllFAQ") || "View all FAQ"}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
