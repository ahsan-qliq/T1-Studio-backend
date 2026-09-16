import { createContactPageService, getContactPageService, updateContactPageService, deleteContactPageService, } from "../services/contactPage.service.js";
export const createContactPage = async (req, res) => {
    try {
        const page = await createContactPageService(req.body);
        res.status(201).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getContactPage = async (req, res) => {
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
        const page = await getContactPageService(slug, lang);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const updateContactPage = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        const page = await updateContactPageService(slug, req.body);
        res.status(200).json({ success: true, data: page });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const deleteContactPage = async (req, res) => {
    try {
        const slug = req.query.slug;
        if (!slug) {
            res.status(400).json({ success: false, message: "slug query param is required" });
            return;
        }
        await deleteContactPageService(slug);
        res.status(200).json({ success: true, message: "Contact page deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
