import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/auth";
import { getClient } from "@/lib/clients";
import { getLiveFigmaContext } from "@/lib/figma";

export async function GET(request: Request) {
  if (!isRequestAuthorized(request)) {
    return NextResponse.json({ error: "Login required." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const clientSlug = searchParams.get("client") || "";
  const client = getClient(clientSlug);

  if (!client) {
    return NextResponse.json({ error: "Unknown client slug." }, { status: 404 });
  }

  const figma = await getLiveFigmaContext(client);
  return NextResponse.json({ client: client.slug, figma });
}
