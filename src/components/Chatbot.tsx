"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
};

const commonQuestions = [
  "Как быстро можно получить сотрудников?",
  "Какие специальности доступны?",
  "Сколько стоят ваши услуги?",
  "Работаете ли вы с юридическими лицами?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Показываем чат-бот через некоторое время после загрузки страницы
  useEffect(() => {
    const chatShown = sessionStorage.getItem("chatShown");
    
    if (!chatShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("chatShown", "true");
        
        // Отправляем приветственное сообщение
        handleBotReply("Здравствуйте! Меня зовут Алекс, я виртуальный помощник СтаффСити. Как я могу вам помочь сегодня?");
      }, 20000); // 20 секунд
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleBotReply = (text: string) => {
    // Имитация набора сообщения ботом
    setShowTyping(true);
    
    setTimeout(() => {
      setShowTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text,
          sender: "bot",
          timestamp: new Date()
        }
      ]);
    }, 1000 + Math.random() * 1000); // Случайная задержка для реалистичности
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Добавляем сообщение пользователя
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        sender: "user",
        timestamp: new Date()
      }
    ]);
    
    setInput("");
    
    // Генерируем ответ бота в зависимости от запроса
    const userInput = input.toLowerCase();
    let botResponse = "";
    
    if (userInput.includes("привет") || userInput.includes("здравствуй")) {
      botResponse = "Здравствуйте! Чем я могу вам помочь?";
    } else if (userInput.includes("цен") || userInput.includes("стоимость") || userInput.includes("стоит")) {
      botResponse = "Стоимость наших услуг зависит от специализации и количества требуемых сотрудников. Оставьте заявку на консультацию, и наш менеджер рассчитает для вас индивидуальное предложение.";
    } else if (userInput.includes("быстро") || userInput.includes("срок")) {
      botResponse = "Мы можем предоставить сотрудников в течение 24-48 часов после подписания договора. В некоторых случаях возможна более быстрая организация.";
    } else if (userInput.includes("контакт") || userInput.includes("телефон") || userInput.includes("связаться")) {
      botResponse = "Вы можете связаться с нами по телефону +7 (999) 123-45-67 или оставить заявку на сайте, и наш менеджер свяжется с вами.";
    } else if (userInput.includes("специальност") || userInput.includes("профессии") || userInput.includes("работник")) {
      botResponse = "Мы предоставляем сотрудников различных строительных и производственных специальностей: разнорабочие, грузчики, монтажники, сварщики и многие другие. Полный список вы можете посмотреть в разделе 'Профессии'.";
    } else {
      botResponse = "Спасибо за ваш запрос! Для получения более детальной информации я рекомендую оставить заявку на консультацию или связаться с нашими специалистами по телефону.";
    }
    
    // Имитируем ответ от бота
    handleBotReply(botResponse);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleQuickQuestion = (question: string) => {
    // Добавляем вопрос как сообщение пользователя
    setMessages(prev => [
      ...prev, 
      {
        id: Date.now(),
        text: question,
        sender: "user",
        timestamp: new Date()
      }
    ]);
    
    // Имитируем ответ бота
    setTimeout(() => {
      if (question === "Как быстро можно получить сотрудников?") {
        handleBotReply("Мы можем организовать команду в течение 24-48 часов после подписания договора.");
      } else if (question === "Какие специальности доступны?") {
        handleBotReply("Мы предоставляем разнорабочих, грузчиков, монтажников, сварщиков, монолитчиков и многих других. Подробный список вы найдете в разделе 'Профессии'.");
      } else if (question === "Сколько стоят ваши услуги?") {
        handleBotReply("Стоимость зависит от специальности и объема работ. Оставьте заявку на консультацию для расчета индивидуального предложения.");
      } else if (question === "Работаете ли вы с юридическими лицами?") {
        handleBotReply("Да, мы специализируемся на работе именно с юридическими лицами по договору B2B.");
      }
    }, 500);
  };
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-orange-500 rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-orange-600 transition-colors"
        aria-label="Открыть чат"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 h-96 bg-gradient-to-br from-black to-orange-950/60 rounded-lg shadow-xl flex flex-col z-40 overflow-hidden border border-orange-500/30">
      {/* Шапка чата */}
      <div className="p-3 bg-orange-500 text-black flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold">Онлайн-консультант</h3>
            <p className="text-xs text-black/80">СтаффСити</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-black/80 hover:text-black transition-colors"
          aria-label="Закрыть чат"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Сообщения */}
      <div className="flex-1 p-3 overflow-y-auto bg-black/20">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h4 className="text-orange-500 font-bold text-lg mb-2">Онлайн-консультант</h4>
            <p className="text-orange-100/80 text-sm">Задайте вопрос, и наш консультант ответит вам в ближайшее время</p>
            
            <div className="mt-4 w-full">
              <h5 className="text-sm font-medium text-orange-500 mb-2">Часто задаваемые вопросы:</h5>
              <div className="space-y-2">
                {commonQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-2 bg-black/40 hover:bg-black/60 rounded text-sm text-orange-100/90 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" 
                  ? "bg-orange-500 text-black rounded-br-none" 
                  : "bg-black/40 text-orange-100 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === "user" ? "text-black/70" : "text-orange-100/70"
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {showTyping && (
          <div className="mb-3 flex justify-start">
            <div className="bg-black/40 text-orange-100 rounded-lg rounded-bl-none p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-orange-500/70 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-orange-500/70 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-orange-500/70 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Ввод сообщения */}
      <div className="p-3 border-t border-orange-500/30 bg-black/30">
        <div className="flex">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите сообщение..."
            className="flex-1 px-3 py-2 bg-black/50 border border-orange-500/30 rounded-l focus:outline-none focus:ring-1 focus:ring-orange-500 text-orange-100 resize-none h-10 max-h-24"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`bg-orange-500 px-3 rounded-r flex items-center justify-center ${
              !input.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 