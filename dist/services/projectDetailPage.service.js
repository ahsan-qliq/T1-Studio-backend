import ProjectDetailPage from "../models/projectDetailPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
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
    if (!lang)
        return pages;
    return pages.map((page) => localizeDocument(page.toObject(), lang));
};
export const getProjectDetailPageService = async (slug, lang) => {
    const page = await ProjectDetailPage.findOne({ slug });
    if (!page) {
        const error = new Error("Project detail page not found");
        error.statusCode = 404;
        throw error;
    }
    if (!lang)
        return page;
    return localizeDocument(page.toObject(), lang);
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
