import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RACTYSH ASSOCIATES PVT LTD | OTC Exchange Desk",
  description:
    "RACTYSH ASSOCIATES PVT LTD operates as a trusted intermediary for private OTC exchange desk services, handling verified mandates, controlled quotes, protected routing, and clean settlement reporting.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
