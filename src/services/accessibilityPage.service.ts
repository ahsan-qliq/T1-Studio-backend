import AccessibilityPage from "../models/accessibilityPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createAccessibilityPageService = async (data: Record<string, unknown>) => {
  const existing = await AccessibilityPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("AccessibilityPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return AccessibilityPage.create(data);
};

export const getAccessibilityPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await AccessibilityPage.findOne({ slug });
  if (!page) {
    const error = new Error("Accessibility page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateAccessibilityPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await AccessibilityPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Accessibility page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteAccessibilityPageService = async (slug: string) => {
  const page = await AccessibilityPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Accessibility page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
