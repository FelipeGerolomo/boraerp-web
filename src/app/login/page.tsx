import { redirect } from "next/navigation";
import { AuthPageShell } from "@/auth/components/auth-page-shell";
import { LoginForm } from "@/auth/components/login-form";
import { getPublicSession } from "@/lib/session/cookies";

export default async function LoginPage() {
  const session = await getPublicSession();

  if (session.state === "authenticated") {
    redirect("/dashboard");
  }

  if (session.state === "pending-company") {
    redirect("/select-company");
  }

  return (
    <AuthPageShell
      title="Welcome back"
      description="Login to access your company data securely."
    >
      <LoginForm />
    </AuthPageShell>
  );
}
