import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = (allAdminJobs || []).filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name?.toLowerCase()?.includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="table-responsive bg-gray-800 ">
            <table className="table table-hover align-middle bg-slate-900">
                <caption className='text-white'>A list of your recently posted jobs</caption>
                <thead className="table-light">
                    <tr>
                        <th>Company Name</th>
                        <th>Role</th>
                        <th>Date</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterJobs?.map((job, index) => (
                        <tr key={index}>
                            <td>{job?.company?.name}</td>
                            <td>{job?.title}</td>
                            <td>{job?.createdAt.split("T")[0]}</td>
                            <td className="text-end">
                                <Dropdown align="end">
                                    <Dropdown.Toggle as="span" className="btn p-0 border-0 bg-transparent cursor-pointer">
                                        <MoreHorizontal />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => navigate(`/admin/companies/${job.company_id}`)}>
                                            <Edit2 className="me-2" size={14} /> Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                                            <Eye className="me-2" size={14} /> Applicants
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminJobsTable; 