"use client";

import { useState } from "react";
import type { ClientHub } from "../../../lib/clients";

export default function HubClient({ client }: { client: ClientHub }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<"Strategy" | "Brand" | "Product" | "Requests" | null>(null);

  async function ask() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientSlug: client.slug, question })
      });
      const data = await res.json();
      setAnswer(data.answer || data.error || "No answer returned.");
    } catch (err) {
      setAnswer("Ask EIDOS failed. Check the API route and environment variables.");
    } finally {
      setLoading(false);
    }
  }

  const panelText = {
    Strategy: client.strategy + "\n\nPositioning: " + client.positioning,
    Brand: client.brand + "\n\nTone: " + client.tone + "\n\nColors: " + client.colors.join(" · "),
    Product: client.product + "\n\nDesign system: " + client.designSystem,
    Requests: "Create a new request for EIDOS. Ask for campaign adaptations, decks, posts, visual routes, product flows or brand assets."
  } as const;

  return (
    <main className="screen">
      <section className="phone">
        <header className="topbar">
          <img src={client.logo} alt="" className="logo" />
          <span>{client.title}</span>
        </header>

        <section className="agent-card">
          <div className="agent-title">
            <span className="eidos-mark">ε</span>
            <strong>Ask EIDOS</strong>
          </div>
          <div className="input-row">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask()}
              placeholder="Can you adapt this campaign for...?"
            />
            <button onClick={ask} disabled={loading}>{loading ? "…" : "↑"}</button>
          </div>
          {answer && <div className="answer">{answer}</div>}
        </section>

        <ActionCard title="Strategy" subtitle="Read & share" onClick={() => setActive("Strategy")} />
        <ActionCard title="Brand" subtitle="Read & download" onClick={() => setActive("Brand")} />
        <ActionCard title="Product" subtitle="Read & download" onClick={() => setActive("Product")} />
        <ActionCard title="Requests" subtitle="Create" onClick={() => setActive("Requests")} />

        {active && (
          <section className="drawer">
            <div className="drawer-head">
              <h2>{active}</h2>
              <button onClick={() => setActive(null)}>×</button>
            </div>
            <p>{panelText[active]}</p>
            {active === "Brand" && (
              <div className="colors">
                {client.colors.map((color) => <span key={color} style={{ background: color }} title={color} />)}
              </div>
            )}
            {active === "Product" && client.figmaUrl && <a className="link" href={client.figmaUrl}>Open Figma</a>}
            {active === "Brand" && client.assets.map((asset) => <a className="link" href={asset.href} key={asset.label}>{asset.label}</a>)}
          </section>
        )}
      </section>
    </main>
  );
}

function ActionCard({ title, subtitle, onClick }: { title: string; subtitle: string; onClick: () => void }) {
  return (
    <button className="action-card" onClick={onClick}>
      <span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <span className="arrow">→</span>
    </button>
  );
}
