import CookiePolicyPage from "../models/cookiePolicyPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createCookiePolicyPageService = async (data: Record<string, unknown>) => {
  const existing = await CookiePolicyPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("CookiePolicyPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return CookiePolicyPage.create(data);
};

export const getCookiePolicyPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await CookiePolicyPage.findOne({ slug });
  if (!page) {
    const error = new Error("Cookie policy page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateCookiePolicyPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await CookiePolicyPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Cookie policy page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteCookiePolicyPageService = async (slug: string) => {
  const page = await CookiePolicyPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Cookie policy page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
