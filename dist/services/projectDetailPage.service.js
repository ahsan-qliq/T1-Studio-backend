import ProjectDetailPage from "../models/projectDetailPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createProjectDetailPageService = async (data) => {
    const existing = await ProjectDetailPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("ProjectDetailPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return ProjectDetailPage.create(data);
};
export const getAllProjectDetailPagesService = async (lang) => {
    const pages = await ProjectDetailPage.find();
    return pages.map((page) => {
        const raw = JSON.parse(JSON.stringify(page.toObject()));
        const localized = lang ? localizeDocument(raw, lang) : raw;
        return resolveImageUrls(localized);
    });
};
export const getProjectDetailPageService = async (slug, lang) => {
    const page = await ProjectDetailPage.findOne({ slug });
    if (!page) {
        const error = new Error("Project detail page not found");
        error.statusCode = 404;
        throw error;
    }
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    return resolveImageUrls(data);
};
export const updateProjectDetailPageService = async (slug, data) => {
    const page = await ProjectDetailPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Project detail page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteProjectDetailPageService = async (slug) => {
    const page = await ProjectDetailPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Project detail page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
