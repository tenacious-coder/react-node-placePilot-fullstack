import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container mt-4">
            <h5 className="mb-3 text-center fw-semibold">Applicants List</h5>
            <table className="table table-hover table-bordered align-middle">
                <caption className="text-center">A list of your recent applied users</caption>
                <thead className="table-light">
                    <tr>
                        <th> Name</th>
                        <th>Email</th>
                        <th>Resume</th>
                        <th>Date</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants && applicants?.applications?.length > 0 ? (
                        applicants.applications.map((item) => (
                            <tr key={item._id}>
                                <td>{item?.applicant?.name}</td>
                                <td>{item?.applicant?.email}</td>
                                <td>
                                    {item.applicant?.profile?.resume ? (
                                        <a
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary text-decoration-none"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </td>
                                <td>{item?.applicant?.createdAt?.split("T")[0]}</td>
                                <td className="text-end">
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Action
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            {shortlistingStatus.map((status, index) => (
                                                <li key={index}>
                                                    <button
                                                        className={`dropdown-item ${
                                                            status === "Accepted" ? "text-success" : "text-danger"
                                                        }`}
                                                        onClick={() => statusHandler(status, item?._id)}
                                                    >
                                                        {status}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                No applicants found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsTable;