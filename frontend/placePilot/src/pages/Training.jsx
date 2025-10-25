import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import PostTraining from "./PostTraining" 

const Training = () => {
  const [trainings, setTrainings] = useState([]);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/training/get", { withCredentials: true });
        setTrainings(res.data.trainings || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load training instructions");
      }
    };
    fetchTrainings();
  }, []);

 return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6">Training Instructions</h2>

        {user?.role === "recruiter" && (
          <div className="mb-6">
            <PostTraining onTrainingAdded={(newAnn) => setTrainings([newAnn, ...trainings])} />
          </div>
        )}

        {trainings.length === 0 ? (
          <p className="text-gray-400">No instructions available yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {trainings.map((a) => (
              <div key={a._id} className="bg-white p-4 rounded-lg shadow-md text-black">
                <h5 className="text-xl font-semibold mb-2">{a.title}</h5>
                <p className="mb-3">{a.description}</p>
                {a.document && (
                  <a
                    href={a.document.startsWith("http") ? a.document : `http://localhost:8000${a.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline mb-2 block"
                   >
                   <button className="border-black bg-green-600 rounded py-1 px-2 text-white"> View Document</button>
                </a>
                )}
                <p className="text-gray-400 text-sm mb-2">Posted on: {new Date(a.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Training;