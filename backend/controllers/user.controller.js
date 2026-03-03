import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


const register = asyncHandler(async (req, res) => {

    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
        throw new ApiError(400, "Something is missing");
    }
    
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(400, "User already exists with this email.");
    }

    
    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: {
            profilePhoto: cloudResponse.secure_url,//cloudinary se lii hai .bro..
        }
    });

    return res.status(201).json(
        new ApiResponse(201, null, "Account created successfully.")
    );
});



const login = asyncHandler(async (req, res) => {
   
    const { email, password, role } = req.body;

   
    if (!email || !password || !role) {
        throw new ApiError(400, "Something is missing");
    }

    let user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Incorrect email or password.");
    }

    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(400, "Incorrect email or password.");
    }

    if (role !== user.role) {
        throw new ApiError(400, "Account doesn't exist with current role.");
    }

    const tokenData = {
        userId: user._id
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    
    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200)
        .cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 Day
            httpOnly: true, // JavaScript access nahi kar sakta (XSS Protection)
            sameSite: 'strict' // CSRF Protection
        })
        .json(
            new ApiResponse(200, { user, token }, `Welcome back ${user.fullname}`)
        );
});


const logout = asyncHandler(async (req, res) => {

    return res.status(200)
        .cookie("token", "", { maxAge: 0 }) 
        .json(
            new ApiResponse(200, null, "Logged out successfully.")
        );
});

const updateProfile = asyncHandler(async (req, res) => {
    
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    
   //File handling (Resume/Photo) hum baad mein Multer se karenge.
   //cloudinary
   const file = req.file;
   const fileUri = getDataUri(file);
   const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    
    const userId = req.id; 

    let user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "User not found");
    }
    if(fullname) user.fullname = fullname;
    if(email) user.email = email;
    if(phoneNumber) user.phoneNumber = phoneNumber;
    if(bio) user.profile.bio = bio;
    if(skills) user.profile.skills = skillsArray;

    if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url// save the cloudinary url
        user.profile.resumeOriginalName = file.originalname
    }

    await user.save();


    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).json(
        new ApiResponse(200, user, "Profile updated successfully.")
    );
});

export { register, login, logout, updateProfile };

