import mongoose, { Schema } from "mongoose";
const tradeSubmissionSchema = new Schema({
    category: {
        type: String,
        enum: ["trade", "referral"],
        required: true,
        index: true,
    },
    // ── Trade-partner fields ──────────────────────────────────────────
    companyName: { type: String, default: "" },
    companyType: { type: String, default: "" },
    projectScale: { type: String, default: "" },
    location: { type: String, default: "" },
    // ── Referral-partner fields ───────────────────────────────────────
    clientName: { type: String, default: "" },
    referralSource: { type: String, default: "" },
    clientType: { type: String, default: "" },
    // ── Common contact fields ─────────────────────────────────────────
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    // ── Approval ──────────────────────────────────────────────────────
    approvalStatus: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
        index: true,
    },
    approvedAt: { type: Date, default: null },
    rejectedAt: { type: Date, default: null },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    // ── Referral link (generated on acceptance) ───────────────────────
    referralCode: { type: String, default: null, unique: true, sparse: true },
    referralUrl: { type: String, default: null },
    referralGeneratedAt: { type: Date, default: null },
    // ── Zoho CRM ──────────────────────────────────────────────────────
    zohoLeadId: { type: String, default: null },
    zohoStatus: {
        type: String,
        enum: ["pending", "synced", "failed", "skipped"],
        default: "pending",
    },
    zohoError: { type: String, default: null, select: false },
    zohoSyncedAt: { type: Date, default: null },
    // ── Email delivery ────────────────────────────────────────────────
    emailStatus: {
        type: String,
        enum: ["not_sent", "sent", "failed"],
        default: "not_sent",
    },
    emailSentAt: { type: Date, default: null },
    emailError: { type: String, default: null, select: false },
    emailAttempts: { type: Number, default: 0 },
}, { timestamps: true });
tradeSubmissionSchema.index({ category: 1, approvalStatus: 1 });
tradeSubmissionSchema.index({ email: 1, category: 1 });
const TradeSubmission = mongoose.model("TradeSubmission", tradeSubmissionSchema);
export default TradeSubmission;
