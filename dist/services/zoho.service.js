import { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_URL, ZOHO_API_BASE_URL, } from "../config/zoho.js";
/* =========================================================
   In-memory token cache  (refreshed automatically ~5 min before expiry)
========================================================= */
let tokenCache = null;
const getAccessToken = async () => {
    const now = Date.now();
    if (tokenCache && tokenCache.expiresAt > now + 5 * 60 * 1000) {
        return tokenCache.accessToken;
    }
    if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
        const err = new Error("Zoho credentials are not configured. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN.");
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
    const body = (await response.json());
    if (!response.ok || body.error) {
        const err = new Error(`Failed to obtain Zoho access token: ${body.error ?? response.statusText}`);
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
const throwZohoError = (message, statusCode = 502) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    throw err;
};
const zohoFetch = async (path, options = {}) => {
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
        throwZohoError(`Zoho API error ${response.status}: ${response.statusText}`, 502);
    }
    return response.json();
};
/* =========================================================
   Lead Services
========================================================= */
export const createLeadService = async (input) => {
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
    const result = await zohoFetch("/Leads", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    const record = result.data?.[0];
    if (!record || record.code !== "SUCCESS") {
        const err = new Error(`Failed to create lead in Zoho CRM: ${record?.message ?? "Unknown error"}`);
        err.statusCode = 502;
        throw err;
    }
    const id = record.details.id ?? "";
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
export const getLeadsService = async (page = 1, perPage = 20) => {
    const result = await zohoFetch(`/Leads?page=${page}&per_page=${perPage}&fields=id,First_Name,Last_Name,Email,Phone,Company,Lead_Source,Description,Created_Time,Modified_Time`);
    if (!result.data) {
        return { leads: [], info: result.info ?? {} };
    }
    const leads = result.data.map((r) => ({
        id: r["id"],
        firstName: r["First_Name"],
        lastName: r["Last_Name"],
        email: r["Email"],
        phone: r["Phone"],
        company: r["Company"],
        leadSource: r["Lead_Source"],
        description: r["Description"],
        createdTime: r["Created_Time"],
        modifiedTime: r["Modified_Time"],
    }));
    return { leads, info: result.info ?? {} };
};
export const getLeadByIdService = async (id) => {
    const result = await zohoFetch(`/Leads/${id}?fields=id,First_Name,Last_Name,Email,Phone,Company,Lead_Source,Description,Created_Time,Modified_Time`);
    const record = result.data?.[0];
    if (!record) {
        const err = new Error("Lead not found");
        err.statusCode = 404;
        throw err;
    }
    return {
        id: record["id"],
        firstName: record["First_Name"],
        lastName: record["Last_Name"],
        email: record["Email"],
        phone: record["Phone"],
        company: record["Company"],
        leadSource: record["Lead_Source"],
        description: record["Description"],
        createdTime: record["Created_Time"],
        modifiedTime: record["Modified_Time"],
    };
};
