import useScrollAnimation from "../useScrollAnimation"; // Make sure the path is correct

export default function PlacementStats() {
  const stats = [
    { label: "Companies Visited", value: "20+" },
    { label: "Students Placed", value: "150+" },
    { label: "Highest Package", value: "12 LPA" },
    { label: "Average Package", value: "6 LPA" },
  ];

  // 1. Use the custom hook to observe the section (or grid)
  const [ref, isVisible] = useScrollAnimation(0.2); 

  return (
    <section className="px-6 md:px-20 py-20 bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 text-center">
      
      {/* Header - Apply animation conditionally */}
      <h2 
        className={`text-3xl md:text-4xl font-extrabold text-gray-800 mb-12 drop-shadow-sm 
            ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-x-[-100%]'}
        `}
        style={{ animationDelay: isVisible ? '0.1s' : '0s' }}
      >
        📊 Our Placement Success
      </h2>
      
      {/* 2. Attach ref to the grid container */}
      <div ref={ref} className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((s, i) => (
          <div
            key={i}
            // 3. Apply animation class conditionally with staggering
            className={`
              p-6 bg-white shadow-xl rounded-xl transition transform hover:shadow-2xl hover:scale-[1.02] 
              ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-x-[-100%]'}
            `}
            // Stagger the animation delay using inline style
            style={{ animationDelay: isVisible ? `${i * 0.15 + 0.3}s` : '0s' }}
          >
            <h3 className="text-4xl font-extrabold text-indigo-600">{s.value}</h3>
            <p className="mt-2 text-gray-600 text-lg">{s.label}</p>
          </div>
        ))}
      </div>
      
      {/* 4. Include the custom CSS keyframes */}
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