import Link from "next/link";
import { clientList } from "@/lib/clients";
import { requireAdminEmail } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const adminEmail = await requireAdminEmail();

  return (
    <main className="client-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-logo text-logo" aria-hidden="true">
            E
          </span>
          <div>
            <p>EIDOS FORMA</p>
            <h1>Projects</h1>
          </div>
        </div>
        <form action="/api/logout" method="post">
          <button className="text-button" type="submit">
            Sign out
          </button>
        </form>
      </header>

      <section className="intro compact-intro">
        <p className="eyebrow">Admin</p>
        <h2>Client projects</h2>
        <p>{adminEmail}</p>
      </section>

      <section className="project-grid" aria-label="Client projects">
        {clientList.map((client) => (
          <Link className="project-card" key={client.slug} href={`/e/${client.slug}`}>
            <img src={client.logo} alt={`${client.name} logo`} />
            <span>{client.name}</span>
            <p>{client.description}</p>
            <small>
              Figma {client.figma.fileKey} / {client.figma.nodeId}
            </small>
          </Link>
        ))}
      </section>
    </main>
  );
}
