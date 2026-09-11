import { Router } from "express";
import { createHomePage, deleteHomePage, getHomePage, updateHomePage } from "../controllers/homePage.controller.js";
const router = Router();
router.post("/", createHomePage);
router.get("/", getHomePage);
router.patch("/", updateHomePage);
router.delete("/", deleteHomePage);
export default router;
