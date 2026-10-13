import { Request, Response } from "express";
import {
  createTermsConditionsPageService,
  getTermsConditionsPageService,
  updateTermsConditionsPageService,
  deleteTermsConditionsPageService,
} from "../services/termsConditionsPage.service.ts";
import { triggerRevalidation } from "../utils/revalidate.ts";

export const createTermsConditionsPage = async (req: Request, res: Response) => {
  try {
    const page = await createTermsConditionsPageService(req.body);
    triggerRevalidation();
    res.status(201).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getTermsConditionsPage = async (req: Request, res: Response) => {
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

    const page = await getTermsConditionsPageService(slug, lang);
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateTermsConditionsPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    const page = await updateTermsConditionsPageService(slug, req.body);
    triggerRevalidation();
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteTermsConditionsPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    await deleteTermsConditionsPageService(slug);
    triggerRevalidation();
    res.status(200).json({ success: true, message: "Terms & conditions page deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};
