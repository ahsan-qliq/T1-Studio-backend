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
   SHARED — simple title + body section
   Used by: Our Commitment, Accessibility Beyond the Website
========================================================= */
const textSectionSchema = new Schema({
    ...sectionSettings,
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    body: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   02. THE STANDARD WE WORK TO
========================================================= */
const standardsSectionSchema = new Schema({
    ...sectionSettings,
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    body: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    // std1 … std7 — plain bullet list
    standards: {
        type: [localizedTextSchema],
        default: [],
    },
    note: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   03. WHERE WE MAY STILL FALL SHORT
========================================================= */
const shortfallItemSchema = new Schema({
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
const shortfallsSectionSchema = new Schema({
    ...sectionSettings,
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    body: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    // short1 … short4 — each has title + body
    items: {
        type: [shortfallItemSchema],
        default: [],
    },
    note: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   05. TELL US IF SOMETHING ISN'T WORKING
========================================================= */
const contactSectionSchema = new Schema({
    ...sectionSettings,
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    body: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    contactSubTitle: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    // contact1 … contact5 — email, phone, whatsapp, visit, hours
    contactItems: {
        type: [localizedTextSchema],
        default: [],
    },
    note: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   06. FAQ
========================================================= */
const faqItemSchema = new Schema({
    question: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    answer: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, { _id: true });
const faqSectionSchema = new Schema({
    ...sectionSettings,
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    faqs: {
        type: [faqItemSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   MAIN ACCESSIBILITY PAGE
========================================================= */
const accessibilityPageSchema = new Schema({
    pageName: {
        type: String,
        default: "Accessibility",
        trim: true,
    },
    slug: {
        type: String,
        default: "accessibility",
        unique: true,
        index: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    tocMeta: {
        type: new Schema({
            tocLabel: { type: localizedTextSchema, default: () => ({}) },
            lastUpdated: { type: localizedTextSchema, default: () => ({}) },
        }, { _id: false }),
        default: () => ({}),
    },
    sections: {
        hero: {
            type: heroSectionSchema,
            default: () => ({}),
        },
        // section1
        commitment: {
            type: textSectionSchema,
            default: () => ({}),
        },
        // section2
        standards: {
            type: standardsSectionSchema,
            default: () => ({}),
        },
        // section3
        shortfalls: {
            type: shortfallsSectionSchema,
            default: () => ({}),
        },
        // section4
        beyondWebsite: {
            type: textSectionSchema,
            default: () => ({}),
        },
        // section5
        contact: {
            type: contactSectionSchema,
            default: () => ({}),
        },
        // section6
        faq: {
            type: faqSectionSchema,
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
const AccessibilityPage = mongoose.model("AccessibilityPage", accessibilityPageSchema);
export default AccessibilityPage;
