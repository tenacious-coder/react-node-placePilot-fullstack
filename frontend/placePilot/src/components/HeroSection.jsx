//import Profile from "./components/Profile"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function HeroSection() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const fullText = "Kickstart your career with placePilot";

  const buttons = [
    {
      label: "Get Started",
      action: () => {
        if (!user) {
          toast.error("Please login to continue");
        } else {
          navigate("/profile");
        }
      },
      primary: true,
    },
    {
      label: "Learn More",
      action: () => navigate("/features"),
      primary: false,
    },
  ];

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-24 bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200">
      {/* Left Text */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-gray-800 min-h-[5rem] animate-slideIn">
          <span className="text-indigo-600">{fullText}</span>
        </h1>

        <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
          Connect with top companies, prepare efficiently, and track your
          placement journey – all in one platform.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.action}
              className={`px-8 py-3 rounded-lg transition transform hover:scale-105 ${
                btn.primary
                  ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
                  : "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Illustration */}
      <div className="flex justify-center md:justify-end w-full md:w-auto mb-10 md:mb-0">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="career illustration"
          className="w-80 md:w-96 animate-bounce-slow"
        />
      </div>

      {/* Tailwind + custom CSS animation */}
      <style>
        {`
          @keyframes slideIn {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.8s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
}