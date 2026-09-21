import WhyT1Page from "../models/whyT1Page.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createWhyT1PageService = async (data) => {
    const existing = await WhyT1Page.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("WhyT1Page with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return WhyT1Page.create(data);
};
export const getWhyT1PageService = async (slug, lang) => {
    const page = await WhyT1Page.findOne({ slug });
    if (!page) {
        const error = new Error("Why T1 page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateWhyT1PageService = async (slug, data) => {
    const page = await WhyT1Page.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Why T1 page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteWhyT1PageService = async (slug) => {
    const page = await WhyT1Page.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Why T1 page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
