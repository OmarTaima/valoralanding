import React from "react";
import { Helmet } from "react-helmet-async";
import OurProjects from "../components/ourprojects";
import { useTranslation } from "../i18n/hooks/useTranslation";
import Footer from "../components/footer";
import { getFullUrl, getDefaultOgImage, SITE_NAME } from "../utils/ogMeta";

const Projects = () => {
  const { t } = useTranslation();
  const pageUrl = getFullUrl('/projects');
  const ogImage = getDefaultOgImage();
  
  return (
    <>
      <Helmet>
        <title>Projects - VALORA</title>
        <meta name="description" content={t("projects:metaProjectsDescription") || "Explore VALORA's portfolio of premium real estate projects in Egypt. Find your perfect residential or commercial property."} />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Projects - VALORA" />
        <meta property="og:description" content={t("projects:metaProjectsDescription") || "Explore VALORA's portfolio of premium real estate projects in Egypt."} />
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:url" content={ogImage} />
            <meta property="og:image:secure_url" content={ogImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="VALORA Projects - Premium Real Estate" />
          </>
        )}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects - VALORA" />
        <meta name="twitter:description" content={t("projects:metaProjectsDescription") || "Explore VALORA's portfolio of premium real estate projects in Egypt."} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
      <main className="container mx-auto px-6">
        <OurProjects />
      </main>
      <Footer />
    </>
  );
};

export default Projects;
