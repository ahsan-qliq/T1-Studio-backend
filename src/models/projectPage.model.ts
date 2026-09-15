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
  {
    _id: false,
  }
);

/* =========================================================
   PROJECT CATEGORY / FILTER
========================================================= */

const projectFilterSchema = new Schema(
  {
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
  },
  {
    _id: true,
  }
);

/* =========================================================
   PROJECT CARD
========================================================= */

const projectCardSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
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
      type: String,
      default: "",
      trim: true,
    },

    shortDescription: {
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

    featured: {
      type: Boolean,
      default: false,
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
  {
    _id: true,
  }
);

/* =========================================================
   02. ALL PROJECTS
========================================================= */

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

    filters: {
      type: [projectFilterSchema],
      default: [],
    },

    projects: {
      type: [projectCardSchema],
      default: [],
    },

    loadMoreButton: {
      type: buttonSchema,
      default: () => ({}),
    },

    enableFilters: {
      type: Boolean,
      default: true,
    },

    enableLoadMore: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   03. CLIENT TESTIMONIALS
========================================================= */

const testimonialItemSchema = new Schema(
  {
    clientName: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    designation: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    testimonial: {
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
  },
  {
    _id: true,
  }
);

const testimonialsSectionSchema = new Schema(
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

    testimonials: {
      type: [testimonialItemSchema],
      default: [],
    },

    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   04. BEFORE & AFTER
========================================================= */

const beforeAfterItemSchema = new Schema(
  {
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

    projectHref: {
      type: String,
      default: "",
      trim: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: true,
  }
);

const beforeAfterSectionSchema = new Schema(
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
      type: [beforeAfterItemSchema],
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
  {
    _id: false,
  }
);

/* =========================================================
   05. PARTNERSHIP
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
  {
    _id: true,
  }
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
  {
    _id: false,
  }
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
  {
    _id: true,
  }
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
  {
    _id: false,
  }
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
  {
    _id: false,
  }
);

/* =========================================================
   MAIN PROJECT PAGE
========================================================= */

const projectPageSchema = new Schema(
  {
    pageName: {
      type: String,
      default: "Projects",
      trim: true,
    },

    slug: {
      type: String,
      default: "projects",
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

      projects: {
        type: projectsSectionSchema,
        default: () => ({}),
      },

      testimonials: {
        type: testimonialsSectionSchema,
        default: () => ({}),
      },

      beforeAfter: {
        type: beforeAfterSectionSchema,
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

const ProjectPage = mongoose.model(
  "ProjectPage",
  projectPageSchema
);

export default ProjectPage;