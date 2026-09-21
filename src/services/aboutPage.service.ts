import AboutPage from "../models/aboutPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createAboutPageService = async (data: Record<string, unknown>) => {
  const existing = await AboutPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("AboutPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return AboutPage.create(data);
};

export const getAboutPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await AboutPage.findOne({ slug });
  if (!page) {
    const error = new Error("About page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateAboutPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await AboutPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("About page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteAboutPageService = async (slug: string) => {
  const page = await AboutPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("About page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
