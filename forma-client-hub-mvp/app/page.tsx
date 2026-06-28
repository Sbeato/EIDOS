"use client";

import { useEffect, useMemo, useState } from "react";

type Section = "home" | "strategy" | "brand" | "product" | "requests";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const CLIENT = process.env.NEXT_PUBLIC_CLIENT_NAME || "Vivolt";
const PASSCODE = process.env.NEXT_PUBLIC_HUB_PASSCODE || "eidos";

const deliverables = {
  strategy: [
    "Positioning — v1",
    "Audience priorities",
    "Messaging for CEOs / CMOs",
  ],
  brand: [
    "Logo package",
    "Tone of voice",
    "LinkedIn visual system",
  ],
  product: [
    "Product narrative",
    "Feature priority map",
    "Landing page wireframe",
  ],
};

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [section, setSection] = useState<Section>("home");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Hi. I am Ask EIDOS for ${CLIENT}. Ask me about strategy, brand, product or request a new output.`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [requestType, setRequestType] = useState("Campaign");
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    setUnlocked(localStorage.getItem("forma-hub-unlocked") === "true");
  }, []);

  const title = useMemo(() => `${CLIENT} Brand & Product HUB`, []);

  function unlock() {
    if (pass.trim() === PASSCODE) {
      localStorage.setItem("forma-hub-unlocked", "true");
      setUnlocked(true);
    }
  }

  async function askAgent(message?: string) {
    const finalMessage = (message || input).trim();
    if (!finalMessage || loading) return;
    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: finalMessage }]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer || data.error || "No response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Agent not reachable. Check deployment variables." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitRequest() {
    setRequestStatus("Sending...");
    await fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: requestType, description: requestText }),
    });
    setRequestStatus("Request sent. EIDOS will review it.");
    setRequestText("");
  }

  if (!unlocked) {
    return (
      <main className="shell login">
        <div className="logoMark">✳</div>
        <h1>{title}</h1>
        <p>Private client access.</p>
        <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Passcode" type="password" onKeyDown={(e) => e.key === "Enter" && unlock()} />
        <button onClick={unlock}>Enter</button>
        <span className="hint">MVP passcode: eidos</span>
      </main>
    );
  }

  return (
    <main className="shell">
      <header className="topPill" onClick={() => setSection("home")}>
        <div className="clientIcon">✳</div>
        <span>{title}</span>
      </header>

      {section === "home" && (
        <>
          <section className="agentCard">
            <div className="agentTitle"><span className="epsilon">ε</span><h1>Ask EIDOS</h1></div>
            <div className="askBox">
              <button className="plus" onClick={() => askAgent("What should we focus on this week?")}>＋</button>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Can you adapt this campaign for... ?" onKeyDown={(e) => e.key === "Enter" && askAgent()} />
              <button className="mic" onClick={() => askAgent()}>↗</button>
            </div>
          </section>

          <section className="messages">
            {messages.slice(-4).map((m, i) => <div key={i} className={`bubble ${m.role}`}>{m.text}</div>)}
            {loading && <div className="bubble assistant">Thinking...</div>}
          </section>

          <Card title="Strategy" subtitle="Read & share" onClick={() => setSection("strategy")} />
          <Card title="Brand" subtitle="Read & download" onClick={() => setSection("brand")} />
          <Card title="Product" subtitle="Read & download" onClick={() => setSection("product")} />
          <Card title="Requests" subtitle="Create" onClick={() => setSection("requests")} />
        </>
      )}

      {section !== "home" && <button className="back" onClick={() => setSection("home")}>← Back</button>}

      {section === "strategy" && <List title="Strategy" items={deliverables.strategy} cta="Ask EIDOS to summarize strategy" onAsk={() => askAgent("Summarize our current strategy in 5 bullets.")} />}
      {section === "brand" && <List title="Brand" items={deliverables.brand} cta="Ask EIDOS for brand rules" onAsk={() => askAgent("What are the 5 key brand rules for this client?")} />}
      {section === "product" && <List title="Product" items={deliverables.product} cta="Ask EIDOS for product next steps" onAsk={() => askAgent("What are the next 3 product priorities?")} />}
      {section === "requests" && (
        <section className="detail">
          <h2>New request</h2>
          <label>Type</label>
          <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
            <option>Campaign</option><option>Deck</option><option>Brand asset</option><option>Product screen</option><option>Social content</option>
          </select>
          <label>Description</label>
          <textarea value={requestText} onChange={(e) => setRequestText(e.target.value)} placeholder="What do you need?" />
          <button className="primary" onClick={submitRequest}>Send request</button>
          {requestStatus && <p className="status">{requestStatus}</p>}
        </section>
      )}
    </main>
  );
}

function Card({ title, subtitle, onClick }: { title: string; subtitle: string; onClick: () => void }) {
  return <button className="navCard" onClick={onClick}><div><h2>{title}</h2><p>{subtitle}</p></div><span>→</span></button>;
}

function List({ title, items, cta, onAsk }: { title: string; items: string[]; cta: string; onAsk: () => void }) {
  return <section className="detail"><h2>{title}</h2>{items.map((item) => <div className="file" key={item}><span>{item}</span><button>Open</button></div>)}<button className="primary" onClick={onAsk}>{cta}</button></section>;
}
