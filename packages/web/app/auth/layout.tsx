import "@/styles/globals.css";
export const metadata = {
  title: "Gestão de Pet - Login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
