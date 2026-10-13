import { Request, Response } from "express";
import {
  createAccessibilityPageService,
  getAccessibilityPageService,
  updateAccessibilityPageService,
  deleteAccessibilityPageService,
} from "../services/accessibilityPage.service.ts";
import { triggerRevalidation } from "../utils/revalidate.ts";

export const createAccessibilityPage = async (req: Request, res: Response) => {
  try {
    const page = await createAccessibilityPageService(req.body);
    triggerRevalidation();
    res.status(201).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getAccessibilityPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;
    const lang = req.query.lang as "en" | "ar" | undefined;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    if (lang && lang !== "en" && lang !== "ar") {
      res.status(400).json({ success: false, message: "Invalid lang. Use 'en' or 'ar'" });
      return;
    }

    const page = await getAccessibilityPageService(slug, lang);
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateAccessibilityPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    const page = await updateAccessibilityPageService(slug, req.body);
    triggerRevalidation();
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteAccessibilityPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    await deleteAccessibilityPageService(slug);
    triggerRevalidation();
    res.status(200).json({ success: true, message: "Accessibility page deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};
