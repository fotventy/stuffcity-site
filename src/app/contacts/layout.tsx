import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты | СтаффСити",
  description: "Свяжитесь с нами для заказа услуг или получения консультации. Мы предоставляем квалифицированных рабочих для строительных и логистических компаний.",
  keywords: "контакты, заявка, СтаффСити, B2B, аутстаффинг, персонал для бизнеса, заказать рабочих",
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 