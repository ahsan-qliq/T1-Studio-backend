import mongoose from "mongoose";
import { localizedTextSchema } from "./localized-text.schema.js";
const { Schema } = mongoose;
export const imageSchema = new Schema({
    url: {
        type: String,
        default: "",
    },
    key: {
        type: String,
        default: "",
    },
    alt: {
        type: localizedTextSchema,
        default: () => ({}),
    },
}, { _id: false });
