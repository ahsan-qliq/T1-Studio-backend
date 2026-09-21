import SpaceDetailPage from "../models/spaceDetailPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createSpaceDetailPageService = async (data: Record<string, unknown>) => {
  const existing = await SpaceDetailPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("SpaceDetailPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return SpaceDetailPage.create(data);
};

export const getAllSpaceDetailPagesService = async (lang?: "en" | "ar") => {
  const pages = await SpaceDetailPage.find();
  return pages.map((page) => {
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const localized = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(localized);
  });
};

export const getSpaceDetailPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await SpaceDetailPage.findOne({ slug });
  if (!page) {
    const error = new Error("Space detail page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateSpaceDetailPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await SpaceDetailPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Space detail page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteSpaceDetailPageService = async (slug: string) => {
  const page = await SpaceDetailPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Space detail page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
