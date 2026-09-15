import { Router } from "express";
import {
  createSpacesPage,
  getSpacesPage,
  updateSpacesPage,
  deleteSpacesPage,
} from "../controllers/spacesPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getSpacesPage);
router.post("/", authenticate, authorizeAdmin, createSpacesPage);
router.patch("/", authenticate, authorizeAdmin, updateSpacesPage);
router.delete("/", authenticate, authorizeAdmin, deleteSpacesPage);

export default router;
