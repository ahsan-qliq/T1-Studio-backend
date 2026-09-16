import mongoose, { Schema } from "mongoose";
import { localizedTextSchema, imageSchema, buttonSchema, sectionSettings, } from "../shared/index.js";
/* =========================================================
   01. HERO + PROJECT STATS
========================================================= */
const projectStatSchema = new Schema({
    value: {
        type: String,
        default: "",
        trim: true,
    },
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    icon: {
        type: String,
        default: "",
    },
}, {
    _id: true,
});
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
    location: {
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
    stats: {
        type: [projectStatSchema],
        default: [],
    },
    overlayOpacity: {
        type: Number,
        default: 40,
        min: 0,
        max: 100,
    },
}, {
    _id: false,
});
/* =========================================================
   02. PROJECT OVERVIEW
========================================================= */
const overviewSectionSchema = new Schema({
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
    imagePosition: {
        type: String,
        enum: ["left", "right"],
        default: "right",
    },
}, {
    _id: false,
});
/* =========================================================
   03. BEFORE & AFTER
========================================================= */
const beforeAfterItemSchema = new Schema({
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    beforeImage: {
        type: imageSchema,
        default: () => ({}),
    },
    afterImage: {
        type: imageSchema,
        default: () => ({}),
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
const beforeAfterSectionSchema = new Schema({
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
    items: {
        type: [beforeAfterItemSchema],
        default: [],
    },
    showNavigation: {
        type: Boolean,
        default: true,
    },
    autoplay: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
});
/* =========================================================
   04. PROJECT GALLERY
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
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
const gallerySectionSchema = new Schema({
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
    images: {
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
}, {
    _id: false,
});
/* =========================================================
   05. MATERIAL INSPIRATION
========================================================= */
const materialItemSchema = new Schema({
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
    image: {
        type: imageSchema,
        default: () => ({}),
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
const materialsSectionSchema = new Schema({
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
    materials: {
        type: [materialItemSchema],
        default: [],
    },
}, {
    _id: false,
});
/* =========================================================
   06. PROJECT INFORMATION / DETAILS
========================================================= */
const projectDetailItemSchema = new Schema({
    icon: {
        type: String,
        default: "",
    },
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    value: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
const projectInfoSectionSchema = new Schema({
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
    details: {
        type: [projectDetailItemSchema],
        default: [],
    },
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
/* =========================================================
   07. CLIENT TESTIMONIAL
========================================================= */
const testimonialItemSchema = new Schema({
    clientName: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    designation: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    quote: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    image: {
        type: imageSchema,
        default: () => ({}),
    },
    videoUrl: {
        type: String,
        default: "",
        trim: true,
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
const testimonialSectionSchema = new Schema({
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
    testimonials: {
        type: [testimonialItemSchema],
        default: [],
    },
    autoplay: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
});
/* =========================================================
   08. RELATED PROJECTS
========================================================= */
const relatedProjectItemSchema = new Schema({
    projectSlug: {
        type: String,
        default: "",
        trim: true,
    },
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    location: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    category: {
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
        trim: true,
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
}, {
    _id: true,
});
const relatedProjectsSectionSchema = new Schema({
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
        type: [relatedProjectItemSchema],
        default: [],
    },
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
/* =========================================================
   CONSULTATION FORM COMMON SUB-SCHEMAS
========================================================= */
const formOptionSchema = new Schema({
    value: {
        type: String,
        required: true,
        trim: true,
    },
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
const formFieldSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    placeholder: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    type: {
        type: String,
        enum: [
            "text",
            "email",
            "phone",
            "number",
            "textarea",
            "select",
        ],
        default: "text",
    },
    required: {
        type: Boolean,
        default: false,
    },
    options: {
        type: [formOptionSchema],
        default: [],
    },
}, {
    _id: true,
});
/* =========================================================
   09. CONSULTATION CTA
========================================================= */
const consultationSectionSchema = new Schema({
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
    fields: {
        type: [formFieldSchema],
        default: [],
    },
    submitButtonLabel: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
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
        trim: true,
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
}, {
    _id: false,
});
/* =========================================================
   MAIN PROJECT DETAIL PAGE
========================================================= */
const projectDetailPageSchema = new Schema({
    pageName: {
        type: String,
        required: true,
        trim: true,
    },
    projectName: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },
    projectCategory: {
        type: String,
        default: "",
        trim: true,
        index: true,
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
        overview: {
            type: overviewSectionSchema,
            default: () => ({}),
        },
        beforeAfter: {
            type: beforeAfterSectionSchema,
            default: () => ({}),
        },
        gallery: {
            type: gallerySectionSchema,
            default: () => ({}),
        },
        materials: {
            type: materialsSectionSchema,
            default: () => ({}),
        },
        projectInfo: {
            type: projectInfoSectionSchema,
            default: () => ({}),
        },
        testimonial: {
            type: testimonialSectionSchema,
            default: () => ({}),
        },
        relatedProjects: {
            type: relatedProjectsSectionSchema,
            default: () => ({}),
        },
        consultation: {
            type: consultationSectionSchema,
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
const ProjectDetailPage = mongoose.model("ProjectDetailPage", projectDetailPageSchema);
export default ProjectDetailPage;
