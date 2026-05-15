import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ACCESS_COOKIE = "ae_access";

function getSecret() {
  const s = process.env.MAGIC_LINK_SECRET || "dev-secret-change-in-prod";
  return new TextEncoder().encode(s);
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/gate?error=invalid", request.url));
  }

  try {
    await jwtVerify(token, getSecret());
  } catch {
    return NextResponse.redirect(new URL("/gate?error=expired", request.url));
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(ACCESS_COOKIE, "email-verified", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
