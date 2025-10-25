import { useState, useContext } from "react";
import { postOpportunity } from "../services/OpportunityService";
import { userDataContext } from "../Context/UserContext";
import { toast } from "react-toastify";

export default function PostOpportunity() {
  const { userData } = useContext(userDataContext);

  // Ensure only admin can access this page
  if (userData?.role !== "admin") {
    return <p className="p-6 text-red-500">❌ Access denied. Admins only.</p>;
  }

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [lastDate, setLastDate] = useState("");

  const handleAddOpportunity = async (e) => {
    e.preventDefault();

    try {
      const newOpp = { title, company, eligibility, lastDate };
      await postOpportunity(newOpp);
      toast.success("✅ Opportunity posted successfully!");

      setTitle("");
      setCompany("");
      setEligibility("");
      setLastDate("");
    } catch (err) {
      console.error("Error posting opportunity:", err);
      toast.error(err.response?.data?.message || "Failed to post opportunity");
    }
  };

  return (
    <div className="bg-gray-800  p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Post New Opportunity</h2>

      <form
        onSubmit={handleAddOpportunity}
        // className="mb-6 p-4 border rounded-lg space-y-3"
        className="flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          //className="w-full border px-3 py-2 rounded"
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          //className="w-full border px-3 py-2 rounded"
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Eligibility"
          value={eligibility}
          onChange={(e) => setEligibility(e.target.value)}
          //className="w-full border px-3 py-2 rounded"
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="date"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
          //className="w-full border px-3 py-2 rounded"
          className="p-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Post Opportunity
        </button>
      </form>
    </div>
  );
}