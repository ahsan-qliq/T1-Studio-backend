import SpaceDetailPage from "../models/spaceDetailPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createSpaceDetailPageService = async (data) => {
    const existing = await SpaceDetailPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("SpaceDetailPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return SpaceDetailPage.create(data);
};
export const getAllSpaceDetailPagesService = async (lang) => {
    const pages = await SpaceDetailPage.find();
    return pages.map((page) => {
        const raw = JSON.parse(JSON.stringify(page.toObject()));
        const localized = lang ? localizeDocument(raw, lang) : raw;
        return resolveImageUrls(localized);
    });
};
export const getSpaceDetailPageService = async (slug, lang) => {
    const page = await SpaceDetailPage.findOne({ slug });
    if (!page) {
        const error = new Error("Space detail page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateSpaceDetailPageService = async (slug, data) => {
    const page = await SpaceDetailPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Space detail page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteSpaceDetailPageService = async (slug) => {
    const page = await SpaceDetailPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Space detail page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
