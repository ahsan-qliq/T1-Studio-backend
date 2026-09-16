import InspirationPage from "../models/inspirationPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
export const createInspirationPageService = async (data) => {
    const existing = await InspirationPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("InspirationPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return InspirationPage.create(data);
};
export const getInspirationPageService = async (slug, lang) => {
    const page = await InspirationPage.findOne({ slug });
    if (!page) {
        const error = new Error("Inspiration page not found");
        error.statusCode = 404;
        throw error;
    }
    if (!lang)
        return page;
    return localizeDocument(page.toObject(), lang);
};
export const updateInspirationPageService = async (slug, data) => {
    const page = await InspirationPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Inspiration page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteInspirationPageService = async (slug) => {
    const page = await InspirationPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Inspiration page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
