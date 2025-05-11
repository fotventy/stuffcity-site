"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
};

type FormData = {
  name: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

// Этапы диалога для сбора данных
enum DialogStage {
  GREETING,
  ASK_NAME,
  ASK_PHONE,
  ASK_COMPANY,
  ASK_SERVICE,
  ASK_MESSAGE,
  CONFIRM_SUBMISSION,
  THANK_YOU,
  FREE_CHAT
}

// Доступные услуги
const availableServices = [
  "Разнорабочие",
  "Грузчики",
  "Такелажники",
  "Монтажники",
  "Монолитчики",
  "Сварщики",
  "Сантехники",
  "Отделочники",
  "Другое"
];

// Часто задаваемые вопросы
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
  const [dialogStage, setDialogStage] = useState<DialogStage>(DialogStage.GREETING);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [showServiceButtons, setShowServiceButtons] = useState(false);
  
  // Показываем чат-бот через некоторое время после загрузки страницы
  useEffect(() => {
    const chatShown = sessionStorage.getItem("chatShown");
    
    if (!chatShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("chatShown", "true");
        
        // Отправляем приветственное сообщение
        handleBotReply("Здравствуйте! Меня зовут Алекс, я виртуальный помощник СтаффСити. Готов помочь вам с подбором персонала для вашего бизнеса. Как я могу к вам обращаться?");
        setDialogStage(DialogStage.ASK_NAME);
      }, 15000); // 15 секунд
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Обработка ответа пользователя в зависимости от стадии диалога
  useEffect(() => {
    if (messages.length === 0 || messages[messages.length - 1].sender === 'bot') return;
    
    const lastUserMessage = messages[messages.length - 1].text;
    
    switch (dialogStage) {
      case DialogStage.ASK_NAME:
        if (lastUserMessage.length > 1) {
          setFormData(prev => ({ ...prev, name: lastUserMessage }));
          setTimeout(() => {
            handleBotReply(`Приятно познакомиться, ${lastUserMessage}! Для того чтобы мы могли с вами связаться, оставьте, пожалуйста, номер телефона.`);
            setDialogStage(DialogStage.ASK_PHONE);
          }, 1000);
        } else {
          handleBotReply("Кажется, ваше имя слишком короткое. Пожалуйста, укажите ваше полное имя.");
        }
        break;
        
      case DialogStage.ASK_PHONE:
        // Простая валидация телефона (можно улучшить)
        if (lastUserMessage.length >= 7 && /\d/.test(lastUserMessage)) {
          setFormData(prev => ({ ...prev, phone: lastUserMessage }));
          setTimeout(() => {
            handleBotReply("Отлично! Укажите, пожалуйста, название вашей компании. Если вы частное лицо, просто напишите 'Частное лицо'.");
            setDialogStage(DialogStage.ASK_COMPANY);
          }, 1000);
        } else {
          handleBotReply("Номер телефона выглядит некорректным. Пожалуйста, укажите действующий номер телефона.");
        }
        break;
        
      case DialogStage.ASK_COMPANY:
        setFormData(prev => ({ ...prev, company: lastUserMessage }));
        setTimeout(() => {
          handleBotReply("Какой тип персонала вас интересует? Выберите из списка или укажите свой вариант.");
          setShowServiceButtons(true);
          setDialogStage(DialogStage.ASK_SERVICE);
        }, 1000);
        break;
        
      case DialogStage.ASK_SERVICE:
        setFormData(prev => ({ ...prev, service: lastUserMessage }));
        setShowServiceButtons(false);
        setTimeout(() => {
          handleBotReply("Расскажите подробнее о вашем проекте или задаче. Какой объем работы, сроки, особые требования?");
          setDialogStage(DialogStage.ASK_MESSAGE);
        }, 1000);
        break;
        
      case DialogStage.ASK_MESSAGE:
        setFormData(prev => ({ ...prev, message: lastUserMessage }));
        setTimeout(() => {
          const summary = 
            `Отлично, ${formData.name}! Я подготовил заявку со следующими данными:\n\n` +
            `Имя: ${formData.name}\n` +
            `Телефон: ${formData.phone}\n` +
            `Компания: ${formData.company}\n` +
            `Интересующая услуга: ${formData.service}\n` +
            `Сообщение: ${lastUserMessage}\n\n` +
            `Всё верно? Могу отправить заявку нашему менеджеру, и он свяжется с вами в ближайшее время.`;
          
          handleBotReply(summary);
          setDialogStage(DialogStage.CONFIRM_SUBMISSION);
        }, 1500);
        break;
        
      case DialogStage.CONFIRM_SUBMISSION:
        const response = lastUserMessage.toLowerCase();
        if (response.includes('да') || response.includes('верно') || response.includes('отправить')) {
          submitForm();
        } else {
          handleBotReply("Хорошо, давайте исправим данные. Напишите, что именно нужно изменить, или просто задайте любой вопрос, и я постараюсь помочь.");
          setDialogStage(DialogStage.FREE_CHAT);
        }
        break;
        
      case DialogStage.FREE_CHAT:
        handleUserQuestion(lastUserMessage);
        break;
        
      default:
        handleUserQuestion(lastUserMessage);
        break;
    }
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
  
  const handleServiceSelect = (service: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: service,
        sender: "user",
        timestamp: new Date()
      }
    ]);
    
    setShowServiceButtons(false);
  };
  
  const handleUserQuestion = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let botResponse = "";
    
    // Обработка ключевых слов и фраз
    if (lowerInput.includes('заявк') || lowerInput.includes('оформить') || lowerInput.includes('заказать')) {
      botResponse = `${formData.name}, готов помочь вам оформить заявку! Давайте заполним небольшую форму. Как вас зовут?`;
      setDialogStage(DialogStage.ASK_NAME);
    } else if (lowerInput.includes('цен') || lowerInput.includes('стоимость') || lowerInput.includes('стоит')) {
      botResponse = "Стоимость наших услуг зависит от специализации и количества требуемых сотрудников. Оставьте заявку на консультацию, и наш менеджер рассчитает для вас индивидуальное предложение. Хотите оформить заявку?";
    } else if (lowerInput.includes('быстро') || lowerInput.includes('срок')) {
      botResponse = "Мы можем предоставить сотрудников в течение 24-48 часов после подписания договора. В некоторых случаях возможна более быстрая организация. Хотите оставить заявку?";
    } else if (lowerInput.includes('контакт') || lowerInput.includes('телефон') || lowerInput.includes('связаться')) {
      botResponse = "Вы можете связаться с нами по телефону +7 967 246 19 08 или оставить заявку прямо здесь, и наш менеджер свяжется с вами. Хотите оформить заявку?";
    } else if (lowerInput.includes('специальност') || lowerInput.includes('профессии') || lowerInput.includes('работник')) {
      botResponse = "Мы предоставляем сотрудников различных строительных и производственных специальностей: разнорабочие, грузчики, монтажники, сварщики, монолитчики, сантехники, отделочники и многие другие. Какая специальность вас интересует?";
    } else if (lowerInput.includes('привет') || lowerInput.includes('здравствуй')) {
      botResponse = `Здравствуйте${formData.name ? ', ' + formData.name : ''}! Чем я могу вам помочь? Могу рассказать о наших услугах или помочь оформить заявку.`;
    } else {
      botResponse = "Спасибо за ваш запрос! Для получения более детальной информации я рекомендую оставить заявку на консультацию с нашим специалистом. Поможете заполнить короткую форму?";
    }
    
    // Имитируем ответ от бота
    handleBotReply(botResponse);
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
        handleBotReply("Мы можем организовать команду в течение 24-48 часов после подписания договора. Хотите оставить заявку, чтобы наш менеджер связался с вами?");
      } else if (question === "Какие специальности доступны?") {
        handleBotReply("Мы предоставляем разнорабочих, грузчиков, монтажников, сварщиков, монолитчиков, сантехников, отделочников и многих других. Какая специальность вас интересует?");
      } else if (question === "Сколько стоят ваши услуги?") {
        handleBotReply("Стоимость зависит от специальности и объема работ. Оставьте заявку на консультацию для расчета индивидуального предложения. Поможете заполнить форму?");
      } else if (question === "Работаете ли вы с юридическими лицами?") {
        handleBotReply("Да, мы специализируемся на работе именно с юридическими лицами по договору B2B. Какой персонал вам требуется?");
      }
    }, 500);
  };
  
  const submitForm = async () => {
    setSubmitting(true);
    handleBotReply("Отправляю вашу заявку...");
    
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('company', formData.company);
      formDataObj.append('service', formData.service);
      formDataObj.append('message', formData.message);
      
      const response = await fetch("/api/lead-to-bitrix", {
        method: "POST",
        body: formDataObj,
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        handleBotReply(`Отлично, ${formData.name}! Ваша заявка успешно отправлена. Наш менеджер свяжется с вами в ближайшее время по телефону ${formData.phone}.`);
        setDialogStage(DialogStage.THANK_YOU);
        
        setTimeout(() => {
          handleBotReply("Если у вас возникнут дополнительные вопросы, не стесняйтесь спрашивать. Я всегда готов помочь!");
          setDialogStage(DialogStage.FREE_CHAT);
        }, 3000);
      } else {
        handleBotReply("К сожалению, произошла ошибка при отправке заявки. Пожалуйста, проверьте данные и попробуйте снова или свяжитесь с нами по телефону +7 967 246 19 08.");
        setDialogStage(DialogStage.FREE_CHAT);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      handleBotReply("Возникла техническая проблема при отправке заявки. Пожалуйста, свяжитесь с нами по телефону +7 967 246 19 08.");
      setDialogStage(DialogStage.FREE_CHAT);
    } finally {
      setSubmitting(false);
    }
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
            <p className="text-orange-100/80 text-sm">Я помогу вам подобрать персонал для вашего бизнеса</p>
            
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
        
        {showServiceButtons && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {availableServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => handleServiceSelect(service)}
                  className="bg-orange-500/80 text-black px-3 py-1 rounded text-sm hover:bg-orange-500 transition-colors"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}
        
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
            disabled={submitting}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || submitting}
            className={`bg-orange-500 px-3 rounded-r flex items-center justify-center ${
              !input.trim() || submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {submitting ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 