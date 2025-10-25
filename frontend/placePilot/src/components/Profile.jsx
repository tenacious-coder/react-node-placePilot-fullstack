import { useState } from "react";
import { Pen, Mail, Phone } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import Navbar from "./Navbar";
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
//const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true; // replace with your state

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);

  return (
     <div className="min-h-screen bg-gray-900 text-white">
     <Navbar/>
    <div className="container my-5">
      {/* Profile Card */}
      <div className="card shadow-sm border rounded-3 mb-4 px-3 py-2 ">
        <div className="card-body">
          {/* Top Section */}
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-center gap-3">
              <img
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
                className="rounded-circle"
                style={{ width: "90px", height: "90px", objectFit: "cover" }}
              />
              <div>
                <h1 className="mb-1">{user?.name}</h1>
                <p className="mb-0 text-muted">{user?.profile?.bio}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="btn btn-outline-primary"
            >
              <Pen size={18} />
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>
            {/* <div className="d-flex align-items-center gap-2">
              <Phone size={18} />
              <span>64658896</span>
            </div> */}
          </div>

          {/* Skills */}
          <div className="mt-4">
            <h6 className="fw-bold">Skills</h6>
            <div className="d-flex flex-wrap gap-2">
              {user?.profile?.skills.length > 0 ? (
                 user?.profile?.skills.map((item, index) => (
                  <span key={index} className="badge bg-primary">
                    {item}
                  </span>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-4">
            <label className="fw-bold">Resume</label>
            <div>
              {
               isResume ? (
                <a
                  href= {user?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary"
                  style={{ cursor:"pointer" }}
                >
                 {user?.profile?.resumeOriginalName || "View Resume"}
                </a>
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
       {user?.role != "recruiter" &&( 
      <div className="card shadow-sm border rounded-3">
        <div className="card-body">
          <h1 className="fw-bold mb-3">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>
       )}
    </div>
     <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
}
export default Profile