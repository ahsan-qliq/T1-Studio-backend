import { Router } from "express";
import {
  createAboutPage,
  getAboutPage,
  updateAboutPage,
  deleteAboutPage,
} from "../controllers/aboutPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getAboutPage);
router.post("/", authenticate, authorizeAdmin, createAboutPage);
router.patch("/", authenticate, authorizeAdmin, updateAboutPage);
router.delete("/", authenticate, authorizeAdmin, deleteAboutPage);

export default router;
