import { Router } from "express";
import { createInspirationPage, getInspirationPage, updateInspirationPage, deleteInspirationPage, } from "../controllers/inspirationPage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getInspirationPage);
router.post("/", authenticate, authorizeAdmin, createInspirationPage);
router.patch("/", authenticate, authorizeAdmin, updateInspirationPage);
router.delete("/", authenticate, authorizeAdmin, deleteInspirationPage);
export default router;
