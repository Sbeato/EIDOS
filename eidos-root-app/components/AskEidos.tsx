"use client";

import { FormEvent, useState } from "react";

type AskEidosProps = {
  clientSlug: string;
  clientName: string;
};

export function AskEidos({ clientSlug, clientName }: AskEidosProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) {
      return;
    }

    setIsLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientSlug,
          question: trimmedQuestion
        })
      });

      const payload = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "EIDOS could not answer right now.");
      }

      setAnswer(payload.answer || "");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "EIDOS could not answer right now.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="ask-panel" aria-labelledby="ask-eidos-title">
      <div>
        <p className="panel-kicker">Ask EIDOS</p>
        <h2 id="ask-eidos-title">What should we solve for {clientName}?</h2>
      </div>

      <form onSubmit={handleSubmit} className="ask-form">
        <label htmlFor="ask-eidos-input">Ask EIDOS input</label>
        <textarea
          id="ask-eidos-input"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about strategy, brand, product, assets..."
          rows={4}
        />
        <button type="submit" disabled={isLoading || !question.trim()}>
          {isLoading ? "Thinking..." : "Ask EIDOS"}
        </button>
      </form>

      {answer ? (
        <div className="answer-box" aria-live="polite">
          <p>{answer}</p>
        </div>
      ) : null}

      {error ? (
        <div className="error-box" aria-live="polite">
          <p>{error}</p>
        </div>
      ) : null}
    </section>
  );
}
