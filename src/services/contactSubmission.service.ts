import ContactSubmission from "../models/contactSubmission.model.ts";
import type { ContactSubmissionType } from "../models/contactSubmission.model.ts";
import { createLeadService } from "./zoho.service.ts";

export interface CreateContactSubmissionInput {
  submissionType: ContactSubmissionType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType?: string;
  spaceRequired?: string;
  typeOfService?: string;
  timeline?: string;
  companyName?: string;
  message?: string;
}

const DUPLICATE_WINDOW_MS = 60 * 1000; // 60 seconds

export async function createContactSubmissionService(
  input: CreateContactSubmissionInput
) {
  // Prevent duplicate submissions within the window
  const recentCutoff = new Date(Date.now() - DUPLICATE_WINDOW_MS);
  const duplicate = await ContactSubmission.findOne({
    email: input.email.toLowerCase(),
    submissionType: input.submissionType,
    createdAt: { $gte: recentCutoff },
  });

  if (duplicate) {
    const err = new Error(
      "A submission from this email was received recently. Please wait before submitting again."
    ) as Error & { statusCode: number };
    err.statusCode = 429;
    throw err;
  }

  // Persist first — Zoho failure must not lose the submission
  const submission = await ContactSubmission.create({
    ...input,
    zohoStatus: "pending",
  });

  // Forward to Zoho asynchronously; failures update the record but don't surface to caller
  const submissionTypeLabel: Record<ContactSubmissionType, string> = {
    homeOwner: "Home Owner",
    apartmentOwner: "Apartment Owner",
    propertyDeveloper: "Property Developer",
  };

  createLeadService({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    company: input.companyName,
    leadSource: "Website",
    description: [
      `Submission type: ${submissionTypeLabel[input.submissionType]}`,
      input.propertyType  ? `Property type: ${input.propertyType}`   : "",
      input.spaceRequired ? `Space required: ${input.spaceRequired}` : "",
      input.typeOfService ? `Type of service: ${input.typeOfService}` : "",
      input.timeline      ? `Timeline: ${input.timeline}`            : "",
      input.message       ? `Message: ${input.message}`              : "",
    ]
      .filter(Boolean)
      .join("\n"),
  })
    .then((lead) => {
      ContactSubmission.updateOne(
        { _id: submission._id },
        {
          zohoLeadId:   lead.id,
          zohoStatus:   "synced",
          zohoSyncedAt: new Date(),
        }
      ).exec();
    })
    .catch((err: Error) => {
      ContactSubmission.updateOne(
        { _id: submission._id },
        {
          zohoStatus: "failed",
          zohoError:  err.message,
        }
      ).exec();
    });

  return submission;
}

export async function listContactSubmissionsService(params: {
  page: number;
  limit: number;
  submissionType?: ContactSubmissionType;
}) {
  const { page, limit, submissionType } = params;
  const filter = submissionType ? { submissionType } : {};

  const [submissions, total] = await Promise.all([
    ContactSubmission.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    ContactSubmission.countDocuments(filter),
  ]);

  return {
    submissions,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
}
