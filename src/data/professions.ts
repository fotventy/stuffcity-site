export interface Profession {
  slug: string;
  name: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  benefits: string[];
  duties: string[];
  requirements: string[];
}

export const professionsData: Profession[] = [
  {
    slug: "raznorabochie",
    name: "Разнорабочие",
    title: "Универсальные специалисты для широкого спектра задач",
    shortDescription: "Универсальные специалисты для широкого спектра задач",
    description: "Разнорабочие СтаффСити — это квалифицированный персонал для выполнения широкого спектра работ на строительных объектах, производственных площадках и складских комплексах. Мы предоставляем бригады разнорабочих с необходимой квалификацией и опытом под конкретные задачи заказчика.",
    image: "/images/raznorabochie.jpg",
    benefits: [
      "Оперативная мобилизация бригад любой численности",
      "Отсутствие простоев из-за болезней и отпусков",
      "Экономия на содержании штатных единиц",
      "Возможность быстрого масштабирования команды",
      "Гибкая система оплаты под объем выполненных работ"
    ],
    duties: [
      "Погрузочно-разгрузочные работы",
      "Земляные и подготовительные работы",
      "Демонтажные работы",
      "Уборка строительных площадок",
      "Помощь квалифицированным специалистам",
      "Складские и подсобные работы"
    ],
    requirements: [
      "Опыт работы на строительных объектах",
      "Знание основных строительных инструментов",
      "Физическая выносливость",
      "Исполнительность и ответственность",
      "Готовность к работе в различных условиях"
    ]
  },
  {
    slug: "gruzchiki",
    name: "Грузчики",
    title: "Профессиональная погрузка, разгрузка и перемещение грузов",
    shortDescription: "Оперативная обработка грузов любой сложности",
    description: "Грузчики СтаффСити — это команда опытных специалистов, обеспечивающих быструю и качественную обработку грузов различной сложности. Мы предоставляем услуги грузчиков для торговых центров, складских комплексов, производственных предприятий и строительных объектов.",
    image: "/images/gruzchiki.jpg",
    benefits: [
      "Быстрая организация погрузочно-разгрузочных работ",
      "Материальная ответственность за сохранность грузов",
      "Наличие необходимого оборудования и инструментов",
      "Знание правил обращения с различными типами грузов",
      "Соблюдение техники безопасности и норм труда"
    ],
    duties: [
      "Погрузка и разгрузка транспортных средств",
      "Перемещение грузов внутри складских помещений",
      "Размещение товаров согласно планограммам",
      "Комплектация заказов по накладным",
      "Упаковка и маркировка грузов",
      "Инвентаризация и учет товаров"
    ],
    requirements: [
      "Опыт работы с различными типами грузов",
      "Знание принципов складской логистики",
      "Физическая выносливость и сила",
      "Отсутствие вредных привычек",
      "Дисциплинированность и пунктуальность"
    ]
  },
  {
    slug: "takelazh",
    name: "Такелажники",
    title: "Профессиональное перемещение крупногабаритных и тяжелых грузов",
    shortDescription: "Безопасное перемещение тяжеловесного оборудования",
    description: "Такелажники СтаффСити специализируются на перемещении крупногабаритных, тяжеловесных и нестандартных грузов с использованием специального такелажного оборудования. Мы обеспечиваем безопасную транспортировку промышленного оборудования, станков, сейфов и других тяжелых объектов.",
    image: "/images/takelazh.jpg",
    benefits: [
      "Профессиональный подход к нестандартным задачам",
      "Наличие специализированного такелажного оборудования",
      "Опыт работы с объектами повышенной сложности",
      "Разработка индивидуальных схем перемещения",
      "Полная материальная ответственность за сохранность грузов"
    ],
    duties: [
      "Перемещение тяжелого промышленного оборудования",
      "Монтаж и демонтаж крупногабаритных конструкций",
      "Погрузка/разгрузка негабаритных грузов",
      "Работа с грузоподъемными механизмами",
      "Закрепление и фиксация грузов",
      "Такелажные работы любой сложности"
    ],
    requirements: [
      "Опыт работы такелажником от 3 лет",
      "Знание такелажного оборудования и приспособлений",
      "Умение читать схемы строповки",
      "Наличие удостоверений стропальщика/такелажника",
      "Опыт работы с грузоподъемными механизмами"
    ]
  },
  {
    slug: "montazh",
    name: "Монтажники",
    title: "Качественный монтаж конструкций и оборудования",
    shortDescription: "Профессиональная сборка и установка конструкций",
    description: "Монтажники СтаффСити — это квалифицированные специалисты, выполняющие работы по сборке и установке различных конструкций и оборудования. Мы предоставляем услуги по монтажу металлоконструкций, технологического оборудования, инженерных систем и других объектов.",
    image: "/images/montazh.jpg",
    benefits: [
      "Высокий уровень квалификации специалистов",
      "Опыт работы на сложных промышленных объектах",
      "Соблюдение технологических процессов и норм",
      "Выполнение работ в соответствии с проектной документацией",
      "Комплексный подход к решению монтажных задач"
    ],
    duties: [
      "Монтаж металлоконструкций",
      "Сборка и установка технологического оборудования",
      "Монтаж трубопроводов и инженерных систем",
      "Сборка промышленной мебели и стеллажных систем",
      "Установка ограждающих конструкций",
      "Работа с монтажными чертежами и схемами"
    ],
    requirements: [
      "Профильное образование",
      "Опыт монтажных работ от 2 лет",
      "Умение читать чертежи и монтажные схемы",
      "Навыки работы с электроинструментом",
      "Знание технологии монтажных работ"
    ]
  },
  {
    slug: "monolit",
    name: "Монолитчики",
    title: "Профессиональное выполнение монолитных работ",
    shortDescription: "Высококачественные монолитные конструкции",
    description: "Монолитчики СтаффСити специализируются на возведении железобетонных конструкций любой сложности. Мы предоставляем комплексные бригады для выполнения полного цикла монолитных работ на промышленных и гражданских объектах строительства.",
    image: "/images/monolit.jpg",
    benefits: [
      "Комплексное выполнение всех этапов монолитных работ",
      "Строгое соблюдение технологии бетонирования",
      "Контроль качества на всех этапах производства работ",
      "Соблюдение установленных сроков",
      "Наличие необходимого инструмента и оснастки"
    ],
    duties: [
      "Монтаж и демонтаж опалубочных систем",
      "Вязка арматурных каркасов",
      "Бетонирование конструкций",
      "Уход за бетоном",
      "Устройство фундаментов, стен, перекрытий",
      "Работа с монолитными конструкциями любой сложности"
    ],
    requirements: [
      "Опыт работы монолитчиком от 2 лет",
      "Знание технологии монолитных работ",
      "Умение читать строительные чертежи",
      "Навыки работы с различными типами опалубки",
      "Знание правил армирования и бетонирования"
    ]
  },
  {
    slug: "svarka",
    name: "Сварщики",
    title: "Профессиональные сварочные работы любой сложности",
    shortDescription: "Качественные сварочные работы любой сложности",
    description: "Сварщики СтаффСити — это опытные профессионалы, выполняющие все виды сварочных работ с различными материалами. Мы предоставляем услуги сварщиков для строительных объектов, промышленных предприятий и монтажных организаций.",
    image: "/images/svarka.jpg",
    benefits: [
      "Высокая квалификация сварщиков (НАКС, международные сертификаты)",
      "Опыт работы с различными металлами и сплавами",
      "Владение всеми основными видами сварки (MMA, MIG/MAG, TIG)",
      "Выполнение работ в соответствии с технологическими картами",
      "Контроль качества сварных соединений"
    ],
    duties: [
      "Сварка металлоконструкций различной сложности",
      "Сварочные работы при монтаже технологического оборудования",
      "Сварка трубопроводов и инженерных систем",
      "Ремонтная сварка",
      "Работа с чертежами и технологическими картами сварки",
      "Подготовка и зачистка сварных швов"
    ],
    requirements: [
      "Профессиональное образование по специальности",
      "Опыт работы сварщиком от 3 лет",
      "Наличие удостоверений НАКС (желательно)",
      "Умение читать чертежи",
      "Знание технологии сварочных работ",
      "Опыт работы с различными материалами"
    ]
  },
  {
    slug: "santeh",
    name: "Сантехники",
    title: "Профессиональный монтаж и обслуживание сантехнических систем",
    shortDescription: "Монтаж и обслуживание инженерных систем",
    description: "Сантехники СтаффСити — это квалифицированные специалисты по монтажу, ремонту и обслуживанию сантехнических систем и оборудования. Мы предоставляем услуги сантехников для строительных объектов, промышленных предприятий и управляющих компаний.",
    image: "/images/santeh.jpg",
    benefits: [
      "Профессиональный подход к монтажу сантехнических систем",
      "Соблюдение строительных норм и правил",
      "Гарантия качества выполненных работ",
      "Опыт работы на объектах различной сложности",
      "Знание современных материалов и технологий"
    ],
    duties: [
      "Монтаж систем водоснабжения и канализации",
      "Установка сантехнических приборов и оборудования",
      "Монтаж отопительных систем",
      "Пусконаладочные работы",
      "Обслуживание и ремонт сантехнических систем",
      "Работа с различными типами труб и фитингов"
    ],
    requirements: [
      "Профессиональное образование",
      "Опыт работы сантехником от 2 лет",
      "Знание нормативной документации",
      "Умение читать чертежи инженерных систем",
      "Опыт работы с современными материалами",
      "Навыки пайки, сварки и резки труб"
    ]
  },
  {
    slug: "otdelochniki",
    name: "Отделочники",
    title: "Профессиональные отделочные работы с гарантией качества",
    shortDescription: "Внутренняя и наружная отделка помещений",
    description: "Отделочники СтаффСити — это квалифицированные специалисты широкого профиля, выполняющие все виды внутренних и наружных отделочных работ. Мы предоставляем бригады отделочников для строительных объектов, офисных и торговых центров, промышленных предприятий.",
    image: "/images/otdelochniki.jpg",
    benefits: [
      "Комплексный подход к отделочным работам",
      "Высокое качество исполнения",
      "Соблюдение технологий и строительных норм",
      "Работа с любыми отделочными материалами",
      "Выполнение работ точно в срок"
    ],
    duties: [
      "Штукатурные и шпаклевочные работы",
      "Малярные работы",
      "Укладка плитки",
      "Монтаж гипсокартонных конструкций",
      "Напольные покрытия (ламинат, линолеум, паркет)",
      "Устройство подвесных потолков",
      "Облицовочные работы"
    ],
    requirements: [
      "Опыт работы отделочником от 3 лет",
      "Владение различными отделочными технологиями",
      "Умение работать с отделочными материалами",
      "Навыки штукатурных, малярных, плиточных работ",
      "Аккуратность и внимание к деталям"
    ]
  }
]; 