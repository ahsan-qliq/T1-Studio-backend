import SpacesPage from "../models/spacesPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createSpacesPageService = async (data: Record<string, unknown>) => {
  const existing = await SpacesPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("SpacesPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return SpacesPage.create(data);
};

export const getSpacesPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await SpacesPage.findOne({ slug });
  if (!page) {
    const error = new Error("Spaces page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateSpacesPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await SpacesPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Spaces page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteSpacesPageService = async (slug: string) => {
  const page = await SpacesPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Spaces page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
