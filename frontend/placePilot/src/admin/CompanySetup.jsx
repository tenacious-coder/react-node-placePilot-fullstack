import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
         name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className="container my-5" style={{ maxWidth: '600px' }}>
                <form onSubmit={submitHandler} className="border p-4 rounded shadow-sm bg-gray-800 text-white">
                    <div className="d-flex align-items-center mb-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary me-3 text-white"
                            onClick={() => navigate("/admin/companies")}
                        >
                            ← Back
                        </button>
                        <h4 className="mb-0">Company Setup</h4>
                    </div>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Company Name</label>
                            <input type="text" className="form-control" name="name" value={input.name} onChange={changeEventHandler} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" name="description" value={input.description} onChange={changeEventHandler} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Website</label>
                            <input type="text" className="form-control" name="website" value={input.website} onChange={changeEventHandler} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Location</label>
                            <input type="text" className="form-control" name="location" value={input.location} onChange={changeEventHandler} />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Logo</label>
                            <input type="file" className="form-control" accept="image/*" onChange={changeFileHandler} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
                        {loading ? 'Please wait...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CompanySetup;