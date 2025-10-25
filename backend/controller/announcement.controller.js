import Announcement from "../model/announcement.model.js";
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

// Create Announcement
export const createAnnouncement = async (req, res) => {
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

    const announcement = await Announcement.create({
      title,
      description,
      document: fileUrl,
      created_by: userId,
    });

    res.status(201).json({ message: "Announcement created", announcement, success: true });
  } catch (error) {
    console.error("Create Announcement Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get all Announcements
export const getAnnouncement = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .populate("created_by", "name email");
    res.status(200).json({ announcements, success: true });
  } catch (error) {
    console.error("Get Announcements Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid announcement ID", success: false });
    }

    const announcement = await Announcement.findById(id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found", success: false });

    if (announcement.created_by.toString() !== userId) {
      return res.status(403).json({ message: "Access denied. Only creator can delete", success: false });
    }

    await announcement.deleteOne();
    res.status(200).json({ message: "Announcement deleted successfully", success: true });
  } catch (error) {
    console.error("Delete Announcement Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};