import mongoose, { Schema } from "mongoose";

import {
  localizedTextSchema,
  imageSchema,
  buttonSchema,
  sectionSettings,
} from "../shared/index.ts";

/* =========================================================
   SPACE TYPE
========================================================= */

export enum SpaceType {
  KITCHEN = "kitchen",
  WARDROBE = "wardrobe",
  LIVING_ROOM = "living-room",
  BEDROOM = "bedroom",
  BATHROOM = "bathroom",
  HOME_OFFICE = "home-office",
  OUTDOOR_LIVING = "outdoor-living",
  BESPOKE_JOINERY = "bespoke-joinery",
}

/* =========================================================
   01. HERO SECTION
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
   02. INTRO / ABOUT SECTION
========================================================= */

const introSectionSchema = new Schema(
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

    button: {
      type: buttonSchema,
      default: () => ({}),
    },

    imagePosition: {
      type: String,
      enum: ["left", "right"],
      default: "left",
    },
  },
  { _id: false }
);

/* =========================================================
   03. BENEFITS / FEATURES SECTION
========================================================= */

const featureItemSchema = new Schema(
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

const featuresSectionSchema = new Schema(
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

    items: {
      type: [featureItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   04. STYLES / INSPIRATION CARDS
========================================================= */

const styleItemSchema = new Schema(
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

const stylesSectionSchema = new Schema(
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
      type: [styleItemSchema],
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
  },
  { _id: false }
);

/* =========================================================
   05. GALLERY / SHOWCASE
========================================================= */

const galleryItemSchema = new Schema(
  {
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
  },
  { _id: true }
);

const gallerySectionSchema = new Schema(
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
   06. MATERIALS & FINISHES
========================================================= */

const materialItemSchema = new Schema(
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

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const materialsSectionSchema = new Schema(
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

    materials: {
      type: [materialItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* =========================================================
   07. BRAND LOGOS
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
  },
  { _id: true }
);

const brandsSectionSchema = new Schema(
  {
    ...sectionSettings,

    heading: {
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
   08. RELATED / PUBLISHED PROJECTS
========================================================= */

const projectItemSchema = new Schema(
  {
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
  },
  { _id: true }
);

const relatedProjectsSectionSchema = new Schema(
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
   09. PROJECT JOURNEY
========================================================= */

const journeyStepSchema = new Schema(
  {
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
   10. FAQ
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
   11. RELATED SPACES
========================================================= */

const relatedSpaceItemSchema = new Schema(
  {
    spaceType: {
      type: String,
      enum: Object.values(SpaceType),
      required: true,
    },

    title: {
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

const relatedSpacesSectionSchema = new Schema(
  {
    ...sectionSettings,

    heading: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    spaces: {
      type: [relatedSpaceItemSchema],
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
   12. CONSULTATION CTA
========================================================= */

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

    button: {
      type: buttonSchema,
      default: () => ({}),
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
   MAIN SPACE DETAIL PAGE
========================================================= */

const spaceDetailPageSchema = new Schema(
  {
    pageName: {
      type: String,
      required: true,
      trim: true,
    },

    spaceType: {
      type: String,
      enum: Object.values(SpaceType),
      required: true,
      unique: true,
      index: true,
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

      features: {
        type: featuresSectionSchema,
        default: () => ({}),
      },

      styles: {
        type: stylesSectionSchema,
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

      brands: {
        type: brandsSectionSchema,
        default: () => ({}),
      },

      relatedProjects: {
        type: relatedProjectsSectionSchema,
        default: () => ({}),
      },

      journey: {
        type: journeySectionSchema,
        default: () => ({}),
      },

      faq: {
        type: faqSectionSchema,
        default: () => ({}),
      },

      relatedSpaces: {
        type: relatedSpacesSectionSchema,
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
  },
  {
    timestamps: true,
  }
);

const SpaceDetailPage = mongoose.model(
  "SpaceDetailPage",
  spaceDetailPageSchema
);

export default SpaceDetailPage;