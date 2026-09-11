import mongoose from "mongoose";
import { localizedTextSchema, imageSchema, buttonSchema, sectionSettings, } from "../shared/index.js";
const { Schema } = mongoose;
/* =========================================================
   01. HERO SECTION
========================================================= */
const heroSectionSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    backgroundImage: {
        type: imageSchema,
        default: () => ({}),
    },
    mobileImage: {
        type: imageSchema,
        default: () => ({}),
    },
    primaryButton: {
        type: buttonSchema,
        default: () => ({}),
    },
    secondaryButton: {
        type: buttonSchema,
        default: () => ({}),
    },
    overlayOpacity: {
        type: Number,
        default: 40,
        min: 0,
        max: 100,
    },
}, { _id: false });
/* =========================================================
   02. INTRO / VISION SECTION
========================================================= */
const introSectionSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   03. FEATURED SPACES
========================================================= */
const featuredSpaceItemSchema = new Schema({
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    subtitle: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    image: {
        type: imageSchema,
        default: () => ({}),
    },
    href: {
        type: String,
        default: "",
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
});
const featuredSpacesSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    spaces: {
        type: [featuredSpaceItemSchema],
        default: [],
    },
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
    autoplay: {
        type: Boolean,
        default: true,
    },
}, { _id: false });
/* =========================================================
   04. SHOWCASE / GALLERY SECTION
========================================================= */
const galleryItemSchema = new Schema({
    image: {
        type: imageSchema,
        default: () => ({}),
    },
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    caption: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    href: {
        type: String,
        default: "",
    },
});
const showcaseSectionSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    gallery: {
        type: [galleryItemSchema],
        default: [],
    },
    autoplay: {
        type: Boolean,
        default: true,
    },
    showNavigation: {
        type: Boolean,
        default: true,
    },
}, { _id: false });
/* =========================================================
   05. WHY CLIENTS CHOOSE T1
========================================================= */
const comparisonItemSchema = new Schema({
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    available: {
        type: Boolean,
        default: true,
    },
}, { _id: false });
const comparisonColumnSchema = new Schema({
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    highlighted: {
        type: Boolean,
        default: false,
    },
    items: {
        type: [comparisonItemSchema],
        default: [],
    },
});
const whyChooseSectionSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    columns: {
        type: [comparisonColumnSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   06. SIGNATURE PROJECTS
========================================================= */
const projectItemSchema = new Schema({
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    location: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    image: {
        type: imageSchema,
        default: () => ({}),
    },
    href: {
        type: String,
        default: "",
    },
    position: {
        type: String,
        enum: [
            "top-left",
            "top-right",
            "middle-left",
            "middle-right",
            "bottom-left",
            "bottom-right",
        ],
        default: "top-left",
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
});
const signatureProjectsSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    projects: {
        type: [projectItemSchema],
        default: [],
    },
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   07. PROJECT JOURNEY
========================================================= */
const journeyStepSchema = new Schema({
    icon: {
        type: String,
        default: "",
    },
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    subtitle: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    advantageTitle: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    advantageDescription: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    highlight: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
});
const journeySectionSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    steps: {
        type: [journeyStepSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   08. REFERRAL PARTNERSHIP
========================================================= */
const partnershipStepSchema = new Schema({
    icon: {
        type: String,
        default: "",
    },
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
});
const partnershipSectionSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    image: {
        type: imageSchema,
        default: () => ({}),
    },
    steps: {
        type: [partnershipStepSchema],
        default: [],
    },
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   09. FAQ SECTION
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
});
const faqSectionSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    faqs: {
        type: [faqItemSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   SEO
========================================================= */
const seoSchema = new Schema({
    metaTitle: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    metaDescription: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    keywords: {
        en: {
            type: [String],
            default: [],
        },
        ar: {
            type: [String],
            default: [],
        },
    },
    canonicalUrl: {
        type: String,
        default: "",
    },
    ogImage: {
        type: imageSchema,
        default: () => ({}),
    },
    noIndex: {
        type: Boolean,
        default: false,
    },
    noFollow: {
        type: Boolean,
        default: false,
    },
}, { _id: false });
/* =========================================================
   MAIN PAGE SCHEMA
========================================================= */
const spacesPageSchema = new Schema({
    pageName: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
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
        intro: {
            type: introSectionSchema,
            default: () => ({}),
        },
        featuredSpaces: {
            type: featuredSpacesSchema,
            default: () => ({}),
        },
        showcase: {
            type: showcaseSectionSchema,
            default: () => ({}),
        },
        whyChooseT1: {
            type: whyChooseSectionSchema,
            default: () => ({}),
        },
        signatureProjects: {
            type: signatureProjectsSchema,
            default: () => ({}),
        },
        journey: {
            type: journeySectionSchema,
            default: () => ({}),
        },
        partnership: {
            type: partnershipSectionSchema,
            default: () => ({}),
        },
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
const SpacesPage = mongoose.model("SpacesPage", spacesPageSchema);
export default SpacesPage;
