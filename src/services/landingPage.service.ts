import LandingPage from "../models/landingPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createLandingPageService = async (data: Record<string, unknown>) => {
  const existing = await LandingPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("LandingPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return LandingPage.create(data);
};

export const getLandingPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await LandingPage.findOne({ slug });
  if (!page) {
    const error = new Error("Landing page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateLandingPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await LandingPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Landing page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteLandingPageService = async (slug: string) => {
  const page = await LandingPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Landing page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
