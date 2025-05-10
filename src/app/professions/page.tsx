import Link from "next/link";
import Image from "next/image";
import { professionsData } from "@/data/professions";
import { useState } from "react";
import { ProfessionImage } from "@/components/ProfessionImage";

export const metadata = {
  title: "Каталог профессий | СтаффСити",
  description: "Мы предоставляем квалифицированных рабочих различных специальностей для строительных и логистических компаний. Широкий выбор профессий для вашего бизнеса.",
  keywords: "разнорабочие, грузчики, такелажники, монтажники, монолитчики, сварщики, сантехники, отделочники, каталог профессий, B2B, персонал для бизнеса",
};

export default function ProfessionsPage() {
  return (
    <div className="min-h-screen bg-black text-orange-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-orange-500 relative">
          Наши профессии
          <span className="absolute bottom-0 left-0 w-24 h-1 bg-orange-500 -mb-3"></span>
        </h1>
        
        <p className="text-lg mb-8 max-w-3xl">
          Компания СтаффСити предоставляет высококвалифицированный персонал различных строительных и производственных специальностей. Выберите интересующую вас профессию для получения подробной информации.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionsData.map((profession) => (
            <Link 
              key={profession.slug} 
              href={`/professions/${profession.slug}`}
              className="group"
            >
              <div className="bg-orange-950/30 rounded-lg overflow-hidden shadow-lg border border-orange-500/20 hover:border-orange-500/50 transition-all h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <ProfessionImage src={profession.image} alt={profession.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-orange-500 mb-2">{profession.name}</h2>
                  <p className="text-sm text-orange-100/80 flex-1">{profession.shortDescription}</p>
                  <div className="mt-4 flex items-center text-sm text-orange-400 font-medium">
                    Подробнее
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-orange-950/30 to-black p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Не нашли подходящую специальность?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Свяжитесь с нашими менеджерами для получения информации о других доступных профессиях или для формирования индивидуального предложения.
          </p>
          <Link href="/contacts" className="bg-orange-500 text-black font-bold py-3 px-8 rounded-md hover:bg-orange-600 transition-colors shadow-lg inline-block">
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
} 