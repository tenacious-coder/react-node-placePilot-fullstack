import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, []);

    return (
        <div className="bg-light min-vh-100">
            {/* Navbar */}
            <Navbar />

            {/* Page Container */}
            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold text-primary">
                        Applicants{" "}
                        <span className="badge bg-secondary">
                            {applicants?.applications?.length || 0}
                        </span>
                    </h2>
                </div>

                {/* Applicants Table */}
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <ApplicantsTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Applicants;