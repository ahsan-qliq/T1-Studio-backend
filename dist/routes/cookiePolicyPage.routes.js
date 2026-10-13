import { Router } from "express";
import { createCookiePolicyPage, getCookiePolicyPage, updateCookiePolicyPage, deleteCookiePolicyPage, } from "../controllers/cookiePolicyPage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getCookiePolicyPage);
router.post("/", authenticate, authorizeAdmin, createCookiePolicyPage);
router.patch("/", authenticate, authorizeAdmin, updateCookiePolicyPage);
router.delete("/", authenticate, authorizeAdmin, deleteCookiePolicyPage);
export default router;
