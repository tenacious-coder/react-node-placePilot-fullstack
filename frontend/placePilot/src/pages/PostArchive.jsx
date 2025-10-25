import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const PostArchive = ({ onArchiveAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return toast.error("Title and description are required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (document) formData.append("document", document);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/archives/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      onArchiveAdded(res.data.archive);

      // Reset form
      setTitle("");
      setDescription("");
      setDocument(null);
    } catch (error) {
      console.error("Error creating archive:", error);
      toast.error(error.response?.data?.message || "Failed to create archive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="text-lg font-semibold mb-3">
        <h5 className="card-title mb-3">Add New Placement Archive</h5>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form control py-2 px-2 bg-white rounded text-black"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            className="form-control"
            onChange={(e) => setDocument(e.target.files[0])}
          />

          <button
            type="submit"
            className="btn btn-success mt-2"
            disabled={loading}
          >
            {loading ? "Posting..." : "Add Archive"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostArchive;