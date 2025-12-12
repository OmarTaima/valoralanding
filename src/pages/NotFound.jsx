import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Page not found.</p>
      <Link to="/" className="text-primary font-semibold">
        Return home
      </Link>
    </main>
  );
};

export default NotFound;
