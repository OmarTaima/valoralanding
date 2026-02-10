import React from "react";
import { Helmet } from "react-helmet-async";
import AboutSection from "../components/aboutus";
import Footer from "../components/footer";

const About = () => {
  return (
    <main>
      <Helmet>
        <title>About Us - VALORA</title>
        <meta name="description" content="Learn about VALORA's mission, vision, and commitment to premium real estate development in Egypt." />
        <meta property="og:title" content="About Us - VALORA" />
        <meta property="og:description" content="Learn about VALORA's mission and commitment to premium real estate development." />
      </Helmet>
      <AboutSection />
      <Footer />
    </main>
  );
};

export default About;
