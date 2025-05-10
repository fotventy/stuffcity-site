import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import { professionsData } from "@/data/professions";

export default function Home() {
  // Выбираем несколько профессий для превью
  const featuredProfessions = professionsData.slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-orange-100">
      {/* Hero Section */}
      <Hero />

      {/* Services Preview */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 text-center mb-12">Решение кадровых вопросов под ключ</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProfessions.map((profession, index) => (
            <Link key={profession.slug} href={`/professions/${profession.slug}`} className="group">
              <div className="bg-orange-950/30 rounded-lg overflow-hidden shadow-lg border border-orange-500/20 hover:border-orange-500/50 transition-all h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={profession.image} 
                    alt={profession.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-orange-500 mb-2">{profession.name}</h3>
                  <p className="text-sm text-orange-100/80 flex-1">{profession.shortDescription}</p>
                  <div className="mt-4 flex items-center text-sm text-orange-400 font-medium">
                    Подробнее
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/professions" className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-400 transition-colors">
            Смотреть все специальности
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="w-full bg-gradient-to-r from-orange-950/30 to-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 text-center mb-12">Преимущества сотрудничества</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Профессионализм</h3>
              <ul className="list-disc ml-6 text-orange-100/90 space-y-2">
                <li>Тщательный отбор специалистов</li>
                <li>Проверка квалификации и опыта</li>
                <li>Регулярная аттестация персонала</li>
                <li>Соблюдение стандартов качества</li>
                <li>Обучение технике безопасности</li>
              </ul>
            </div>
            
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Экономическая эффективность</h3>
              <ul className="list-disc ml-6 text-orange-100/90 space-y-2">
                <li>Оптимизация затрат на персонал</li>
                <li>Отсутствие расходов на найм и обучение</li>
                <li>Сокращение административных издержек</li>
                <li>Фиксированные расценки без скрытых платежей</li>
                <li>Оплата только за фактически выполненные работы</li>
              </ul>
            </div>
            
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Гибкость и надежность</h3>
              <ul className="list-disc ml-6 text-orange-100/90 space-y-2">
                <li>Быстрая мобилизация бригад под проект</li>
                <li>Срочная замена специалистов при необходимости</li>
                <li>Масштабирование команды под объем работ</li>
                <li>Официальное оформление взаимоотношений</li>
                <li>Полная материальная ответственность</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 text-center mb-12">Как мы работаем</h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Оставьте заявку",
              description: "Свяжитесь с нами удобным способом — заполните форму на сайте или позвоните нам"
            },
            {
              step: "02",
              title: "Согласование деталей",
              description: "Наш менеджер уточнит требования, объемы работ и сроки реализации проекта"
            },
            {
              step: "03",
              title: "Формирование команды",
              description: "Подберем специалистов с необходимой квалификацией и опытом для ваших задач"
            },
            {
              step: "04",
              title: "Выполнение работ",
              description: "Специалисты приступают к выполнению задач с соблюдением сроков и качества"
            }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-orange-400 mb-2">{step.title}</h3>
              <p className="text-orange-100/80">{step.description}</p>
              
              {index < 3 && (
                <div className="hidden md:block w-16 h-1 border-t-2 border-dashed border-orange-500/50 mt-8 mb-4"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Completed Projects Section */}
      <section className="w-full bg-gradient-to-r from-black to-orange-950/20 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 text-center mb-12">Выполненные проекты и доверие клиентов</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg flex flex-col">
              <h3 className="text-lg font-bold text-orange-400 mb-2">ООО "УКС - 3"</h3>
              <p className="text-orange-100/90 mb-2">Ген. подрядчик по строительству Леруа Мерлен (Заречье)</p>
              <ul className="list-disc ml-6 text-orange-100/80 space-y-1 mb-2">
                <li>15–40 человек ежедневно</li>
                <li>Бетонные работы, вязка, заливка, работа с электроинструментом</li>
                <li>Обучение и переквалификация на объекте</li>
              </ul>
              <div className="mt-auto text-xs text-orange-400">12 000 чел/часов ежемесячно</div>
            </div>
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg flex flex-col">
              <h3 className="text-lg font-bold text-orange-400 mb-2">ООО "СтройДорСервис"</h3>
              <p className="text-orange-100/90 mb-2">Строительство и благоустройство дорог по России</p>
              <ul className="list-disc ml-6 text-orange-100/80 space-y-1 mb-2">
                <li>С 2019 года — строительство трассы ДОН 4 (Тульская область)</li>
                <li>Масштабные проекты в г. Дубна</li>
                <li>Переквалификация персонала в специалистов по спецтехнике</li>
              </ul>
              <div className="mt-auto text-xs text-orange-400">6 000 чел/часов ежемесячно</div>
            </div>
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg flex flex-col">
              <h3 className="text-lg font-bold text-orange-400 mb-2">ООО "Горзаказ"</h3>
              <p className="text-orange-100/90 mb-2">Поставка мебели для школ и детсадов</p>
              <ul className="list-disc ml-6 text-orange-100/80 space-y-1 mb-2">
                <li>Погрузо-разгрузочные и такелажные услуги</li>
                <li>Заявки от 5 до 20 человек</li>
                <li>Москва и Московская область</li>
              </ul>
              <div className="mt-auto text-xs text-orange-400">5 000 чел/часов ежемесячно</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-orange-900/20 to-black py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">Обеспечьте свой бизнес профессиональными кадрами</h2>
          <p className="text-lg text-orange-100/90 mb-8 max-w-2xl mx-auto">
            Доверьте решение кадровых вопросов профессионалам. Мы предоставим квалифицированных специалистов для реализации ваших проектов точно в срок.
          </p>
          <Link href="/contacts" className="bg-orange-500 text-black font-bold py-4 px-10 rounded-md hover:bg-orange-600 transition-colors shadow-lg text-lg inline-block">
            Оставить заявку
          </Link>
        </div>
      </section>
    </div>
  );
}
