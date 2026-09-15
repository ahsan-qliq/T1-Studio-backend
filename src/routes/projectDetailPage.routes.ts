import { Router } from "express";
import {
  createProjectDetailPage,
  getProjectDetailPage,
  updateProjectDetailPage,
  deleteProjectDetailPage,
} from "../controllers/projectDetailPage.controller.ts";

const router = Router();

router.post("/", createProjectDetailPage);
router.get("/", getProjectDetailPage);
router.patch("/", updateProjectDetailPage);
router.delete("/", deleteProjectDetailPage);

export default router;
