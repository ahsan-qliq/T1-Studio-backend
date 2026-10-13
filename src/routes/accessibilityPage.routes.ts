import { Router } from "express";
import {
  createAccessibilityPage,
  getAccessibilityPage,
  updateAccessibilityPage,
  deleteAccessibilityPage,
} from "../controllers/accessibilityPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getAccessibilityPage);
router.post("/", authenticate, authorizeAdmin, createAccessibilityPage);
router.patch("/", authenticate, authorizeAdmin, updateAccessibilityPage);
router.delete("/", authenticate, authorizeAdmin, deleteAccessibilityPage);

export default router;
