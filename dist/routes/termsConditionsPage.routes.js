import { Router } from "express";
import { createTermsConditionsPage, getTermsConditionsPage, updateTermsConditionsPage, deleteTermsConditionsPage, } from "../controllers/termsConditionsPage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getTermsConditionsPage);
router.post("/", authenticate, authorizeAdmin, createTermsConditionsPage);
router.patch("/", authenticate, authorizeAdmin, updateTermsConditionsPage);
router.delete("/", authenticate, authorizeAdmin, deleteTermsConditionsPage);
export default router;
