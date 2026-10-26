import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Great summaries for busy people",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
