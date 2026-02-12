import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "../i18n/hooks/useTranslation";
import LanguageSwitcher from "../i18n/components/LanguageSwitcher";
import { path } from "framer-motion/client";
import valoraLogo from "../assets/logos/MAIN LOGO.png";

const Navbar = () => {
  const { t, isArabic } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/", label: t("navigation:home") },
    { path: "/about", label: t("navigation:about") },
    { path: "/projects", label: t("navigation:projects") },
    { path: "/join-us", label: t("navigation:joinUs") },
    { path: "/contact", label: t("navigation:contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <img
                src={valoraLogo}
                alt="Valora Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`nav-link relative px-2 py-1 text-lg`}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `nav-link relative px-2 py-1 text-lg ${
                      isActive ? "nav-link-active" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
            <div className="ml-4" style={{ marginRight: isArabic ? '2rem' : undefined }}>
              <LanguageSwitcher className="btn-outline " />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher className="btn-outline" />
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-light-100 dark:hover:bg-dark-700 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden mt-3 space-y-2">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={`block nav-link px-3 py-2 rounded`}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block nav-link px-3 py-2 rounded ${
                      isActive ? "nav-link-active" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
