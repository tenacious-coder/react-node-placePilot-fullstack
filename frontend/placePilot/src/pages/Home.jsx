import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PlacementStats from "../components/PlacementStats";
import DashboardCards from "../components/DashBoard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      {/* Hero / Stats / Features */}
      <Navbar/>
      <HeroSection />
      <DashboardCards/>
      <PlacementStats />
      <FeaturesSection />
       <Footer/>
    </div>
  );
}

export default Home;