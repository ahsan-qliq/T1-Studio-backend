import { Router } from "express";
import { createLandingPage, getLandingPage, updateLandingPage, deleteLandingPage, } from "../controllers/landingPage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getLandingPage);
router.post("/", authenticate, authorizeAdmin, createLandingPage);
router.patch("/", authenticate, authorizeAdmin, updateLandingPage);
router.delete("/", authenticate, authorizeAdmin, deleteLandingPage);
export default router;
