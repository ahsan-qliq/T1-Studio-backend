import mongoose, { Schema } from "mongoose";

export type ContactSubmissionType = "homeOwner" | "apartmentOwner" | "propertyDeveloper";
export type ZohoSyncStatus = "pending" | "synced" | "failed";

const contactSubmissionSchema = new Schema(
  {
    submissionType: {
      type: String,
      enum: ["homeOwner", "apartmentOwner", "propertyDeveloper"] as ContactSubmissionType[],
      required: true,
      index: true,
    },

    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, lowercase: true, trim: true, index: true },
    phone:     { type: String, required: true, trim: true },

    propertyType:  { type: String, default: "" },
    spaceRequired: { type: String, default: "" },
    typeOfService: { type: String, default: "" },
    timeline:      { type: String, default: "" },

    companyName: { type: String, default: "" },
    message:     { type: String, default: "" },

    zohoLeadId:   { type: String, default: null },
    zohoStatus:   { type: String, enum: ["pending", "synced", "failed"] as ZohoSyncStatus[], default: "pending" },
    zohoError:    { type: String, default: null, select: false },
    zohoSyncedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Compound index to help detect near-duplicate submissions
contactSubmissionSchema.index({ email: 1, submissionType: 1, createdAt: -1 });

const ContactSubmission = mongoose.model("ContactSubmission", contactSubmissionSchema);

export default ContactSubmission;
