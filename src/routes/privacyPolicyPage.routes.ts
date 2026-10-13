import { Router } from "express";
import {
  createPrivacyPolicyPage,
  getPrivacyPolicyPage,
  updatePrivacyPolicyPage,
  deletePrivacyPolicyPage,
} from "../controllers/privacyPolicyPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getPrivacyPolicyPage);
router.post("/", authenticate, authorizeAdmin, createPrivacyPolicyPage);
router.patch("/", authenticate, authorizeAdmin, updatePrivacyPolicyPage);
router.delete("/", authenticate, authorizeAdmin, deletePrivacyPolicyPage);

export default router;
