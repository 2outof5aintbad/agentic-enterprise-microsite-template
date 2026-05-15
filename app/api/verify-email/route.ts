import { NextRequest, NextResponse } from "next/server";

// Add allowed domains for your account team — salesforce.com is always included
const ALLOWED_DOMAINS = [
  "salesforce.com",
  // TODO: add customer domain(s) e.g. "ibm.com", "ford.com"
];

const ACCESS_COOKIE = "ae_access";
const EMAIL_VERIFIED = "email-verified";

export async function POST(request: NextRequest) {
  const { email } = await request.json().catch(() => ({ email: "" }));

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

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE, EMAIL_VERIFIED, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
