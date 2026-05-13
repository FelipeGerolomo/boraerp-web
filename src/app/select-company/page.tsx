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
      title="Choose your company"
      description="Select the company you want to access in this session."
    >
      <SelectCompanyForm companies={session.pending.companies} />
    </AuthPageShell>
  );
}
