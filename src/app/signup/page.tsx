import { redirect } from "next/navigation";
import { AuthPageShell } from "@/auth/components/auth-page-shell";
import { SignupForm } from "@/auth/components/signup-form";
import { getPublicSession } from "@/lib/session/cookies";

export default async function SignupPage() {
  const session = await getPublicSession();

  if (session.state === "authenticated") {
    redirect("/dashboard");
  }

  if (session.state === "pending-company") {
    redirect("/select-company");
  }

  return (
    <AuthPageShell
      title="Create your Bora ERP account"
      description="Register your company and start managing finance operations today."
    >
      <SignupForm />
    </AuthPageShell>
  );
}
