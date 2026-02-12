import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../components/herosection";
import { useTranslation } from "../i18n/hooks/useTranslation";
import AboutSection from "../components/aboutus";
import OurProjects from "../components/ourprojects";
import ContactUs from "../components/contactus";
import Footer from "../components/footer";
import { getFullUrl, getDefaultOgImage, SITE_NAME } from "../utils/ogMeta";

const Home = () => {
  const { t } = useTranslation();
  const pageUrl = getFullUrl('/');
  const ogImage = getDefaultOgImage();
  
  return (
    <main>
      <Helmet>
        <title>VALORA - Premium Real Estate Development in Egypt</title>
        <meta name="description" content={t("projects:metaHomeDescription") || "Discover premium real estate projects in Egypt with VALORA. Browse exclusive residential and commercial properties in Cairo and beyond."} />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="VALORA - Premium Real Estate Development" />
        <meta property="og:description" content={t("projects:metaHomeDescription") || "Discover premium real estate projects in Egypt with VALORA."} />
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:url" content={ogImage} />
            <meta property="og:image:secure_url" content={ogImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="VALORA - Premium Real Estate Development" />
          </>
        )}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VALORA - Premium Real Estate Development" />
        <meta name="twitter:description" content={t("projects:metaHomeDescription") || "Discover premium real estate projects in Egypt with VALORA."} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
      <HeroSection />

      {/* About section directly after hero for natural scroll flow */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Projects section follows about for vertical flow */}
      <div id="projects">
        <OurProjects />
      </div>

      {/* Contact section follows projects */}
      <div id="contact">
        <ContactUs />
      </div>

      {/* Footer at the bottom */}
      <div id="footer">
        <Footer />
      </div>
    </main>
  );
};

export default Home;
