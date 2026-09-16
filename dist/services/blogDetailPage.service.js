import BlogPost from "../models/blogDetailPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
export const createBlogDetailPageService = async (data) => {
    const existing = await BlogPost.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("Blog post with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return BlogPost.create(data);
};
export const getAllBlogDetailPagesService = async (lang, category, isFeatured) => {
    const filter = {};
    if (category)
        filter.category = category;
    if (isFeatured !== undefined)
        filter.isFeatured = isFeatured;
    const pages = await BlogPost.find(filter).sort({ publishedAt: -1 });
    if (!lang)
        return pages;
    return pages.map((page) => localizeDocument(page.toObject(), lang));
};
export const getBlogDetailPageService = async (slug, lang) => {
    const page = await BlogPost.findOne({ slug });
    if (!page) {
        const error = new Error("Blog post not found");
        error.statusCode = 404;
        throw error;
    }
    if (!lang)
        return page;
    return localizeDocument(page.toObject(), lang);
};
export const updateBlogDetailPageService = async (slug, data) => {
    const page = await BlogPost.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Blog post not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteBlogDetailPageService = async (slug) => {
    const page = await BlogPost.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Blog post not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
