import React from "react";
import { Helmet } from "react-helmet-async";
import OurProjects from "../components/ourprojects";
import Footer from "../components/footer";

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projects - VALORA</title>
        <meta name="description" content="Explore VALORA's portfolio of premium real estate projects in Egypt. Find your perfect residential or commercial property." />
        <meta property="og:title" content="Projects - VALORA" />
        <meta property="og:description" content="Explore VALORA's portfolio of premium real estate projects in Egypt." />
      </Helmet>
      <main className="container mx-auto px-6">
        <OurProjects />
      </main>
      <Footer />
    </>
  );
};

export default Projects;
