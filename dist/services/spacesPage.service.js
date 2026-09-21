import SpacesPage from "../models/spacesPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createSpacesPageService = async (data) => {
    const existing = await SpacesPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("SpacesPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return SpacesPage.create(data);
};
export const getSpacesPageService = async (slug, lang) => {
    const page = await SpacesPage.findOne({ slug });
    if (!page) {
        const error = new Error("Spaces page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateSpacesPageService = async (slug, data) => {
    const page = await SpacesPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Spaces page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteSpacesPageService = async (slug) => {
    const page = await SpacesPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Spaces page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
