// API-маршрут для обращения к Hugging Face API
export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return Response.json(
        { success: false, error: 'Сообщение не предоставлено' },
        { status: 400 }
      );
    }

    // Временно используем имитацию, пока не настроим доступную модель
    const USE_MOCK_RESPONSES = true;
    
    // Для отладки - проверяем, загружается ли ключ API
    console.log("API KEY доступен:", process.env.HUGGINGFACE_API_KEY ? "Да (длина: " + process.env.HUGGINGFACE_API_KEY.length + ")" : "Нет");
    
    if (USE_MOCK_RESPONSES) {
      // Имитируем ответы AI на основе ключевых слов
      const userMessage = message.toLowerCase();
      let aiResponse = "";
      
      // Извлечение последнего вопроса пользователя (после "Пользователь:")
      const lastUserMessageMatch = message.match(/Пользователь:\s*(.+?)(?:\nАссистент:|$)/s);
      const lastUserQuestion = lastUserMessageMatch ? lastUserMessageMatch[1].trim() : "";
      
      // Базовые ответы на основе ключевых слов
      if (lastUserQuestion.toLowerCase().includes('привет') || lastUserQuestion.toLowerCase().includes('здравств')) {
        aiResponse = "Здравствуйте! Рад вас приветствовать. Я виртуальный помощник компании СтаффСити. Чем могу вам помочь сегодня?";
      } 
      else if (lastUserQuestion.toLowerCase().includes('ты бот') || 
               lastUserQuestion.toLowerCase().includes('ты ии') || 
               lastUserQuestion.toLowerCase().includes('искусственн') || 
               lastUserQuestion.toLowerCase().includes('нейросеть')) {
        aiResponse = "Да, я работаю на базе искусственного интеллекта. Я виртуальный помощник компании СтаффСити, созданный для того, чтобы отвечать на вопросы о наших услугах и помогать клиентам.";
      }
      else if (lastUserQuestion.toLowerCase().includes('персонал') || 
               lastUserQuestion.toLowerCase().includes('сотрудник') || 
               lastUserQuestion.toLowerCase().includes('работник')) {
        aiResponse = "Компания СтаффСити предоставляет широкий спектр линейного персонала: разнорабочих, грузчиков, монтажников, сварщиков и других специалистов. Мы можем подобрать персонал под ваши конкретные задачи. Какие специалисты вам требуются?";
      }
      else if (lastUserQuestion.toLowerCase().includes('цен') || 
               lastUserQuestion.toLowerCase().includes('стоимость') || 
               lastUserQuestion.toLowerCase().includes('стоит') ||
               lastUserQuestion.toLowerCase().includes('оплат')) {
        aiResponse = "Стоимость наших услуг зависит от нескольких факторов: квалификации требуемого персонала, объема и сложности работ, срочности и продолжительности проекта. Для получения точного расчета лучше оставить заявку, и наш менеджер свяжется с вами для обсуждения деталей.";
      }
      else if (lastUserQuestion.toLowerCase().includes('срок') || 
               lastUserQuestion.toLowerCase().includes('быстро') || 
               lastUserQuestion.toLowerCase().includes('когда')) {
        aiResponse = "Мы можем предоставить персонал в кратчайшие сроки, обычно в течение 1-2 рабочих дней после подписания договора. В некоторых случаях можем организовать команду даже быстрее, если у вас срочная задача.";
      }
      else if (lastUserQuestion.toLowerCase().includes('контакт') || 
               lastUserQuestion.toLowerCase().includes('телефон') || 
               lastUserQuestion.includes('связаться') ||
               lastUserQuestion.toLowerCase().includes('заявк')) {
        aiResponse = "Вы можете связаться с нами по телефону +7 967 246 19 08 или оставить заявку прямо в этом чате. Просто напишите 'Оставить заявку', и я помогу вам заполнить необходимую информацию.";
      }
      else if (lastUserQuestion.toLowerCase().includes('документ') || 
               lastUserQuestion.toLowerCase().includes('договор') || 
               lastUserQuestion.toLowerCase().includes('оформлен')) {
        aiResponse = "Мы работаем официально по договору оказания услуг. Весь наш персонал оформлен согласно ТК РФ. Мы берем на себя все обязательства по выплате заработной платы, налогов и страховых взносов за сотрудников.";
      }
      else {
        // Общий ответ при отсутствии ключевых слов
        aiResponse = "Спасибо за ваш вопрос! Компания СтаффСити специализируется на предоставлении линейного персонала для бизнеса. Мы поможем вам найти квалифицированных сотрудников для вашего проекта. Если у вас есть конкретные требования или вопросы, я с радостью предоставлю более подробную информацию.";
      }
      
      return Response.json({
        success: true,
        response: aiResponse,
      });
    }
    
    try {
      // Попробуем самую доступную и простую модель
      const HF_API_URL = 'https://api-inference.huggingface.co/models/gpt2';
      
      // Для работы с API нужен API-ключ
      const API_KEY = process.env.HUGGINGFACE_API_KEY || '';
      
      // Проверка наличия API-ключа
      if (!API_KEY) {
        console.error("API KEY не задан! Используйте модуль имитации ответов.");
        throw new Error("API ключ не настроен");
      }
      
      console.log("Отправляем запрос к Hugging Face API...");
      
      // Модель gpt2 требует более простой запрос
      const response = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          inputs: message.slice(-200), // Ограничим длину промпта
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка API (${response.status}):`, errorText);
        throw new Error(`Ошибка API: ${response.status}, Текст: ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Получен ответ от API:", data);
      
      // GPT-2 возвращает другую структуру ответа
      const aiResponse = data && data.length > 0 ? 
                      (data[0].generated_text || "Извините, не удалось получить ответ от ИИ.") :
                      "Извините, не удалось получить ответ от ИИ.";
      
      return Response.json({
        success: true,
        response: aiResponse,
      });
    } catch (apiError) {
      console.error('Ошибка при обращении к Hugging Face API:', apiError);
      
      // Предоставляем резервный ответ при ошибке API
      const isAskingAboutAI = message.toLowerCase().includes('искусственн') || 
                             message.toLowerCase().includes('ии') ||
                             message.toLowerCase().includes('бот');
      
      let fallbackResponse = "Извините, у меня возникли технические проблемы с подключением к базе знаний. ";
      
      if (isAskingAboutAI) {
        fallbackResponse += "Да, я действительно работаю на основе искусственного интеллекта, но сейчас у меня проблемы с подключением к серверу. ";
      }
      
      fallbackResponse += "Я буду рад помочь вам с вопросами о персонале или оформлением заявки. Наша компания СтаффСити предоставляет линейный персонал для бизнеса.";
      
      return Response.json({
        success: true,
        response: fallbackResponse,
        fromFallback: true
      });
    }
  } catch (error) {
    console.error('Ошибка при обработке запроса ИИ:', error);
    return Response.json(
      { 
        success: false, 
        error: 'Внутренняя ошибка сервера при обработке запроса ИИ' 
      },
      { status: 500 }
    );
  }
} 