"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-black/90 py-2 shadow-lg backdrop-blur-sm" 
        : "bg-transparent py-4"
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-staffcity.svg" alt="СтаффСити" width={40} height={40} className="mr-2" />
            <div className="text-orange-500 font-bold text-xl">СтаффСити</div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-orange-100 hover:text-orange-500 transition-colors">Главная</Link>
            <Link href="/professions" className="text-orange-100 hover:text-orange-500 transition-colors">Профессии</Link>
            <Link href="/about" className="text-orange-100 hover:text-orange-500 transition-colors">О компании</Link>
            <Link href="/contacts" className="text-orange-100 hover:text-orange-500 transition-colors">Контакты</Link>
            <a
              href="tel:+79672461908"
              className="bg-black text-orange-500 border border-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-500 hover:text-black transition-colors shadow-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="font-bold">+7 967 246 19 08</span>
            </a>
            <Link 
              href="/contacts" 
              className="bg-orange-500 text-black px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors shadow-sm"
            >
              Заказать
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-orange-100 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pt-4 pb-2`}>
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-orange-100 hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              href="/professions" 
              className="text-orange-100 hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Профессии
            </Link>
            <Link 
              href="/about" 
              className="text-orange-100 hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              О компании
            </Link>
            <Link 
              href="/contacts" 
              className="text-orange-100 hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </Link>
            <a
              href="tel:+79672461908"
              className="bg-black text-orange-500 border border-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-500 hover:text-black transition-colors shadow-sm flex items-center gap-2"
              style={{textAlign: 'center'}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="font-bold">+7 967 246 19 08</span>
            </a>
            <Link 
              href="/contacts" 
              className="bg-orange-500 text-black px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors shadow-sm inline-block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Заказать
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}