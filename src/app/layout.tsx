import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vizzyfy",
  description: "An algorithm vizualizer which helps in visualizing different kinds of algorithms,",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        // url: '/images/icon-light.png',
        url: '/images/icon.svg',
        href: '/images/icon.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/icon.svg',
        href: '/images/icon.svg',
        // href: '/images/icon-dark.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
