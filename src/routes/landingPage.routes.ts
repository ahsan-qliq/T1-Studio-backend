import { Router } from "express";
import {
  createLandingPage,
  getLandingPage,
  updateLandingPage,
  deleteLandingPage,
} from "../controllers/landingPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getLandingPage);
router.post("/", authenticate, authorizeAdmin, createLandingPage);
router.patch("/", authenticate, authorizeAdmin, updateLandingPage);
router.delete("/", authenticate, authorizeAdmin, deleteLandingPage);

export default router;
