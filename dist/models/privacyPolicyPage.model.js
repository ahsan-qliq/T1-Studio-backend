import mongoose, { Schema } from "mongoose";
import { localizedTextSchema, imageSchema, sectionSettings, seoSchema, } from "../shared/index.js";
/* =========================================================
   01. HERO
========================================================= */
const breadcrumbItemSchema = new Schema({
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    href: {
        type: String,
        default: "",
        trim: true,
    },
}, { _id: false });
const heroSectionSchema = new Schema({
    ...sectionSettings,
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    bgImage: {
        type: imageSchema,
        default: () => ({}),
    },
    breadcrumbs: {
        type: [breadcrumbItemSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   02. POLICY CONTENT
========================================================= */
const policyItemSchema = new Schema({
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    body: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, { _id: true });
const contentSectionSchema = new Schema({
    ...sectionSettings,
    tocLabel: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    lastUpdated: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    contactEmail: {
        type: String,
        default: "",
        trim: true,
    },
    items: {
        type: [policyItemSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   MAIN PRIVACY POLICY PAGE
========================================================= */
const privacyPolicyPageSchema = new Schema({
    pageName: {
        type: String,
        default: "Privacy Policy",
        trim: true,
    },
    slug: {
        type: String,
        default: "privacy-policy",
        unique: true,
        index: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    sections: {
        hero: {
            type: heroSectionSchema,
            default: () => ({}),
        },
        content: {
            type: contentSectionSchema,
            default: () => ({}),
        },
    },
    seo: {
        type: seoSchema,
        default: () => ({}),
    },
    publishedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
const PrivacyPolicyPage = mongoose.model("PrivacyPolicyPage", privacyPolicyPageSchema);
export default PrivacyPolicyPage;
