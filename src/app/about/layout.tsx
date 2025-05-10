import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании | СтаффСити",
  description: "СтаффСити — ведущий B2B-провайдер квалифицированного персонала для строительных, производственных и логистических компаний. Узнайте о нашей миссии, ценностях и преимуществах.",
  keywords: "о компании, СтаффСити, B2B, аутстаффинг, история компании, миссия, ценности, персонал для бизнеса",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 