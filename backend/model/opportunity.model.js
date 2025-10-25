import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String },
  lastDate: { type: Date, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin
}, { timestamps: true });

export default mongoose.model("Opportunity", opportunitySchema);