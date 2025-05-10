import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCapture from "@/components/LeadCapture";
import Chatbot from "@/components/Chatbot";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "СтаффСити — Рабочие для вашего бизнеса",
  description: "Предоставляем квалифицированных рабочих для строительных и логистических компаний: разнорабочие, грузчики, монтажники, сварщики и др. Работаем с юридическими лицами.",
  keywords: "разнорабочие, грузчики, такелажники, монтажники, монолитчики, сварщики, сантехники, отделочники, B2B, персонал для бизнеса",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="bg-black text-orange-100 min-h-screen flex flex-col">
        <AnalyticsProvider>
          <Header />
          <div className="pt-16">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
          
          {/* HubSpot-подобные компоненты */}
          <LeadCapture />
          <Chatbot />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
