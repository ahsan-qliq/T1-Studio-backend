import { Request, Response } from "express";
import {
  createProjectPageService,
  getProjectPageService,
  updateProjectPageService,
  deleteProjectPageService,
  getStatsSectionService,
  addStatsSectionService,
  updateStatsSectionService,
  deleteStatsSectionService,
  getLogosSectionService,
  addLogosSectionService,
  updateLogosSectionService,
  deleteLogosSectionService,
} from "../services/projectPage.service.ts";
import { triggerRevalidation } from "../utils/revalidate.ts";

export const createProjectPage = async (req: Request, res: Response) => {
  try {
    const page = await createProjectPageService(req.body);
    triggerRevalidation();
    res.status(201).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getProjectPage = async (req: Request, res: Response) => {
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

    const page = await getProjectPageService(slug, lang);
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateProjectPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    const page = await updateProjectPageService(slug, req.body);
    triggerRevalidation();
    res.status(200).json({ success: true, data: page });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteProjectPage = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    await deleteProjectPageService(slug);
    triggerRevalidation();
    res.status(200).json({ success: true, message: "Project page deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

/* ------------------------------------------------------------------ */
/*  STATS SECTIONS                                                      */
/* ------------------------------------------------------------------ */

export const getStatsSection = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;
    const category = req.query.category as string;
    const lang = req.query.lang as "en" | "ar" | undefined;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    if (!category) {
      res.status(400).json({ success: false, message: "category query param is required" });
      return;
    }

    const data = await getStatsSectionService(slug, category, lang);
    res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const addStatsSection = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    const data = await addStatsSectionService(slug, req.body);
    triggerRevalidation();
    res.status(201).json({ success: true, data });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateStatsSection = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;
    const category = req.query.category as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    if (!category) {
      res.status(400).json({ success: false, message: "category query param is required" });
      return;
    }

    const data = await updateStatsSectionService(slug, category, req.body);
    triggerRevalidation();
    res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteStatsSection = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;
    const category = req.query.category as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    if (!category) {
      res.status(400).json({ success: false, message: "category query param is required" });
      return;
    }

    await deleteStatsSectionService(slug, category);
    triggerRevalidation();
    res.status(200).json({ success: true, message: "Stats section deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

/* ------------------------------------------------------------------ */
/*  LOGOS SECTIONS                                                      */
/* ------------------------------------------------------------------ */

export const getLogosSection = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;
    const category = req.query.category as string;
    const lang = req.query.lang as "en" | "ar" | undefined;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    if (!category) {
      res.status(400).json({ success: false, message: "category query param is required" });
      return;
    }

    const data = await getLogosSectionService(slug, category, lang);
    res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const addLogosSection = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    const data = await addLogosSectionService(slug, req.body);
    triggerRevalidation();
    res.status(201).json({ success: true, data });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const updateLogosSection = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;
    const category = req.query.category as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    if (!category) {
      res.status(400).json({ success: false, message: "category query param is required" });
      return;
    }

    const data = await updateLogosSectionService(slug, category, req.body);
    triggerRevalidation();
    res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const deleteLogosSection = async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string;
    const category = req.query.category as string;

    if (!slug) {
      res.status(400).json({ success: false, message: "slug query param is required" });
      return;
    }

    if (!category) {
      res.status(400).json({ success: false, message: "category query param is required" });
      return;
    }

    await deleteLogosSectionService(slug, category);
    triggerRevalidation();
    res.status(200).json({ success: true, message: "Logos section deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};
