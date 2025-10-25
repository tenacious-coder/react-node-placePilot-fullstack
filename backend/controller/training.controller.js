import { Training } from "../model/training.model.js";
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";

// Recruiter/Admin: create new training instruction
export const createTraining = async (req, res) => {
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

        const training = await Training.create({
            title,
            description,
            document: fileUrl,
            created_by: userId
        });

        res.status(201).json({ message: "Training instruction created", training, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Students: get all training instructions
export const getAllTraining = async (req, res) => {
    try {
        const trainings = await Training.find().sort({ createdAt: -1 }).populate('created_by', 'name email');
        res.status(200).json({ trainings, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Get single training instruction by ID
export const getTrainingById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id).populate('created_by', 'name email');
        if (!training) return res.status(404).json({ message: "Not found", success: false });
        res.status(200).json({ training, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};