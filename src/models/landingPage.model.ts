
import mongoose, { Schema } from "mongoose";

import {
  localizedTextSchema,
  imageSchema,
  buttonSchema,
  sectionSettings,
} from "../shared/index.ts";

/* =========================================================
   COMMON FORM OPTION
========================================================= */

const formOptionSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: localizedTextSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   COMMON FORM FIELD
========================================================= */

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
  {
    _id: true,
  }
);

/* =========================================================
   01. HERO + LEAD FORM
========================================================= */

const heroFormSchema = new Schema(
  {
    heading: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    description: {
      type: localizedTextSchema,
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
  },
  {
    _id: false,
  }
);

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

    form: {
      type: heroFormSchema,
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
   02. STATS
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
  {
    _id: true,
  }
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
  {
    _id: false,
  }
);

/* =========================================================
   03. VISION / INTRO
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
  {
    _id: false,
  }
);

/* =========================================================
   04. SIGNATURE PROJECTS
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
  {
    _id: true,
  }
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
  {
    _id: false,
  }
);

/* =========================================================
   05. HOW IT WORKS
========================================================= */

const processStepSchema = new Schema(
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

    description: {
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

const processSectionSchema = new Schema(
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
      type: [processStepSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   06. BENEFITS / WHY T1
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
  {
    _id: true,
  }
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
   07. TESTIMONIALS
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
   09. DREAM SPACE / LEAD FORM
========================================================= */

const consultationTabSchema = new Schema(
  {
    label: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    description: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    value: {
      type: String,
      required: true,
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

    tabs: {
      type: [consultationTabSchema],
      default: [],
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
   MAIN LANDING PAGE
========================================================= */

const landingPageSchema = new Schema(
  {
    pageName: {
      type: String,
      default: "Landing Page",
      trim: true,
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

      stats: {
        type: statsSectionSchema,
        default: () => ({}),
      },

      intro: {
        type: introSectionSchema,
        default: () => ({}),
      },

      projects: {
        type: projectsSectionSchema,
        default: () => ({}),
      },

      process: {
        type: processSectionSchema,
        default: () => ({}),
      },

      benefits: {
        type: benefitsSectionSchema,
        default: () => ({}),
      },

      testimonials: {
        type: testimonialsSectionSchema,
        default: () => ({}),
      },

      faq: {
        type: faqSectionSchema,
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

const LandingPage = mongoose.model(
  "LandingPage",
  landingPageSchema
);

export default LandingPage;