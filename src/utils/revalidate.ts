const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET ?? "";

export const triggerRevalidation = (): void => {
  if (!REVALIDATE_SECRET) return;

  fetch(`${FRONTEND_URL}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: REVALIDATE_SECRET, all: true }),
  }).catch((err) => {
    console.error("[revalidate] Failed to trigger frontend cache bust:", err);
  });
};
