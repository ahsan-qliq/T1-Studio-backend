import mongoose from "mongoose";

import {
  localizedTextSchema,
  imageSchema,
  buttonSchema,
  sectionSettings,
} from "../shared/index.js";

const { Schema } = mongoose;

/* =========================================================
   01. BREADCRUMBS
========================================================= */

const breadcrumbItemSchema = new Schema(
  {
    label: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    href: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false },
);

/* =========================================================
   02. AUTHOR
========================================================= */

const authorSchema = new Schema(
  {
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
  },
  { _id: false },
);

/* =========================================================
   03. HERO
========================================================= */

const heroSectionSchema = new Schema(
  {
    ...sectionSettings,

    breadcrumbs: {
      type: [breadcrumbItemSchema],
      default: [],
    },

    category: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    heading: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    excerpt: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    image: {
      type: imageSchema,
      default: () => ({}),
    },

    author: {
      type: authorSchema,
      default: () => ({}),
    },

    publishedDate: {
      type: Date,
      default: null,
    },

    updatedDate: {
      type: Date,
      default: null,
    },

    readTime: {
      type: Number,
      default: null,
      min: 1,
    },

    enableShare: {
      type: Boolean,
      default: true,
    },

    overlayOpacity: {
      type: Number,
      default: 40,
      min: 0,
      max: 100,
    },
  },
  { _id: false },
);

/* =========================================================
   04. STEP ITEM
========================================================= */

const stepItemSchema = new Schema(
  {
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
  },
  { _id: false },
);

/* =========================================================
   05. TABLE
========================================================= */

const tableCellSchema = new Schema(
  {
    value: {
      type: localizedTextSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

const tableRowSchema = new Schema(
  {
    cells: {
      type: [tableCellSchema],
      default: [],
    },
  },
  { _id: false },
);

const tableSchema = new Schema(
  {
    headers: {
      type: [tableCellSchema],
      default: [],
    },

    rows: {
      type: [tableRowSchema],
      default: [],
    },
  },
  { _id: false },
);

/* =========================================================
   06. FAQ
========================================================= */

const faqItemSchema = new Schema(
  {
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
  },
  { _id: false },
);

/* =========================================================
   07. ARTICLE CONTENT BLOCK
========================================================= */

const contentBlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "heading",
        "paragraph",
        "list",
        "steps",
        "table",
        "faq",
      ],
      required: true,
    },

    anchorId: {
      type: String,
      default: "",
      trim: true,
    },

    eyebrow: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    heading: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    headingLevel: {
      type: Number,
      enum: [2, 3],
      default: 2,
    },

    /*
      Markdown can be stored here.
      Example:
      "Read more about [T1 Studio](https://t1-studio.com/about-t1-studio/)"
    */
    content: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    listItems: {
      type: [localizedTextSchema],
      default: [],
    },

    ordered: {
      type: Boolean,
      default: false,
    },

    steps: {
      type: [stepItemSchema],
      default: [],
    },

    table: {
      type: tableSchema,
      default: () => ({}),
    },

    faqs: {
      type: [faqItemSchema],
      default: [],
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: true,
  },
);

/* =========================================================
   08. ARTICLE CONTENT SECTION
========================================================= */

const articleContentSectionSchema = new Schema(
  {
    ...sectionSettings,

    blocks: {
      type: [contentBlockSchema],
      default: [],
    },
  },
  { _id: false },
);

/* =========================================================
   09. AUTHOR BIO
========================================================= */

const authorBioSectionSchema = new Schema(
  {
    ...sectionSettings,

    eyebrow: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    heading: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    author: {
      type: authorSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

/* =========================================================
   10. CTA
========================================================= */

const ctaSectionSchema = new Schema(
  {
    ...sectionSettings,

    eyebrow: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    heading: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    /*
      Supports Markdown links inside the CTA text.
    */
    description: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    button: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

/* =========================================================
   11. RELATED ARTICLES
========================================================= */

const relatedArticleItemSchema = new Schema(
  {
    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    category: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    description: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    readTime: {
      type: Number,
      default: null,
      min: 1,
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
  },
  { _id: false },
);

const relatedArticlesSectionSchema = new Schema(
  {
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
      type: [relatedArticleItemSchema],
      default: [],
    },

    button: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

/* =========================================================
   12. SEO
========================================================= */

const seoSchema = new Schema(
  {
    metaTitle: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    metaDescription: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    keywords: {
      type: [String],
      default: [],
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
  },
  { _id: false },
);

/* =========================================================
   MAIN BLOG DETAIL PAGE
========================================================= */

const blogDetailPageSchema = new Schema(
  {
    pageName: {
      type: String,
      default: "",
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
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

      authorBio: {
        type: authorBioSectionSchema,
        default: () => ({}),
      },

      cta: {
        type: ctaSectionSchema,
        default: () => ({}),
      },

      relatedArticles: {
        type: relatedArticlesSectionSchema,
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
  },
  {
    timestamps: true,
  },
);

/* =========================================================
   INDEXES
========================================================= */

blogDetailPageSchema.index({
  status: 1,
  publishedAt: -1,
});

/* =========================================================
   MODEL
========================================================= */

const BlogDetailPage = mongoose.model(
  "BlogDetailPage",
  blogDetailPageSchema,
);

export default BlogDetailPage;