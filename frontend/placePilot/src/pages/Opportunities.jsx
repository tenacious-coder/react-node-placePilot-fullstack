import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterCard from "../components/OpportunityFilters";
import OpportunityCard from "../components/OpportunityCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Opportunities = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side - Filter */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <FilterCard />
            </div>

            {/* Right Side - Cards */}
            <div className="flex-1 overflow-y-auto">
              {filterJobs.length <= 0 ? (
                <div className="text-center text-gray-300 text-lg mt-20">
                  Job not found
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {filterJobs.map((job) => (
                    <OpportunityCard key={job._id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;