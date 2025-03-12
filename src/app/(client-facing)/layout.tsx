import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creekside HOA",
  description:
    "Creekside Homeowner's webpage where we show off community events, post announcements, and talk about our association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`antialiased`}>{children}</div>;
}
