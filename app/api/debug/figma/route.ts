import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/auth";
import { getClient } from "@/lib/clients";

export const dynamic = "force-dynamic";

type FigmaRequestResult = {
  ok: boolean;
  status: number | null;
  bodyMessage: string;
  body: unknown;
};

type FigmaNodeResponse = {
  nodes?: Record<string, { document?: { name?: unknown } }>;
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

function readFigmaMessage(payload: unknown): string {
  if (typeof payload === "string") {
    return payload.slice(0, 500);
  }

  if (!payload || typeof payload !== "object") {
    return "";
  }

  const record = payload as Record<string, unknown>;
  if (record.error && typeof record.error === "object" && "message" in record.error) {
    const nestedMessage = (record.error as { message?: unknown }).message;
    if (typeof nestedMessage === "string") {
      return nestedMessage;
    }
  }

  const candidates = [record.err, record.error, record.message, record.status];
  const message = candidates.find((candidate) => typeof candidate === "string" || typeof candidate === "number");

  if (typeof message === "number") {
    return String(message);
  }

  if (typeof message === "string") {
    return message;
  }

  return "";
}

async function requestFigma(url: string, token: string): Promise<FigmaRequestResult> {
  try {
    const response = await fetch(url, {
      headers: {
        "X-Figma-Token": token
      },
      cache: "no-store"
    });
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("application/json") ? await response.json().catch(() => null) : await response.text().catch(() => "");
    const bodyMessage = readFigmaMessage(body) || (response.ok ? "OK" : "Figma returned no message.");

    return {
      ok: response.ok,
      status: response.status,
      bodyMessage,
      body
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      bodyMessage: error instanceof Error ? error.message : "Could not reach Figma.",
      body: null
    };
  }
}

function getNodeName(payload: unknown, nodeId: string) {
  const nodeResponse = payload as FigmaNodeResponse;
  const nodeName = nodeResponse.nodes?.[nodeId]?.document?.name;
  return typeof nodeName === "string" ? nodeName : null;
}

function getFileDetails(payload: unknown) {
  const fileResponse = payload as FigmaFileResponse;
  const fileName = typeof fileResponse.name === "string" ? fileResponse.name : null;
  const topLevelPageNames =
    fileResponse.document?.children
      ?.filter((child) => child.type === "CANVAS" && typeof child.name === "string")
      .map((child) => child.name as string) || [];

  return {
    fileName,
    topLevelPageNames
  };
}

function getImageUrl(payload: unknown, nodeId: string) {
  const imagesResponse = payload as FigmaImagesResponse;
  const imageUrl = imagesResponse.images?.[nodeId];
  return typeof imageUrl === "string" ? imageUrl : null;
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

  const token = process.env.FIGMA_TOKEN?.trim() || "";
  const hasFigmaToken = token.length > 0;
  const fileKey = client.figmaFileKey;
  const nodeId = client.figmaNodeId;
  const nodeRequestUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?${new URLSearchParams({ ids: nodeId }).toString()}`;
  const fileRequestUrl = `https://api.figma.com/v1/files/${fileKey}?${new URLSearchParams({ depth: "1" }).toString()}`;
  const imagesRequestUrl = `https://api.figma.com/v1/images/${fileKey}?${new URLSearchParams({
    ids: nodeId,
    format: "png"
  }).toString()}`;

  const baseDebug = {
    clientSlug: client.slug,
    figmaFileKey: fileKey,
    figmaNodeId: nodeId,
    hasFigmaToken,
    figmaTokenLength: token.length,
    figmaTokenPrefix: token.slice(0, 6),
    requestUrlUsed: nodeRequestUrl,
    authHeaderUsed: "X-Figma-Token"
  };

  if (!hasFigmaToken) {
    return NextResponse.json({
      ...baseDebug,
      figmaResponseStatus: null,
      figmaResponseBodyMessage: "Missing FIGMA_TOKEN.",
      fileRequest: {
        requestUrlUsed: fileRequestUrl,
        figmaResponseStatus: null,
        figmaResponseBodyMessage: "Missing FIGMA_TOKEN."
      },
      imagesRequest: {
        requestUrlUsed: imagesRequestUrl,
        figmaResponseStatus: null,
        figmaResponseBodyMessage: "Missing FIGMA_TOKEN."
      },
      fileName: null,
      topLevelPageNames: [],
      imageUrl: null
    });
  }

  const [nodeResult, fileResult, imagesResult] = await Promise.all([
    requestFigma(nodeRequestUrl, token),
    requestFigma(fileRequestUrl, token),
    requestFigma(imagesRequestUrl, token)
  ]);
  const fileDetails = fileResult.ok ? getFileDetails(fileResult.body) : { fileName: null, topLevelPageNames: [] };

  return NextResponse.json({
    ...baseDebug,
    figmaResponseStatus: nodeResult.status,
    figmaResponseBodyMessage: nodeResult.bodyMessage,
    nodeName: nodeResult.ok ? getNodeName(nodeResult.body, nodeId) : null,
    nodeRequest: {
      requestUrlUsed: nodeRequestUrl,
      figmaResponseStatus: nodeResult.status,
      figmaResponseBodyMessage: nodeResult.bodyMessage
    },
    fileRequest: {
      requestUrlUsed: fileRequestUrl,
      figmaResponseStatus: fileResult.status,
      figmaResponseBodyMessage: fileResult.bodyMessage
    },
    imagesRequest: {
      requestUrlUsed: imagesRequestUrl,
      figmaResponseStatus: imagesResult.status,
      figmaResponseBodyMessage: imagesResult.bodyMessage
    },
    fileName: fileDetails.fileName,
    topLevelPageNames: fileDetails.topLevelPageNames,
    imageUrl: imagesResult.ok ? getImageUrl(imagesResult.body, nodeId) : null
  });
}
