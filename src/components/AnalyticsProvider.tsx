"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

// Тип для хранения данных о посетителе
type VisitorData = {
  sessionId: string;
  firstVisit: string;
  lastVisit: string;
  totalVisits: number;
  pageViews: Array<{
    path: string;
    timestamp: string;
    timeOnPage?: number;
  }>;
  referrer: string | null;
  device: {
    screenWidth: number;
    screenHeight: number;
    userAgent: string;
  };
  interactions: Array<{
    type: string;
    element: string;
    timestamp: string;
    data?: any;
  }>;
};

// Тип для контекста аналитики
type AnalyticsContextType = {
  trackEvent: (eventName: string, element: string, data?: any) => void;
  visitorData: VisitorData | null;
};

// Создаем контекст для использования в других компонентах
const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  visitorData: null,
});

// Хук для использования аналитики в компонентах
export const useAnalytics = () => useContext(AnalyticsContext);

// Генерация уникального ID сессии
const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
};

export default function AnalyticsProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const [pageStartTime, setPageStartTime] = useState<number>(Date.now());
  const pathname = usePathname();
  
  // Инициализация при первой загрузке
  useEffect(() => {
    // Попытка восстановить данные посетителя из localStorage
    const storedData = localStorage.getItem("visitorData");
    let visitor: VisitorData;
    
    if (storedData) {
      visitor = JSON.parse(storedData);
      // Обновляем данные посетителя при новом посещении
      visitor.lastVisit = new Date().toISOString();
      visitor.totalVisits += 1;
    } else {
      // Если это первое посещение, создаем новые данные
      visitor = {
        sessionId: generateSessionId(),
        firstVisit: new Date().toISOString(),
        lastVisit: new Date().toISOString(),
        totalVisits: 1,
        pageViews: [],
        referrer: document.referrer || null,
        device: {
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          userAgent: navigator.userAgent,
        },
        interactions: [],
      };
    }
    
    setVisitorData(visitor);
    localStorage.setItem("visitorData", JSON.stringify(visitor));
    
    // Имитация отправки данных на сервер аналитики (в реальном приложении)
    console.log("[Analytics] Session started:", visitor.sessionId);
    
    // Функция логирования времени на странице при закрытии
    const logSessionEnd = () => {
      if (visitorData) {
        const updatedData = { ...visitorData };
        // Добавляем информацию о времени на последней странице
        if (updatedData.pageViews.length > 0) {
          const lastPageView = updatedData.pageViews[updatedData.pageViews.length - 1];
          lastPageView.timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
        }
        
        localStorage.setItem("visitorData", JSON.stringify(updatedData));
        console.log("[Analytics] Session ended, data saved.");
      }
    };
    
    // Отслеживаем закрытие страницы
    window.addEventListener("beforeunload", logSessionEnd);
    return () => {
      window.removeEventListener("beforeunload", logSessionEnd);
    };
  }, []);
  
  // Отслеживание изменения пути страницы
  useEffect(() => {
    if (!visitorData) return;
    
    // Если был предыдущий путь, обновляем timeOnPage
    if (prevPath && prevPath !== pathname) {
      const now = Date.now();
      const timeOnPage = Math.round((now - pageStartTime) / 1000);
      
      setVisitorData(prev => {
        if (!prev) return null;
        
        const updatedData = { ...prev };
        // Находим последний pageView для prevPath и обновляем timeOnPage
        const pageViewIndex = updatedData.pageViews.findIndex(
          pv => pv.path === prevPath && pv.timeOnPage === undefined
        );
        
        if (pageViewIndex !== -1) {
          updatedData.pageViews[pageViewIndex].timeOnPage = timeOnPage;
        }
        
        // Добавляем новый pageView
        updatedData.pageViews.push({
          path: pathname,
          timestamp: new Date().toISOString(),
        });
        
        localStorage.setItem("visitorData", JSON.stringify(updatedData));
        return updatedData;
      });
    } else if (!prevPath || pathname !== prevPath) {
      // Первая страница посещения или новая страница
      setVisitorData(prev => {
        if (!prev) return null;
        
        const updatedData = { ...prev };
        updatedData.pageViews.push({
          path: pathname,
          timestamp: new Date().toISOString(),
        });
        
        localStorage.setItem("visitorData", JSON.stringify(updatedData));
        return updatedData;
      });
    }
    
    setPrevPath(pathname);
    setPageStartTime(Date.now());
    
    // Имитация отправки события просмотра страницы
    console.log(`[Analytics] Page view: ${pathname}`);
  }, [pathname, visitorData, prevPath]);
  
  // Функция для отслеживания событий взаимодействия
  const trackEvent = (eventName: string, element: string, data: any = {}) => {
    if (!visitorData) return;
    
    setVisitorData(prev => {
      if (!prev) return null;
      
      const updatedData = { ...prev };
      updatedData.interactions.push({
        type: eventName,
        element,
        timestamp: new Date().toISOString(),
        data,
      });
      
      localStorage.setItem("visitorData", JSON.stringify(updatedData));
      return updatedData;
    });
    
    // Имитация отправки события на сервер
    console.log(`[Analytics] Event tracked: ${eventName}`, {
      element,
      data,
      timestamp: new Date().toISOString(),
    });
  };
  
  // Отслеживание общих взаимодействий с сайтом (клики по кнопкам и ссылкам)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Проверяем клики по кнопкам и ссылкам
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        const element = target.tagName === "BUTTON" || target.tagName === "A" 
          ? target 
          : (target.closest("button") || target.closest("a"));
        
        if (element) {
          const text = element.textContent?.trim() || "Без текста";
          const href = element.tagName === "A" || element.closest("a") 
            ? (element as HTMLAnchorElement).href || "Без ссылки" 
            : "Не ссылка";
          
          trackEvent("click", element.tagName, {
            text,
            href,
            location: pathname,
          });
        }
      }
    };
    
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [trackEvent, pathname]);
  
  return (
    <AnalyticsContext.Provider value={{ trackEvent, visitorData }}>
      {children}
    </AnalyticsContext.Provider>
  );
} 