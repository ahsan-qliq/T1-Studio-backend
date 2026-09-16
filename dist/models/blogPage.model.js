import mongoose, { Schema } from "mongoose";
import { localizedTextSchema, imageSchema, buttonSchema, sectionSettings, } from "../shared/index.js";
/* =========================================================
   01. HERO
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
   BLOG CATEGORY
========================================================= */
const blogCategorySchema = new Schema({
    key: {
        type: String,
        required: true,
        trim: true,
    },
    label: {
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
/* =========================================================
   BLOG CARD
========================================================= */
const blogItemSchema = new Schema({
    blogSlug: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    excerpt: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    category: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    categoryKey: {
        type: String,
        default: "",
        trim: true,
    },
    author: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    readTime: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    publishedDate: {
        type: Date,
        default: null,
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
    featured: {
        type: Boolean,
        default: false,
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
/* =========================================================
   02. BLOG LISTING
========================================================= */
const blogListingSectionSchema = new Schema({
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
    categories: {
        type: [blogCategorySchema],
        default: [],
    },
    /* -----------------------------------------
       Main highlighted blog
    ----------------------------------------- */
    featuredArticle: {
        type: blogItemSchema,
        default: () => ({}),
    },
    /* -----------------------------------------
       Remaining blogs
    ----------------------------------------- */
    articles: {
        type: [blogItemSchema],
        default: [],
    },
    enableCategoryFilter: {
        type: Boolean,
        default: true,
    },
    enableLoadMore: {
        type: Boolean,
        default: true,
    },
    initialDisplayCount: {
        type: Number,
        default: 6,
        min: 1,
    },
    loadMoreCount: {
        type: Number,
        default: 6,
        min: 1,
    },
    loadMoreButton: {
        type: buttonSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
/* =========================================================
   03. REFERRAL PARTNERSHIP
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
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
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
}, {
    _id: false,
});
/* =========================================================
   04. FAQ
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
}, {
    _id: true,
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
   MAIN BLOG PAGE
========================================================= */
const blogPageSchema = new Schema({
    pageName: {
        type: String,
        default: "Blog",
        trim: true,
    },
    slug: {
        type: String,
        default: "blog",
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
        blogListing: {
            type: blogListingSectionSchema,
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
const BlogPage = mongoose.model("BlogPage", blogPageSchema);
export default BlogPage;
