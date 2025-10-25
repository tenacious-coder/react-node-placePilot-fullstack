import React, { useState } from "react";
import { createOpportunity } from "../api/opportunities";

const AddOpportunityForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    criteria: "",
    deadline: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOpportunity(formData);
      alert("Opportunity posted successfully!");
      window.location.reload(); // refresh list
    } catch (err) {
      console.error("Error creating opportunity", err);
      alert("Failed to create opportunity");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Post New Opportunity</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />
      <input
        type="text"
        name="criteria"
        placeholder="Eligibility Criteria"
        value={formData.criteria}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Post Opportunity
      </button>
    </form>
  );
};

export default AddOpportunityForm;