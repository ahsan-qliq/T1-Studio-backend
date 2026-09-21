import ContactPage from "../models/contactPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createContactPageService = async (data) => {
    const existing = await ContactPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("ContactPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return ContactPage.create(data);
};
export const getContactPageService = async (slug, lang) => {
    const page = await ContactPage.findOne({ slug });
    if (!page) {
        const error = new Error("Contact page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateContactPageService = async (slug, data) => {
    const page = await ContactPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Contact page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteContactPageService = async (slug) => {
    const page = await ContactPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Contact page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
