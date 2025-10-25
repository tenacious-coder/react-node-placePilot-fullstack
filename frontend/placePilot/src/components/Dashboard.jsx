import { useNavigate } from "react-router-dom";
import useScrollAnimation from "../useScrollAnimation"; // Import the custom hook
import { toast } from "sonner";
import { useSelector } from "react-redux";

const cards = [
  { id: 1, title: "Current Opportunities for Students", img: "https://img.icons8.com/fluency/96/megaphone.png", link: "/opportunities" },
  { id: 2, title: "Important Announcements / Upcoming Events", img: "https://img.icons8.com/fluency/96/calendar.png", link: "/announcements" },
  { id: 3, title: "Training / Placement Instructions", img: "https://img.icons8.com/fluency/96/classroom.png", link: "/training" },
  { id: 4, title: "Placement Archives", img: "https://img.icons8.com/fluency/96/folder-invoices.png", link: "/archives" },
];

export default function DashboardCards() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  // Observe the grid container
  const [ref, isVisible] = useScrollAnimation(0.2); 

  const handleCard = (link) =>{
    if(!user){
      toast.error("Please login to conitnue");
      return;
    }
    navigate(link);
  }

  
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-16 px-6 bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200" >
      
      {/* Attach ref to the main grid container */}
      <div 
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl"
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCard(card.link)}
            // Apply animation class conditionally
            className={`
              cursor-pointer bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 flex flex-col items-center justify-center text-center 
              transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-white/80
              // Apply animation only when visible, otherwise keep it off-screen
              ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-x-[-100%]'} 
            `}
            // Stagger the animation delay using inline style
            style={{ animationDelay: isVisible ? `${index * 0.15 + 0.1}s` : '0s' }}
          >
            <img src={card.img} alt={card.title} className="h-20 w-20 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
          </div>
        ))}
      </div>
      
      {/* Custom CSS for the slide-in animation */}
      <style>
        {`
          @keyframes slideInFromLeft {
            0% {
              transform: translateX(-100px); /* slightly off-screen */
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
    </div>
  );
}