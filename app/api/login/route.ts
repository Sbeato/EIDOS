import { NextResponse } from "next/server";
import { AUTH_COOKIE, createSessionToken, getAdminEmail, getAuthCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const adminEmail = getAdminEmail();

  if (!adminEmail) {
    return NextResponse.redirect(new URL("/login?error=config", request.url), 303);
  }

  if (email !== adminEmail) {
    return NextResponse.redirect(new URL("/login?error=invalid", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/projects", request.url), 303);
  response.cookies.set(AUTH_COOKIE, createSessionToken(email), getAuthCookieOptions());

  return response;
}
