import mongoose from "mongoose";
import { localizedTextSchema, imageSchema, buttonSchema, sectionSettings, } from "../shared/index.ts";
const { Schema } = mongoose;
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
}, { _id: false });
/* =========================================================
   02. STATS
========================================================= */
const statItemSchema = new Schema({
    value: {
        type: String,
        default: "",
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
});
const statsSectionSchema = new Schema({
    ...sectionSettings,
    statistics: {
        type: [statItemSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   03. SERVICES
========================================================= */
const serviceItemSchema = new Schema({
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
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
});
const servicesSectionSchema = new Schema({
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
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   04. FEATURED SPACES
========================================================= */
const featuredSpaceItemSchema = new Schema({
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
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
});
const featuredSpacesSectionSchema = new Schema({
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
    spaces: {
        type: [featuredSpaceItemSchema],
        default: [],
    },
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   05. SIGNATURE PROJECTS
========================================================= */
const projectItemSchema = new Schema({
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    location: {
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
});
const signatureProjectsSectionSchema = new Schema({
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
}, { _id: false });
/* =========================================================
   06. PROCESS / JOURNEY
========================================================= */
const journeyStepSchema = new Schema({
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
});
const journeySectionSchema = new Schema({
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
}, { _id: false });
/* =========================================================
   07. WHY CHOOSE T1
========================================================= */
const comparisonItemSchema = new Schema({
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    available: {
        type: Boolean,
        default: true,
    },
}, { _id: false });
const comparisonColumnSchema = new Schema({
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
});
const whyChooseT1SectionSchema = new Schema({
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
}, { _id: false });
/* =========================================================
   08. TESTIMONIALS
========================================================= */
const testimonialItemSchema = new Schema({
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
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
});
const testimonialsSectionSchema = new Schema({
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
}, { _id: false });
/* =========================================================
   09. CONSULTATION CTA
========================================================= */
const formOptionSchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, { _id: false });
const consultationFieldSchema = new Schema({
    name: {
        type: String,
        required: true,
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
        enum: ["text", "email", "phone", "textarea", "number", "select"],
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
});
const consultationTabSchema = new Schema({
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
        default: "",
    },
});
const consultationCTASectionSchema = new Schema({
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
        type: [consultationFieldSchema],
        default: [],
    },
    submitButtonLabel: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, { _id: false });
/* =========================================================
   10. PARTNERSHIP
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
}, { _id: false });
/* =========================================================
   11. AWARDS & RECOGNITION
========================================================= */
const awardItemSchema = new Schema({
    name: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    caption: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    logo: {
        type: imageSchema,
        default: () => ({}),
    },
    href: {
        type: String,
        default: "",
    },
    openInNewTab: {
        type: Boolean,
        default: true,
    },
});
const awardsSectionSchema = new Schema({
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
    awards: {
        type: [awardItemSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   12. DESIGN TIPS / INSIGHTS
========================================================= */
const articleItemSchema = new Schema({
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
});
const designTipsSectionSchema = new Schema({
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
}, { _id: false });
/* =========================================================
   13. FAQ
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
}, { _id: false });
/* =========================================================
   14. LOCATION / FEATURE LINKS
========================================================= */
const linkItemSchema = new Schema({
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    href: {
        type: String,
        default: "",
        trim: true,
    },
    openInNewTab: {
        type: Boolean,
        default: false,
    },
});
const linkColumnSchema = new Schema({
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    description: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    links: {
        type: [linkItemSchema],
        default: [],
    },
});
const locationLinksSectionSchema = new Schema({
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
        type: [linkColumnSchema],
        default: [],
    },
}, { _id: false });
/* =========================================================
   MAIN HOME PAGE
========================================================= */
const homePageSchema = new Schema({
    pageName: {
        type: String,
        default: "Home",
        trim: true,
    },
    slug: {
        type: String,
        default: "home",
        unique: true,
        index: true,
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
        services: {
            type: servicesSectionSchema,
            default: () => ({}),
        },
        featuredSpaces: {
            type: featuredSpacesSectionSchema,
            default: () => ({}),
        },
        signatureProjects: {
            type: signatureProjectsSectionSchema,
            default: () => ({}),
        },
        journey: {
            type: journeySectionSchema,
            default: () => ({}),
        },
        whyChooseT1: {
            type: whyChooseT1SectionSchema,
            default: () => ({}),
        },
        testimonials: {
            type: testimonialsSectionSchema,
            default: () => ({}),
        },
        consultationCTA: {
            type: consultationCTASectionSchema,
            default: () => ({}),
        },
        partnership: {
            type: partnershipSectionSchema,
            default: () => ({}),
        },
        awardsRecognition: {
            type: awardsSectionSchema,
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
        locationLinks: {
            type: locationLinksSectionSchema,
            default: () => ({}),
        },
    },
    publishedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
const HomePage = mongoose.model("HomePage", homePageSchema);
export default HomePage;
