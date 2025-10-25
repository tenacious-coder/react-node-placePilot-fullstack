import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const PostAnnouncement = ({ onAnnouncementAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return toast.error("Title and description are required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (document) formData.append("document", document);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/announcements/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      onAnnouncementAdded(res.data.announcement);

      setTitle("");
      setDescription("");
      setDocument(null);
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error(error.response?.data?.message || "Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h5 className="text-lg font-semibold mb-3">Add New Announcement</h5>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 rounded bg-white text-black border-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-2 rounded bg-white text-black"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="p-2 rounded bg-white text-black"
          onChange={(e) => setDocument(e.target.files[0])}
        />
        <button type="submit" disabled={loading} className="bg-green-600 py-2 rounded mt-2">
          {loading ? "Posting..." : "Add Announcement"}
        </button>
      </form>
    </div>
  );
};

export default PostAnnouncement;