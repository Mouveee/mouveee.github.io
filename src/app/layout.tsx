import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Dots from "./components/Dots"
import "./globals.css";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '200'], // or other weights like '100', '300', etc.
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Marco Huwig – Webentwickler Fokus auf Frontend",
  description: "Webentwickler mit Fokus auf Frontend – React, Next.js, Vue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${roboto.className} antialiased`}
      >
        <Dots numberOfDots={13} />
        {children}
      </body>
    </html>
  );
}
