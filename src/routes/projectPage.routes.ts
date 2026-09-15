import { Router } from "express";
import {
  createProjectPage,
  getProjectPage,
  updateProjectPage,
  deleteProjectPage,
} from "../controllers/projectPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getProjectPage);
router.post("/", authenticate, authorizeAdmin, createProjectPage);
router.patch("/", authenticate, authorizeAdmin, updateProjectPage);
router.delete("/", authenticate, authorizeAdmin, deleteProjectPage);

export default router;
