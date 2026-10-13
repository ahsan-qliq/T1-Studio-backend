import PrivacyPolicyPage from "../models/privacyPolicyPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createPrivacyPolicyPageService = async (data) => {
    const existing = await PrivacyPolicyPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("PrivacyPolicyPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return PrivacyPolicyPage.create(data);
};
export const getPrivacyPolicyPageService = async (slug, lang) => {
    const page = await PrivacyPolicyPage.findOne({ slug });
    if (!page) {
        const error = new Error("Privacy policy page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updatePrivacyPolicyPageService = async (slug, data) => {
    const page = await PrivacyPolicyPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Privacy policy page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deletePrivacyPolicyPageService = async (slug) => {
    const page = await PrivacyPolicyPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Privacy policy page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
