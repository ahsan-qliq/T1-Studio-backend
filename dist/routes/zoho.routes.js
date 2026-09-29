import { Router } from "express";
import { createLead, getLeads, getLeadById } from "../controllers/zoho.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
// Public: frontend contact/inquiry forms submit here
router.post("/leads", createLead);
// Admin-only: read leads from Zoho CRM
router.get("/leads", authenticate, authorizeAdmin, getLeads);
router.get("/leads/:id", authenticate, authorizeAdmin, getLeadById);
export default router;
