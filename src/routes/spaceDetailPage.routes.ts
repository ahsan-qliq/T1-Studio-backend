import { Router } from "express";
import {
  createSpaceDetailPage,
  getSpaceDetailPage,
  updateSpaceDetailPage,
  deleteSpaceDetailPage,
} from "../controllers/spaceDetailPage.controller.ts";

const router = Router();

router.post("/", createSpaceDetailPage);
router.get("/", getSpaceDetailPage);
router.patch("/", updateSpaceDetailPage);
router.delete("/", deleteSpaceDetailPage);

export default router;
