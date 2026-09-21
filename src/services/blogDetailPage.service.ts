import BlogPost from "../models/blogDetailPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createBlogDetailPageService = async (data: Record<string, unknown>) => {
  const existing = await BlogPost.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("Blog post with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return BlogPost.create(data);
};

export const getAllBlogDetailPagesService = async (
  lang?: "en" | "ar",
  category?: string,
  isFeatured?: boolean
) => {
  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (isFeatured !== undefined) filter.isFeatured = isFeatured;

  const pages = await BlogPost.find(filter).sort({ publishedAt: -1 });
  return pages.map((page) => {
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const localized = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(localized);
  });
};

export const getBlogDetailPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await BlogPost.findOne({ slug });
  if (!page) {
    const error = new Error("Blog post not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateBlogDetailPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await BlogPost.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Blog post not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteBlogDetailPageService = async (slug: string) => {
  const page = await BlogPost.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Blog post not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
