import useScrollAnimation from "../useScrollAnimation"; // Import the custom hook
//import { useState, useEffect } from "react";


export default function FeaturesSection() {
  const [ref, isVisible] = useScrollAnimation(0.2); // Observe the container

  return (
    <section className="px-6 md:px-20 py-20 bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 text-center">
      
      {/* Header */}
      <h2 
        className={`
          text-4xl md:text-5xl font-extrabold text-gray-800 mb-12
          // Apply animation class conditionally
          ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-x-[-100%]'}
        `}
        style={{ animationDelay: isVisible ? '0.1s' : '0s' }}
      >
        Why Choose <span className="text-indigo-600">PlacePilot?</span>
      </h2>

      {/* Attach ref to the grid container */}
      <div ref={ref} className="grid md:grid-cols-3 gap-10">
        
        {/* Card 1 */}
        <div 
          className={`
            p-8 bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white
            ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-x-[-100%]'}
          `}
          style={{ animationDelay: isVisible ? '0.3s' : '0s' }} // Staggered delay
        >
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Smart Job Matching
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Discover personalized job opportunities...
          </p>
        </div>

        {/* Card 2 */}
        <div 
          className={`
            p-8 bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white
            ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-x-[-100%]'}
          `}
          style={{ animationDelay: isVisible ? '0.5s' : '0s' }} // Staggered delay
        >
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Career Dashboard
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Track every stage of your journey...
          </p>
        </div>

        {/* Card 3 */}
        <div 
          className={`
            p-8 bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white
            ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-x-[-100%]'}
          `}
          style={{ animationDelay: isVisible ? '0.7s' : '0s' }} // Staggered delay
        >
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
             Opportunities that suits you
          </h3>
          <p className="text-gray-600 leading-relaxed">
            View opportunities and apply for the role that best suits you...
          </p>
        </div>
      </div>
      
      {/* Custom CSS for the slide-in animation */}
      <style>
        {`
          @keyframes slideInFromLeft {
            0% {
              transform: translateX(-100px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slideInFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          }
        `}
      </style>
    </section>
  );
}