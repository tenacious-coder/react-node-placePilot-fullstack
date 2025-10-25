import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    document: {
        type: String, // URL to uploaded instruction/training PDF or file
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Training = mongoose.model("Training", trainingSchema);























