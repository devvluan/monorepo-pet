import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Report() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div>
      <h1>Relatórios</h1>
    </div>
  );
}
