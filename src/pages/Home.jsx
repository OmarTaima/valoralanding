import React from "react";
import HeroSection from "../components/herosection";
import AboutSection from "../components/aboutus";
import OurProjects from "../components/ourprojects";
import ContactUs from "../components/contactus";
import Footer from "../components/footer";

const Home = () => {
  return (
    <main>
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
