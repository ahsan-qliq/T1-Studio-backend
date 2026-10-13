import { Request, Response } from "express";
import {
  createCookiePolicyPageService,
  getCookiePolicyPageService,
  updateCookiePolicyPageService,
  deleteCookiePolicyPageService,
} from "../services/cookiePolicyPage.service.ts";
import { triggerRevalidation } from "../utils/revalidate.ts";

export const createCookiePolicyPage = async (req: Request, res: Response) => {
  try {
    const page = await createCookiePolicyPageService(req.body);
    triggerRevalidation();
    res.status(201).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getCookiePolicyPage = async (req: Request, res: Response) => {
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

    const page = await getCookiePolicyPageService(slug, lang);
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateCookiePolicyPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    const page = await updateCookiePolicyPageService(slug, req.body);
    triggerRevalidation();
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteCookiePolicyPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    await deleteCookiePolicyPageService(slug);
    triggerRevalidation();
    res.status(200).json({ success: true, message: "Cookie policy page deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};
