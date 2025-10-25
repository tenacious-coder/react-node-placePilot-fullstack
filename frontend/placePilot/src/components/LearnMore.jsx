import React from "react";
import Navbar from "./Navbar";

function LearnMore() {
  return (
    <div>
        <Navbar/>
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 tracking-wide">
          Learn More About <span className="text-indigo-500">PlacePilot</span>
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed mt-4">
          <strong>PlacePilot</strong> is a modern, interactive platform designed
          to bridge students and placement opportunities seamlessly. Explore
          trainings, access curated placement instructions, and stay updated
          with the latest announcements. Apply to internships and jobs directly
          through an intuitive dashboard with real-time search and filters.
          Empowering students to achieve their career goals while giving
          recruiters a simple, efficient platform to share opportunities—all in
          one ecosystem.
        </p>
        <br />
        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed mt-4">
          <strong>PlacePilot</strong> proves to be efficient for both the
          students as well as the recruiters. the students can easily check opt
          for the company that suits according to his/her skills. on the other
          hand the recruiters can easily judge the students based on their
          skills and their resume.
        </p>
        <br />
     <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed mt-4">
       <strong>PlacePilot</strong> plays an important role in keeping the students up to date about the companies visiting their colle and the student can apply for the company in he feels his skills best suits.
     </p>
     <br />
     <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed mt-4">
      Do take adavantage of the PlacePilot as it will help you in landing the best job that suits you.
     </p>
      </div>
    </section>
    </div>
  );
}

export default LearnMore;
