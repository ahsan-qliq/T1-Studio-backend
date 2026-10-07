import mongoose from "mongoose";
import { imageSchema } from "./image.schema.ts";
import { localizedTextSchema } from "./localized-text.schema.ts";

const { Schema } = mongoose;

export const seoSchema = new Schema(
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

    schema: {
      en: {
        type: Schema.Types.Mixed,
        default: null,
      },
      ar: {
        type: Schema.Types.Mixed,
        default: null,
      },
    },
  },
  { _id: false }
);
