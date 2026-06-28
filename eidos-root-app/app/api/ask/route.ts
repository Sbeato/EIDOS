import { NextResponse } from "next/server";
import { clientContext, getClient } from "../../../lib/clients";

export async function POST(request: Request) {
  try {
    const { clientSlug, question } = await request.json();
    if (!clientSlug) return NextResponse.json({ error: "Missing clientSlug." }, { status: 400 });
    if (!question) return NextResponse.json({ error: "Missing question." }, { status: 400 });

    const client = getClient(clientSlug);
    if (!client) return NextResponse.json({ error: "Client not found." }, { status: 404 });

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-5";
    if (!apiKey) return NextResponse.json({ error: "Missing OPENAI_API_KEY in server environment." }, { status: 500 });
    if (!model) return NextResponse.json({ error: "Missing OPENAI_MODEL in server environment." }, { status: 500 });

    const system = `You are Ask EIDOS, the private client agent inside FORMA Client Hub.\nAnswer only using the selected client context.\nIf information is missing, say what is missing and propose the next practical step.\nTone: clear, sharp, premium, practical.\n\nSelected client context:\n${clientContext(client)}`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        input: [
          { role: "system", content: system },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data?.error?.message || "OpenAI API error." }, { status: response.status });
    }

    const answer = data.output_text || data.output?.[0]?.content?.[0]?.text || "No text answer returned.";
    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: "Ask EIDOS server error." }, { status: 500 });
  }
}
