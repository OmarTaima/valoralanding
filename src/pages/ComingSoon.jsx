import React from "react";
import valoraLogo from "../assets/logos/Valora Logo.png";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <img
          src={valoraLogo}
          alt="Valora Logo"
          className="mx-auto h-28 w-auto object-contain"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Coming Soon
        </h1>

        <p className="text-lg text-gray-600">
          We're working on something great. Stay tuned — we'll be live soon.
        </p>

       
      </div>
    </div>
  );
};

export default ComingSoon;
