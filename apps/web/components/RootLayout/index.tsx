"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

/**
 * O componente de layout raiz, que envolve toda a aplicação em um
 * SessionProvider do next-auth/react. Isso permite que qualquer componente
 * acesse a sessão com o hook useSession.
 */
const RootLayout: React.FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default RootLayout;
