import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'
import {toast} from 'sonner'

const CompanyCreate = ()=> {
   const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
   const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
    <Navbar/>
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
  <div className="mb-4">
    <h1 className="fw-bold fs-3">Your Company Name</h1>
    <p className="text-white">
      What would you like to give your company name? You can change this later.
    </p>
  </div>

  <label className="form-label">Company Name</label>
  <input
    type="text"
    className="form-control mb-3"
    placeholder="JobHunt, Microsoft etc."
    onChange={(e) => setCompanyName(e.target.value)}
  />

  <div className="d-flex align-items-center gap-2 mt-4">
    <button className="btn btn-outline-secondary text-white" onClick={() => navigate("/admin/companies")}>
      Cancel
    </button>
     <button className="btn btn-primary" onClick={registerNewCompany}> 
      Continue
    </button>
  </div>
</div>
    </div>
  )
}

export default CompanyCreate