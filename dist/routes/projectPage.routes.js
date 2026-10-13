import { Router } from "express";
import { createProjectPage, getProjectPage, updateProjectPage, deleteProjectPage, getStatsSection, addStatsSection, updateStatsSection, deleteStatsSection, getLogosSection, addLogosSection, updateLogosSection, deleteLogosSection, } from "../controllers/projectPage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
// Page-level
router.get("/", getProjectPage);
router.post("/", authenticate, authorizeAdmin, createProjectPage);
router.patch("/", authenticate, authorizeAdmin, updateProjectPage);
router.delete("/", authenticate, authorizeAdmin, deleteProjectPage);
// Stats sections (by category)
router.get("/sections/stats", getStatsSection);
router.post("/sections/stats", authenticate, authorizeAdmin, addStatsSection);
router.patch("/sections/stats", authenticate, authorizeAdmin, updateStatsSection);
router.delete("/sections/stats", authenticate, authorizeAdmin, deleteStatsSection);
// Logos sections (by category)
router.get("/sections/logos", getLogosSection);
router.post("/sections/logos", authenticate, authorizeAdmin, addLogosSection);
router.patch("/sections/logos", authenticate, authorizeAdmin, updateLogosSection);
router.delete("/sections/logos", authenticate, authorizeAdmin, deleteLogosSection);
export default router;
