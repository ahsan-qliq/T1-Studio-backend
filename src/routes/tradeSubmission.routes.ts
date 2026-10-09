import { Router } from "express";
import {
  createTradeSubmission,
  listTradeSubmissions,
  getTradeSubmission,
  updateTradeSubmissionStatus,
  retryAcceptanceEmail,
} from "../controllers/tradeSubmission.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

// Public: website trade/referral partner form submissions
router.post("/", createTradeSubmission);

// Admin: list, view, approve/reject, retry email
router.get("/",              authenticate, authorizeAdmin, listTradeSubmissions);
router.get("/:id",           authenticate, authorizeAdmin, getTradeSubmission);
router.patch("/:id/status",  authenticate, authorizeAdmin, updateTradeSubmissionStatus);
router.post("/:id/retry-email", authenticate, authorizeAdmin, retryAcceptanceEmail);

export default router;
