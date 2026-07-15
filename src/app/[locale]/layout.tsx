import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/layout/footer/Footer";
import Providers from "./providers";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { getCurrentAuth } from "@/lib/auth/current-auth";
// import { AIAdvisor } from "@/components/shared/AIAdvisor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investbit - Investment Buddy",
  description: "Investment Buddy",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const { user, profile } = await getCurrentAuth();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers initialUser={user} initialProfile={profile}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            {/* <AIAdvisor /> */}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
