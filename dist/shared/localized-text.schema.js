import mongoose from "mongoose";
const { Schema } = mongoose;
export const localizedTextSchema = new Schema({
    en: {
        type: String,
        default: "",
        trim: true,
    },
    ar: {
        type: String,
        default: "",
        trim: true,
    },
}, { _id: false });
