import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blackanderlust - Creatividad con Resultados",
  description: "Blackanderlust Studio: Growth, Multimedia y Código.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
