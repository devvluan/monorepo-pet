import "../styles/globals.css";

import { Sidebar } from "@/components/Sidebar";
import { Metadata } from "next";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { Poppins, Open_Sans, Nunito } from "next/font/google";

const openSans = Open_Sans({
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const nuninto = Nunito({
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
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
    <html
      lang="pt-BR"
      className={`${openSans.className} ${nuninto.className} ${poppins.className}`}
    >
      <head title="Gestão de Pet - Dashboard" />
      <body>
        <div className="flex-grow overflow-auto">
          <main className="p-6">
            <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          </main>
        </div>
        <div className="flex h-screen">
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
