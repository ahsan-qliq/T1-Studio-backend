import { Router } from "express";
import {
  createProjectPage,
  getProjectPage,
  updateProjectPage,
  deleteProjectPage,
} from "../controllers/projectPage.controller.ts";

const router = Router();

router.post("/", createProjectPage);
router.get("/", getProjectPage);
router.patch("/", updateProjectPage);
router.delete("/", deleteProjectPage);

export default router;
