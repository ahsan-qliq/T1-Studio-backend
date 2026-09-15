import { Router } from "express";
import {
  createBlogDetailPage,
  getBlogDetailPage,
  updateBlogDetailPage,
  deleteBlogDetailPage,
} from "../controllers/blogDetailPage.controller.ts";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", getBlogDetailPage);
router.post("/", authenticate, authorizeAdmin, createBlogDetailPage);
router.patch("/", authenticate, authorizeAdmin, updateBlogDetailPage);
router.delete("/", authenticate, authorizeAdmin, deleteBlogDetailPage);

export default router;
