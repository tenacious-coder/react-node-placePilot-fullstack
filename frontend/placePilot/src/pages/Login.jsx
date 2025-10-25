import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Welcome to placePilot");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
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
          <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to placePilot</h1>

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

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            {loading ? "Processing..." : "Login"}
          </button>

          {/* Signup link */}
          <p className="text-center text-base">
            Create new account?{" "}
            <span
              className="text-red-500 font-medium cursor-pointer"
              onClick={() => navigate("/SignUP")}
            >
              SignUp
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;