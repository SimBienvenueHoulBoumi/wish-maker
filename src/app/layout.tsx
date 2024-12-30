import SnowEffect from "@/components/SnowEffect"; // Assurez-vous que le chemin est correct
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const myFont = localFont({ src: "./fonts/LInternationale.ttf" });

export const metadata: Metadata = {
  title: "wishmaker",
  description: "Generated wish cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased`}
        suppressHydrationWarning
      >
        <SnowEffect />
        {children}
      </body>
    </html>
  );
}
