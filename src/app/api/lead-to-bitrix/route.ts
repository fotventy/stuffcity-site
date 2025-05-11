const BITRIX_WEBHOOK_URL = 'https://b24-jm4e2n.bitrix24.ru/rest/1/3nlvbgee8zh8hfp7/crm.lead.add.json'; 

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Получаем данные из формы
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;
    
    // Валидация данных
    if (!name || !phone) {
      return Response.json(
        { success: false, message: 'Не все обязательные поля заполнены' },
        { status: 400 }
      );
    }
    
    // Формируем данные для Bitrix24
    const bitrixData: {
      fields: {
        TITLE: string;
        NAME: string;
        COMPANY_TITLE: string;
        PHONE: { VALUE: string; VALUE_TYPE: string }[];
        COMMENTS: string;
        SOURCE_ID: string;
        SOURCE_DESCRIPTION: string;
        ASSIGNED_BY_ID: number;
        EMAIL?: { VALUE: string; VALUE_TYPE: string }[];
      },
      params: {
        REGISTER_SONET_EVENT: string
      }
    } = {
      fields: {
        TITLE: `Заявка с сайта от ${name}`,
        NAME: name,
        COMPANY_TITLE: company || '',
        PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
        COMMENTS: `Услуга: ${service || 'Не указана'}\n\nСообщение: ${message || 'Не указано'}`,
        SOURCE_ID: 'WEB',
        SOURCE_DESCRIPTION: 'Заявка с сайта СтаффСити',
        ASSIGNED_BY_ID: 1, // ID ответственного менеджера
      },
      params: {
        REGISTER_SONET_EVENT: 'Y'
      }
    };
    
    // Добавляем email только если он указан
    if (email) {
      bitrixData.fields.EMAIL = [{ VALUE: email, VALUE_TYPE: 'WORK' }];
    }
    
    // Отправляем данные в Bitrix24
    const bitrixResponse = await fetch(BITRIX_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bitrixData),
    });
    
    const bitrixResult = await bitrixResponse.json();
    
    if (bitrixResponse.ok && bitrixResult.result > 0) {
      return Response.json({
        success: true,
        message: 'Заявка успешно отправлена!',
        leadId: bitrixResult.result,
      });
    } else {
      console.error('Ошибка при отправке в Bitrix24:', bitrixResult);
      return Response.json(
        { success: false, message: 'Ошибка при отправке заявки в CRM' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return Response.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 