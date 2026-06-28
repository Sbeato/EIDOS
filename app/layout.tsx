import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "FORMA Client Hub",
  description: "Private client hub for EIDOS"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
