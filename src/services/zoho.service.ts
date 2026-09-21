import {
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_REFRESH_TOKEN,
  ZOHO_ACCOUNTS_URL,
  ZOHO_API_BASE_URL,
} from "../config/zoho.ts";

/* =========================================================
   Types
========================================================= */

export interface ZohoLeadInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  leadSource?: string;
  description?: string;
}

export interface ZohoLeadRecord extends ZohoLeadInput {
  id: string;
  createdTime: string;
  modifiedTime: string;
}

interface ZohoTokenResponse {
  access_token: string;
  expires_in: number; // seconds
  token_type: string;
  error?: string;
}

interface ZohoApiResponse<T = Record<string, unknown>> {
  data?: T[];
  info?: Record<string, unknown>;
  code?: string;
  details?: Record<string, unknown>;
  message?: string;
  status?: string;
}

/* =========================================================
   In-memory token cache  (refreshed automatically ~5 min before expiry)
========================================================= */

let tokenCache: { accessToken: string; expiresAt: number } | null = null;

const getAccessToken = async (): Promise<string> => {
  const now = Date.now();

  if (tokenCache && tokenCache.expiresAt > now + 5 * 60 * 1000) {
    return tokenCache.accessToken;
  }

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    const err = new Error(
      "Zoho credentials are not configured. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN."
    ) as Error & { statusCode: number };
    err.statusCode = 503;
    throw err;
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    refresh_token: ZOHO_REFRESH_TOKEN,
  });

  const response = await fetch(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const body = (await response.json()) as ZohoTokenResponse;

  if (!response.ok || body.error) {
    const err = new Error(
      `Failed to obtain Zoho access token: ${body.error ?? response.statusText}`
    ) as Error & { statusCode: number };
    err.statusCode = 502;
    throw err;
  }

  tokenCache = {
    accessToken: body.access_token,
    expiresAt: now + body.expires_in * 1000,
  };

  return tokenCache.accessToken;
};

/* =========================================================
   Helpers
========================================================= */

const throwZohoError = (message: string, statusCode = 502): never => {
  const err = new Error(message) as Error & { statusCode: number };
  err.statusCode = statusCode;
  throw err;
};

const zohoFetch = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${ZOHO_API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Authorization": `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    throwZohoError(
      `Zoho API error ${response.status}: ${response.statusText}`,
      502
    );
  }

  return response.json() as Promise<T>;
};

/* =========================================================
   Lead Services
========================================================= */

export const createLeadService = async (
  input: ZohoLeadInput
): Promise<ZohoLeadRecord> => {
  const payload = {
    data: [
      {
        First_Name: input.firstName,
        Last_Name: input.lastName,
        Email: input.email,
        Phone: input.phone ?? "",
        Company: input.company ?? "N/A",
        Lead_Source: input.leadSource ?? "Website",
        Description: input.description ?? "",
        Lead_Status: "Not Contacted",
      },
    ],
    trigger: ["approval", "workflow", "blueprint"],
  };

  const result = await zohoFetch<ZohoApiResponse<{ details: Record<string, unknown>; code: string; message: string; status: string }>>("/Leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const record = result.data?.[0];

  if (!record || record.code !== "SUCCESS") {
    const err = new Error(
      `Failed to create lead in Zoho CRM: ${record?.message ?? "Unknown error"}`
    ) as Error & { statusCode: number };
    err.statusCode = 502;
    throw err;
  }

  const id = (record.details as { id?: string }).id ?? "";

  return {
    id,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    company: input.company,
    leadSource: input.leadSource,
    description: input.description,
    createdTime: new Date().toISOString(),
    modifiedTime: new Date().toISOString(),
  };
};

export const getLeadsService = async (
  page = 1,
  perPage = 20
): Promise<{ leads: ZohoLeadRecord[]; info: Record<string, unknown> }> => {
  const result = await zohoFetch<ZohoApiResponse<Record<string, unknown>>>(
    `/Leads?page=${page}&per_page=${perPage}&fields=id,First_Name,Last_Name,Email,Phone,Company,Lead_Source,Description,Created_Time,Modified_Time`
  );

  if (!result.data) {
    return { leads: [], info: result.info ?? {} };
  }

  const leads: ZohoLeadRecord[] = result.data.map((r) => ({
    id: r["id"] as string,
    firstName: r["First_Name"] as string,
    lastName: r["Last_Name"] as string,
    email: r["Email"] as string,
    phone: r["Phone"] as string | undefined,
    company: r["Company"] as string | undefined,
    leadSource: r["Lead_Source"] as string | undefined,
    description: r["Description"] as string | undefined,
    createdTime: r["Created_Time"] as string,
    modifiedTime: r["Modified_Time"] as string,
  }));

  return { leads, info: result.info ?? {} };
};

export const getLeadByIdService = async (
  id: string
): Promise<ZohoLeadRecord> => {
  const result = await zohoFetch<ZohoApiResponse<Record<string, unknown>>>(
    `/Leads/${id}?fields=id,First_Name,Last_Name,Email,Phone,Company,Lead_Source,Description,Created_Time,Modified_Time`
  );

  const record = result.data?.[0];
  if (!record) {
    const err = new Error("Lead not found") as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  return {
    id: record["id"] as string,
    firstName: record["First_Name"] as string,
    lastName: record["Last_Name"] as string,
    email: record["Email"] as string,
    phone: record["Phone"] as string | undefined,
    company: record["Company"] as string | undefined,
    leadSource: record["Lead_Source"] as string | undefined,
    description: record["Description"] as string | undefined,
    createdTime: record["Created_Time"] as string,
    modifiedTime: record["Modified_Time"] as string,
  };
};
