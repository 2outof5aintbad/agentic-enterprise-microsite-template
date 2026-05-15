import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "ae_access";

export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const secret = process.env.ACCESS_TOKEN;

  if (!secret) {
    return NextResponse.json({ error: "Access not configured." }, { status: 500 });
  }

  if (!password || password !== secret) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
