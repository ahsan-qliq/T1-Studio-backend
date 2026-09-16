import { createWhyT1PageService, getWhyT1PageService, updateWhyT1PageService, deleteWhyT1PageService, } from "../services/whyT1Page.service.js";
export const createWhyT1Page = async (req, res) => {
    try {
        const page = await createWhyT1PageService(req.body);
        res.status(201).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getWhyT1Page = async (req, res) => {
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
        const page = await getWhyT1PageService(slug, lang);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const updateWhyT1Page = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        const page = await updateWhyT1PageService(slug, req.body);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const deleteWhyT1Page = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        await deleteWhyT1PageService(slug);
        res.status(200).json({ success: true, message: "Why T1 page deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
