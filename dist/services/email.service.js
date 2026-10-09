import nodemailer from "nodemailer";
const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, PUBLIC_WEBSITE_URL, } = process.env;
function createTransporter() {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        throw new Error("Email service not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.");
    }
    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT ?? "587", 10),
        secure: SMTP_SECURE === "true",
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
}
function categoryLabel(category) {
    return category === "trade" ? "Trade Partner" : "Referral Partner";
}
function buildAcceptanceEmail(params) {
    const { firstName, lastName, category, referralUrl, referralCode } = params;
    const partnerType = categoryLabel(category);
    const websiteUrl = PUBLIC_WEBSITE_URL ?? "https://t1studio.com";
    const from = SMTP_FROM ?? `T1 Studio <no-reply@t1studio.com>`;
    const fullName = `${firstName} ${lastName}`;
    const subject = `Welcome to the T1 Studio Partner Programme — Your Referral Link Is Ready`;
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 4px; overflow: hidden; }
    .header { background: #0C0C0C; padding: 32px 40px; }
    .header-logo { color: #F5C518; font-size: 22px; font-weight: 900; letter-spacing: 0.05em; }
    .header-sub { color: #a1a1aa; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 4px; }
    .body { padding: 40px; }
    .greeting { font-size: 22px; font-weight: 700; color: #0C0C0C; margin: 0 0 8px; }
    .partner-badge { display: inline-block; background: #F5C518; color: #0C0C0C; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px; border-radius: 2px; margin-bottom: 20px; }
    p { font-size: 15px; line-height: 1.7; color: #3f3f46; margin: 0 0 16px; }
    .referral-box { background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 4px; padding: 24px; margin: 24px 0; }
    .referral-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #71717a; margin: 0 0 8px; }
    .referral-code { font-size: 20px; font-weight: 700; color: #0C0C0C; letter-spacing: 0.05em; margin: 0 0 16px; font-family: monospace; }
    .referral-link { display: block; word-break: break-all; color: #1d4ed8; font-size: 14px; margin: 0; text-decoration: none; }
    .cta-btn { display: inline-block; background: #0C0C0C; color: #ffffff; font-size: 14px; font-weight: 600; padding: 14px 28px; border-radius: 4px; text-decoration: none; margin-top: 8px; }
    .divider { border: none; border-top: 1px solid #e4e4e7; margin: 32px 0; }
    .footer { padding: 24px 40px; background: #fafafa; }
    .footer p { font-size: 12px; color: #a1a1aa; margin: 0 0 4px; }
    .footer a { color: #71717a; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="header-logo">T1 Studio</div>
      <div class="header-sub">Spaces People Belong In</div>
    </div>

    <div class="body">
      <h1 class="greeting">Welcome, ${firstName}!</h1>
      <div class="partner-badge">${partnerType}</div>

      <p>
        We're delighted to confirm that your application to join the T1 Studio Partner Programme
        has been <strong>approved</strong>. As a valued <strong>${partnerType}</strong>, you
        now have access to your unique referral link below.
      </p>

      <div class="referral-box">
        <p class="referral-label">Your Referral Code</p>
        <p class="referral-code">${referralCode}</p>
        <p class="referral-label">Your Referral Link</p>
        <a class="referral-link" href="${referralUrl}">${referralUrl}</a>
      </div>

      <p>
        Share this link with anyone you refer to T1 Studio. Every enquiry or booking made through
        your link will be tracked and attributed to you automatically.
      </p>

      <a class="cta-btn" href="${referralUrl}">Open Your Referral Link</a>

      <hr class="divider" />

      <p style="font-size:13px;color:#71717a;">
        If you have any questions about your partnership, please contact us at
        <a href="mailto:partners@t1studio.com" style="color:#1d4ed8;">partners@t1studio.com</a>.
      </p>
    </div>

    <div class="footer">
      <p>T1 Studio — Interior Design &amp; Fit-Out</p>
      <p>Showroom 1, MSM 2 Building, Sheikh Zayed Road, Dubai</p>
      <p>
        <a href="${websiteUrl}/privacy">Privacy Policy</a> ·
        <a href="${websiteUrl}/terms">Terms &amp; Conditions</a>
      </p>
      <p style="margin-top:12px;">© ${new Date().getFullYear()} T1 Studio. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
    const text = [
        `Welcome to the T1 Studio Partner Programme — ${partnerType}`,
        ``,
        `Hi ${fullName},`,
        ``,
        `Your application has been approved. Your unique referral details are below.`,
        ``,
        `Referral Code: ${referralCode}`,
        `Referral Link: ${referralUrl}`,
        ``,
        `Share this link with anyone you refer to T1 Studio.`,
        ``,
        `Questions? Email us at partners@t1studio.com`,
        ``,
        `© ${new Date().getFullYear()} T1 Studio`,
    ].join("\n");
    return { subject, html, text };
}
export async function sendAcceptanceEmail(input) {
    const transporter = createTransporter();
    const { subject, html, text } = buildAcceptanceEmail(input);
    await transporter.sendMail({
        from: SMTP_FROM ?? `T1 Studio <no-reply@t1studio.com>`,
        to: input.to,
        subject,
        html,
        text,
    });
}
