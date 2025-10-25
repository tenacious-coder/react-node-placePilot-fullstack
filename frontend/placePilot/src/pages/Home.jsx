import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PlacementStats from "../components/PlacementStats";
import DashboardCards from "../components/Dashboard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
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