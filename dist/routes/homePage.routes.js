import { Router } from "express";
import { createHomePage, deleteHomePage, getHomePage, updateHomePage } from "../controllers/homePage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getHomePage);
router.post("/", authenticate, authorizeAdmin, createHomePage);
router.patch("/", authenticate, authorizeAdmin, updateHomePage);
router.delete("/", authenticate, authorizeAdmin, deleteHomePage);
export default router;
