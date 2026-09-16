import { Router } from "express";
import { createContactPage, getContactPage, updateContactPage, deleteContactPage, } from "../controllers/contactPage.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", getContactPage);
router.post("/", authenticate, authorizeAdmin, createContactPage);
router.patch("/", authenticate, authorizeAdmin, updateContactPage);
router.delete("/", authenticate, authorizeAdmin, deleteContactPage);
export default router;
