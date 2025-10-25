import User from "../model/user.model.js";

export const isRecruiter = async (req, res, next) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || user.role !== "recruiter") {
            return res.status(403).json({ message: "Access denied. Recruiters only", success: false });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};