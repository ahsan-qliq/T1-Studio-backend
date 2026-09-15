import { Router } from "express";
import {
  createInspirationPage,
  getInspirationPage,
  updateInspirationPage,
  deleteInspirationPage,
} from "../controllers/inspirationPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getInspirationPage);
router.post("/", authenticate, authorizeAdmin, createInspirationPage);
router.patch("/", authenticate, authorizeAdmin, updateInspirationPage);
router.delete("/", authenticate, authorizeAdmin, deleteInspirationPage);

export default router;
