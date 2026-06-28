import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EIDOS FORMA Client Hub",
  description: "Mobile-first EIDOS FORMA client hub MVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
