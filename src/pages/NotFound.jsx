import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "../components/footer";
import { getFullUrl, getDefaultOgImage, SITE_NAME } from "../utils/ogMeta";

const NotFound = () => {
  const pageUrl = getFullUrl('/404');
  const ogImage = getDefaultOgImage();
  
  return (
    <>
      <Helmet>
        <title>Page Not Found - VALORA</title>
        <meta name="description" content="The page you are looking for could not be found." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Page Not Found - VALORA" />
        <meta property="og:description" content="The page you are looking for could not be found." />
        {ogImage && <meta property="og:image" content={ogImage} />}
      </Helmet>
      <main className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">Page not found.</p>
        <Link to="/" className="text-primary font-semibold">
          Return home
        </Link>
      </main>
    </>
  );
};

export default NotFound;
