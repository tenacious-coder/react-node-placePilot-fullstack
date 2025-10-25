import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find((company) => company._id === e.target.value);
        setInput({ ...input, companyId: selectedCompany?._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div min-h-screen bg-slate-900 text-gray-100>
            <Navbar />
            <div className="d-flex justify-content-center w-100 my-5 bg-slate-900 text-white">
                <form onSubmit={submitHandler} className="p-4 border rounded shadow-sm w-75">
                    <div className="row g-3">
                        {[
                            { label: "Title", name: "title", type: "text" },
                            { label: "Description", name: "description", type: "text" },
                            { label: "Requirements", name: "requirements", type: "text" },
                            { label: "Salary", name: "salary", type: "text" },
                            { label: "Location", name: "location", type: "text" },
                            { label: "Job Type", name: "jobType", type: "text" },
                            { label: "Experience Level", name: "experience", type: "text" },
                            { label: "No of Position", name: "position", type: "number" },
                        ].map((field, idx) => (
                            <div className="col-md-6" key={idx}>
                                <label className="form-label">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={input[field.name]}
                                    onChange={changeEventHandler}
                                    className="form-control text-black"
                                />
                            </div>
                        ))}

                        {companies.length > 0 && (
                            <div className="col-md-6">
                                <label className="form-label">Select Company</label>
                                <select className="form-select" onChange={selectChangeHandler}>
                                    <option value="">Select a Company</option>
                                    {companies.map(company => (
                                        <option key={company._id} value={company._id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <button className="btn btn-primary w-100 mt-4" disabled>
                            <Loader2 className="me-2 animate-spin" /> Please wait...
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary w-100 mt-4">Post New Job</button>
                    )}

                    {companies.length === 0 && (
                        <p className="text-danger text-center mt-3">
                            *Please register a company first, before posting jobs
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;