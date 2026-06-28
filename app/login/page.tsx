import { redirect } from "next/navigation";
import { getCurrentAdminEmail, isAuthConfigured } from "@/lib/auth";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "config") {
    return "ADMIN_EMAIL is missing. Add it to .env.local or Vercel environment variables.";
  }

  if (error === "invalid") {
    return "Email not authorized for this hub.";
  }

  return "";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const currentAdmin = await getCurrentAdminEmail();
  if (currentAdmin) {
    redirect("/projects");
  }

  const { error } = await searchParams;
  const errorMessage = getErrorMessage(error);

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <p className="eyebrow">EIDOS FORMA</p>
        <h1>Client Hub Login</h1>
        <p>Use the admin email configured for this workspace.</p>

        <form className="login-form" action="/api/login" method="post">
          <label htmlFor="email">Admin email</label>
          <input id="email" name="email" type="email" placeholder="name@company.com" required />
          <button type="submit">Continue</button>
        </form>

        {!isAuthConfigured() ? <p className="form-note">ADMIN_EMAIL is not configured yet.</p> : null}
        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      </section>
    </main>
  );
}
