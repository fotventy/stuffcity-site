import { NextRequest, NextResponse } from "next/server";

// Обработчик GET-запросов к API аналитики
export async function GET(request: NextRequest) {
  // Здесь в реальном приложении мы бы получали данные из базы данных
  // Для демонстрационных целей, мы просто возвращаем заглушку
  
  const mockAnalyticsData = {
    totalVisitors: 2458,
    uniqueVisitors: 1842,
    averageTimeOnSite: "3m 45s",
    bounceRate: "32%",
    conversionRate: "5.7%",
    topReferrers: [
      { name: "Google", visits: 1287 },
      { name: "Прямые переходы", visits: 524 },
      { name: "Yandex", visits: 312 },
      { name: "Facebook", visits: 201 },
      { name: "Instagram", visits: 134 },
    ],
    popularPages: [
      { path: "/", views: 1985, avgTime: "2m 15s" },
      { path: "/professions", views: 1427, avgTime: "3m 30s" },
      { path: "/professions/raznorabochie", views: 856, avgTime: "4m 10s" },
      { path: "/professions/gruzchiki", views: 743, avgTime: "3m 45s" },
      { path: "/contacts", views: 692, avgTime: "2m 50s" },
    ],
    conversions: [
      { type: "lead", count: 87 },
      { type: "consultation", count: 62 },
      { type: "order", count: 45 },
    ],
    deviceBreakdown: {
      desktop: 58,
      mobile: 38,
      tablet: 4,
    },
    // Временные данные для графика посещений (последние 14 дней)
    dailyVisits: [
      { date: "2025-04-27", visits: 145 },
      { date: "2025-04-28", visits: 162 },
      { date: "2025-04-29", visits: 187 },
      { date: "2025-04-30", visits: 176 },
      { date: "2025-05-01", visits: 154 },
      { date: "2025-05-02", visits: 163 },
      { date: "2025-05-03", visits: 135 },
      { date: "2025-05-04", visits: 128 },
      { date: "2025-05-05", visits: 174 },
      { date: "2025-05-06", visits: 192 },
      { date: "2025-05-07", visits: 188 },
      { date: "2025-05-08", visits: 179 },
      { date: "2025-05-09", visits: 193 },
      { date: "2025-05-10", visits: 201 },
    ],
  };
  
  // Добавляем искусственную задержку для имитации загрузки с сервера
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(mockAnalyticsData);
}

// Обработчик POST-запросов для сохранения данных аналитики
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // В реальном приложении здесь был бы код для сохранения данных в базу
    console.log("Получены данные аналитики:", data);
    
    return NextResponse.json({ success: true, message: "Данные аналитики успешно сохранены" });
  } catch (error) {
    console.error("Ошибка при обработке данных аналитики:", error);
    return NextResponse.json(
      { success: false, message: "Ошибка при обработке данных" },
      { status: 400 }
    );
  }
} 