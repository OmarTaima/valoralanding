import React from "react";
import { Helmet } from "react-helmet-async";
import AboutSection from "../components/aboutus";
import Footer from "../components/footer";
import { getFullUrl, getDefaultOgImage, SITE_NAME } from "../utils/ogMeta";

const About = () => {
  const pageUrl = getFullUrl('/about');
  const ogImage = getDefaultOgImage();
  
  return (
    <main>
      <Helmet>
        <title>About Us - VALORA</title>
        <meta name="description" content="Learn about VALORA's mission, vision, and commitment to premium real estate development in Egypt." />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="About Us - VALORA" />
        <meta property="og:description" content="Learn about VALORA's mission and commitment to premium real estate development." />
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:url" content={ogImage} />
            <meta property="og:image:secure_url" content={ogImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="About VALORA - Premium Real Estate Development" />
          </>
        )}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - VALORA" />
        <meta name="twitter:description" content="Learn about VALORA's mission and commitment to premium real estate development." />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
      <AboutSection />
      <Footer />
    </main>
  );
};

export default About;
