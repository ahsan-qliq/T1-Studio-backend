import ProjectDetailPage from "../models/projectDetailPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createProjectDetailPageService = async (data: Record<string, unknown>) => {
  const existing = await ProjectDetailPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("ProjectDetailPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return ProjectDetailPage.create(data);
};

export const getAllProjectDetailPagesService = async (lang?: "en" | "ar") => {
  const pages = await ProjectDetailPage.find();
  return pages.map((page) => {
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const localized = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(localized);
  });
};

export const getProjectDetailPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await ProjectDetailPage.findOne({ slug });
  if (!page) {
    const error = new Error("Project detail page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateProjectDetailPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await ProjectDetailPage.findOneAndUpdate(
    { slug },
    { $set: data },
    { new: true, runValidators: true }
  );
  if (!page) {
    const error = new Error("Project detail page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteProjectDetailPageService = async (slug: string) => {
  const page = await ProjectDetailPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Project detail page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
