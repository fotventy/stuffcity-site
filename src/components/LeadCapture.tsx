"use client";

import { useState, useEffect } from "react";

export default function LeadCapture() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Проверяем, был ли попап закрыт в этой сессии
  useEffect(() => {
    const formClosed = sessionStorage.getItem("leadFormClosed");
    if (formClosed) {
      setIsClosed(true);
      // Через 5 минут снова показать попап
      const reopenTimer = setTimeout(() => {
        setIsClosed(false);
        setIsVisible(true);
        sessionStorage.removeItem("leadFormClosed");
      }, 300000); // 5 минут
      return () => clearTimeout(reopenTimer);
    }
  }, []);

  // Показать форму после прокрутки страницы или по таймеру, если не закрыта
  useEffect(() => {
    if (isClosed) return;
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5 && !isVisible) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 секунд для всех посетителей
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isVisible, isClosed]);

  // Удаляем старую логику для повторных посетителей
  useEffect(() => {
    if (isClosed) return;
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
    }
  }, [isClosed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('company', company);
      formData.append('service', 'Всплывающая форма');
      formData.append('message', 'Запрос консультации через всплывающую форму');
      
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
      
      // Проверяем ответ от API
      if (response.ok && data && data.success === true) {
    setSubmitted(true);
      } else {
        setError(data?.message || "Произошла ошибка при отправке формы");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setError("Произошла ошибка при отправке формы");
    } finally {
    setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    sessionStorage.setItem("leadFormClosed", "true");
  };

  if (!isVisible || isClosed) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gradient-to-br from-black to-orange-950/60 max-w-md w-full rounded-lg shadow-xl overflow-hidden relative animate-fade-in">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-orange-100/60 hover:text-orange-100 transition-colors"
          aria-label="Закрыть"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-orange-500 mb-3">Получите бесплатную консультацию</h2>
              <p className="text-orange-100/80 mb-6">Заполните форму, и наш специалист свяжется с вами в течение 30 минут.</p>
              
              {error && (
                <div className="p-3 bg-red-500/20 text-red-200 rounded mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-orange-100/80 mb-1">Имя</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-orange-500/30 bg-black/50 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 text-orange-100"
                    placeholder="Иван Иванов"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-orange-100/80 mb-1">Телефон</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-orange-500/30 bg-black/50 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 text-orange-100"
                    placeholder="+7 (900) 123-45-67"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-orange-100/80 mb-1">Компания</label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-orange-500/30 bg-black/50 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 text-orange-100"
                    placeholder="ООО «Компания»"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 bg-orange-500 text-black font-bold rounded hover:bg-orange-600 transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Отправка...
                    </span>
                  ) : (
                    "Получить консультацию"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-orange-500 mb-3">Спасибо за заявку!</h2>
              <p className="text-orange-100/80 mb-6">Наш специалист свяжется с вами в ближайшее время.</p>
              <button
                onClick={handleClose}
                className="bg-orange-500 text-black font-bold py-2 px-6 rounded hover:bg-orange-600 transition-colors"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
        
        <div className="px-6 py-3 bg-black/30 border-t border-orange-500/20 text-xs text-orange-100/60 text-center">
          Мы заботимся о защите ваших данных. Нажимая кнопку, вы соглашаетесь с нашей <a href="#" className="text-orange-500 hover:underline">политикой конфиденциальности</a>.
        </div>
      </div>
    </div>
  );
} 