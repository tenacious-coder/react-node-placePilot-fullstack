import Opportunity from "../model/opportunity.model.js";

// Admin: Create new opportunity
export const createOpportunity = async (req, res) => {
  try {
    if(req.role!=="admin"){
      return res.status(403).json({message:"Access denied. Admins only"});
    }
    const newOpportunity = new Opportunity({ ...req.body, postedBy: req.userId });
    await newOpportunity.save();
    res.status(201).json({ message: "Opportunity posted successfully", newOpportunity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Student: Get all opportunities
export const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.status(200).json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};