import { Router } from "express";
import { createProjectDetailPage, getProjectDetailPage, updateProjectDetailPage, deleteProjectDetailPage, } from "../controllers/projectDetailPage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getProjectDetailPage);
router.post("/", authenticate, authorizeAdmin, createProjectDetailPage);
router.patch("/", authenticate, authorizeAdmin, updateProjectDetailPage);
router.delete("/", authenticate, authorizeAdmin, deleteProjectDetailPage);
export default router;
