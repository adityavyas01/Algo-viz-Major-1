import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedVisualization } from "@/components/FeaturedVisualization";
import { Footer } from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main>
        <Hero />
        <FeaturedVisualization />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
