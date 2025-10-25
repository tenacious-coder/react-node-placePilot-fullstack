import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { toast } from "sonner";
import Navbar
 from "./Navbar";
const JobDescription = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const isInitiallyApplied =
    singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some((application) => application.applicant === user?._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <p className="text-lg">Loading job details...</p>
      </div>
    );

  return (
  <div>
    <Navbar/>
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Section Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">{singleJob.title}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-indigo-600/30 text-indigo-200 rounded-full font-semibold">
                {singleJob.position} Positions
              </span>
              <span className="px-3 py-1 bg-red-600/30 text-red-200 rounded-full font-semibold">
                {singleJob.jobType}
              </span>
              <span className="px-3 py-1 bg-green-600/30 text-green-200 rounded-full font-semibold">
                {singleJob.salary} LPA
              </span>
            </div>
          </div>
          <button
            className={`mt-4 md:mt-0 px-5 py-2 rounded-full font-semibold transition-colors ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={isApplied}
            onClick={!isApplied ? applyJobHandler : null}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>

        {/* Job Description Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg flex flex-col items-center text-centre w-full">
          <h3 className=" text-xl font-semibold border-b border-white/20 pb-2 mb-4 ">
            Job Description
          </h3>
          <div className="space-y-3">
            <p><span className="font-semibold">Role:</span> {singleJob.title}</p>
            <p><span className="font-semibold">Location:</span> {singleJob.location}</p>
            <p><span className="font-semibold">Description:</span> {singleJob.description}</p>
            <p><span className="font-semibold">Experience:</span> {singleJob.experience} yrs</p>
            <p><span className="font-semibold">Salary:</span> {singleJob.salary} LPA</p>
            <p><span className="font-semibold">Total Applicants:</span> {singleJob.applications?.length}</p>
            <p><span className="font-semibold">Posted Date:</span> {singleJob.createdAt.split("T")[0]}</p>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
};

export default JobDescription;