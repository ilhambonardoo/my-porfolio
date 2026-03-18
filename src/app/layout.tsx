import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/src/components/SmoothScroll";
import "./globals.css";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const helvetica = localFont({
  src: [
    {
      path: "./fonts/helvetica-now-display/HelveticaNowDisplay-ExtLt.woff2",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-now-display/HelveticaNowDisplay-Black.woff2",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-now-display/HelveticaNowDisplay-Regular.woff2",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

const nb = localFont({
  src: "./fonts/nb-font/NB International Regular Webfont.ttf",
  variable: "--font-nb",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio Ilham Bonardo Marpaung",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${helvetica.variable} ${nb.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
