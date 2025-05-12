const BITRIX_WEBHOOK_URL = 'https://b24-jm4e2n.bitrix24.ru/rest/1/3nlvbgee8zh8hfp7/crm.lead.add.json';

// Улучшенная валидация и форматирование телефона
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

// Улучшенная валидация имени
const validateName = (name: string): { isValid: boolean; formatted: string } => {
  const cleaned = name.trim();
  
  // Проверяем минимальную длину и допустимые символы
  const isValid = cleaned.length >= 2 && /^[а-яёА-ЯЁa-zA-Z\s-]+$/i.test(cleaned);
  
  // Форматируем имя (каждое слово с большой буквы)
  const formatted = cleaned
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return {
    isValid,
    formatted
  };
};

export async function POST(request: Request) {
  try {
    console.log('=== Начало обработки запроса в Битрикс ===');
    const formData = await request.formData();
    
    // Получаем и валидируем данные
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;
    const source = formData.get('source') as string || 'chatbot';
    
    console.log('[Bitrix API] Получены данные формы:', {
      name,
      company,
      phone: phone || 'не указан',
      service,
      message,
      source
    });

    // Валидация имени
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      console.error('[Bitrix API] Некорректное имя:', name);
      return Response.json(
        { success: false, error: 'Пожалуйста, укажите корректное имя (только буквы, пробелы и дефис)' },
        { status: 400 }
      );
    }

    // Валидация телефона
    const phoneValidation = formatPhoneNumber(phone);
    if (!phoneValidation.isValid) {
      console.error('[Bitrix API] Некорректный телефон:', phone);
      return Response.json(
        { success: false, error: 'Пожалуйста, укажите корректный российский номер телефона, начинающийся с +7 или 8' },
        { status: 400 }
      );
    }
    
    // Формируем данные для Битрикс
    const bitrixData = {
      fields: {
        TITLE: `Заявка на персонал: ${service || 'Не указано'}`,
        NAME: nameValidation.formatted,
        COMPANY_TITLE: company || 'Частное лицо',
        PHONE: [{ VALUE: phoneValidation.formatted, VALUE_TYPE: 'WORK' }],
        COMMENTS: message || '',
        SOURCE_ID: source === 'chatbot' ? 'CHAT' : 'WEB',
        SOURCE_DESCRIPTION: source === 'chatbot' ? 'Заявка через чат-бот' : 'Заявка с сайта',
        ASSIGNED_BY_ID: 1,
        STATUS_ID: 'NEW',
        OPENED: 'Y',
        TYPE_ID: service || 'CLIENT',
        UTM_SOURCE: source === 'chatbot' ? 'chatbot' : 'website',
        UTM_MEDIUM: source === 'chatbot' ? 'chat' : 'form'
      }
    };

    console.log('[Bitrix API] Подготовленные данные для отправки в Битрикс:', bitrixData);

    // Отправляем запрос в Битрикс
    const response = await fetch(BITRIX_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bitrixData),
    });

    console.log('[Bitrix API] Получен ответ от Битрикс:', {
      status: response.status,
      statusText: response.statusText
    });

    const responseData = await response.json();
    console.log('[Bitrix API] Данные ответа от Битрикс:', responseData);

    if (!response.ok) {
      console.error('[Bitrix API] Ошибка при отправке в Битрикс:', responseData);
      
      // Анализируем ошибку от Битрикс
      let errorMessage = 'Ошибка при создании лида в Битрикс';
      
      if (responseData.error) {
        if (typeof responseData.error === 'string') {
          errorMessage = responseData.error;
        } else if (responseData.error.message) {
          errorMessage = responseData.error.message;
        } else if (responseData.error.description) {
          errorMessage = responseData.error.description;
        }
        
        // Проверяем конкретные ошибки Битрикс
        if (errorMessage.toLowerCase().includes('phone')) {
          errorMessage = 'Пожалуйста, укажите корректный номер телефона';
        } else if (errorMessage.toLowerCase().includes('name')) {
          errorMessage = 'Пожалуйста, укажите корректное имя';
        }
      }
      
      return Response.json(
        { success: false, error: errorMessage },
        { status: response.status }
      );
    }

    return Response.json({ 
      success: true, 
      data: responseData,
      message: 'Заявка успешно создана'
    });

  } catch (error) {
    console.error('[Bitrix API] Критическая ошибка:', error);
    return Response.json(
      { 
        success: false, 
        error: 'Произошла внутренняя ошибка сервера. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.' 
      },
      { status: 500 }
    );
  }
} 