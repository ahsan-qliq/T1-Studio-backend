import { createHomePageService, deleteHomePageService, getHomePageService, updateHomePageService } from "../services/homePage.service.js";
export const createHomePage = async (req, res) => {
    try {
        const homePage = await createHomePageService(req.body);
        res.status(201).json({ success: true, data: homePage });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const deleteHomePage = async (req, res) => {
    try {
        const slug = req.query.slug || "home";
        await deleteHomePageService(slug);
        res.status(200).json({ success: true, message: "Home page deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const updateHomePage = async (req, res) => {
    try {
        const slug = req.query.slug || "home";
        const homePage = await updateHomePageService(slug, req.body);
        res.status(200).json({ success: true, data: homePage });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getHomePage = async (req, res) => {
    try {
        const slug = req.query.slug || "home";
        const lang = req.query.lang;
        if (lang && lang !== "en" && lang !== "ar") {
            res.status(400).json({ success: false, message: "Invalid lang. Use 'en' or 'ar'" });
            return;
        }
        const homePage = await getHomePageService(slug, lang);
        res.status(200).json({ success: true, data: homePage });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
