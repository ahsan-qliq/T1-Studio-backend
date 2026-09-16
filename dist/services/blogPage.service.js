import BlogPage from "../models/blogPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
export const createBlogPageService = async (data) => {
    const existing = await BlogPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("BlogPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return BlogPage.create(data);
};
export const getBlogPageService = async (slug, lang) => {
    const page = await BlogPage.findOne({ slug });
    if (!page) {
        const error = new Error("Blog page not found");
        error.statusCode = 404;
        throw error;
    }
    if (!lang)
        return page;
    return localizeDocument(page.toObject(), lang);
};
export const updateBlogPageService = async (slug, data) => {
    const page = await BlogPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Blog page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteBlogPageService = async (slug) => {
    const page = await BlogPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Blog page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
