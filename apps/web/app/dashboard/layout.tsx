import "../styles/globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata = {
  title: "Ludis - Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main content area */}
          <div className="flex-grow overflow-auto">
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
