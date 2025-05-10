import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { professionsData } from "@/data/professions";
import type { Metadata } from "next";
import { ProfessionImage } from "@/components/ProfessionImage";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profession = professionsData.find(p => p.slug === params.slug);
  
  if (!profession) {
    return {
      title: "Профессия не найдена | СтаффСити",
      description: "Запрашиваемая страница не найдена на сайте СтаффСити.",
    };
  }
  
  return {
    title: `${profession.name} | СтаффСити`,
    description: `${profession.description.substring(0, 160)}...`,
    keywords: `${profession.name}, персонал, рабочие, строительство, B2B, аутсорсинг, аутстаффинг, СтаффСити`,
  };
}

export function generateStaticParams() {
  return professionsData.map((profession) => ({
    slug: profession.slug,
  }));
}

export default function ProfessionPage({ params }: Props) {
  const profession = professionsData.find(p => p.slug === params.slug);
  
  if (!profession) return notFound();

  return (
    <div className="min-h-screen bg-black text-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-orange-500 relative">
          {profession.name}
          <span className="absolute bottom-0 left-0 w-24 h-1 bg-orange-500 -mb-3"></span>
        </h1>
        
        <div className="bg-gradient-to-r from-black to-orange-950/30 rounded-lg overflow-hidden shadow-lg border border-orange-500/20 mb-12">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <ProfessionImage src={profession.image} alt={profession.name} isSinglePage={true} />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">{profession.title}</h2>
            <p className="text-base leading-relaxed mb-6">{profession.description}</p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-black/30 rounded-lg p-5 border-t-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-400 mb-3">Преимущества</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {profession.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black/30 rounded-lg p-5 border-t-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-400 mb-3">Обязанности</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {profession.duties.map((duty, index) => (
                    <li key={index}>{duty}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black/30 rounded-lg p-5 border-t-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-400 mb-3">Требования</h3>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {profession.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-950/30 to-black p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Готовы сделать заказ?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Свяжитесь с нашими менеджерами для расчета стоимости и обсуждения деталей сотрудничества.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacts" 
              className="bg-orange-500 text-black font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition-colors shadow-lg"
            >
              Оставить заявку
            </Link>
            <Link 
              href="/professions" 
              className="border border-orange-500 text-orange-500 font-bold py-3 px-6 rounded-md hover:bg-orange-500 hover:text-black transition-colors shadow-lg"
            >
              Все специалисты
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 