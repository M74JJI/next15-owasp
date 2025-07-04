import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth-provider";
import BackToHomeButton from "@/components/BackToHomeButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Next js OWASP Top 10 Lab – Hands-On Cybersecurity Training with Next.js",
  description:
    "A hands-on cybersecurity lab built with Next.js 15+ to simulate, exploit, and fix real-world vulnerabilities from the OWASP Top 10. Ideal for security researchers, students, and professionals mastering modern web application threats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <BackToHomeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
