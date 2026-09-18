import HomePage from "../models/homePage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts"

export const createHomePageService = async (data: Record<string, unknown>) => {
  const existing = await HomePage.findOne({ slug: data.slug || "home" });
  if (existing) {
    const error = new Error("HomePage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return HomePage.create(data);
};

export const getHomePageService = async (slug: string, lang?: "en" | "ar") => {
  const homePage = await HomePage.findOne({ slug });
  if (!homePage) {
    const error = new Error("Home page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = homePage.toObject();

  const data = lang ? localizeDocument(raw, lang) : raw;

  return resolveImageUrls(data);
};

export const updateHomePageService = async (slug: string, data: Record<string, unknown>) => {
  const homePage = await HomePage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!homePage) {
    const error = new Error("Home page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return homePage;
};

export const deleteHomePageService = async (slug: string) => {
  const homePage = await HomePage.findOneAndDelete({ slug });
  if (!homePage) {
    const error = new Error("Home page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return homePage;
};
