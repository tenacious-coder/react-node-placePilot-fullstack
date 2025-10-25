import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen text-gray-100 bg-slate-900 ">
      <Navbar />

      <div className="container my-5 bg-slate-900 text-gray-100 ">

        {/* Search and Create Button */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <input
            type="text"
            className="form-control w-auto "
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </button>
        </div>

        {/* Jobs Table */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;