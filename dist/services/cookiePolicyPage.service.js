import CookiePolicyPage from "../models/cookiePolicyPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createCookiePolicyPageService = async (data) => {
    const existing = await CookiePolicyPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("CookiePolicyPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return CookiePolicyPage.create(data);
};
export const getCookiePolicyPageService = async (slug, lang) => {
    const page = await CookiePolicyPage.findOne({ slug });
    if (!page) {
        const error = new Error("Cookie policy page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateCookiePolicyPageService = async (slug, data) => {
    const page = await CookiePolicyPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Cookie policy page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteCookiePolicyPageService = async (slug) => {
    const page = await CookiePolicyPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Cookie policy page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
