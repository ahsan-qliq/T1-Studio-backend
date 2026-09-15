import { Request, Response } from "express";
import {
  createBlogDetailPageService,
  getAllBlogDetailPagesService,
  getBlogDetailPageService,
  updateBlogDetailPageService,
  deleteBlogDetailPageService,
} from "../services/blogDetailPage.service.ts";

export const createBlogDetailPage = async (req: Request, res: Response) => {
  try {
    const page = await createBlogDetailPageService(req.body);
    res.status(201).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getBlogDetailPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string | undefined;
    const lang = req.query.lang as "en" | "ar" | undefined;
    const category = req.query.category as string | undefined;
    const isFeatured = req.query.isFeatured !== undefined
      ? req.query.isFeatured === "true"
      : undefined;

    if (lang && lang !== "en" && lang !== "ar") {
      res.status(400).json({ success: false, message: "Invalid lang. Use 'en' or 'ar'" });
      return;
    }

    if (!slug) {
      const pages = await getAllBlogDetailPagesService(lang, category, isFeatured);
      res.status(200).json({ success: true, data: pages });
      return;
    }

    const page = await getBlogDetailPageService(slug, lang);
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateBlogDetailPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    const page = await updateBlogDetailPageService(slug, req.body);
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteBlogDetailPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    await deleteBlogDetailPageService(slug);
    res.status(200).json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};
