import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Deals Hub",
  description: "Premium digital products at unbeatable prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
