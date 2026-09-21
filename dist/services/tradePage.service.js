import TradePage from "../models/tradePage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createTradePageService = async (data) => {
    const existing = await TradePage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("TradePage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return TradePage.create(data);
};
export const getTradePageService = async (slug, lang) => {
    const page = await TradePage.findOne({ slug });
    if (!page) {
        const error = new Error("Trade page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateTradePageService = async (slug, data) => {
    const page = await TradePage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Trade page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteTradePageService = async (slug) => {
    const page = await TradePage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Trade page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
