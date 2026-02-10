import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../components/herosection";
import AboutSection from "../components/aboutus";
import OurProjects from "../components/ourprojects";
import ContactUs from "../components/contactus";
import Footer from "../components/footer";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>VALORA - Premium Real Estate Development in Egypt</title>
        <meta name="description" content="Discover premium real estate projects in Egypt with VALORA. Browse exclusive residential and commercial properties in Cairo and beyond." />
        <meta property="og:title" content="VALORA - Premium Real Estate Development" />
        <meta property="og:description" content="Discover premium real estate projects in Egypt with VALORA." />
        <meta property="og:type" content="website" />
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
