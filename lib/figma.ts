import type { ClientConfig } from "@/lib/clients";

type FigmaPaint = {
  type?: string;
  visible?: boolean;
  color?: {
    r?: number;
    g?: number;
    b?: number;
  };
};

type FigmaNode = {
  id?: string;
  name?: string;
  type?: string;
  characters?: string;
  fills?: FigmaPaint[];
  children?: FigmaNode[];
};

export type FigmaContext = {
  status: "ready" | "missing-token" | "error";
  fileKey: string;
  nodeId: string;
  figmaUrl: string;
  extractedAt: string;
  nodeName?: string;
  text: string[];
  structure: string[];
  colors: string[];
  error?: string;
};

function toHex(value = 0) {
  return Math.round(Math.max(0, Math.min(1, value)) * 255)
    .toString(16)
    .padStart(2, "0");
}

function paintToHex(paint: FigmaPaint) {
  if (paint.type !== "SOLID" || paint.visible === false || !paint.color) {
    return null;
  }

  return `#${toHex(paint.color.r)}${toHex(paint.color.g)}${toHex(paint.color.b)}`.toUpperCase();
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function walkNode(node: FigmaNode, context: FigmaContext) {
  if (node.name && node.type && context.structure.length < 80) {
    context.structure.push(`${node.type}: ${node.name}`);
  }

  if (node.characters) {
    const text = cleanText(node.characters);
    if (text && context.text.length < 60 && !context.text.includes(text)) {
      context.text.push(text);
    }
  }

  for (const fill of node.fills || []) {
    const color = paintToHex(fill);
    if (color && context.colors.length < 32 && !context.colors.includes(color)) {
      context.colors.push(color);
    }
  }

  for (const child of node.children || []) {
    walkNode(child, context);
  }
}

export async function getLiveFigmaContext(client: ClientConfig): Promise<FigmaContext> {
  const baseContext: FigmaContext = {
    status: "ready",
    fileKey: client.figma.fileKey,
    nodeId: client.figma.nodeId,
    figmaUrl: client.figma.url,
    extractedAt: new Date().toISOString(),
    text: [],
    structure: [],
    colors: []
  };

  const token = process.env.FIGMA_TOKEN?.trim();
  if (!token) {
    return {
      ...baseContext,
      status: "missing-token",
      error: "Missing FIGMA_TOKEN. Add it in Vercel or .env.local to enable live Figma sync."
    };
  }

  const params = new URLSearchParams({ ids: client.figma.nodeId });
  const url = `https://api.figma.com/v1/files/${client.figma.fileKey}/nodes?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Figma-Token": token
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return {
        ...baseContext,
        status: "error",
        error: `Figma returned ${response.status}. Check FIGMA_TOKEN access, file key, and node ID.`
      };
    }

    const payload = (await response.json()) as {
      nodes?: Record<string, { document?: FigmaNode }>;
    };
    const documentNode = payload.nodes?.[client.figma.nodeId]?.document;

    if (!documentNode) {
      return {
        ...baseContext,
        status: "error",
        error: "Figma returned no document node for this client."
      };
    }

    const liveContext = {
      ...baseContext,
      nodeName: documentNode.name
    };

    walkNode(documentNode, liveContext);
    return liveContext;
  } catch {
    return {
      ...baseContext,
      status: "error",
      error: "Could not reach Figma. Check network access and try again."
    };
  }
}

export function getFigmaAiContext(context: FigmaContext) {
  if (context.status !== "ready") {
    return `Live Figma context unavailable: ${context.error || context.status}`;
  }

  return [
    "Live Figma extracted context:",
    `File key: ${context.fileKey}`,
    `Node ID: ${context.nodeId}`,
    `Node name: ${context.nodeName || "Unknown"}`,
    `Extracted at: ${context.extractedAt}`,
    `Visible text: ${context.text.join(" | ") || "No text found"}`,
    `Structure: ${context.structure.slice(0, 40).join(" | ") || "No structure found"}`,
    `Colors: ${context.colors.join(" | ") || "No solid colors found"}`
  ].join("\n");
}
