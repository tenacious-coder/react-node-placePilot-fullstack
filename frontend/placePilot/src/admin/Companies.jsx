import React, { useState, useEffect } from "react";
import CompaniesTable from "./CompaniesTable";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Top Filter & New Company Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border"
          />
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
          >
            New Company
          </button>
        </div>

        {/* Companies Table */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;