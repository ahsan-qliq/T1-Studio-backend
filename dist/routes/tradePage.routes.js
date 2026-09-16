import { Router } from "express";
import { createTradePage, getTradePage, updateTradePage, deleteTradePage, } from "../controllers/tradePage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getTradePage);
router.post("/", authenticate, authorizeAdmin, createTradePage);
router.patch("/", authenticate, authorizeAdmin, updateTradePage);
router.delete("/", authenticate, authorizeAdmin, deleteTradePage);
export default router;
