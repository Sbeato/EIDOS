import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/auth";
import { getClient } from "@/lib/clients";

export const dynamic = "force-dynamic";

type FigmaFetchResult = {
  ok: boolean;
  status: number | null;
  body: unknown;
};

type FigmaFileResponse = {
  name?: unknown;
  document?: {
    children?: Array<{
      name?: unknown;
      type?: unknown;
    }>;
  };
};

type FigmaImagesResponse = {
  images?: Record<string, unknown>;
};

function readBodyMessage(body: unknown) {
  if (typeof body === "string") {
    return body.slice(0, 500);
  }

  if (!body || typeof body !== "object") {
    return body;
  }

  const record = body as Record<string, unknown>;
  if (record.error && typeof record.error === "object" && "message" in record.error) {
    const nestedMessage = (record.error as { message?: unknown }).message;
    if (typeof nestedMessage === "string") {
      return { error: nestedMessage };
    }
  }

  const compactBody: Record<string, unknown> = {};
  for (const key of ["err", "error", "message", "status"]) {
    if (key in record) {
      compactBody[key] = record[key];
    }
  }

  return Object.keys(compactBody).length > 0 ? compactBody : "OK";
}

async function fetchFigma(url: string, token: string): Promise<FigmaFetchResult> {
  try {
    const response = await fetch(url, {
      headers: {
        "X-Figma-Token": token
      },
      cache: "no-store"
    });
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("application/json") ? await response.json().catch(() => null) : await response.text().catch(() => "");

    return {
      ok: response.ok,
      status: response.status,
      body
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      body: error instanceof Error ? error.message : "Could not reach Figma."
    };
  }
}

function getFileDetails(body: unknown) {
  const file = body as FigmaFileResponse;
  const fileName = typeof file.name === "string" ? file.name : null;
  const topLevelPages =
    file.document?.children
      ?.filter((child) => child.type === "CANVAS" && typeof child.name === "string")
      .map((child) => child.name as string) || [];

  return {
    fileName,
    topLevelPages
  };
}

function getImageUrl(body: unknown, nodeId: string) {
  const imageResponse = body as FigmaImagesResponse;
  const imageUrl = imageResponse.images?.[nodeId];
  return typeof imageUrl === "string" ? imageUrl : null;
}

function getFileBody(result: FigmaFetchResult) {
  if (!result.ok) {
    return readBodyMessage(result.body);
  }

  const { fileName, topLevelPages } = getFileDetails(result.body);
  return {
    message: "OK",
    fileName,
    topLevelPages
  };
}

function getImageBody(result: FigmaFetchResult) {
  if (!result.ok) {
    return readBodyMessage(result.body);
  }

  return result.body;
}

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

  const token = process.env.FIGMA_TOKEN || "";
  const fileKey = client.figmaFileKey;
  const nodeId = client.figmaNodeId;
  const requestUrl = `https://api.figma.com/v1/files/${fileKey}`;
  const imageRequestUrl = `https://api.figma.com/v1/images/${fileKey}?${new URLSearchParams({
    ids: nodeId,
    format: "png"
  }).toString()}`;

  const baseResponse = {
    client: client.slug,
    fileKey,
    nodeId,
    hasFigmaToken: token.length > 0,
    figmaTokenLength: token.length,
    figmaTokenPrefix: token.slice(0, 6),
    requestUrl,
    headerUsed: "X-Figma-Token"
  };

  if (!token) {
    return NextResponse.json({
      ...baseResponse,
      figmaStatus: null,
      figmaBody: "Missing FIGMA_TOKEN.",
      fileName: null,
      topLevelPages: [],
      imageStatus: null,
      imageBody: "Missing FIGMA_TOKEN.",
      imageUrl: null
    });
  }

  const [figmaResult, imageResult] = await Promise.all([fetchFigma(requestUrl, token), fetchFigma(imageRequestUrl, token)]);
  const fileDetails = figmaResult.ok ? getFileDetails(figmaResult.body) : { fileName: null, topLevelPages: [] };

  return NextResponse.json({
    ...baseResponse,
    figmaStatus: figmaResult.status,
    figmaBody: getFileBody(figmaResult),
    fileName: fileDetails.fileName,
    topLevelPages: fileDetails.topLevelPages,
    imageStatus: imageResult.status,
    imageBody: getImageBody(imageResult),
    imageUrl: imageResult.ok ? getImageUrl(imageResult.body, nodeId) : null
  });
}
