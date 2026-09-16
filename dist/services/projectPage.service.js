import ProjectPage from "../models/projectPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
export const createProjectPageService = async (data) => {
    const existing = await ProjectPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("ProjectPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return ProjectPage.create(data);
};
export const getProjectPageService = async (slug, lang) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page) {
        const error = new Error("Project page not found");
        error.statusCode = 404;
        throw error;
    }
    if (!lang)
        return page;
    return localizeDocument(page.toObject(), lang);
};
export const updateProjectPageService = async (slug, data) => {
    const page = await ProjectPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Project page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteProjectPageService = async (slug) => {
    const page = await ProjectPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Project page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
