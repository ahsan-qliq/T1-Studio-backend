import { Router } from "express";
import { createHomePage, deleteHomePage, getHomePage, updateHomePage } from "../controllers/homePage.controller.ts";

const router = Router();

router.post("/", createHomePage);
router.get("/", getHomePage);
router.patch("/", updateHomePage);
router.delete("/", deleteHomePage);

export default router;
