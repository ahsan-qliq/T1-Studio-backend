import WhyT1Page from "../models/whyT1Page.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";

export const createWhyT1PageService = async (data: Record<string, unknown>) => {
  const existing = await WhyT1Page.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("WhyT1Page with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return WhyT1Page.create(data);
};

export const getWhyT1PageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await WhyT1Page.findOne({ slug });
  if (!page) {
    const error = new Error("Why T1 page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  if (!lang) return page;

  return localizeDocument(page.toObject(), lang);
};

export const updateWhyT1PageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await WhyT1Page.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Why T1 page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteWhyT1PageService = async (slug: string) => {
  const page = await WhyT1Page.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Why T1 page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
