import type { ReactNode } from "react";

type HubCardProps = {
  label: string;
  title: string;
  body: string;
  points: string[];
  children: ReactNode;
};

export function HubCard({ label, title, body, points, children }: HubCardProps) {
  return (
    <details className="hub-card">
      <summary>
        <span className="card-label">{label}</span>
        <span className="card-title">{title}</span>
        <span className="card-body">{body}</span>
        <span className="open-indicator" aria-hidden="true" />
      </summary>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="card-content">{children}</div>
    </details>
  );
}
