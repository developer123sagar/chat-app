import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

import "./globals.css";
import { ReduxProvider } from "@/provider/ReduxProvider";

const inter = Inter({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "JiffyChat",
  description: "Powerful chat app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-950 relative`}>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
