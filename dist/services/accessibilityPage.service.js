import AccessibilityPage from "../models/accessibilityPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createAccessibilityPageService = async (data) => {
    const existing = await AccessibilityPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("AccessibilityPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return AccessibilityPage.create(data);
};
export const getAccessibilityPageService = async (slug, lang) => {
    const page = await AccessibilityPage.findOne({ slug });
    if (!page) {
        const error = new Error("Accessibility page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateAccessibilityPageService = async (slug, data) => {
    const page = await AccessibilityPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Accessibility page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteAccessibilityPageService = async (slug) => {
    const page = await AccessibilityPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Accessibility page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
