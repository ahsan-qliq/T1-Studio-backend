import InspirationPage from "../models/inspirationPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";

export const createInspirationPageService = async (data: Record<string, unknown>) => {
  const existing = await InspirationPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("InspirationPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return InspirationPage.create(data);
};

export const getInspirationPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await InspirationPage.findOne({ slug });
  if (!page) {
    const error = new Error("Inspiration page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  if (!lang) return page;

  return localizeDocument(page.toObject(), lang);
};

export const updateInspirationPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await InspirationPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Inspiration page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteInspirationPageService = async (slug: string) => {
  const page = await InspirationPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Inspiration page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
