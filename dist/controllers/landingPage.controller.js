import { createLandingPageService, getLandingPageService, updateLandingPageService, deleteLandingPageService, } from "../services/landingPage.service.js";
export const createLandingPage = async (req, res) => {
    try {
        const page = await createLandingPageService(req.body);
        res.status(201).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getLandingPage = async (req, res) => {
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
        const page = await getLandingPageService(slug, lang);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const updateLandingPage = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        const page = await updateLandingPageService(slug, req.body);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const deleteLandingPage = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        await deleteLandingPageService(slug);
        res.status(200).json({ success: true, message: "Landing page deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
