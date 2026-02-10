import React from "react";
import { Helmet } from "react-helmet-async";
import ContactUs from "../components/contactus";
import Footer from "../components/footer";

const Contact = () => {
  return (
    <main>
      <Helmet>
        <title>Contact Us - VALORA</title>
        <meta name="description" content="Get in touch with VALORA's team. Visit our office or reach out to discuss your real estate needs." />
        <meta property="og:title" content="Contact Us - VALORA" />
        <meta property="og:description" content="Get in touch with VALORA's team for your real estate needs." />
      </Helmet>
      <ContactUs />
      <Footer />
    </main>
  );
};

export default Contact;
