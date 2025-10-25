//import genToken from "../config/token.js"
import jwt from "jsonwebtoken";
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";


export const signUp=async (req,res) => {
    try {
        console.log("signup body:",req.body);
        let {name,email,password,role} = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
       const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User is already exist"})
            //success:false,
        }
        const hashPassword = await bcrypt.hash(password,10)
       await User.create({
            name,
            email,
            password: hashPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
        
        
export const login = async (req,res) => {
    try {
        let {email,password,role} = req.body;

         if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User is not exist"})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect Password"})
        }
         // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logOut = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { name, email, bio, skills } = req.body;
         const file = req.file;
         const fileUri = getDataUri(file);
         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

       
          let skillsArray;
          if(skills){
             skillsArray = skills.split(",");
          }
       
         const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(name) user.name = name
        if(email) user.email = email
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

          // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

          await user.save();
          user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}