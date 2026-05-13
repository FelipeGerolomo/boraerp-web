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
      title="Bem-vindo de volta"
      description="Acesse os dados da sua empresa com segurança."
    >
      <LoginForm />
    </AuthPageShell>
  );
}
