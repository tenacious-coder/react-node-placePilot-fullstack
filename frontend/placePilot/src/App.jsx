import {useContext} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import React from 'react'
import {Route,Routes, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {Toaster} from 'sonner';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { userDataContext } from './Context/UserContext'
import Opportunities from "./pages/Opportunities"
//import PostOpportunity from './pages/PostOpportunity';
import Announcements from './pages/Announcements';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription'
import Training from './pages/Training'
import PostTraining from './pages/PostTraining'
import Archives from './pages/Archives'
import PostArchive from './pages/PostArchive' 
import Companies from './admin/Companies'
import CompanyCreate from './admin/CompanyCreate'
import CompanySetup from './admin/CompanySetup'
import AdminJobs from './admin/AdminJobs'
import PostJobs from "./admin/PostJob"
import Applicants from "./admin/Applicants"
import LearnMore from './components/LearnMore'
// const ProtectedRecruiterRoute = 
// ({children}) => {
//   const {user} = useSelector((store) =>
//     store.auth);
//   return user?.role === "recruiter"? children:<Navigate to= "/" replace/> 
// };

const appRouter = createBrowserRouter([
  {
   path:'/', element:<Home/>
  },
    {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/opportunities',
    element: <Opportunities/>
  },
  {
    path: '/announcements',
    element: <Announcements/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
   {
    path: '/features',
    element: <LearnMore/>
  },
   {
    path: '/description/:id',
    element: <JobDescription/>
  },
  {
    path: '/training',
    element: <Training/>
  },
  {
    path: '/admin/post-training',
    element: <PostTraining/>
  },
  {
    path: '/archives',
    element: <Archives/>
  },
  {
    path: '/admin/post-archive',
    element: <PostArchive/>
  },
  {
    path: '/admin/companies',
    element: <Companies/>
    },
    {
    path: '/admin/companies/create',
    element: <CompanyCreate/>
    },
     {
    path: '/admin/companies/:id',
    element: <CompanySetup/>
    },
     {
    path: '/admin/jobs',
    element: <AdminJobs/>
    },
    {
    path: '/admin/jobs/create',
    element: <PostJobs/>
    },
     {
    path: '/admin/jobs/:id/applicants',
    element: <Applicants/>
    },
])

// import axios from 'axios';
function App() {
  //  let {userData} = useContext(userDataContext)

  //  //wrapper for authentication routes
  //  const PrivateRoute = ({ children })=>{
  //   return userData? children: <Navigate to ="/login" />
  //  };

  //   //  Wrapper for admin-only routes
  // const AdminRoute = ({ children }) => {
  //   if (!userData) return <Navigate to="/login" />;
  //   if (userData.role !== "admin") return <Navigate to="/" />;
  //   return children;
  // };

  return (
    //    <BrowserRouter>
    //     <div className='flex flex-col min-h-screen'>
    //       <Navbar userDta={userData}/>
    //       <main className="flex-grow">
    //       <Routes>
    //     <Route path='/' element={<Home/>}/>
    //    <Route path='/login' element={<Login/>}/> 
    //   <Route path='/signup' element={<SignUp/>}/>
    //    <Route path='/opportunities' element={
    //     <PrivateRoute> 
    //       <Opportunities/> 
    //         </PrivateRoute>
    //       }/> 
    //   <Route path="admin/post-opportunity" element={
    //      <AdminRoute>
    //     <PostOpportunity/>
    //       </AdminRoute>
    //     } />
    //    </Routes>
    //    </main>
    //    <ToastContainer position="top-centre" autoClose={3000}/>
    //   </div>
    //  </BrowserRouter>
    <div>
       <RouterProvider router={appRouter} />
       <Toaster richColors position="top-centre"/>
    </div>
  )
}

export default App;
