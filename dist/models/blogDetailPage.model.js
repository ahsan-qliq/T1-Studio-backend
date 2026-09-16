import mongoose, { Schema } from "mongoose";
import { localizedTextSchema, imageSchema, buttonSchema, sectionSettings, } from "../shared/index.js";
/* =========================================================
   AUTHOR
========================================================= */
const authorSchema = new Schema({
    name: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    designation: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    bio: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    image: {
        type: imageSchema,
        default: () => ({}),
    },
    linkedinUrl: {
        type: String,
        default: "",
        trim: true,
    },
    websiteUrl: {
        type: String,
        default: "",
        trim: true,
    },
}, {
    _id: false,
});
/* =========================================================
   ARTICLE CONTENT BLOCK
========================================================= */
const contentBlockSchema = new Schema({
    type: {
        type: String,
        enum: [
            "heading",
            "paragraph",
            "image",
            "gallery",
            "quote",
            "list",
            "button",
            "divider",
        ],
        required: true,
    },
    /* -----------------------------------------
       Heading
    ----------------------------------------- */
    level: {
        type: Number,
        enum: [2, 3, 4, 5, 6],
        default: 2,
    },
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    /* -----------------------------------------
       Paragraph / Quote
    ----------------------------------------- */
    content: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    /* -----------------------------------------
       Single Image
    ----------------------------------------- */
    image: {
        type: imageSchema,
        default: undefined,
    },
    caption: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    /* -----------------------------------------
       Gallery
    ----------------------------------------- */
    images: {
        type: [imageSchema],
        default: [],
    },
    /* -----------------------------------------
       List
    ----------------------------------------- */
    listStyle: {
        type: String,
        enum: ["bullet", "number"],
        default: "bullet",
    },
    listItems: {
        type: [localizedTextSchema],
        default: [],
    },
    /* -----------------------------------------
       Button
    ----------------------------------------- */
    button: {
        type: buttonSchema,
        default: undefined,
    },
    /* -----------------------------------------
       General
    ----------------------------------------- */
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
/* =========================================================
   01. HERO / ARTICLE HEADER
========================================================= */
const heroSectionSchema = new Schema({
    ...sectionSettings,
    eyebrow: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    excerpt: {
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
   02. ARTICLE CONTENT
========================================================= */
const articleContentSectionSchema = new Schema({
    ...sectionSettings,
    intro: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    blocks: {
        type: [contentBlockSchema],
        default: [],
    },
}, {
    _id: false,
});
/* =========================================================
   FORM OPTION
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
/* =========================================================
   FORM FIELD
========================================================= */
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
   03. CONSULTATION CTA
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
    successMessage: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
/* =========================================================
   RELATED ARTICLE
========================================================= */
const relatedArticleSchema = new Schema({
    blogSlug: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    category: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    readTime: {
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
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
/* =========================================================
   04. RELATED ARTICLES
========================================================= */
const relatedArticlesSectionSchema = new Schema({
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
    articles: {
        type: [relatedArticleSchema],
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
   05. AUTHOR SECTION
========================================================= */
const authorSectionSchema = new Schema({
    ...sectionSettings,
    heading: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    author: {
        type: authorSchema,
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
   MAIN BLOG POST
========================================================= */
const blogDetailPage = new Schema({
    title: {
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
    excerpt: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    categoryLabel: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    tags: {
        en: {
            type: [String],
            default: [],
        },
        ar: {
            type: [String],
            default: [],
        },
    },
    author: {
        type: authorSchema,
        default: () => ({}),
    },
    readTime: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    featuredImage: {
        type: imageSchema,
        default: () => ({}),
    },
    status: {
        type: String,
        enum: [
            "draft",
            "published",
            "archived",
        ],
        default: "draft",
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    sections: {
        hero: {
            type: heroSectionSchema,
            default: () => ({}),
        },
        articleContent: {
            type: articleContentSectionSchema,
            default: () => ({}),
        },
        consultation: {
            type: consultationSectionSchema,
            default: () => ({}),
        },
        relatedArticles: {
            type: relatedArticlesSectionSchema,
            default: () => ({}),
        },
        authorInfo: {
            type: authorSectionSchema,
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
/* =========================================================
   INDEXES
========================================================= */
blogDetailPage.index({
    category: 1,
    status: 1,
    publishedAt: -1,
});
blogDetailPage.index({
    isFeatured: 1,
    status: 1,
});
const BlogPost = mongoose.model("BlogPost", blogDetailPage);
export default BlogPost;
