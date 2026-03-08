import { Router } from "express";
import { postJob, getAllJobs, getJobById, getAdminJobs, updateJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

// 1. Job Post karna (Only for Recruiters)
router.route("/post").post(isAuthenticated, postJob);

// 2. Saari Jobs dekhna 
router.route("/get").get(getAllJobs);

// 3. Recruiter ki apni jobs (Admin dashboard)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// 4. Specific Job detail (ID ke saath)
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/update/:id").put(isAuthenticated, updateJob);

export default router;