import mongoose, { Schema } from "mongoose";

import {
  localizedTextSchema,
  imageSchema,
  sectionSettings,
  seoSchema,
} from "../shared/index.ts";

/* =========================================================
   01. HERO
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

const heroSectionSchema = new Schema(
  {
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
  },
  { _id: false },
);

/* =========================================================
   02. TERMS CONTENT
   Hierarchy:
     contentSection
       └── tcSectionItem  (section1, section2, section3, section4)
             └── tcSubsectionItem  (sub1_1…sub3_5, gen_A…gen_D)
                   ├── body          — plain paragraph text
                   └── bullets[]     — lettered bullet list (A, B, C…)
========================================================= */

const tcSubsectionItemSchema = new Schema(
  {
    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    body: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    // Used when the subsection renders as a lettered bullet list
    // (e.g. sub3_4A/B/C, sub3_5A/B, gen_A/B/C/D)
    bullets: {
      type: [localizedTextSchema],
      default: [],
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true },
);

const tcSectionItemSchema = new Schema(
  {
    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    // Section-level introductory paragraph (e.g. section1Intro)
    intro: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    subsections: {
      type: [tcSubsectionItemSchema],
      default: [],
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true },
);

const contentSectionSchema = new Schema(
  {
    ...sectionSettings,

    tocLabel: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    lastUpdated: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    items: {
      type: [tcSectionItemSchema],
      default: [],
    },
  },
  { _id: false },
);

/* =========================================================
   MAIN TERMS & CONDITIONS PAGE
========================================================= */

const termsConditionsPageSchema = new Schema(
  {
    pageName: {
      type: String,
      default: "Terms & Conditions",
      trim: true,
    },

    slug: {
      type: String,
      default: "terms-conditions",
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
  },
  {
    timestamps: true,
  },
);

const TermsConditionsPage = mongoose.model(
  "TermsConditionsPage",
  termsConditionsPageSchema,
);

export default TermsConditionsPage;
