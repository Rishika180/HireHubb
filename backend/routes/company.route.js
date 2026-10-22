import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,authorizeRoles("recruiter"),registerCompany);
router.route("/get").get(isAuthenticated,authorizeRoles("recruiter"),getCompany);
router.route("/get/:id").get(isAuthenticated,authorizeRoles("recruiter"),getCompanyById);
router.route("/update/:id").put(isAuthenticated,authorizeRoles("recruiter"),singleUpload, updateCompany);

export default router;

