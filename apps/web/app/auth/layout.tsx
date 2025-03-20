export const metadata = {
  title: "Ludis Pet",
  description: "Gestão de PetShop",
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
