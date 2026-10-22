import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, authorizeRoles("student"), applyJob);
router.route("/get").get(isAuthenticated, authorizeRoles("student"), getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, authorizeRoles("recruiter"), getApplicants);
router.route("/status/:id/update").post(isAuthenticated, authorizeRoles("recruiter"), updateStatus);
 

export default router;

