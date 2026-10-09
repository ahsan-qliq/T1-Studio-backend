import { createTradeSubmissionService, listTradeSubmissionsService, getTradeSubmissionByIdService, updateTradeSubmissionStatusService, retryEmailService, } from "../services/tradeSubmission.service.js";
const VALID_CATEGORIES = ["trade", "referral"];
const VALID_STATUSES = ["pending", "accepted", "rejected"];
// ── Public: submit application ───────────────────────────────────────────────
export const createTradeSubmission = async (req, res) => {
    try {
        const { category, firstName, lastName, email, phone, companyName, companyType, projectScale, location, clientName, referralSource, clientType, } = req.body;
        if (!category || !VALID_CATEGORIES.includes(category)) {
            res.status(400).json({
                success: false,
                message: `category must be one of: ${VALID_CATEGORIES.join(", ")}`,
            });
            return;
        }
        if (!firstName || !lastName || !email || !phone) {
            res.status(400).json({
                success: false,
                message: "firstName, lastName, email, and phone are required",
            });
            return;
        }
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRx.test(email)) {
            res.status(400).json({ success: false, message: "Invalid email address" });
            return;
        }
        if (category === "trade") {
            if (!companyName || !companyType || !projectScale || !location) {
                res.status(400).json({
                    success: false,
                    message: "Trade partner applications require companyName, companyType, projectScale, and location",
                });
                return;
            }
        }
        if (category === "referral") {
            if (!clientName || !referralSource || !clientType) {
                res.status(400).json({
                    success: false,
                    message: "Referral partner applications require clientName, referralSource, and clientType",
                });
                return;
            }
        }
        const submission = await createTradeSubmissionService({
            category: category,
            firstName,
            lastName,
            email,
            phone,
            companyName,
            companyType,
            projectScale,
            location,
            clientName,
            referralSource,
            clientType,
        });
        res.status(201).json({ success: true, data: { id: submission._id } });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode ?? 500).json({ success: false, message: err.message });
    }
};
// ── Admin: list applications ─────────────────────────────────────────────────
export const listTradeSubmissions = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 20);
        const category = req.query.category;
        const approvalStatus = req.query.approvalStatus;
        if (category && !VALID_CATEGORIES.includes(category)) {
            res.status(400).json({ success: false, message: "Invalid category filter" });
            return;
        }
        if (approvalStatus && !VALID_STATUSES.includes(approvalStatus)) {
            res.status(400).json({ success: false, message: "Invalid approvalStatus filter" });
            return;
        }
        const result = await listTradeSubmissionsService({ page, limit, category, approvalStatus });
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode ?? 500).json({ success: false, message: err.message });
    }
};
// ── Admin: get single application ────────────────────────────────────────────
export const getTradeSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await getTradeSubmissionByIdService(id);
        res.status(200).json({ success: true, data: submission });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode ?? 500).json({ success: false, message: err.message });
    }
};
// ── Admin: accept or reject ───────────────────────────────────────────────────
export const updateTradeSubmissionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const adminId = req.user.id;
        if (status !== "accepted" && status !== "rejected") {
            res.status(400).json({
                success: false,
                message: 'status must be "accepted" or "rejected"',
            });
            return;
        }
        const updated = await updateTradeSubmissionStatusService(id, status, adminId);
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode ?? 500).json({ success: false, message: err.message });
    }
};
// ── Admin: retry acceptance email ─────────────────────────────────────────────
export const retryAcceptanceEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await retryEmailService(id);
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode ?? 500).json({ success: false, message: err.message });
    }
};
