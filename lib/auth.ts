import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const AUTH_COOKIE = "eidos_admin";

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";
}

export function isAuthConfigured() {
  return Boolean(getAdminEmail());
}

function signEmail(email: string) {
  const adminEmail = getAdminEmail();
  if (!adminEmail) {
    return "";
  }

  return createHmac("sha256", adminEmail).update(email).digest("hex");
}

export function createSessionToken(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const encodedEmail = Buffer.from(normalizedEmail, "utf8").toString("base64url");
  return `${encodedEmail}.${signEmail(normalizedEmail)}`;
}

export function verifySessionToken(token?: string) {
  if (!token || !isAuthConfigured()) {
    return null;
  }

  const [encodedEmail, signature] = token.split(".");
  if (!encodedEmail || !signature) {
    return null;
  }

  const email = Buffer.from(encodedEmail, "base64url").toString("utf8").trim().toLowerCase();
  if (email !== getAdminEmail()) {
    return null;
  }

  const expectedSignature = signEmail(email);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  return email;
}

export async function getCurrentAdminEmail() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(AUTH_COOKIE)?.value);
}

export async function requireAdminEmail() {
  const email = await getCurrentAdminEmail();
  if (!email) {
    redirect("/login");
  }

  return email;
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  };
}

export function getRequestCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return undefined;
  }

  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function isRequestAuthorized(request: Request) {
  return Boolean(verifySessionToken(getRequestCookie(request, AUTH_COOKIE)));
}
