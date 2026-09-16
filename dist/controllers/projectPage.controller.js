import { createProjectPageService, getProjectPageService, updateProjectPageService, deleteProjectPageService, } from "../services/projectPage.service.js";
export const createProjectPage = async (req, res) => {
    try {
        const page = await createProjectPageService(req.body);
        res.status(201).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getProjectPage = async (req, res) => {
    try {
        const slug = req.query.slug;
        const lang = req.query.lang;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        if (lang && lang !== "en" && lang !== "ar") {
            res.status(400).json({ success: false, message: "Invalid lang. Use 'en' or 'ar'" });
            return;
        }
        const page = await getProjectPageService(slug, lang);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const updateProjectPage = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        const page = await updateProjectPageService(slug, req.body);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const deleteProjectPage = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        await deleteProjectPageService(slug);
        res.status(200).json({ success: true, message: "Project page deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
