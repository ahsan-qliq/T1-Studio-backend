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
   SHARED — simple title + body section
   Used by: About This Policy, What Cookies Are,
            Your Rights, Changes to This Policy
========================================================= */

const textSectionSchema = new Schema(
  {
    ...sectionSettings,

    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    body: {
      type: localizedTextSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

/* =========================================================
   03. THE COOKIES WE USE
========================================================= */

const cookieCategoryItemSchema = new Schema(
  {
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
  },
  { _id: true },
);

const cookieTypesSectionSchema = new Schema(
  {
    ...sectionSettings,

    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    body: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    categories: {
      type: [cookieCategoryItemSchema],
      default: [],
    },

    note: {
      type: localizedTextSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

/* =========================================================
   04. YOUR CHOICES
========================================================= */

const choicesSectionSchema = new Schema(
  {
    ...sectionSettings,

    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    body: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    // choice1, choice2, choice3
    choices: {
      type: [localizedTextSchema],
      default: [],
    },

    note: {
      type: localizedTextSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

/* =========================================================
   07. CONTACT US
========================================================= */

const contactSectionSchema = new Schema(
  {
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

    // contact1 (company), contact2 (email), contact3 (phone), contact4 (address)
    contactItems: {
      type: [localizedTextSchema],
      default: [],
    },
  },
  { _id: false },
);

/* =========================================================
   08. FAQ
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
  { _id: true },
);

const faqSectionSchema = new Schema(
  {
    ...sectionSettings,

    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    faqs: {
      type: [faqItemSchema],
      default: [],
    },
  },
  { _id: false },
);

/* =========================================================
   SHARED — table of contents metadata
========================================================= */

const tocMetaSchema = new Schema(
  {
    tocLabel: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    lastUpdated: {
      type: localizedTextSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

/* =========================================================
   MAIN COOKIE POLICY PAGE
========================================================= */

const cookiePolicyPageSchema = new Schema(
  {
    pageName: {
      type: String,
      default: "Cookie Policy",
      trim: true,
    },

    slug: {
      type: String,
      default: "cookie-policy",
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
      type: tocMetaSchema,
      default: () => ({}),
    },

    sections: {
      hero: {
        type: heroSectionSchema,
        default: () => ({}),
      },

      // section1
      aboutPolicy: {
        type: textSectionSchema,
        default: () => ({}),
      },

      // section2
      whatAreCookies: {
        type: textSectionSchema,
        default: () => ({}),
      },

      // section3
      cookieTypes: {
        type: cookieTypesSectionSchema,
        default: () => ({}),
      },

      // section4
      yourChoices: {
        type: choicesSectionSchema,
        default: () => ({}),
      },

      // section5
      yourRights: {
        type: textSectionSchema,
        default: () => ({}),
      },

      // section6
      changes: {
        type: textSectionSchema,
        default: () => ({}),
      },

      // section7
      contact: {
        type: contactSectionSchema,
        default: () => ({}),
      },

      // section8
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
  },
  {
    timestamps: true,
  },
);

const CookiePolicyPage = mongoose.model(
  "CookiePolicyPage",
  cookiePolicyPageSchema,
);

export default CookiePolicyPage;
