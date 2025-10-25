import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

export default function Navbar() {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-4 shadow-md bg-white">
      {/* Left Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img 
          src="/logo project2.png"   
          alt="placePilot logo" 
          className="h-10 w-10"
        />
        <span className="text-2xl font-bold text-blue-600">placePilot</span>
      </Link>

      {/* Mobile Hamburger */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Right Menu */}
      <ul className="flex gap-6 text-gray-700">
        <li>
          <Link to="/">
            <button className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition">
              Home
            </button>
          </Link>
        </li>
        {user?.role === "recruiter" &&( 
          <>
           <li>
             <Link to="/admin/companies">
                <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition">
                  Company
                </button>
              </Link>
            </li>
             <li>
             <Link to="/admin/jobs">
                <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition">
                  Jobs
                </button>
              </Link>
            </li>
            </>
           )}
        {!user ? (
          <>
            <li>
              <Link to="/login">
                <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                  Sign Up
                </button>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={logoutHandler}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}