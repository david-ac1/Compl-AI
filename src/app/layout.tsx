import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compl-AI — Autonomous Compliance Agent",
  description: "GitLab Duo compliance agent that prevents security risks before merge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${publicSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

