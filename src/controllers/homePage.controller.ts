import { Request, Response } from "express";
import { createHomePageService, deleteHomePageService, getHomePageService, updateHomePageService } from "../services/homePage.service.ts";

export const createHomePage = async (req: Request, res: Response) => {
  try {
    const homePage = await createHomePageService(req.body);
    res.status(201).json({ success: true, data: homePage });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteHomePage = async (req: Request, res: Response) => {
  try {
    const slug = (req.query.slug as string) || "home";
    await deleteHomePageService(slug);
    res.status(200).json({ success: true, message: "Home page deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateHomePage = async (req: Request, res: Response) => {
  try {
    const slug = (req.query.slug as string) || "home";
    const homePage = await updateHomePageService(slug, req.body);
    res.status(200).json({ success: true, data: homePage });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getHomePage = async (req: Request, res: Response) => {
  try {
    const slug = (req.query.slug as string) || "home";
    const lang = req.query.lang as "en" | "ar" | undefined;

    if (lang && lang !== "en" && lang !== "ar") {
      res.status(400).json({ success: false, message: "Invalid lang. Use 'en' or 'ar'" });
      return;
    }

    const homePage = await getHomePageService(slug, lang);
    res.status(200).json({ success: true, data: homePage });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};
