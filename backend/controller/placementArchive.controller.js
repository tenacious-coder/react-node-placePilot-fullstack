import PlacementArchive from "../model/placementArchive.model.js";
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

// Create archive (Recruiter/Admin)
export const createArchive = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    const userId = req.id;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required", success: false });
    }

    let fileUrl = "";
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      fileUrl = cloudResponse.secure_url;
    }

    const archive = await PlacementArchive.create({
      title,
      description,
      document: fileUrl,
      created_by: userId,
    });

    res.status(201).json({ message: "Archive created", archive, success: true });
  } catch (error) {
    console.error("Create Archive Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get all archives
export const getArchive = async (req, res) => {
  try {
    const archives = await PlacementArchive.find().sort({ createdAt: -1 }).populate("created_by", "name email");
    res.status(200).json({ archives, success: true });
  } catch (error) {
    console.error("Get Archives Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Delete archive (Recruiter only, only their own)
export const deleteArchive = async (req, res) => {
  try {
    const archiveId = req.params.id;
    const userId = req.id;
    
    if(!mongoose.Types.ObjectId.isValid(archiveId)){
      return res.status(400).json({message:"invalid archive id", success:false});
    }
    const archive = await PlacementArchive.findById(archiveId);
    if (!archive) return res.status(404).json({ message: "Archive not found", success: false });

    if (archive.created_by.toString() !== userId) {
      return res.status(403).json({ message: "Access denied. Only creator can delete", success: false });
    }

    await archive.deleteOne();
    res.status(200).json({ message: "Archive deleted successfully", success: true });
  } catch (error) {
    console.error("Delete Archive Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};