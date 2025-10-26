import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    file: null,
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/signUp`, formData, {
       // headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "SignUp failed");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(240,239,225)" }}>
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Welcome to placePilot
          </h1>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">UserName</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter your name"
              required
              className="w-full h-12 border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              required
              className="w-full h-12 border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              required
              className="w-full h-12 border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Select Role:</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  required
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  required
                />
                Recruiter
              </label>
            </div>
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full h-12 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            SignUp
          </button>

          {/* Login link */}
          <p className="text-center text-base">
            Already have an account?{" "}
            <span
              className="text-red-500 font-medium cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;