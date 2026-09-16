import mongoose, { Schema } from "mongoose";
import { localizedTextSchema, imageSchema, buttonSchema, sectionSettings, } from "../shared/index.js";
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
    overlayOpacity: {
        type: Number,
        default: 40,
        min: 0,
        max: 100,
    },
}, {
    _id: false,
});
/* =========================================================
   02. CONTACT INFORMATION
========================================================= */
const contactItemSchema = new Schema({
    type: {
        type: String,
        enum: [
            "phone",
            "email",
            "whatsapp",
            "address",
            "working-hours",
            "custom",
        ],
        default: "custom",
    },
    icon: {
        type: String,
        default: "",
    },
    title: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    value: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    secondaryValue: {
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
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
const contactInfoSectionSchema = new Schema({
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
        type: [contactItemSchema],
        default: [],
    },
}, {
    _id: false,
});
/* =========================================================
   CONTACT FORM COMMON SCHEMAS
========================================================= */
const formOptionSchema = new Schema({
    value: {
        type: String,
        required: true,
        trim: true,
    },
    label: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
const formFieldSchema = new Schema({
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
}, {
    _id: true,
});
/* =========================================================
   FORM TAB
========================================================= */
const formTabSchema = new Schema({
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
}, {
    _id: true,
});
/* =========================================================
   03. CONSULTATION / CONTACT FORM
========================================================= */
const contactFormSectionSchema = new Schema({
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
        type: [formTabSchema],
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
    errorMessage: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
/* =========================================================
   04. LOCATION / MAP
========================================================= */
const mapLocationSchema = new Schema({
    name: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    address: {
        type: localizedTextSchema,
        default: () => ({}),
    },
    latitude: {
        type: Number,
        default: null,
    },
    longitude: {
        type: Number,
        default: null,
    },
    googleMapsUrl: {
        type: String,
        default: "",
        trim: true,
    },
    phone: {
        type: String,
        default: "",
        trim: true,
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    _id: true,
});
const locationSectionSchema = new Schema({
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
    locations: {
        type: [mapLocationSchema],
        default: [],
    },
    mapEmbedUrl: {
        type: String,
        default: "",
        trim: true,
    },
    mapZoom: {
        type: Number,
        default: 14,
        min: 1,
        max: 20,
    },
    button: {
        type: buttonSchema,
        default: () => ({}),
    },
}, {
    _id: false,
});
/* =========================================================
   05. FAQ
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
}, {
    _id: true,
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
}, {
    _id: false,
});
/* =========================================================
   SEO
========================================================= */
const seoSchema = new Schema({
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
}, {
    _id: false,
});
/* =========================================================
   MAIN CONTACT PAGE
========================================================= */
const contactPageSchema = new Schema({
    pageName: {
        type: String,
        default: "Contact Us",
        trim: true,
    },
    slug: {
        type: String,
        default: "contact",
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
        contactInfo: {
            type: contactInfoSectionSchema,
            default: () => ({}),
        },
        contactForm: {
            type: contactFormSectionSchema,
            default: () => ({}),
        },
        location: {
            type: locationSectionSchema,
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
}, {
    timestamps: true,
});
const ContactPage = mongoose.model("ContactPage", contactPageSchema);
export default ContactPage;
