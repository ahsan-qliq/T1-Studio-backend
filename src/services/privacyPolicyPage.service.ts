import PrivacyPolicyPage from "../models/privacyPolicyPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createPrivacyPolicyPageService = async (data: Record<string, unknown>) => {
  const existing = await PrivacyPolicyPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("PrivacyPolicyPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return PrivacyPolicyPage.create(data);
};

export const getPrivacyPolicyPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await PrivacyPolicyPage.findOne({ slug });
  if (!page) {
    const error = new Error("Privacy policy page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updatePrivacyPolicyPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await PrivacyPolicyPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Privacy policy page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deletePrivacyPolicyPageService = async (slug: string) => {
  const page = await PrivacyPolicyPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Privacy policy page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
