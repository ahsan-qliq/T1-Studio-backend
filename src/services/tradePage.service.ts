import TradePage from "../models/tradePage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createTradePageService = async (data: Record<string, unknown>) => {
  const existing = await TradePage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("TradePage with this slug already exists") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  return TradePage.create(data);
};

export const getTradePageService = async (slug: string, lang?: "en" | "ar") => {
  const page = await TradePage.findOne({ slug });
  if (!page) {
    const error = new Error("Trade page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = lang ? localizeDocument(raw, lang) : raw;
  return resolveImageUrls(data);
};

export const updateTradePageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await TradePage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Trade page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteTradePageService = async (slug: string) => {
  const page = await TradePage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Trade page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
