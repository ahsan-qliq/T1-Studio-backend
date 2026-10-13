import TermsConditionsPage from "../models/termsConditionsPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createTermsConditionsPageService = async (data) => {
    const existing = await TermsConditionsPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("TermsConditionsPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return TermsConditionsPage.create(data);
};
export const getTermsConditionsPageService = async (slug, lang) => {
    const page = await TermsConditionsPage.findOne({ slug });
    if (!page) {
        const error = new Error("Terms & conditions page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateTermsConditionsPageService = async (slug, data) => {
    const page = await TermsConditionsPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Terms & conditions page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteTermsConditionsPageService = async (slug) => {
    const page = await TermsConditionsPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Terms & conditions page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
