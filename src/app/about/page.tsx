import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-orange-500 relative">
          О компании СтаффСити
          <span className="absolute bottom-0 left-0 w-24 h-1 bg-orange-500 -mb-3"></span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-orange-400 mb-4">Наша миссия</h2>
            <p className="text-base leading-relaxed mb-4">
              СтаффСити — ведущий B2B-провайдер квалифицированного персонала для строительных, производственных и логистических компаний. Мы создаем гибкие кадровые решения, позволяющие нашим клиентам оптимизировать затраты и сосредоточиться на стратегических задачах бизнеса.
            </p>
            <p className="text-base leading-relaxed">
              С 2015 года мы обеспечиваем предприятия различных отраслей надежными рабочими кадрами, гарантируя высокое качество выполнения задач и строгое соблюдение сроков.
            </p>
          </div>
          <div className="bg-orange-950/30 rounded-lg overflow-hidden shadow-lg border border-orange-500/20 p-6 flex flex-col justify-center">
            <blockquote className="text-lg italic text-orange-100/90 relative">
              <span className="absolute top-0 left-0 text-6xl text-orange-500/20">"</span>
              <p className="ml-6 relative z-10">
                Наша цель — не просто закрыть вакансию, а стать для вас настоящим партнёром, которому можно доверить любые задачи. Я лично слежу за тем, чтобы каждый клиент был доволен результатом.
              </p>
              <footer className="mt-4 text-right text-orange-400 font-semibold">
                — Александр Ившин<br />директор СтаффСити
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Ключевые направления деятельности</h2>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-2">Промышленное и гражданское строительство</h3>
              <p className="text-sm">
                Предоставляем разнорабочих, монтажников, монолитчиков и других специалистов для строительных объектов различной сложности.
              </p>
            </div>
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-2">Логистические и складские комплексы</h3>
              <p className="text-sm">
                Обеспечиваем грузчиков, такелажников и складских работников для эффективной обработки грузов и организации складского учета.
              </p>
            </div>
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-2">Промышленные предприятия</h3>
              <p className="text-sm">
                Предоставляем сварщиков, монтажников, слесарей и других производственных специалистов для временных и долгосрочных проектов.
              </p>
            </div>
            <div className="bg-black/30 border-l-4 border-orange-500 p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-2">Инженерные коммуникации</h3>
              <p className="text-sm">
                Формируем бригады сантехников, электриков и монтажников для устройства инженерных систем зданий и сооружений.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Почему нам доверяют</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { 
                number: "5+", 
                text: "лет на рынке B2B-услуг"
              },
              {
                number: "500+",
                text: "успешно реализованных проектов"
              },
              {
                number: "1000+",
                text: "довольных клиентов"
              },
              {
                number: "5000+",
                text: "специалистов в базе"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-orange-500">{stat.number}</div>
                <p className="text-sm text-orange-100/80 mt-2">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Наши преимущества</h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Тщательный отбор персонала",
                description: "Все сотрудники проходят многоступенчатую проверку, подтверждают квалификацию и опыт работы",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Оперативность",
                description: "Формирование бригад с необходимой квалификацией в течение 24-48 часов",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Юридическая чистота",
                description: "Полное юридическое оформление взаимоотношений с заказчиком и сотрудниками",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                )
              },
              {
                title: "Гарантия качества",
                description: "Контроль выполнения работ на всех этапах, оперативная замена специалистов при необходимости",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Удобная система оплаты",
                description: "Гибкие условия сотрудничества, различные формы оплаты, предоставление всех необходимых документов",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Безопасность",
                description: "Строгое соблюдение техники безопасности, проведение инструктажей, обеспечение СИЗ",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div key={index} className="bg-orange-950/20 p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-orange-400 mb-2">{item.title}</h3>
                <p className="text-sm text-orange-100/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-950/30 to-black p-8 rounded-lg shadow-lg mb-8 text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Готовы начать сотрудничество?</h2>
          <p className="text-lg mb-6">
            Свяжитесь с нами, чтобы обсудить ваши потребности и получить индивидуальное предложение.
          </p>
          <Link href="/contacts" className="bg-orange-500 text-black font-bold py-3 px-8 rounded-md hover:bg-orange-600 transition-colors shadow-lg inline-block">
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
} 