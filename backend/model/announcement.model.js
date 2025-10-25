
import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    document: { type: String }, // Optional file URL
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);