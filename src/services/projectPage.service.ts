import ProjectPage from "../models/projectPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";

export const createProjectPageService = async (data: Record<string, unknown>) => {
  const existing = await ProjectPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("ProjectPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return ProjectPage.create(data);
};

export const getProjectPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) {
    const error = new Error("Project page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  if (!lang) return page;

  return localizeDocument(page.toObject(), lang);
};

export const updateProjectPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await ProjectPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Project page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteProjectPageService = async (slug: string) => {
  const page = await ProjectPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Project page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
