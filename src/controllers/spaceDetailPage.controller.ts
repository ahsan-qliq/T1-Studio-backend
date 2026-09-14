import { Request, Response } from "express";
import {
  createSpaceDetailPageService,
  getAllSpaceDetailPagesService,
  getSpaceDetailPageService,
  updateSpaceDetailPageService,
  deleteSpaceDetailPageService,
} from "../services/spaceDetailPage.service.ts";

export const createSpaceDetailPage = async (req: Request, res: Response) => {
  try {
    const page = await createSpaceDetailPageService(req.body);
    res.status(201).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getSpaceDetailPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string | undefined;
    const lang = req.query.lang as "en" | "ar" | undefined;

    if (lang && lang !== "en" && lang !== "ar") {
      res.status(400).json({ success: false, message: "Invalid lang. Use 'en' or 'ar'" });
      return;
    }

    if (!slug) {
      const pages = await getAllSpaceDetailPagesService(lang);
      res.status(200).json({ success: true, data: pages });
      return;
    }

    const page = await getSpaceDetailPageService(slug, lang);
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateSpaceDetailPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    const page = await updateSpaceDetailPageService(slug, req.body);
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteSpaceDetailPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    await deleteSpaceDetailPageService(slug);
    res.status(200).json({ success: true, message: "Space detail page deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};
