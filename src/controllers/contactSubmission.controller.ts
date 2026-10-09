import { Request, Response } from "express";
import {
  createContactSubmissionService,
  listContactSubmissionsService,
} from "../services/contactSubmission.service.ts";
import type { ContactSubmissionType } from "../models/contactSubmission.model.ts";

const VALID_SUBMISSION_TYPES: ContactSubmissionType[] = [
  "homeOwner",
  "apartmentOwner",
  "propertyDeveloper",
];

export const createContactSubmission = async (req: Request, res: Response) => {
  try {
    const {
      submissionType,
      firstName,
      lastName,
      email,
      phone,
      propertyType,
      spaceRequired,
      typeOfService,
      timeline,
      companyName,
      message,
    } = req.body as Record<string, string>;

    if (!submissionType || !VALID_SUBMISSION_TYPES.includes(submissionType as ContactSubmissionType)) {
      res.status(400).json({
        success: false,
        message: `submissionType must be one of: ${VALID_SUBMISSION_TYPES.join(", ")}`,
      });
      return;
    }

    if (!firstName || !lastName || !email || !phone) {
      res.status(400).json({
        success: false,
        message: "firstName, lastName, email, and phone are required",
      });
      return;
    }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      res.status(400).json({ success: false, message: "Invalid email address" });
      return;
    }

    const submission = await createContactSubmissionService({
      submissionType: submissionType as ContactSubmissionType,
      firstName,
      lastName,
      email,
      phone,
      propertyType,
      spaceRequired,
      typeOfService,
      timeline,
      companyName,
      message,
    });

    res.status(201).json({ success: true, data: { id: submission._id } });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode ?? 500).json({ success: false, message: err.message });
  }
};

export const listContactSubmissions = async (req: Request, res: Response) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
    const submissionType = req.query.submissionType as ContactSubmissionType | undefined;

    if (submissionType && !VALID_SUBMISSION_TYPES.includes(submissionType)) {
      res.status(400).json({ success: false, message: "Invalid submissionType filter" });
      return;
    }

    const result = await listContactSubmissionsService({ page, limit, submissionType });
    res.status(200).json({ success: true, ...result });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode ?? 500).json({ success: false, message: err.message });
  }
};
