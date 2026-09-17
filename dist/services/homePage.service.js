import HomePage from "../models/homePage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createHomePageService = async (data) => {
    const existing = await HomePage.findOne({ slug: data.slug || "home" });
    if (existing) {
        const error = new Error("HomePage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return HomePage.create(data);
};
export const getHomePageService = async (slug, lang) => {
    const homePage = await HomePage.findOne({ slug });
    if (!homePage) {
        const error = new Error("Home page not found");
        error.statusCode = 404;
        throw error;
    }
    // Localize first if language is provided
    const data = lang
        ? localizeDocument(homePage, lang)
        : homePage;
    // Generate signed URLs for all images
    const resolvedData = await resolveImageUrls(data);
    return resolvedData;
};
export const updateHomePageService = async (slug, data) => {
    const homePage = await HomePage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!homePage) {
        const error = new Error("Home page not found");
        error.statusCode = 404;
        throw error;
    }
    return homePage;
};
export const deleteHomePageService = async (slug) => {
    const homePage = await HomePage.findOneAndDelete({ slug });
    if (!homePage) {
        const error = new Error("Home page not found");
        error.statusCode = 404;
        throw error;
    }
    return homePage;
};
