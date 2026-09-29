export const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID ?? "";
export const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET ?? "";
export const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN ?? "";
// Data-centre-specific base URLs — override via env if your Zoho org is on EU/AU/IN/CN
export const ZOHO_ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL ?? "https://accounts.zoho.com";
export const ZOHO_API_BASE_URL = process.env.ZOHO_API_BASE_URL ?? "https://www.zohoapis.com/crm/v2";
