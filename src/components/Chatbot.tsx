"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
};

interface FormData {
  name: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

// Этапы диалога для сбора данных
enum DialogStage {
  INITIAL,
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

// Улучшенная функция валидации и форматирования телефона
const formatPhoneNumber = (phone: string): { isValid: boolean; formatted: string } => {
  // Очищаем от всех символов кроме цифр и +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // Если номер начинается с 8, заменяем на +7
  if (cleaned.startsWith('8')) {
    cleaned = '+7' + cleaned.slice(1);
  } else if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  // Проверяем, что это валидный российский номер
  const isValid = cleaned.match(/^\+7[1-9]\d{9}$/);
  
  return {
    isValid: !!isValid,
    formatted: cleaned
  };
};

// Улучшенная проверка на приветствие
const isGreeting = (text: string): boolean => {
  const greetings = [
    'привет',
    'здравствуй',
    'здравствуйте',
    'добрый',
    'доброе',
    'доброго',
    'hi',
    'hello',
    'хай',
    'прив'
  ];
  
  const cleanText = text.toLowerCase().trim();
  return greetings.some(greeting => 
    cleanText === greeting || 
    cleanText.startsWith(greeting + ' ') || 
    cleanText.includes(greeting)
  );
};

// Улучшенная валидация имени
const isPossiblyName = (input: string): boolean => {
  const cleaned = input.trim();
  
  // Базовые проверки
  if (cleaned.length < 2 || cleaned.length > 50) return false;
  if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/i.test(cleaned)) return false;
  
  // Проверка на типичные не-имена
  const notNames = [
    'спасибо', 'пожалуйста', 'хорошо', 'ладно', 'нужно', 'надо',
    'помощь', 'помогите', 'заказ', 'заявка', 'срочно', 'важно',
    'давайте', 'сделайте', 'хочу', 'могу', 'буду', 'быстро',
    'thank', 'please', 'help', 'need', 'want', 'order',
    'привет', 'здравствуйте', 'добрый', 'день', 'утро', 'вечер',
    'hi', 'hello', 'hey', 'прив', 'хай'
  ];
  
  const words = cleaned.toLowerCase().split(/\s+/);
  
  // Проверяем каждое слово
  for (const word of words) {
    // Слишком короткие слова не могут быть именем
    if (word.length < 2) return false;
    
    // Слово не должно быть в списке не-имен
    if (notNames.includes(word)) return false;
    
    // Проверка на повторяющиеся буквы (например, "приииивет")
    const repeatingChars = /(.)\1{2,}/;
    if (repeatingChars.test(word)) return false;
  }
  
  return true;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [dialogStage, setDialogStage] = useState<DialogStage>(DialogStage.INITIAL);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showServiceButtons, setShowServiceButtons] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  
  console.log('Инициализация состояния формы:', formData);
  
  // Показываем чат-бот через некоторое время после загрузки страницы
  useEffect(() => {
    const chatShown = sessionStorage.getItem("chatShown");
    
    if (!chatShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("chatShown", "true");
        
        // Отправляем приветственное сообщение
        handleBotReply("Здравствуйте! Я Алекс, менеджер СтаффСити. Как я могу к вам обращаться?");
        setDialogStage(DialogStage.ASK_NAME);
      }, 15000); // 15 секунд
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Обработка первого сообщения при открытии чата
  useEffect(() => {
    if (isOpen && isFirstMessage && messages.length === 0) {
      setIsFirstMessage(false);
      handleBotReply("Здравствуйте! Я Алекс, менеджер СтаффСити. Как я могу к вам обращаться?");
      setDialogStage(DialogStage.ASK_NAME);
    }
  }, [isOpen, isFirstMessage, messages.length]);
  
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
            handleBotReply(`Приятно познакомиться, ${lastUserMessage}! Для того чтобы мы могли с вами связаться, оставьте, пожалуйста, номер телефона в формате +7 или 8 (XXX) XXX-XX-XX.`);
            setDialogStage(DialogStage.ASK_PHONE);
          }, 1000);
        } else {
          handleBotReply("Кажется, ваше имя слишком короткое. Пожалуйста, укажите ваше полное имя.");
        }
        break;
        
      case DialogStage.ASK_PHONE:
        // Улучшенная валидация телефона
        const phoneInput = lastUserMessage.replace(/[^\d+]/g, '');
        let formattedPhone = phoneInput;
        
        if (phoneInput.startsWith('8')) {
          formattedPhone = '+7' + phoneInput.slice(1);
        } else if (!phoneInput.startsWith('+')) {
          formattedPhone = '+' + phoneInput;
        }

        console.log('ASK_PHONE: Форматированный телефон:', formattedPhone);

        if (formattedPhone.match(/^\+7[1-9]\d{9}$/)) {
          console.log('ASK_PHONE: Устанавливаем телефон в состояние:', formattedPhone);
          setFormData(prev => {
            console.log('ASK_PHONE: Предыдущее состояние формы:', prev);
            const newState = { ...prev, phone: formattedPhone };
            console.log('ASK_PHONE: Новое состояние формы:', newState);
            return newState;
          });
          setTimeout(() => {
            handleBotReply("Отлично! Укажите, пожалуйста, название вашей компании. Если вы частное лицо, просто напишите 'Частное лицо'.");
            setDialogStage(DialogStage.ASK_COMPANY);
          }, 1000);
        } else {
          handleBotReply("Пожалуйста, укажите корректный номер телефона в формате +7 или 8 (XXX) XXX-XX-XX.");
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
  
  const handleUserQuestion = async (userInput: string) => {
    try {
      setShowTyping(true);
      
      // Проверяем наличие информации о количестве и типе персонала в сообщении
      const personnelMatch = userInput.match(/(\d+)\s*(грузчик|грузчика|грузчиков|разнорабочих|монтажник|монтажника|монтажников|такелажник|такелажника|такелажников)/i);
      if (personnelMatch && !formData.service) {
        const quantity = personnelMatch[1];
        const type = personnelMatch[2].toLowerCase();
        setFormData(prev => ({
          ...prev,
          service: `${quantity} ${type}`,
          message: userInput
        }));
      }

      // Проверяем наличие информации о сроках
      const timeMatch = userInput.match(/(на\s+)?(сегодня|завтра|послезавтра|неделю|месяц|день|дня|дней)/i);
      if (timeMatch) {
        setFormData(prev => ({
          ...prev,
          message: prev.message ? `${prev.message}. Срок: ${timeMatch[0]}` : `Срок: ${timeMatch[0]}`
        }));
      }

      // Проверяем, не является ли ввод телефоном
      const isPhoneNumber = /^\+?\d[\d\s-]{8,}$/.test(userInput.trim());
      
      // Если это первое сообщение и это приветствие, пропускаем отправку в API
      if (isFirstMessage && isGreeting(userInput)) {
        setIsFirstMessage(false);
        return;
      }

      // Проверяем наличие ключевых слов заказа
      const orderKeywords = ['нужен', 'нужны', 'требуется', 'требуются', 'ищу', 'нужно', 'надо'];
      const personnelTypes = ['грузчик', 'грузчики', 'разнорабочие', 'монтажник', 'монтажники', 'такелажник', 'такелажники'];
      
      const isOrderRequest = orderKeywords.some(keyword => userInput.toLowerCase().includes(keyword)) &&
        personnelTypes.some(type => userInput.toLowerCase().includes(type));

      // Если это повторный запрос о типе персонала
      const isRepeatedPersonnelRequest = userInput.toLowerCase().includes('уже') && 
        userInput.toLowerCase().includes('написал') &&
        personnelTypes.some(type => userInput.toLowerCase().includes(type));

      if (isRepeatedPersonnelRequest && formData.service) {
        handleBotReply(`Извините за повторный запрос. Я вижу, что вам нужны ${formData.service}. Давайте уточним детали. На какой срок вам требуется персонал?`);
        return;
      }

      // Если у нас нет имени и это похоже на имя
      if (!formData.name && !isPhoneNumber && !isOrderRequest) {
        // Сначала проверяем, не является ли это приветствием
        if (isGreeting(userInput)) {
          handleBotReply("Здравствуйте! Я Алекс, менеджер СтаффСити. Как я могу к вам обращаться?");
          setDialogStage(DialogStage.ASK_NAME);
          return;
        }

        if (isPossiblyName(userInput)) {
          const formattedName = userInput.trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          
          await new Promise<void>(resolve => {
            setFormData(prev => {
              const newState = { ...prev, name: formattedName };
              resolve();
              return newState;
            });
          });
          
          handleBotReply(`Приятно познакомиться, ${formattedName}! Чем я могу вам помочь?`);
          return;
        } else {
          handleBotReply("Извините, я не совсем понял ваше имя. Пожалуйста, представьтесь еще раз.");
          return;
        }
      }

      // Если это заказ и у нас есть имя, но нет телефона
      if ((isOrderRequest || formData.service) && formData.name && !formData.phone) {
        handleBotReply(`${formData.name}, для оформления заявки мне нужен ваш номер телефона. Пожалуйста, укажите его в формате +7 или 8 (XXX) XXX-XX-XX.`);
        setDialogStage(DialogStage.ASK_PHONE);
        return;
      }

      // Если это телефонный номер
      if (isPhoneNumber) {
        const { isValid, formatted } = formatPhoneNumber(userInput);
        
        if (isValid) {
          await new Promise<void>(resolve => {
            setFormData(prev => {
              const newState = { ...prev, phone: formatted };
              resolve();
              return newState;
            });
          });

          // Если у нас уже есть информация о заказе, отправляем форму
          if (formData.service) {
            await submitForm();
          } else {
            handleBotReply("Отлично! Какой тип персонала вас интересует? Выберите из списка или укажите свой вариант.");
            setShowServiceButtons(true);
            setDialogStage(DialogStage.ASK_SERVICE);
          }
          return;
        } else {
          handleBotReply("Пожалуйста, укажите корректный номер телефона в формате +7 или 8 (XXX) XXX-XX-XX.");
          return;
        }
      }

      // Если мы в процессе выбора услуги
      if (dialogStage === DialogStage.ASK_SERVICE) {
        setFormData(prev => ({ ...prev, service: userInput }));
        handleBotReply("Расскажите подробнее о вашем проекте или задаче. Какой объем работы, сроки, особые требования?");
        setDialogStage(DialogStage.ASK_MESSAGE);
        return;
      }

      // Если мы в процессе получения деталей
      if (dialogStage === DialogStage.ASK_MESSAGE) {
        setFormData(prev => ({ ...prev, message: userInput }));
        const summary = 
          `Отлично, ${formData.name}! Я подготовил заявку со следующими данными:\n\n` +
          `Имя: ${formData.name}\n` +
          `Телефон: ${formData.phone}\n` +
          `Услуга: ${formData.service}\n` +
          `Детали: ${userInput}\n\n` +
          `Всё верно? Могу отправить заявку нашему менеджеру, и он свяжется с вами в ближайшее время.`;
        
        handleBotReply(summary);
        setDialogStage(DialogStage.CONFIRM_SUBMISSION);
        return;
      }

      // Если мы ждем подтверждения
      if (dialogStage === DialogStage.CONFIRM_SUBMISSION) {
        const response = userInput.toLowerCase();
        if (response.includes('да') || response.includes('верно') || response.includes('отправить')) {
          await submitForm();
        } else {
          handleBotReply("Хорошо, давайте исправим данные. Что именно нужно изменить?");
          setDialogStage(DialogStage.FREE_CHAT);
        }
        return;
      }

      // В остальных случаях обрабатываем как обычный диалог
      const response = await fetch('/api/yandex-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userInput,
          context: { 
            previousMessages: messages.slice(-5).map(msg => ({
              role: msg.sender === 'bot' ? 'assistant' : 'user',
              text: msg.text
            })),
            formData,
            isFirstMessage: false // Добавляем флаг в контекст
          }
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при получении ответа');
      }

      const data = await response.json();
      
      if (data.response) {
        handleBotReply(data.response);
      }

    } catch (error) {
      console.error('[Chatbot] Ошибка при обработке сообщения:', error);
      handleBotReply("Извините, произошла ошибка. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону +7 967 246 19 08.");
    } finally {
      setShowTyping(false);
    }
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
        handleBotReply("Стоимость наших услуг зависит от специализации и количества требуемых сотрудников. Оставьте заявку на консультацию, и наш менеджер рассчитает для вас индивидуальное предложение. Хотите оформить заявку?");
      } else if (question === "Работаете ли вы с юридическими лицами?") {
        handleBotReply("Да, мы специализируемся на работе именно с юридическими лицами по договору B2B. Какой персонал вам требуется?");
      }
    }, 500);
  };
  
  const submitForm = async () => {
    setSubmitting(true);
    
    try {
      console.log('[Chatbot] submitForm: Начало отправки формы. Текущие данные:', formData);
      
      // Проверяем обязательные поля
      if (!formData.name || !formData.phone) {
        console.error('[Chatbot] submitForm: Отсутствуют обязательные поля:', {
          name: formData.name,
          phone: formData.phone
        });
        
        if (!formData.name) {
          handleBotReply("Извините, но я не знаю вашего имени. Как я могу к вам обращаться?");
          setDialogStage(DialogStage.ASK_NAME);
        } else {
          handleBotReply("Для оформления заявки мне нужен ваш номер телефона. Пожалуйста, укажите его в формате +7 или 8 (XXX) XXX-XX-XX.");
          setDialogStage(DialogStage.ASK_PHONE);
        }
        return;
      }

      // Валидируем и форматируем телефон
      const { isValid, formatted } = formatPhoneNumber(formData.phone);
      
      if (!isValid) {
        handleBotReply("Извините, но номер телефона указан в неверном формате. Пожалуйста, укажите его в формате +7 или 8 (XXX) XXX-XX-XX.");
        setDialogStage(DialogStage.ASK_PHONE);
        return;
      }

      // Собираем информацию о заказе из последних сообщений
      const lastMessages = messages.slice(-5);
      const orderInfo = lastMessages
        .filter(msg => msg.sender === 'user')
        .map(msg => msg.text)
        .join(' ');

      // Извлекаем количество и тип персонала из сообщений
      const quantityMatch = orderInfo.match(/(\d+)\s*(человек|грузчик|монтажник|такелажник)/i);
      const personnelType = quantityMatch ? quantityMatch[2].toLowerCase() : 'не указано';
      const quantity = quantityMatch ? quantityMatch[1] : '0';

      // Определяем срок из сообщений
      const timeMatch = orderInfo.match(/(на\s+)?(день|неделю|месяц|завтра|сегодня)/i);
      const timeframe = timeMatch ? timeMatch[0] : 'не указано';
      
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('phone', formatted);
      formDataObj.append('company', formData.company || 'Частное лицо');
      formDataObj.append('service', formData.service || `${quantity} ${personnelType}`);
      formDataObj.append('message', `Срок: ${timeframe}. ${formData.message || orderInfo}`);
      formDataObj.append('source', 'chatbot');
      
      const response = await fetch("/api/lead-to-bitrix", {
        method: "POST",
        body: formDataObj,
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('[Chatbot] submitForm: Ошибка парсинга JSON:', e);
        handleBotReply("Извините, произошла техническая ошибка. Давайте попробуем еще раз. Пожалуйста, укажите ваш номер телефона.");
        setDialogStage(DialogStage.ASK_PHONE);
        return;
      }
      
      if (!response.ok || !data.success) {
        // Обработка конкретных ошибок от Битрикс
        if (data.error) {
          if (data.error.toLowerCase().includes('телефон')) {
            handleBotReply(`Извините, но возникла проблема с номером телефона. Пожалуйста, укажите его еще раз в формате +7 или 8 (XXX) XXX-XX-XX.`);
            setDialogStage(DialogStage.ASK_PHONE);
          } else if (data.error.toLowerCase().includes('имя')) {
            handleBotReply(`Извините, но возникла проблема с именем. Как я могу к вам обращаться?`);
            setDialogStage(DialogStage.ASK_NAME);
          } else {
            handleBotReply(`Извините, возникла ошибка при отправке заявки: ${data.error}. Давайте попробуем еще раз.`);
            setDialogStage(DialogStage.ASK_PHONE);
          }
        } else {
          handleBotReply("Извините, произошла ошибка при отправке заявки. Давайте попробуем еще раз.");
          setDialogStage(DialogStage.ASK_PHONE);
        }
        return;
      }
      
      // Очищаем форму после успешной отправки
      setFormData({
        name: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
      
      handleBotReply(`Отлично! Я передал вашу заявку менеджеру. Он свяжется с вами в ближайшее время по номеру ${formatted} для уточнения деталей. Спасибо за обращение!`);
      setDialogStage(DialogStage.THANK_YOU);
      
    } catch (error) {
      console.error('[Chatbot] submitForm: Ошибка при отправке формы:', error);
      handleBotReply("Извините, произошла ошибка при отправке заявки. Давайте попробуем еще раз.");
      setDialogStage(DialogStage.ASK_PHONE);
    } finally {
      setSubmitting(false);
      setShowTyping(false);
    }
  };
  
  useEffect(() => {
    console.log('Изменение стадии диалога:', {
      previousStage: dialogStage,
      formData
    });
  }, [dialogStage, formData]);
  
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