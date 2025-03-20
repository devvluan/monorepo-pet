import { Metadata } from "next";
import { getCsrfToken } from "next-auth/react";
import { headers } from "next/headers";
import { Login } from "@/components/Login";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "LudisPet - Login",
  description: "Página de login",
};

async function SignIn() {
  const csrfToken = await getCsrfToken();
  const userAgent = headers().get("user-agent");
  const ip =
    headers().get("x-real-ip") ??
    headers().get("x-forwarded-for")?.split(".")[0];

  const session = await getServerSession(options);
  if (session) {
    redirect("/");
  }

  return (
    <>
      <main className="bg-white">
        <Login
          csrfToken={csrfToken ?? ""}
          ip={ip ?? ""}
          userAgent={userAgent ?? ""}
        />
      </main>
    </>
  );
}

export default SignIn;
