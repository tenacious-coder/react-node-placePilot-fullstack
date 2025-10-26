import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PostArchive from "./PostArchive";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const Archives = () => {
  const [archives, setArchives] = useState([]);
  const { user } = useSelector((store) => store.auth);

  const fetchArchives = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/archives/get", { withCredentials: true });
      setArchives(res.data.archives || []);
    } catch (error) {
      console.error("Error fetching archives:", error);
      toast.error("Failed to load archives");
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this archive?")) return;

    try {
      const res = await axios.delete(`https://react-node-placepilot-fullstack.onrender.com/api/archives/${id}`, { withCredentials: true });
      toast.success(res.data.message);
      setArchives((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Delete archive error:", error);
      toast.error(error.response?.data?.message || "Failed to delete archive");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">
        <h2 className="text-3xl font-bold text-center mb-6">Placement Archives</h2>

        {/* Add Archive Form */}
        {user?.role === "recruiter" && (
          <div className="w-full md:w-3/4 lg:w-3/3 mx-auto">
            <PostArchive onArchiveAdded={(newArchive) => setArchives([newArchive, ...archives])} />
          </div>
        )}

        {/* No Archives Message */}
        {archives.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 text-lg">No archives available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {archives.map((a) => (
              <div
                key={a._id}
                className="bg-white text-black border border-white/20 rounded-2xl p-6 flex flex-col justify-between 
                           transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer h-full"
              >
                <div className="flex flex-col space-y-3">
                  <h3 className="text-xl font-semibold">{a.title}</h3>
                  <p className="text-black mt-2">{a.description}</p>

                  {a.document && (
                    <a
                      href={a.document.startsWith("http") ? a.document : `http://localhost:8000${a.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500 font-semibold"
                    >
                     <button className="bg-green-600 text-white px-2 py-1 rounded "> View Document</button>
                    </a>
                  )}

                  <p className="text-gray-400 text-sm">
                    Posted on: {new Date(a.createdAt).toLocaleDateString()}
                  </p>

                  {user?.role === "recruiter" && a.created_by?._id === user._id && (
                    <button
                      className="mt-2 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-sm"
                      onClick={() => handleDelete(a._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archives;