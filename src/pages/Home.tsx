import React from "react";
import { Hero } from "@/components/Hero";
import { FeaturedVisualization } from "@/components/FeaturedVisualization";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Hero />
      <FeaturedVisualization />
    </div>
  );
};

export default Home;
