import { redirect } from "next/navigation";
import { AuthPageShell } from "@/auth/components/auth-page-shell";
import { SelectCompanyForm } from "@/auth/components/select-company-form";
import { getPublicSession } from "@/lib/session/cookies";

export default async function SelectCompanyPage() {
  const session = await getPublicSession();

  if (session.state === "authenticated") {
    redirect("/dashboard");
  }

  if (session.state !== "pending-company") {
    redirect("/login");
  }

  return (
    <AuthPageShell
      title="Escolha sua empresa"
      description="Selecione a empresa que deseja acessar nesta sessão."
    >
      <SelectCompanyForm companies={session.pending.companies} />
    </AuthPageShell>
  );
}
