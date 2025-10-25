  import "../card.css"
  import { useNavigate } from "react-router-dom"

  //import { useDispatch } from 'react-redux'
  const OpportunityCard = ({job}) => {
  const navigate = useNavigate()
  //const jobId = 'igfyufih'
    
   const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

  return (
    <div className="card shadow-lg mb-4 company-card">
  <div className="card-body">
    {/* Top Row */}
    <div className="d-flex justify-content-between text-muted mb-2">
      <small>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</small>
      <span className="badge bg-info text-dark">Active</span>
    </div>

    {/* Company Info */}
    <div className="mb-3">
      <h5 className="card-title mb-1">{job?.company?.name}</h5>
      <p className="text-secondary small">India</p>
    </div>

    {/* Job Info */}
    <div className="mb-3">
      <h4 className="fw-bold">{job?.title}</h4>
      <p className="text-muted">{job?.description}</p>
    </div>

    {/* Tags Section */}
    <div className="d-flex flex-wrap gap-2 mb-3">
      <button type="button" className="btn btn-outline-primary btn-sm">
       {job?.position} Positions <span className="badge bg-secondary">4</span>
      </button>
      <button type="button" className="btn btn-outline-primary btn-sm">
        {job?.jobType} <span className="badge bg-secondary">Full-time</span>
      </button>
      <button type="button" className="btn btn-outline-primary btn-sm">
        LPA <span className="badge bg-secondary">{job?.salary}</span>
      </button>
      <button type="button" className="btn btn-outline-primary btn-sm">
        Exp <span className="badge bg-secondary">{job?.experienceLevel}</span>
      </button>
    </div>

    {/* Action Buttons */}
    <div className="d-flex gap-2">
      <button type="button" className="btn btn-primary" onClick={()=> navigate(`/description/${job?._id}`)}>Details</button>
      <button type="button" className="btn btn-outline-secondary">Save for later</button>
    </div>
  </div>
</div>
  )
}
export default OpportunityCard