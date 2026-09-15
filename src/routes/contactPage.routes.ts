import { Router } from "express";
import {
  createContactPage,
  getContactPage,
  updateContactPage,
  deleteContactPage,
} from "../controllers/contactPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getContactPage);
router.post("/", authenticate, authorizeAdmin, createContactPage);
router.patch("/", authenticate, authorizeAdmin, updateContactPage);
router.delete("/", authenticate, authorizeAdmin, deleteContactPage);

export default router;
