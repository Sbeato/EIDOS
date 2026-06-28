import { redirect } from "next/navigation";
import { getCurrentAdminEmail } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const adminEmail = await getCurrentAdminEmail();
  redirect(adminEmail ? "/projects" : "/login");
}
