import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//1. POST JOB (Recruiter side)...admin doing it 

export const postJob = asyncHandler(async (req, res) => {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
        throw new ApiError(400, "Something is missing.");
    }

    // Hum requirements ko array mein convert kar rahe hain 
    const job = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary: Number(salary),
        location,
        jobType,
        experienceLevel: experience,
        position,
        company: companyId,
        created_by: userId
    });

    return res.status(201).json(
        new ApiResponse(201, job, "New job created successfully.")
    );
});


// 2. GET ADMIN JOBS ...all that jobs posted by that recuriter
export const getAdminJobs = asyncHandler(async (req, res) => {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId }).populate({
        path: 'company',
        createdAt: -1 // Newest jobs pehle dikhengi
    });

    if (!jobs) {
        throw new ApiError(404, "Jobs not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, jobs, "Jobs fetched successfully.")
    );
});

// 3. GET ALL JOBS (Student Side + Search/Filter)

export const getAllJobs = asyncHandler(async (req, res) => {
   
    const keyword = req.query.keyword || "";
    const query = {
        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ]
    };
    const jobs = await Job.find(query).populate({
        path: "company"
    }).sort({ createdAt: -1 });

    if (!jobs) {
        throw new ApiError(404, "Jobs not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, jobs, "Jobs fetched successfully.")
    );
});

export const getJobById = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    
    // Yahan hum 'applications' ko bhi populate karenge (Ye Part 4 mein kaam aayega)
    const job = await Job.findById(jobId).populate({
        path:"applications"
    });

    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, job, "Job fetched successfully.")
    );
});