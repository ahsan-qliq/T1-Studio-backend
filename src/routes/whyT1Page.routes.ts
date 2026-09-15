import { Router } from "express";
import {
  createWhyT1Page,
  getWhyT1Page,
  updateWhyT1Page,
  deleteWhyT1Page,
} from "../controllers/whyT1Page.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getWhyT1Page);
router.post("/", authenticate, authorizeAdmin, createWhyT1Page);
router.patch("/", authenticate, authorizeAdmin, updateWhyT1Page);
router.delete("/", authenticate, authorizeAdmin, deleteWhyT1Page);

export default router;
