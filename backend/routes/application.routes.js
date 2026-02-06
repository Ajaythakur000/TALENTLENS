import { Router } from "express";
import { applyJob, getApplicants, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();


router.route("/apply/:id").get(isAuthenticated, applyJob);


router.route("/:id/applicants").get(isAuthenticated, getApplicants);


router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;