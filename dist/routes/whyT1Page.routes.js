import { Router } from "express";
import { createWhyT1Page, getWhyT1Page, updateWhyT1Page, deleteWhyT1Page, } from "../controllers/whyT1Page.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getWhyT1Page);
router.post("/", authenticate, authorizeAdmin, createWhyT1Page);
router.patch("/", authenticate, authorizeAdmin, updateWhyT1Page);
router.delete("/", authenticate, authorizeAdmin, deleteWhyT1Page);
export default router;
