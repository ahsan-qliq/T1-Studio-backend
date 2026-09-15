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
   02. WHY CLIENTS CHOOSE T1 / COMPARISON
========================================================= */

const comparisonItemSchema = new Schema(
  {
    label: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    description: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: true,
  }
);

const comparisonColumnSchema = new Schema(
  {
    title: {
      type: localizedTextSchema,
      default: () => ({}),
    },

    highlighted: {
      type: Boolean,
      default: false,
    },

    items: {
      type: [comparisonItemSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);

const comparisonSectionSchema = new Schema(
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

    columns: {
      type: [comparisonColumnSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   03. PROJECT JOURNEY
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
  {
    _id: true,
  }
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
  {
    _id: false,
  }
);

/* =========================================================
   04. STATS
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

    eyebrow: {
      type: localizedTextSchema,
      default: () => ({}),
    },

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
   05. MORE THAN BEAUTIFUL DESIGN / BENEFITS
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
  },
  {
    _id: false,
  }
);

/* =========================================================
   06. DESIGNER PICKS
========================================================= */

const designerPickItemSchema = new Schema(
  {
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

    image: {
      type: imageSchema,
      default: () => ({}),
    },

    category: {
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
  {
    _id: true,
  }
);

const designerPicksSectionSchema = new Schema(
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
      type: [designerPickItemSchema],
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
   07. TRUSTED BRANDS
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
  {
    _id: true,
  }
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
  {
    _id: false,
  }
);

/* =========================================================
   08. REFERRAL PARTNERSHIP
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
   09. DESIGN TIPS & INSIGHTS
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
  {
    _id: false,
  }
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
   MAIN WHY T1 PAGE
========================================================= */

const whyT1PageSchema = new Schema(
  {
    pageName: {
      type: String,
      default: "Why T1",
      trim: true,
    },

    slug: {
      type: String,
      default: "why-t1",
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

      comparison: {
        type: comparisonSectionSchema,
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

      benefits: {
        type: benefitsSectionSchema,
        default: () => ({}),
      },

      designerPicks: {
        type: designerPicksSectionSchema,
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

      designTips: {
        type: designTipsSectionSchema,
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

const WhyT1Page = mongoose.model(
  "WhyT1Page",
  whyT1PageSchema
);

export default WhyT1Page;