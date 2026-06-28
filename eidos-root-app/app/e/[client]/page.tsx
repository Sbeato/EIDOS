import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { AskEidos } from "@/components/AskEidos";
import { HubCard } from "@/components/HubCard";
import { clientList, getClient } from "@/lib/clients";

type ClientPageProps = {
  params: Promise<{
    client: string;
  }>;
};

export function generateStaticParams() {
  return clientList.map((client) => ({
    client: client.slug
  }));
}

export async function generateMetadata({ params }: ClientPageProps): Promise<Metadata> {
  const { client: slug } = await params;
  const client = getClient(slug);

  if (!client) {
    return {
      title: "Client not found | EIDOS FORMA"
    };
  }

  return {
    title: `${client.name} | EIDOS FORMA Client Hub`,
    description: client.description
  };
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { client: slug } = await params;
  const client = getClient(slug);

  if (!client) {
    notFound();
  }

  const primaryColor = client.brand.colors[0]?.value || "#0B6B5B";
  const darkColor = client.brand.colors[1]?.value || "#191815";
  const clientStyle = {
    "--client-primary": primaryColor,
    "--client-dark": darkColor
  } as CSSProperties;

  return (
    <main className="client-shell" style={clientStyle}>
      <header className="topbar">
        <div className="brand-lockup">
          <img className="brand-logo" src={client.logo} alt={`${client.name} logo`} />
          <div>
            <p>EIDOS FORMA</p>
            <h1>{client.name}</h1>
          </div>
        </div>
        <span className="status-pill">Client Hub</span>
      </header>

      <section className="intro">
        <p className="eyebrow">Current client</p>
        <h2>{client.shortName}</h2>
        <p>{client.description}</p>
      </section>

      <AskEidos clientSlug={client.slug} clientName={client.name} />

      <section className="card-grid" aria-label={`${client.name} hub cards`}>
        <HubCard
          label="Strategy"
          title="Strategic direction"
          body={client.strategy.summary}
          points={["Summary", "Positioning", "Key messages"]}
        >
          <ContentBlock title="Strategy summary" text={client.strategy.summary} />
          <ContentBlock title="Positioning" text={client.strategy.positioning} />
          <ContentList title="Key messages" items={client.strategy.keyMessages} />
        </HubCard>

        <HubCard
          label="Brand"
          title="Identity system"
          body="Logo, colors, typography, and voice for this client."
          points={["Logo", "Colors", "Typography", "Tone"]}
        >
          <div className="logo-preview">
            <img src={client.logo} alt={`${client.name} logo preview`} />
          </div>
          <div className="swatch-grid">
            {client.brand.colors.map((color) => (
              <div className="swatch" key={color.name}>
                <span style={{ backgroundColor: color.value }} aria-hidden="true" />
                <strong>{color.name}</strong>
                <code>{color.value}</code>
                <p>{color.usage}</p>
              </div>
            ))}
          </div>
          <ContentList title="Typography" items={client.brand.typography} />
          <ContentList title="Tone of voice" items={client.brand.toneOfVoice} />
        </HubCard>

        <HubCard
          label="Product"
          title="Design system"
          body="Product UI notes and Figma links for current work."
          points={["Design notes", "Figma", "Product system"]}
        >
          <ContentList title="Design system notes" items={client.product.designSystemNotes} />
          <LinkList title="Figma links" links={client.product.figmaLinks} />
        </HubCard>

        <HubCard
          label="Assets"
          title="Files and deliverables"
          body="Downloadable assets and the latest visible EIDOS outputs."
          points={["Downloads", "Latest deliverables", "Placeholders"]}
        >
          <AssetList title="Downloadable assets" assets={client.assets} />
          <DeliverableList title="Latest deliverables" deliverables={client.latestDeliverables} />
        </HubCard>
      </section>
    </main>
  );
}

function ContentBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="content-block">
      <h3>{title}</h3>
      <p>{text}</p>
    </section>
  );
}

function ContentList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="content-block">
      <h3>{title}</h3>
      <ol className="plain-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <section className="content-block">
      <h3>{title}</h3>
      <div className="link-stack">
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}

function AssetList({ title, assets }: { title: string; assets: { label: string; href: string; type: string }[] }) {
  return (
    <section className="content-block">
      <h3>{title}</h3>
      <div className="link-stack">
        {assets.map((asset) => (
          <a key={asset.href} href={asset.href} download>
            {asset.label} <span>{asset.type}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function DeliverableList({
  title,
  deliverables
}: {
  title: string;
  deliverables: { title: string; date: string; status: string; href: string }[];
}) {
  return (
    <section className="content-block">
      <h3>{title}</h3>
      <div className="deliverable-stack">
        {deliverables.map((deliverable) => (
          <a key={`${deliverable.title}-${deliverable.date}`} href={deliverable.href} download>
            <strong>{deliverable.title}</strong>
            <span>
              {deliverable.status} - {deliverable.date}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
