"use client";

import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const basePath = '/stuffcity-site';
  
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        {!imgError ? (
          <img 
            src={`${basePath}/images/hero-bg.jpg`} 
            alt="СтаффСити - Профессиональные кадры для вашего бизнеса" 
            className="object-cover object-center w-full h-full absolute inset-0" 
            onError={() => setImgError(true)}
            style={{objectFit: 'cover', objectPosition: 'center'}}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-black via-orange-950/30 to-black"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/70"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <img 
              src={`${basePath}/images/logo-staffcity.svg`} 
              alt="СтаффСити" 
              width={100} 
              height={100} 
              className="hidden lg:block" 
            />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 leading-tight">
              Профессиональные <br className="hidden md:block" />
              <span className="text-white">кадры для вашего бизнеса</span>
            </h1>
            
            <p className="text-lg md:text-xl text-orange-100/90 max-w-xl leading-relaxed">
              Предоставляем высококвалифицированных специалистов для решения ваших производственных задач в формате B2B. Оптимизируйте расходы на персонал и сосредоточьтесь на развитии бизнеса.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/professions" 
                className="bg-orange-500 text-black px-8 py-3 rounded-md font-bold hover:bg-orange-600 transition-colors shadow-lg text-center"
              >
                Подобрать специалистов
              </Link>
              <Link 
                href="/contacts" 
                className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-md font-bold hover:bg-orange-500 hover:text-black transition-colors shadow-lg text-center"
              >
                Связаться с нами
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-6">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center overflow-hidden">
                  <img src={`${basePath}/images/leroy-merlin.svg`} alt="Leroy Merlin" className="object-contain w-8 h-8" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-xs font-bold text-black" style={{background: 'linear-gradient(135deg, #1e3a8a 60%, #fff 100%)'}}>
                  СДС
                </div>
                <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-xs font-bold text-black" style={{background: 'linear-gradient(135deg, #f59e42 60%, #fff 100%)'}}>
                  ГЗК
                </div>
                <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-xs font-bold text-black" style={{background: 'linear-gradient(135deg, #d32f2f 60%, #fff 100%)'}}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#d32f2f"/><text x="10" y="15" text-anchor="middle" font-size="10" fill="#fff" font-family="Arial, Helvetica, sans-serif">М</text></svg>
                </div>
              </div>
              <p className="text-orange-100/80 text-sm">
                Лучшие компании выбирают нас
              </p>
            </div>
          </div>
          
          <div className="lg:block hidden">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-xl"></div>
              
              <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/30">
                <h3 className="text-2xl font-bold text-orange-500 mb-6">Почему выбирают нас</h3>
                
                <div className="space-y-5">
                  {[
                    {
                      title: "Быстрый подбор персонала",
                      description: "Формируем команду специалистов в течение 24-48 часов"
                    },
                    {
                      title: "Гарантия качества",
                      description: "Предоставляем только квалифицированных и проверенных сотрудников"
                    },
                    {
                      title: "Юридическая чистота",
                      description: "Полное документальное сопровождение сотрудничества"
                    },
                    {
                      title: "Экономия бюджета",
                      description: "Оптимизация затрат на содержание постоянного штата"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-sm text-orange-100/70">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className="text-orange-500 text-sm mb-2">Прокрутите вниз</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
} 