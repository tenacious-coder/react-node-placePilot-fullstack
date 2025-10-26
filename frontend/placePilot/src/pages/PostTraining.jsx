import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostTraining = ({onTrainingAdded}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
   const [loading, setLoading] = useState(false);  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return toast.error("Title & description required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (document) formData.append("document", document);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://react-node-placepilot-fullstack.onrender.com/api/training/create",
         formData, {
         withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
    });
      toast.success(res.data.message);
      onTrainingAdded(res.data.training);

      setTitle("");
      setDescription("");
      setDocument(null);
      navigate("/training");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error creating training");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="text-lg font-semibold mb-3">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Post Training Instruction
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 py-2 px-2 bg-white rounded text-black outline-none border-none box-shadow-none"
          />

          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="p-2 rounded bg-white text-black border-none outline-none"
          />

          <input
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
            className="w-full p-2 rounded-lg bg-transparent text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
          />

         <button
            type="submit"
            className="btn btn-success mt-2"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Training"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTraining;