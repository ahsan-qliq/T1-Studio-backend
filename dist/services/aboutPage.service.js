import AboutPage from "../models/aboutPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
export const createAboutPageService = async (data) => {
    const existing = await AboutPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("AboutPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return AboutPage.create(data);
};
export const getAboutPageService = async (slug, lang) => {
    const page = await AboutPage.findOne({ slug });
    if (!page) {
        const error = new Error("About page not found");
        error.statusCode = 404;
        throw error;
    }
    if (!lang)
        return page;
    return localizeDocument(page.toObject(), lang);
};
export const updateAboutPageService = async (slug, data) => {
    const page = await AboutPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("About page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteAboutPageService = async (slug) => {
    const page = await AboutPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("About page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
