import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Great summaries for busy people",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
