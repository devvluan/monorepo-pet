import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
