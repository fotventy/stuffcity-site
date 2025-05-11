"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent, useRef } from "react";

export default function ContactsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/lead-to-bitrix", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      // Логируем ответ для отладки
      console.log("API Response:", { 
        status: response.status, 
        ok: response.ok,
        data 
      });
      
      // Проверяем, что ответ успешный И содержит поле success: true
      if (response.ok && data && data.success === true) {
        setFormStatus({
          type: "success",
          message: data.message || "Заявка успешно отправлена!",
        });
        // Безопасно сбрасываем форму через ref
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setFormStatus({
          type: "error",
          message: data.message || "Произошла ошибка при отправке формы",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        type: "error",
        message: "Произошла ошибка при отправке формы",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-orange-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-orange-500 relative">
          Свяжитесь с нами
          <span className="absolute bottom-0 left-0 w-24 h-1 bg-orange-500 -mb-3"></span>
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-gradient-to-r from-black to-orange-950/30 rounded-lg shadow-lg p-6 sm:p-8 border border-orange-500/20">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">Оставить заявку</h2>
            <p className="text-orange-100/80 mb-6">
              Заполните форму ниже, и наш менеджер свяжется с вами в течение рабочего дня для обсуждения деталей сотрудничества.
            </p>
            
            {formStatus.type && (
              <div
                className={`p-4 rounded mb-6 ${
                  formStatus.type === "success"
                    ? "bg-green-500/20 text-green-200"
                    : "bg-red-500/20 text-red-200"
                }`}
              >
                {formStatus.message}
              </div>
            )}
            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} ref={formRef}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-orange-300 mb-1">Ваше имя *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    placeholder="Иван Петров" 
                    className="w-full p-3 rounded bg-black/50 border border-orange-500/30 text-white placeholder:text-orange-100/50 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-orange-300 mb-1">Компания</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    placeholder="ООО Компания" 
                    className="w-full p-3 rounded bg-black/50 border border-orange-500/30 text-white placeholder:text-orange-100/50 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-orange-300 mb-1">Телефон *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  placeholder="+7 (999) 999-99-99" 
                  className="w-full p-3 rounded bg-black/50 border border-orange-500/30 text-white placeholder:text-orange-100/50 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-orange-300 mb-1">Интересующая услуга</label>
                <select 
                  id="service" 
                  name="service"
                  className="w-full p-3 rounded bg-black/50 border border-orange-500/30 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                >
                  <option value="">Выберите услугу</option>
                  <option value="raznorabochie">Разнорабочие</option>
                  <option value="gruzchiki">Грузчики</option>
                  <option value="takelazh">Такелажники</option>
                  <option value="montazh">Монтажники</option>
                  <option value="monolit">Монолитчики</option>
                  <option value="svarka">Сварщики</option>
                  <option value="santeh">Сантехники</option>
                  <option value="otdelochniki">Отделочники</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-orange-300 mb-1">Сообщение</label>
                <textarea 
                  id="message" 
                  name="message"
                  placeholder="Расскажите о вашем проекте или задайте вопрос..." 
                  className="w-full p-3 rounded bg-black/50 border border-orange-500/30 text-white placeholder:text-orange-100/50 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" 
                  rows={5}
                />
              </div>
              
              <button 
                type="submit" 
                className={`bg-orange-500 text-black font-bold py-3 px-6 rounded hover:bg-orange-600 transition-colors shadow-lg mt-4 flex items-center justify-center ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправка...
                  </>
                ) : (
                  "Отправить заявку"
                )}
              </button>
              
              <p className="text-xs text-orange-100/60 mt-2">
                Нажимая кнопку "Отправить заявку", вы соглашаетесь с нашей политикой конфиденциальности и даете согласие на обработку персональных данных.
              </p>
            </form>
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="bg-gradient-to-r from-orange-950/30 to-black rounded-lg shadow-lg p-6 sm:p-8 border border-orange-500/20 mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-6">Контакты</h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-orange-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-300">Телефон</h3>
                    <p className="text-orange-100">
                      <a href="tel:+79672461908" className="hover:text-orange-400 transition-colors">+7 967 246 19 08</a>
                    </p>
                    <div className="flex gap-4 mt-2">
                      <a href="https://wa.me/79672461908" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 font-semibold">Whatsapp</a>
                      <a href="tg://resolve?domain=Alexand_St" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold">Telegram</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-orange-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-300">Email</h3>
                    <p className="text-orange-100">
                      <a href="mailto:info@стаффсити.рф" className="hover:text-orange-400 transition-colors">info@стаффсити.рф</a>
                    </p>
                    <p className="text-sm text-orange-100/70 mt-1">Отвечаем в течение рабочего дня</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-orange-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-300">Адрес</h3>
                    <p className="text-orange-100">
                      115035, г. Москва, ул. Садовническая, д.72, стр.1, этаж 1, помещение III, комната 5, офис Б4Л
                    </p>
                    <p className="text-sm text-orange-100/70 mt-1">9:00-18:00, Пн-Пт</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-black to-orange-950/30 rounded-lg shadow-lg p-6 sm:p-8 border border-orange-500/20">
              <h2 className="text-2xl font-bold text-orange-400 mb-6">Часто задаваемые вопросы</h2>
              
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-orange-300">Как быстро вы можете предоставить персонал?</h3>
                  <p className="text-orange-100/80 mt-1">
                    В большинстве случаев мы формируем команду в течение 24-48 часов с момента подтверждения заказа.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-orange-300">Как происходит оплата услуг?</h3>
                  <p className="text-orange-100/80 mt-1">
                    Мы работаем по безналичному расчету с предоставлением всех необходимых документов. Возможны различные схемы оплаты.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-orange-300">Предоставляете ли вы сотрудников на длительный срок?</h3>
                  <p className="text-orange-100/80 mt-1">
                    Да, мы предлагаем как краткосрочные, так и долгосрочные контракты в зависимости от потребностей вашего бизнеса.
                  </p>
                </div>
              </div>
              
              <Link 
                href="/about" 
                className="inline-flex items-center text-orange-500 font-semibold mt-6 hover:text-orange-400 transition-colors"
              >
                Подробнее о компании
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 