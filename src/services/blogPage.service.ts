import BlogPage from "../models/blogPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";

export const createBlogPageService = async (data: Record<string, unknown>) => {
  const existing = await BlogPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("BlogPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return BlogPage.create(data);
};

export const getBlogPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await BlogPage.findOne({ slug });
  if (!page) {
    const error = new Error("Blog page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  if (!lang) return page;

  return localizeDocument(page.toObject(), lang);
};

export const updateBlogPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await BlogPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Blog page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteBlogPageService = async (slug: string) => {
  const page = await BlogPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Blog page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
