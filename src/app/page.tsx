import { redirect } from "next/navigation";
import { getPublicSession } from "@/lib/session/cookies";

export default async function HomePage() {
  const session = await getPublicSession();

  if (session.state === "authenticated") {
    redirect("/dashboard");
  }

  if (session.state === "pending-company") {
    redirect("/select-company");
  }

  redirect("/login");
}
