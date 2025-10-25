import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PostAnnouncement from "./PostAnnouncement";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const { user } = useSelector((store) => store.auth);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/announcements/get", { withCredentials: true });
      setAnnouncements(res.data.announcements || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to load announcements");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const res = await axios.delete(`http://localhost:8000/api/announcements/${id}`, { withCredentials: true });
      toast.success(res.data.message);
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Delete announcement error:", error);
      toast.error(error.response?.data?.message || "Failed to delete announcement");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6">Placement Announcements</h2>

        {user?.role === "recruiter" && (
          <div className="mb-6">
            <PostAnnouncement onAnnouncementAdded={(newAnn) => setAnnouncements([newAnn, ...announcements])} />
          </div>
        )}

        {announcements.length === 0 ? (
          <p className="text-gray-400">No announcements available yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {announcements.map((a) => (
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
                {user?.role === "recruiter" && a.created_by?._id === user._id && (
                  <button className="bg-red-600 px-3 py-1 rounded" onClick={() => handleDelete(a._id)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;