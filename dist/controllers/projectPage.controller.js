import { createProjectPageService, getProjectPageService, updateProjectPageService, deleteProjectPageService, getStatsSectionService, addStatsSectionService, updateStatsSectionService, deleteStatsSectionService, getLogosSectionService, addLogosSectionService, updateLogosSectionService, deleteLogosSectionService, } from "../services/projectPage.service.js";
import { triggerRevalidation } from "../utils/revalidate.js";
export const createProjectPage = async (req, res) => {
    try {
        const page = await createProjectPageService(req.body);
        triggerRevalidation();
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
        triggerRevalidation();
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
        triggerRevalidation();
        res.status(200).json({ success: true, message: "Project page deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
/* ------------------------------------------------------------------ */
/*  STATS SECTIONS                                                      */
/* ------------------------------------------------------------------ */
export const getStatsSection = async (req, res) => {
    try {
        const slug = req.query.slug;
        const category = req.query.category;
        const lang = req.query.lang;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        if (!category) {
            res.status(400).json({ success: false, message: "category query param is required" });
            return;
        }
        const data = await getStatsSectionService(slug, category, lang);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const addStatsSection = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        const data = await addStatsSectionService(slug, req.body);
        triggerRevalidation();
        res.status(201).json({ success: true, data });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const updateStatsSection = async (req, res) => {
    try {
        const slug = req.query.slug;
        const category = req.query.category;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        if (!category) {
            res.status(400).json({ success: false, message: "category query param is required" });
            return;
        }
        const data = await updateStatsSectionService(slug, category, req.body);
        triggerRevalidation();
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const deleteStatsSection = async (req, res) => {
    try {
        const slug = req.query.slug;
        const category = req.query.category;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        if (!category) {
            res.status(400).json({ success: false, message: "category query param is required" });
            return;
        }
        await deleteStatsSectionService(slug, category);
        triggerRevalidation();
        res.status(200).json({ success: true, message: "Stats section deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
/* ------------------------------------------------------------------ */
/*  LOGOS SECTIONS                                                      */
/* ------------------------------------------------------------------ */
export const getLogosSection = async (req, res) => {
    try {
        const slug = req.query.slug;
        const category = req.query.category;
        const lang = req.query.lang;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        if (!category) {
            res.status(400).json({ success: false, message: "category query param is required" });
            return;
        }
        const data = await getLogosSectionService(slug, category, lang);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const addLogosSection = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        const data = await addLogosSectionService(slug, req.body);
        triggerRevalidation();
        res.status(201).json({ success: true, data });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const updateLogosSection = async (req, res) => {
    try {
        const slug = req.query.slug;
        const category = req.query.category;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        if (!category) {
            res.status(400).json({ success: false, message: "category query param is required" });
            return;
        }
        const data = await updateLogosSectionService(slug, category, req.body);
        triggerRevalidation();
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const deleteLogosSection = async (req, res) => {
    try {
        const slug = req.query.slug;
        const category = req.query.category;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        if (!category) {
            res.status(400).json({ success: false, message: "category query param is required" });
            return;
        }
        await deleteLogosSectionService(slug, category);
        triggerRevalidation();
        res.status(200).json({ success: true, message: "Logos section deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
