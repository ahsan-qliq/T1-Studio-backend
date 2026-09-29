import { createLeadService, getLeadsService, getLeadByIdService, } from "../services/zoho.service.js";
export const createLead = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, company, leadSource, description } = req.body;
        if (!firstName || !lastName || !email) {
            res
                .status(400)
                .json({ success: false, message: "firstName, lastName, and email are required" });
            return;
        }
        const lead = await createLeadService({
            firstName,
            lastName,
            email,
            phone,
            company,
            leadSource,
            description,
        });
        res.status(201).json({ success: true, data: lead });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getLeads = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = Math.min(parseInt(req.query.perPage) || 20, 200);
        const result = await getLeadsService(page, perPage);
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getLeadById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, message: "Lead ID is required" });
            return;
        }
        const lead = await getLeadByIdService(id);
        res.status(200).json({ success: true, data: lead });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
