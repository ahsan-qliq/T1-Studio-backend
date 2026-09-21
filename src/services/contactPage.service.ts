import ContactPage from "../models/contactPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createContactPageService = async (data: Record<string, unknown>) => {
  const existing = await ContactPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("ContactPage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return ContactPage.create(data);
};

export const getContactPageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await ContactPage.findOne({ slug });
  if (!page) {
    const error = new Error("Contact page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateContactPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await ContactPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Contact page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteContactPageService = async (slug: string) => {
  const page = await ContactPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Contact page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
