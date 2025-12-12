import React from "react";
import Navbar from "../components/navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="grow">{children}</main>
    </div>
  );
};

export default MainLayout;
