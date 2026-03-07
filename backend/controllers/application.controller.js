import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const applyJob = asyncHandler(async (req, res) => {
    const userId = req.id; 
    const jobId = req.params.id; 
    if (!jobId) {
        throw new ApiError(400, "Job Id is required.");
    }
    const existingApplication = await Application.findOne({ 
        job: jobId, 
        applicant: userId 
    });

    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this job.");
    }

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json(
        new ApiResponse(201, {}, "Job applied successfully.")
    );
});

export const getApplicants = asyncHandler(async (req, res) => {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
        path: 'applications', 
        options: { sort: { createdAt: -1 } },
        populate: {
            path: 'applicant',
            select: '-password'
        }
    });

    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, job, "Applicants fetched successfully.")
    );
});

export const updateStatus = asyncHandler(async (req, res) => {
    // 1. Frontend se kya aaya? (e.g., status: "accepted")
    const { status } = req.body;
    
    // 2. Kis application ko update karna hai? (URL se ID lo)
    const applicationId = req.params.id;

    // Validation: Status bhejna zaroori hai
    if (!status) {
        throw new ApiError(400, "Status is required.");
    }

    // 3. Application dhoondho
    const application = await Application.findOne({ _id: applicationId });
    
    if (!application) {
        throw new ApiError(404, "Application not found.");
    }

    // 4. Update and Save 🧠
    // .toLowerCase() kyun? Taaki "Accepted" aur "accepted" database mein ek hi lagein.
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Status updated successfully.")
    );
});

export const getAppliedJobs = asyncHandler(async (req, res) => {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
        .sort({ createdAt: -1 })
        .populate({
            path: 'job',
            populate: {
                path: 'company'
            }
        });

    if (!application) {
        throw new ApiError(404, "No Applications");
    }

    return res.status(200).json(
        new ApiResponse(200, application, "Applied jobs fetched successfully.")
    );
});