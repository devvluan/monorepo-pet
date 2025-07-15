import { SidebarProvider } from "@/components/ui/sidebar";
import "../styles/global.css";

import { AppSidebar } from "@/components/AppSidebar";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { Metadata } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ludis PET",
  description: "Dashboard de gestão de pets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={nunito.className}>
      <body>
        <NextAuthSessionProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 p-2">{children}</div>
          </SidebarProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
