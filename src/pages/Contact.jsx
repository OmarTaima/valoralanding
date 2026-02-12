import React from "react";
import { Helmet } from "react-helmet-async";
import ContactUs from "../components/contactus";
import Footer from "../components/footer";
import { getFullUrl, getDefaultOgImage, SITE_NAME } from "../utils/ogMeta";

const Contact = () => {
  const pageUrl = getFullUrl('/contact');
  const ogImage = getDefaultOgImage();
  
  return (
    <main>
      <Helmet>
        <title>Contact Us - VALORA</title>
        <meta name="description" content="Get in touch with VALORA's team. Visit our office or reach out to discuss your real estate needs." />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Contact Us - VALORA" />
        <meta property="og:description" content="Get in touch with VALORA's team for your real estate needs." />
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:url" content={ogImage} />
            <meta property="og:image:secure_url" content={ogImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Contact VALORA - Premium Real Estate" />
          </>
        )}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - VALORA" />
        <meta name="twitter:description" content="Get in touch with VALORA's team for your real estate needs." />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
      <ContactUs />
      <Footer />
    </main>
  );
};

export default Contact;
