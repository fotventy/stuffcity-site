// API-маршрут для обращения к Yandex GPT API

// Добавляем интерфейсы для типизации
interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

interface ChatContext {
  previousMessages?: ChatMessage[];
  formData?: {
    name?: string;
    phone?: string;
    company?: string;
    service?: string;
    message?: string;
  };
  isFirstMessage?: boolean;
}

interface RequestBody {
  message: string;
  context?: ChatContext;
}

export async function POST(request: Request) {
  console.log("=== Начало обработки запроса ===");
  console.log("Время запроса:", new Date().toISOString());
  
  try {
    const body = await request.json() as RequestBody;
    console.log("Тело запроса:", {
      messageLength: body.message?.length,
      contextExists: !!body.context,
      previousMessagesCount: body.context?.previousMessages?.length,
      formDataExists: !!body.context?.formData
    });
    
    const { message, context = {} } = body;
    console.log("Получено сообщение:", message);
    console.log("Контекст:", context);
    
    if (!message) {
      console.log("Сообщение не предоставлено");
      return Response.json(
        { success: false, error: 'Сообщение не предоставлено' },
        { status: 400 }
      );
    }

    // Получаем токены из переменных окружения
    const IAM_TOKEN = process.env.YANDEX_IAM_TOKEN;
    const FOLDER_ID = process.env.YANDEX_FOLDER_ID;
    
    // Проверка наличия токенов
    console.log("=== Проверка переменных окружения ===");
    console.log("IAM_TOKEN длина:", IAM_TOKEN?.length);
    console.log("FOLDER_ID:", FOLDER_ID);
    
    if (!IAM_TOKEN || !FOLDER_ID) {
      console.error("Отсутствуют необходимые токены!");
      return Response.json(
        { success: true, response: "Извините, у меня проблемы с подключением. Пожалуйста, позвоните нам по телефону +7 967 246 19 08." },
        { status: 200 }
      );
    }

    // Формируем контекст из предыдущих сообщений
    const previousMessages = context.previousMessages || [];
    const formContext = context.formData || {};
    
    console.log("=== Подготовка запроса к API ===");
    const systemPrompt = `Ты - дружелюбный менеджер компании СтаффСити по имени Алекс. Общайся просто и по-человечески, как живой менеджер.

КРИТИЧЕСКИ ВАЖНЫЕ ПРАВИЛА:
1. НИКОГДА не отправляй приветствие, если видишь в previousMessages приветствие от бота
2. НИКОГДА не спрашивай имя, если оно уже есть в formContext.name
3. НИКОГДА не повторяй вопросы, которые уже были заданы в previousMessages
4. Если видишь в previousMessages свое сообщение - продолжай диалог с того места

ПРАВИЛА ОБРАБОТКИ СООБЩЕНИЙ:
1. Если получаешь приветствие и нет previousMessages - отправь стандартное приветствие
2. Если получаешь приветствие, но есть previousMessages - продолжай диалог с текущего места
3. Если пользователь пишет "я уже сказал/написал" - извинись и используй информацию из контекста
4. Если видишь ошибки в словах - игнорируй их и понимай контекст

ПРАВИЛА РАБОТЫ С ДАННЫМИ:
1. В начале КАЖДОГО ответа проверяй formContext
2. Собирай важную информацию:
   - Количество персонала
   - Тип персонала
   - Сроки
   - Особые требования
3. Если нужен телефон - проси его в формате +7 или 8 (XXX) XXX-XX-XX

ПРИМЕРЫ ПРАВИЛЬНЫХ ОТВЕТОВ:

[Первое сообщение без контекста]
Клиент: Привет
Ответ: Здравствуйте! Я Алекс, менеджер СтаффСити. Как я могу к вам обращаться?

[Приветствие с существующим контекстом]
Клиент: Привет
previousMessages: [
  {role: "assistant", text: "Здравствуйте! Я Алекс, менеджер СтаффСити. Как я могу к вам обращаться?"}
]
Ответ: *НЕ ОТПРАВЛЯТЬ НОВОЕ ПРИВЕТСТВИЕ* Как я могу к вам обращаться?

[Есть имя в контексте]
Клиент: Мне нужны грузчики
formContext.name = "Иван"
Ответ: Хорошо, Иван! Сколько грузчиков вам требуется и на какой срок?

[Повторный запрос информации]
Клиент: Я уже сказал что нужны грузчики
formContext.name = "Пётр"
formContext.service = "2 грузчика"
Ответ: Извините, Пётр. Я вижу, что вам нужны 2 грузчика. Давайте уточним детали - на какой срок вам требуется персонал?

Текущие данные:
Имя: ${formContext.name || 'не указано'}
Телефон: ${formContext.phone || 'не указан'}
Услуга: ${formContext.service || 'не указана'}
Компания: ${formContext.company || 'не указана'}
Сообщение: ${formContext.message || 'не указано'}`;

    const requestBody = {
      modelUri: `gpt://${FOLDER_ID}/yandexgpt-lite`,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: 2000
      },
      messages: [
        {
          role: "system",
          text: systemPrompt
        },
        ...previousMessages.slice(-5).map((msg: ChatMessage) => ({
          role: msg.role,
          text: msg.text
        })),
        {
          role: "user",
          text: message
        }
      ]
    };

    console.log("Отправляем запрос в Yandex GPT:", {
      modelUri: requestBody.modelUri,
      messagesCount: requestBody.messages.length
    });

    try {
      console.log("=== Отправка запроса к API ===");
      const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${IAM_TOKEN}`,
          'x-folder-id': FOLDER_ID
        },
        body: JSON.stringify(requestBody)
      });

      console.log("Получен ответ от API:", {
        status: response.status,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка API:", {
          status: response.status,
          error: errorText
        });
        
        // Предоставляем осмысленный ответ на основе контекста
        let fallbackResponse = "Извините, у меня временные проблемы с подключением. ";
        
        if (formContext.name) {
          fallbackResponse = `${formContext.name}, извините, у меня временные проблемы с подключением. `;
        }
        
        if (!formContext.phone && (formContext.name || formContext.service)) {
          fallbackResponse += "Для продолжения оформления заявки, пожалуйста, укажите ваш номер телефона в формате +7 или 8 (XXX) XXX-XX-XX.";
        } else {
          fallbackResponse += "Пожалуйста, позвоните нам по телефону +7 967 246 19 08.";
        }
        
        return Response.json(
          { success: true, response: fallbackResponse },
          { status: 200 }
        );
      }

      const data = await response.json();
      console.log("=== Обработка ответа API ===");
      console.log("Структура ответа:", {
        hasResult: !!data.result,
        hasAlternatives: !!data.result?.alternatives,
        alternativesCount: data.result?.alternatives?.length
      });

      if (!data.result?.alternatives?.[0]?.message?.text) {
        console.error("Некорректный ответ от API:", JSON.stringify(data, null, 2));
        return Response.json(
          { 
            success: true, 
            response: "Извините, у меня проблемы с подключением. Пожалуйста, позвоните нам по телефону +7 967 246 19 08." 
          },
          { status: 200 }
        );
      }

      const aiResponse = data.result.alternatives[0].message.text;
      console.log("Получен ответ от модели:", aiResponse);
      
      let order = null;
      let cleanResponse = aiResponse;

      try {
        const match = aiResponse.match(/\{[\s\S]*\}/);
        if (match) {
          order = JSON.parse(match[0]);
          if (order.type === 'order') {
            cleanResponse = aiResponse.replace(/\{[\s\S]*\}/, '').trim();
            console.log("Получена заявка:", order);
          }
        }
      } catch (e) {
        console.log("Ошибка при обработке JSON заявки:", e);
      }

      console.log("=== Завершение обработки ===");
      return Response.json({
        success: true,
        response: cleanResponse || aiResponse,
        order: order
      });

    } catch (apiError) {
      console.error("Ошибка при запросе к API:", apiError);
      return Response.json(
        { success: true, response: "Извините, у меня проблемы с подключением к серверу. Пожалуйста, позвоните нам по телефону +7 967 246 19 08." },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error("Ошибка при обработке запроса:", error);
    return Response.json(
      { success: true, response: "Извините, произошла ошибка. Пожалуйста, позвоните нам по телефону +7 967 246 19 08." },
      { status: 200 }
    );
  }
} 