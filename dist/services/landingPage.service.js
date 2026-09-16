import LandingPage from "../models/landingPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
export const createLandingPageService = async (data) => {
    const existing = await LandingPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("LandingPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return LandingPage.create(data);
};
export const getLandingPageService = async (slug, lang) => {
    const page = await LandingPage.findOne({ slug });
    if (!page) {
        const error = new Error("Landing page not found");
        error.statusCode = 404;
        throw error;
    }
    if (!lang)
        return page;
    return localizeDocument(page.toObject(), lang);
};
export const updateLandingPageService = async (slug, data) => {
    const page = await LandingPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Landing page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteLandingPageService = async (slug) => {
    const page = await LandingPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Landing page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
