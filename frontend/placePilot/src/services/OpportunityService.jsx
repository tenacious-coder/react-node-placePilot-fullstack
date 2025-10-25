import axios from "axios";

const API_URL = "http://localhost:8000/api/job/get";

// Get all opportunities
export const getOpportunities = async () => {
  const token= localStorage.getItem("token");
  const res = await axios.get(API_URL, {withCredentials: true});
  headers:{
    Authorization:`Bearer ${token}`
  }
  return res.data.jobs;
};

// Post new opportunity (Admin only)
export const postOpportunity = async (formData) => {
  const res = await axios.post(API_URL, formData, { withCredentials: true });
  return res.data;
};