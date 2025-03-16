import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import NextAuthSessionProvider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OKCWM",
  description: "OKC Weight Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // overflow-x-hidden
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <div className="lg:mx-6 md:mx-16 ">
            <Header />
            <Toaster />
            {children}
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
