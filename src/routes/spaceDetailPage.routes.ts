import { Router } from "express";
import {
  createSpaceDetailPage,
  getSpaceDetailPage,
  updateSpaceDetailPage,
  deleteSpaceDetailPage,
} from "../controllers/spaceDetailPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getSpaceDetailPage);
router.post("/", authenticate, authorizeAdmin, createSpaceDetailPage);
router.patch("/", authenticate, authorizeAdmin, updateSpaceDetailPage);
router.delete("/", authenticate, authorizeAdmin, deleteSpaceDetailPage);

export default router;
