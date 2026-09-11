import mongoose from "mongoose";
import { localizedTextSchema } from "./localized-text.schema.ts";

const { Schema } = mongoose;

export const buttonSchema = new Schema(
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

    openInNewTab: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);
