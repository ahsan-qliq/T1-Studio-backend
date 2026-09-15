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
  },
  { _id: false }
);

/* =========================================================
   02. PARTNER / BRAND LOGOS
========================================================= */

const logoItemSchema = new Schema(
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

const logosSectionSchema = new Schema(
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

    logos: {
      type: [logoItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   03. WHO WE WORK WITH
========================================================= */

const partnerTypeItemSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
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

const whoWeWorkWithSectionSchema = new Schema(
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
      type: [partnerTypeItemSchema],
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
   04. TRADE JOURNEY / PROCESS
========================================================= */

const journeyStepSchema = new Schema(
  {
    number: {
      type: String,
      default: "",
    },

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

    highlight: {
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

    steps: {
      type: [journeyStepSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   05. STATS
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
   06. FEATURED / COMMERCIAL PROJECTS
========================================================= */

const projectItemSchema = new Schema(
  {
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
  },
  { _id: true }
);

const projectsSectionSchema = new Schema(
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

    projects: {
      type: [projectItemSchema],
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
   07. WHY PARTNER WITH T1 / BENEFITS
========================================================= */

const benefitItemSchema = new Schema(
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

const benefitsSectionSchema = new Schema(
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
      type: [benefitItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   08. PARTNERSHIP SERVICES
========================================================= */

const serviceItemSchema = new Schema(
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

const partnershipServicesSectionSchema = new Schema(
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

    services: {
      type: [serviceItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   09. INDUSTRY / TRADE SERVICES
========================================================= */

const industryServiceItemSchema = new Schema(
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

const industryServicesSectionSchema = new Schema(
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
      type: [industryServiceItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   10. RESOURCE CENTER
========================================================= */

const resourceItemSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "brochure",
        "catalogue",
        "technical-document",
        "guide",
        "download",
        "link",
      ],
      default: "download",
    },

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

    fileUrl: {
      type: String,
      default: "",
      trim: true,
    },

    href: {
      type: String,
      default: "",
      trim: true,
    },

    buttonLabel: {
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

const resourcesSectionSchema = new Schema(
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

    resources: {
      type: [resourceItemSchema],
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
   11. PREFERRED SUPPLIER CTA
========================================================= */

const supplierCTASectionSchema = new Schema(
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

    benefits: {
      type: [localizedTextSchema],
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
   12. DESIGN TIPS & INSIGHTS
========================================================= */

const articleItemSchema = new Schema(
  {
    slug: {
      type: String,
      default: "",
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

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const designTipsSectionSchema = new Schema(
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
      type: [articleItemSchema],
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
   13. REFERRAL PARTNERSHIP
========================================================= */

const referralStepSchema = new Schema(
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

const referralSectionSchema = new Schema(
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
      type: [referralStepSchema],
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
   14. CONSULTATION / LEAD FORM
========================================================= */

const formOptionSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },

    label: {
      type: localizedTextSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const formFieldSchema = new Schema(
  {
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
  },
  { _id: true }
);

const consultationSectionSchema = new Schema(
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

    fields: {
      type: [formFieldSchema],
      default: [],
    },

    submitButtonLabel: {
      type: localizedTextSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

/* =========================================================
   15. FAQ
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
   MAIN TRADE PAGE
========================================================= */

const tradePageSchema = new Schema(
  {
    pageName: {
      type: String,
      default: "Trade",
      trim: true,
    },

    slug: {
      type: String,
      default: "trade",
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

      logos: {
        type: logosSectionSchema,
        default: () => ({}),
      },

      whoWeWorkWith: {
        type: whoWeWorkWithSectionSchema,
        default: () => ({}),
      },

      journey: {
        type: journeySectionSchema,
        default: () => ({}),
      },

      stats: {
        type: statsSectionSchema,
        default: () => ({}),
      },

      projects: {
        type: projectsSectionSchema,
        default: () => ({}),
      },

      benefits: {
        type: benefitsSectionSchema,
        default: () => ({}),
      },

      partnershipServices: {
        type: partnershipServicesSectionSchema,
        default: () => ({}),
      },

      industryServices: {
        type: industryServicesSectionSchema,
        default: () => ({}),
      },

      resources: {
        type: resourcesSectionSchema,
        default: () => ({}),
      },

      supplierCTA: {
        type: supplierCTASectionSchema,
        default: () => ({}),
      },

      designTips: {
        type: designTipsSectionSchema,
        default: () => ({}),
      },

      referral: {
        type: referralSectionSchema,
        default: () => ({}),
      },

      consultation: {
        type: consultationSectionSchema,
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

const TradePage = mongoose.model(
  "TradePage",
  tradePageSchema
);

export default TradePage;