import { NextResponse } from "next/server";
import { getClient, getClientAiContext } from "@/lib/clients";

type AskRequest = {
  clientSlug?: unknown;
  question?: unknown;
};

function extractOutputText(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const response = payload as {
    output_text?: unknown;
    output?: Array<{
      content?: Array<{
        type?: string;
        text?: unknown;
      }>;
    }>;
  };

  if (typeof response.output_text === "string") {
    return response.output_text.trim();
  }

  const text = response.output
    ?.flatMap((item) => item.content || [])
    .map((content) => (content.type === "output_text" && typeof content.text === "string" ? content.text : ""))
    .join("")
    .trim();

  return text || "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as AskRequest | null;

  const clientSlug = typeof body?.clientSlug === "string" ? body.clientSlug : "";
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  const client = getClient(clientSlug);

  if (!client) {
    return NextResponse.json({ error: "Unknown client slug. Open a valid client URL such as /e/vivolt." }, { status: 404 });
  }

  if (!question) {
    return NextResponse.json({ error: "Ask EIDOS needs a question." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;

  const missingEnv = [
    !apiKey ? "OPENAI_API_KEY" : null,
    !model ? "OPENAI_MODEL" : null
  ].filter(Boolean);

  if (missingEnv.length > 0) {
    return NextResponse.json(
      {
        error: `Missing ${missingEnv.join(" and ")}. Create .env.local from .env.local.example and restart the dev server.`
      },
      { status: 500 }
    );
  }

  let openAIResponse: Response;

  try {
    openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        instructions: [
          "You are EIDOS FORMA, a concise strategic partner for client work.",
          "Answer with practical recommendations, not generic advice.",
          "Keep responses short enough for a mobile client hub.",
          "Use the selected client configuration as your source of truth.",
          getClientAiContext(client)
        ].join("\n"),
        input: question,
        max_output_tokens: 500
      })
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach OpenAI. Check your network connection and try again." },
      { status: 502 }
    );
  }

  const payload = await openAIResponse.json().catch(() => null);

  if (!openAIResponse.ok) {
    const openAIError =
      payload &&
      typeof payload === "object" &&
      "error" in payload &&
      payload.error &&
      typeof payload.error === "object" &&
      "message" in payload.error &&
      typeof payload.error.message === "string"
        ? payload.error.message
        : "OpenAI returned an unexpected response.";

    return NextResponse.json({ error: `OpenAI error: ${openAIError}` }, { status: openAIResponse.status });
  }

  const answer = extractOutputText(payload);

  return NextResponse.json({
    answer: answer || "EIDOS received the request, but no answer text was returned."
  });
}
