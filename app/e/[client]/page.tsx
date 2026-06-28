import { notFound } from "next/navigation";
import { getClient } from "../../../lib/clients";
import HubClient from "./HubClient";

export default function ClientPage({ params }: { params: { client: string } }) {
  const client = getClient(params.client);
  if (!client) notFound();
  return <HubClient client={client} />;
}
