import { Request, Response } from "express";
import {
  createLeadService,
  getLeadsService,
  getLeadByIdService,
  ZohoLeadInput,
} from "../services/zoho.service.ts";

export const createLead = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, company, leadSource, description } =
      req.body as ZohoLeadInput;

    if (!firstName || !lastName || !email) {
      res
        .status(400)
        .json({ success: false, message: "firstName, lastName, and email are required" });
      return;
    }

    const lead = await createLeadService({
      firstName,
      lastName,
      email,
      phone,
      company,
      leadSource,
      description,
    });

    res.status(201).json({ success: true, data: lead });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = Math.min(parseInt(req.query.perPage as string) || 20, 200);

    const result = await getLeadsService(page, perPage);
    res.status(200).json({ success: true, ...result });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

export const getLeadById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ success: false, message: "Lead ID is required" });
      return;
    }

    const lead = await getLeadByIdService(id);
    res.status(200).json({ success: true, data: lead });
  } catch (error: unknown) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};
