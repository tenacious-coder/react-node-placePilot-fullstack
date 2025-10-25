import React from "react";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  // optional chaining + default empty array
  const jobs = allAppliedJobs || [];

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <caption className="caption-top">A list of your applied jobs</caption>
        <thead className="table-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Job Role</th>
            <th scope="col">Company</th>
            <th scope="col" className="text-end">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted py-3">
                You haven’t applied to any jobs yet.
              </td>
            </tr>
          ) : (
            jobs.map((appliedJob) => (
              <tr key={appliedJob._id}>
                <td>{appliedJob?.createdAt?.split("T")[0]}</td>
                <td>{appliedJob.job?.title || "N/A"}</td>
                <td>{appliedJob.job?.company?.name || "N/A"}</td>
                {/* <td className="text-end">
                  <span className="badge bg-success">{appliedJob.status}</span>
                </td> */}
                <td className="text-end">
                  <span
                    className={`badge ${
                      appliedJob?.status === "rejected"
                        ? "bg-danger"
                        : appliedJob?.status === "pending"
                        ? "bg-secondary"
                        : "bg-success"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
