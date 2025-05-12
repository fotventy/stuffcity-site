import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCapture from "@/components/LeadCapture";
import Chatbot from "@/components/Chatbot";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "СтаффСити - Аутсорсинг линейного персонала",
  description: "Предоставляем линейный персонал для вашего бизнеса: грузчики, разнорабочие, монтажники, сварщики и другие специалисты. Работаем по всей России.",
  keywords: "разнорабочие, грузчики, такелажники, монтажники, монолитчики, сварщики, сантехники, отделочники, B2B, персонал для бизнеса",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AnalyticsProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <LeadCapture />
          <Chatbot />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
