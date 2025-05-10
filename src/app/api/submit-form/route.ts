import { NextResponse } from 'next/server';

type FormData = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const data: FormData = {
      name: formData.get('name') as string,
      company: formData.get('company') as string | undefined,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string | undefined,
      message: formData.get('message') as string | undefined,
    };
    
    // Валидация обязательных полей
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, message: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // В реальном приложении здесь будет логика отправки на email или в CRM
    // Например, использование nodemailer или интеграция с API CRM-системы
    
    console.log('Получены данные формы:', data);
    
    // В демонстрационных целях просто возвращаем успешный ответ
    return NextResponse.json({ 
      success: true, 
      message: 'Заявка успешно отправлена! Наш менеджер свяжется с вами в ближайшее время.' 
    });
    
  } catch (error) {
    console.error('Ошибка обработки формы:', error);
    return NextResponse.json(
      { success: false, message: 'Произошла ошибка при отправке формы' },
      { status: 500 }
    );
  }
} 