import SpaceDetailPage from "../models/spaceDetailPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";

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
  if (!lang) return pages;

  return pages.map((page) => localizeDocument(page.toObject(), lang));
};

export const getSpaceDetailPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await SpaceDetailPage.findOne({ slug });
  if (!page) {
    const error = new Error("Space detail page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  if (!lang) return page;

  return localizeDocument(page.toObject(), lang);
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
