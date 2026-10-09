import { v4 as uuidv4 } from "uuid";
import TradeSubmission from "../models/tradeSubmission.model.ts";
import type { TradeCategory, ApprovalStatus } from "../models/tradeSubmission.model.ts";
import { createLeadService } from "./zoho.service.ts";
import { sendAcceptanceEmail } from "./email.service.ts";

const { PUBLIC_WEBSITE_URL } = process.env;

const DUPLICATE_WINDOW_MS = 60 * 1000;

export interface CreateTradeSubmissionInput {
  category: TradeCategory;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // trade
  companyName?: string;
  companyType?: string;
  projectScale?: string;
  location?: string;
  // referral
  clientName?: string;
  referralSource?: string;
  clientType?: string;
}

export async function createTradeSubmissionService(
  input: CreateTradeSubmissionInput
) {
  const recentCutoff = new Date(Date.now() - DUPLICATE_WINDOW_MS);
  const duplicate = await TradeSubmission.findOne({
    email: input.email.toLowerCase(),
    category: input.category,
    createdAt: { $gte: recentCutoff },
  });

  if (duplicate) {
    const err = new Error(
      "A submission from this email was received recently. Please wait before submitting again."
    ) as Error & { statusCode: number };
    err.statusCode = 429;
    throw err;
  }

  const submission = await TradeSubmission.create({
    ...input,
    approvalStatus: "pending",
    zohoStatus: "pending",
    emailStatus: "not_sent",
    emailAttempts: 0,
  });

  // Forward to Zoho in the background
  createLeadService({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    company: input.companyName,
    leadSource: "Website",
    description: buildZohoDescription(input),
  })
    .then((lead) => {
      TradeSubmission.updateOne(
        { _id: submission._id },
        { zohoLeadId: lead.id, zohoStatus: "synced", zohoSyncedAt: new Date() }
      ).exec();
    })
    .catch((err: Error) => {
      TradeSubmission.updateOne(
        { _id: submission._id },
        { zohoStatus: "failed", zohoError: err.message }
      ).exec();
    });

  return submission;
}

function buildZohoDescription(input: CreateTradeSubmissionInput): string {
  if (input.category === "trade") {
    return [
      `Application type: Trade Partner`,
      input.companyName  ? `Company: ${input.companyName}`          : "",
      input.companyType  ? `Company type: ${input.companyType}`     : "",
      input.projectScale ? `Project scale: ${input.projectScale}`   : "",
      input.location     ? `Location: ${input.location}`            : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    `Application type: Referral Partner`,
    input.clientName     ? `Client name: ${input.clientName}`       : "",
    input.referralSource ? `Referral source: ${input.referralSource}` : "",
    input.clientType     ? `Client type: ${input.clientType}`       : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function listTradeSubmissionsService(params: {
  page: number;
  limit: number;
  category?: TradeCategory;
  approvalStatus?: ApprovalStatus;
}) {
  const { page, limit, category, approvalStatus } = params;
  const filter: Record<string, unknown> = {};
  if (category)       filter.category       = category;
  if (approvalStatus) filter.approvalStatus = approvalStatus;

  const [submissions, total] = await Promise.all([
    TradeSubmission.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("approvedBy", "name email")
      .lean(),
    TradeSubmission.countDocuments(filter),
  ]);

  return { submissions, total, page, limit, pages: Math.ceil(total / limit) };
}

export async function getTradeSubmissionByIdService(id: string) {
  const submission = await TradeSubmission.findById(id)
    .populate("approvedBy", "name email")
    .lean();

  if (!submission) {
    const err = new Error("Application not found") as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  return submission;
}

export async function updateTradeSubmissionStatusService(
  id: string,
  status: "accepted" | "rejected",
  adminId: string
) {
  const submission = await TradeSubmission.findById(id);

  if (!submission) {
    const err = new Error("Application not found") as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  if (submission.approvalStatus === status) {
    return submission.toObject();
  }

  if (status === "accepted") {
    // Generate referral link only once; idempotent on re-acceptance
    if (!submission.referralCode) {
      const code = uuidv4().replace(/-/g, "").slice(0, 12).toUpperCase();
      const base = (PUBLIC_WEBSITE_URL ?? "https://t1studio.com").replace(/\/$/, "");
      submission.referralCode        = code;
      submission.referralUrl         = `${base}/ref/${code}`;
      submission.referralGeneratedAt = new Date();
    }

    submission.approvalStatus = "accepted";
    submission.approvedAt     = new Date();
    submission.approvedBy     = adminId as unknown as typeof submission.approvedBy;
    submission.rejectedAt     = undefined as unknown as Date;

    await submission.save();

    // Send acceptance email only if not already sent
    if (submission.emailStatus !== "sent") {
      sendAcceptanceEmail({
        to:          submission.email,
        firstName:   submission.firstName,
        lastName:    submission.lastName,
        category:    submission.category as TradeCategory,
        referralUrl: submission.referralUrl!,
        referralCode: submission.referralCode!,
      })
        .then(() => {
          TradeSubmission.updateOne(
            { _id: submission._id },
            { emailStatus: "sent", emailSentAt: new Date(), $inc: { emailAttempts: 1 } }
          ).exec();
        })
        .catch((err: Error) => {
          TradeSubmission.updateOne(
            { _id: submission._id },
            { emailStatus: "failed", emailError: err.message, $inc: { emailAttempts: 1 } }
          ).exec();
        });
    }
  } else {
    submission.approvalStatus = "rejected";
    submission.rejectedAt     = new Date();
    submission.approvedBy     = adminId as unknown as typeof submission.approvedBy;
    submission.approvedAt     = undefined as unknown as Date;
    await submission.save();
  }

  return TradeSubmission.findById(submission._id)
    .populate("approvedBy", "name email")
    .lean();
}

export async function retryEmailService(id: string) {
  const submission = await TradeSubmission.findById(id);

  if (!submission) {
    const err = new Error("Application not found") as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  if (submission.approvalStatus !== "accepted") {
    const err = new Error("Email can only be retried for accepted applications") as Error & { statusCode: number };
    err.statusCode = 400;
    throw err;
  }

  if (submission.emailStatus === "sent") {
    const err = new Error("Acceptance email was already sent successfully") as Error & { statusCode: number };
    err.statusCode = 409;
    throw err;
  }

  if (!submission.referralUrl || !submission.referralCode) {
    const err = new Error("Referral link is missing; this submission may be in an inconsistent state") as Error & { statusCode: number };
    err.statusCode = 500;
    throw err;
  }

  await sendAcceptanceEmail({
    to:           submission.email,
    firstName:    submission.firstName,
    lastName:     submission.lastName,
    category:     submission.category as TradeCategory,
    referralUrl:  submission.referralUrl,
    referralCode: submission.referralCode,
  });

  await TradeSubmission.updateOne(
    { _id: submission._id },
    { emailStatus: "sent", emailSentAt: new Date(), $inc: { emailAttempts: 1 } }
  );

  return TradeSubmission.findById(id).populate("approvedBy", "name email").lean();
}
