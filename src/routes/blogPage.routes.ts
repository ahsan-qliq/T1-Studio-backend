import { Router } from "express";
import {
  createBlogPage,
  getBlogPage,
  updateBlogPage,
  deleteBlogPage,
} from "../controllers/blogPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getBlogPage);
router.post("/", authenticate, authorizeAdmin, createBlogPage);
router.patch("/", authenticate, authorizeAdmin, updateBlogPage);
router.delete("/", authenticate, authorizeAdmin, deleteBlogPage);

export default router;
