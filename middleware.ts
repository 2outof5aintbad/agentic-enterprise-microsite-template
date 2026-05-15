import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE = "ae_access";

export function middleware(request: NextRequest) {
  const secret = process.env.ACCESS_TOKEN;

  // No token configured — open access (local dev)
  if (!secret) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Always accessible
  if (pathname === "/gate") return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.next();

  // Valid cookie — let through (token-based or email-verified)
  const cookie = request.cookies.get(ACCESS_COOKIE)?.value;
  if (cookie === secret || cookie === "email-verified") return NextResponse.next();

  // Token in query param — set cookie and redirect to clean URL
  const param = request.nextUrl.searchParams.get("token");
  if (param === secret) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("token");
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(ACCESS_COOKIE, secret, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  }

  // No valid token — show gate
  const gateUrl = request.nextUrl.clone();
  gateUrl.pathname = "/gate";
  return NextResponse.rewrite(gateUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
