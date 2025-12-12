import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { slug } = useParams();

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Project Detail</h1>
      <p className="text-lg text-gray-600">Details for project: {slug}</p>
    </main>
  );
};

export default ProjectDetail;
