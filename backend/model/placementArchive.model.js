import mongoose from "mongoose";

const placementArchiveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  //createdAt: { type: Date, default: Date.now },
  created_by: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User',
           required: true
       },
       document: {
    type: String, // file URL if recruiter uploads pdf/image
  }
   }, { timestamps: true
});

export default mongoose.model("PlacementArchive", placementArchiveSchema);