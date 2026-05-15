import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { Resend } from "resend";

// Add allowed domains for your account team — salesforce.com is always included
const ALLOWED_DOMAINS = [
  "salesforce.com",
  // TODO: add customer domain(s) e.g. "ibm.com", "ford.com"
];

function getSecret() {
  const s = process.env.MAGIC_LINK_SECRET || "dev-secret-change-in-prod";
  return new TextEncoder().encode(s);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = body?.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const domain = email.split("@")[1]?.toLowerCase().trim();

    if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
      return NextResponse.json(
        { error: "Access is limited to authorized team members. Please use your work email." },
        { status: 403 }
      );
    }

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .setIssuedAt()
      .sign(getSecret());

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const magicLink = `${baseUrl}/api/verify-magic-link?token=${token}`;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Executive Briefing <onboarding@resend.dev>",
      to: email,
      subject: "Your access link — Executive Briefing",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
        <body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;min-height:100vh;">
            <tr><td align="center" style="padding:60px 20px;">
              <table width="480" cellpadding="0" cellspacing="0" style="background:#141414;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;max-width:480px;width:100%;">
                <tr><td style="background:#0066FF;height:4px;"></td></tr>
                <tr><td style="padding:40px 40px 32px;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#0066FF;">Private Briefing Access</p>
                  <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;letter-spacing:-0.02em;">Executive Briefing</h1>
                  <p style="margin:0 0 32px;font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;">
                    Click the button below to access the briefing. This link expires in <strong style="color:rgba(255,255,255,0.7);">15 minutes</strong> and can only be used once.
                  </p>
                  <a href="${magicLink}" style="display:inline-block;padding:14px 28px;background:#0066FF;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:100px;letter-spacing:0.01em;">
                    Access the Briefing →
                  </a>
                  <p style="margin:28px 0 0;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.6;">
                    Or paste this URL into your browser:<br>
                    <span style="color:rgba(255,255,255,0.35);word-break:break-all;">${magicLink}</span>
                  </p>
                </td></tr>
                <tr><td style="padding:20px 40px 32px;border-top:1px solid rgba(255,255,255,0.06);">
                  <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.18);line-height:1.6;">
                    Prepared by the Salesforce Account Team<br>
                    If you didn't request this, you can safely ignore it.
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: `Email send failed: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("send-magic-link error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed: ${message}` }, { status: 500 });
  }
}
