import { Router } from "express";
import {
  createSpacesPage,
  getSpacesPage,
  updateSpacesPage,
  deleteSpacesPage,
} from "../controllers/spacesPage.controller.ts";

const router = Router();

router.post("/", createSpacesPage);
router.get("/", getSpacesPage);
router.patch("/", updateSpacesPage);
router.delete("/", deleteSpacesPage);

export default router;
