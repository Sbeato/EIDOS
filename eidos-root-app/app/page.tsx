import Link from "next/link";
import { clientList } from "@/lib/clients";

export default function Home() {
  return (
    <main className="home-shell">
      <section className="home-panel">
        <p className="eyebrow">EIDOS FORMA</p>
        <h1>Client Hub</h1>
        <p>Open a client workspace.</p>
        <div className="client-links">
          {clientList.map((client) => (
            <Link key={client.slug} href={`/e/${client.slug}`}>
              {client.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
