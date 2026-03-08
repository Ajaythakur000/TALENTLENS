import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//1. POST JOB (Recruiter side)...admin doing it 

export const postJob = asyncHandler(async (req, res) => {

    console.log("BODY:", req.body)
console.log("USER:", req.id)
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
        salary: Number(salary.replace(/[^0-9]/g, "")),
        location,
        jobType,
        experienceLevel: Number(experience),
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

    const jobs = await Job.find({ created_by: adminId })
    .populate("company")
    .sort({ createdAt: -1 });

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
    
    // Yahan hum 'applications' ko bhi populate karenge 
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

// 5. UPDATE JOB
export const updateJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const { title, description, requirements, salary, location, jobType, experienceLevel, position } = req.body;

    // Jo data update karna hai usko prepare kar rahe hain
    const updateData = { title, description, location, jobType, position };

    if (requirements) {
        // Agar frontend se array aa raha hai toh thik, warna string ko array mein badlo
        updateData.requirements = Array.isArray(requirements) ? requirements : requirements.split(",");
    }
    if (salary) {
        updateData.salary = typeof salary === 'string' ? Number(salary.replace(/[^0-9]/g, "")) : salary;
    }
    if (experienceLevel) {
        updateData.experienceLevel = Number(experienceLevel);
    }

    const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    // Success response but without extra nesting
    return res.status(200).json({
        success: true,
        message: "Job updated successfully.",
        job
    });
});