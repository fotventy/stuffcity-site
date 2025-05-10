"use client";

import Link from "next/link";
import Image from "next/image";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-orange-100 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Image src="/images/logo-staffcity.svg" alt="СтаффСити" width={60} height={60} className="mr-3" />
              <div>
                <div className="text-2xl font-bold text-orange-500">СтаффСити</div>
                <div className="text-sm text-orange-100/70">Профессиональный персонал для вашего бизнеса</div>
              </div>
            </div>
            <p className="text-sm text-orange-100/80 mb-6">
              СтаффСити предоставляет высококвалифицированных специалистов различных строительных и производственных профессий для B2B-сегмента. Мы помогаем оптимизировать затраты на персонал и сосредоточиться на развитии вашего бизнеса.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-orange-950/30 w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="bg-orange-950/30 w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="bg-orange-950/30 w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path>
                </svg>
              </a>
              <a href="#" className="bg-orange-950/30 w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-orange-500 mb-4">Компания</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-orange-100/80 hover:text-orange-400 transition-colors">Главная</Link>
                </li>
                <li>
                  <Link href="/about" className="text-orange-100/80 hover:text-orange-400 transition-colors">О компании</Link>
                </li>
                <li>
                  <Link href="/professions" className="text-orange-100/80 hover:text-orange-400 transition-colors">Профессии</Link>
                </li>
                <li>
                  <Link href="/contacts" className="text-orange-100/80 hover:text-orange-400 transition-colors">Контакты</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-orange-500 mb-4">Услуги</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/professions/raznorabochie" className="text-orange-100/80 hover:text-orange-400 transition-colors">Разнорабочие</Link>
                </li>
                <li>
                  <Link href="/professions/gruzchiki" className="text-orange-100/80 hover:text-orange-400 transition-colors">Грузчики</Link>
                </li>
                <li>
                  <Link href="/professions/montazh" className="text-orange-100/80 hover:text-orange-400 transition-colors">Монтажники</Link>
                </li>
                <li>
                  <Link href="/professions/svarka" className="text-orange-100/80 hover:text-orange-400 transition-colors">Сварщики</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <NewsletterSignup />
          </div>
        </div>
        
        <div className="border-t border-orange-500/20 pt-8 grid sm:grid-cols-2 gap-4">
          <div className="text-sm text-orange-100/60">
            © {currentYear} СтаффСити. Все права защищены.
          </div>
          <div className="text-sm text-orange-100/60 sm:text-right">
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">Политика конфиденциальности</Link>
            {' | '}
            <Link href="/terms" className="hover:text-orange-400 transition-colors">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 