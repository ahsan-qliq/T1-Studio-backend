import { Router } from "express";
import {
  createContactSubmission,
  listContactSubmissions,
} from "../controllers/contactSubmission.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

// Public: website contact form submissions
router.post("/", createContactSubmission);

// Admin: list all contact submissions
router.get("/", authenticate, authorizeAdmin, listContactSubmissions);

export default router;
