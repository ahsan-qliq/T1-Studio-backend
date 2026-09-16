import { createTradePageService, getTradePageService, updateTradePageService, deleteTradePageService, } from "../services/tradePage.service.js";
export const createTradePage = async (req, res) => {
    try {
        const page = await createTradePageService(req.body);
        res.status(201).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getTradePage = async (req, res) => {
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
        const page = await getTradePageService(slug, lang);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const updateTradePage = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        const page = await updateTradePageService(slug, req.body);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const deleteTradePage = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        await deleteTradePageService(slug);
        res.status(200).json({ success: true, message: "Trade page deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
