import mongoose, { Schema } from "mongoose";

import {
  localizedTextSchema,
  imageSchema,
  buttonSchema,
  sectionSettings,
} from "../shared/index.ts";

/* =========================================================
   01. HERO
========================================================= */

const heroSectionSchema = new Schema(
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
  },
  { _id: false }
);

/* =========================================================
   02. OUR STORY
========================================================= */

const storySectionSchema = new Schema(
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

    secondaryDescription: {
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
      default: "left",
    },

    button: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

/* =========================================================
   03. OUR JOURNEY
========================================================= */

const journeyItemSchema = new Schema(
  {
    icon: {
      type: String,
      default: "",
    },

    year: {
      type: String,
      default: "",
      trim: true,
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
  },
  { _id: true }
);

const journeySectionSchema = new Schema(
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

    items: {
      type: [journeyItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   04. OUR PHILOSOPHY
========================================================= */

const philosophyItemSchema = new Schema(
  {
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
  },
  { _id: true }
);

const philosophySectionSchema = new Schema(
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

    items: {
      type: [philosophyItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   05. OUR VALUES
========================================================= */

const valueItemSchema = new Schema(
  {
    title: {
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
      trim: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const valuesSectionSchema = new Schema(
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

    values: {
      type: [valueItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   06. STATS
========================================================= */

const statItemSchema = new Schema(
  {
    value: {
      type: String,
      default: "",
      trim: true,
    },

    label: {
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
  { _id: true }
);

const statsSectionSchema = new Schema(
  {
    ...sectionSettings,

    heading: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    stats: {
      type: [statItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   07. OUR TEAM
========================================================= */

const teamMemberSchema = new Schema(
  {
    name: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    designation: {
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

    email: {
      type: String,
      default: "",
      trim: true,
    },

    linkedinUrl: {
      type: String,
      default: "",
      trim: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const teamSectionSchema = new Schema(
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

    members: {
      type: [teamMemberSchema],
      default: [],
    },

    autoplay: {
      type: Boolean,
      default: false,
    },

    showNavigation: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

/* =========================================================
   08. SHOWCASE / GALLERY
========================================================= */

const galleryItemSchema = new Schema(
  {
    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    caption: {
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
  },
  { _id: true }
);

const showcaseSectionSchema = new Schema(
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
  },
  { _id: false }
);

/* =========================================================
   09. TRUSTED BRANDS
========================================================= */

const brandItemSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },

    logo: {
      type: imageSchema,
      default: () => ({}),
    },

    href: {
      type: String,
      default: "",
      trim: true,
    },

    openInNewTab: {
      type: Boolean,
      default: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const brandsSectionSchema = new Schema(
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

    brands: {
      type: [brandItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   10. REFERRAL PARTNERSHIP
========================================================= */

const partnershipStepSchema = new Schema(
  {
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
  },
  { _id: true }
);

const partnershipSectionSchema = new Schema(
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
  },
  { _id: false }
);

/* =========================================================
   11. FAQ
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
  { _id: true }
);

const faqSectionSchema = new Schema(
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

    faqs: {
      type: [faqItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   SEO
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
  },
  { _id: false }
);

/* =========================================================
   MAIN ABOUT PAGE
========================================================= */

const aboutPageSchema = new Schema(
  {
    pageName: {
      type: String,
      default: "About Us",
      trim: true,
    },

    slug: {
      type: String,
      default: "about",
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

      story: {
        type: storySectionSchema,
        default: () => ({}),
      },

      journey: {
        type: journeySectionSchema,
        default: () => ({}),
      },

      philosophy: {
        type: philosophySectionSchema,
        default: () => ({}),
      },

      values: {
        type: valuesSectionSchema,
        default: () => ({}),
      },

      stats: {
        type: statsSectionSchema,
        default: () => ({}),
      },

      team: {
        type: teamSectionSchema,
        default: () => ({}),
      },

      showcase: {
        type: showcaseSectionSchema,
        default: () => ({}),
      },

      brands: {
        type: brandsSectionSchema,
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
  },
  {
    timestamps: true,
  }
);

const AboutPage = mongoose.model(
  "AboutPage",
  aboutPageSchema
);

export default AboutPage;