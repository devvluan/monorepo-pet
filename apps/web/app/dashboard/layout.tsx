import { Session } from "next-auth";

import "../styles/globals.css";
import { Sidebar } from "@/components/Sidebar";
import RootLayout from "@/components/RootLayout";

export const metadata = {
  title: "Ludis PET",
  description: "Dashboard de gestão de pets",
};

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, session }) => {
  return (
    <html lang="pt-BR">
      <head title="Gestão de Pet - Dashboard" />
      <body>
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main content area */}
          <div className="flex-grow overflow-auto">
            <main className="p-6">
              <RootLayout session={session}>{children}</RootLayout>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
