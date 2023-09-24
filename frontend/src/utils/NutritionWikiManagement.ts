import { INutritionWikiItem } from './interfaces';

export class NutritionWikiManagement {
  private static items: INutritionWikiItem[] = [
    {
      category: 'Питательные вещества',
      title: 'Пищевые волокна',
      goodFor: [
        'Снижение уровня холестерина',
        'Регулирование уровня сахара в крови',
        'Повышение моторики кишечника'
      ],
      containedIn: [
        'Яблоки',
        'Груши',
        'Ягоды',
        'Цитрусовые',
        'Сушеные абрикосы/сливы/изюм',
        'Цельнозерновая мука',
        'Брокколи',
        'Горох',
        'Морковь',
        'Капуста',
        'Орехи и семена'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Кальций',
      goodFor: [
        'Волосы, зубы, кости',
        'Мышцы',
        'Нервы',
        'Свертывание крови',
        'Воспаления'
      ],
      containedIn: [
        'Молоко',
        'Зеленые овощи (укроп, брокколи, капуста, ...)',
        'Ягоды',
        'Лекарственные травы',
        'орехи',
        'Цельнозерновая мука',
        'Яйца'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1588710929895-6ee7a0a4d155?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Жиры/липиды',
      general: [
        'обеспечивают более чем в два раза большую энергию, чем белки или углеводы',
        'насыщенные жирные кислоты: мясо, сливочное масло, ...',
        'Ненасыщенные жирные кислоты: растительные масла, рыба, ...',
        'Трансжирные кислоты: чипсы, ... --> ПЛОХО'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Углеводы',
      general: [
        'сложные углеводы: крупы, цельное зерно, картофель, ... --> Сначала сахар должен быть расщеплен',
        'Просто сахар: фруктовый сахар и декстроза',
        'Двойные сахара: бытовой сахар и лактоза'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1605690258824-d3ececd2741d?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Магний',
      goodFor: [
        'Мышцы',
        'Нервы',
        'Сердце',
        'Кости, зубы',
        'Энергетический обмен',
        'Электролитный баланс'
      ],
      containedIn: [
        'Цельнозерновая мука',
        'Овес',
        'Зеленые овощи',
        'Орехи',
        'Семена, зерна',
        'Бобовые растения'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1502747220144-846486e80891?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Макронутриенты',
      general: ['Поставщики энергии', 'Углеводы, белки, жиры'],
      thumbnail:
        'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Микронутриенты',
      general: [
        'Откладывается в костях, зубах, коже, печени и мышцах',
        'Витамины, минералы, микроэлементы'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1585307510180-2d94ee4bf0ff?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Омега 3',
      goodFor: [
        'Противовоспалительное средство',
        'Свойство текучести крови',
        'Снижение артериального давления',
        'Построение клеток'
      ],
      containedIn: [
        'Рыба (лосось, тунец, форель, сардина, скумбрия,...)',
        'Масло канолы, конопли, льна, грецкого ореха, чиа',
        'Брюссельская капуста',
        'Авокадо',
        'Шпинат',
        'Фасоль',
        'Орехи',
        'Семена',
        'Соя'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1613744696750-4181a318e57a?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Пребиотики',
      goodFor: ['Кишечная флора', 'Иммунная система'],
      containedIn: [
        'Спаржа',
        'Злаки',
        'Цикорий',
        'Топинамбур',
        'Лук репчатый',
        'Чеснок',
        'Зелёные бананы',
        'Фасоль',
        'Горох'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1519590350802-eb212e2ea536?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Пробиотики',
      goodFor: ['Кишечная флора', 'Кишечная флора'],
      containedIn: [
        'Йогурт',
        'Сыр',
        'квашеная капуста',
        'Кефир',
        'Мисо',
        'Чайный гриб'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=5&w=1080'
    },
    {
      category: 'Питательные вещества',
      title: 'Протеины/белки',
      general: ['не хранятся долго в организме'],
      thumbnail:
        'https://images.unsplash.com/photo-1605291535557-4fc6bb3b4d00?q=5&w=1080'
    },
    {
      category: 'Витамины',
      title: 'Витамин B7 (биотин)',
      goodFor: ['Кожа, волосы, ногти', 'Метаболизм'],
      containedIn: ['Яйца', 'Орехи', 'Овсянка', 'Молоко', 'Дрожжи', 'печенка'],
      thumbnail:
        'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=5&w=1080'
    },
    {
      category: 'Витамины',
      title: 'Витамин В12',
      goodFor: ['Метаболизм', 'Разложение жирных кислот'],
      containedIn: [
        'только в продуктах животного происхождения, так как он может синтезироваться только микроорганизмами'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1592768116796-f2c356806033?q=5&w=1080'
    },
    {
      category: 'Витамины',
      title: 'Витамин C',
      goodFor: [
        'Кишечная флора',
        'Соединительная ткань',
        'Усвоение железа',
        'Клетки',
        'Кожа, зубы, кости'
      ],
      containedIn: [
        'Шиповник',
        'Облепиха',
        'Паприка',
        'Капуста',
        'Цитрусовые',
        'Ягоды',
        'Шпинат'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1610554636863-8280b198ac7e?q=5&w=1080'
    },
    {
      category: 'Витамины',
      title: 'Витамин D3',
      goodFor: [
        'Усвоение кальция',
        'Сохранение и формирование костей',
        'Нейромедиатор',
        'Клеточный метаболизм',
        'Поглощение солнечного света через кожу!'
      ],
      containedIn: [
        'почти не содержится в продуктах питания, но: жирная рыба (лосось, угорь, скумбрия, сельдь, ...)'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1545955413-209e03defb1f?q=5&w=1080'
    },
    {
      category: 'Витамины',
      title: 'Витамин K2',
      goodFor: [
        'Запасание кальция в костях',
        '-> Предотвращает развитие атеросклероза (затвердевание артерий)',
        '-> Предотвращает развитие остеопороза (хрупкости костей)'
      ],
      containedIn: [
        'Травы (кресс-салат, зеленый лук)',
        'Зелень',
        'Говяжья печень',
        'Соевые бобы',
        'Овес',
        'Цельная пшеница',
        'Картофель',
        'Капуста'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1507727910967-9be3fdf9a009?q=5&w=1080'
    },
    {
      category: 'Добавки',
      title: 'Сыворотка',
      general: [
        'из сывороточного белка молока (натуральный белок)',
        'Легко усваивается, короткое время всасывания',
        'Содержит все незаменимые аминокислоты',
        'Сывороточный концентрат: высокое содержание белка (70-78%), дешевизна',
        'Сывороточный изолят: высокое содержание белка (90-96%), низкое содержание жиров и углеводов, не содержит лактозы.',
        'Гидролизат сыворотки: получают из сывороточного концентрата или изолята, расщепляют белки для лучшего усвоения.'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1595414902678-862fe51c9f27?q=5&w=1080'
    },
    {
      category: 'Добавки',
      title: 'Казеин',
      general: [
        'Молочный белок',
        'всасывается медленнее (подходит для вечернего времени!)'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1565498971161-42ae3dbcca75?q=5&w=1080'
    },
    {
      category: 'Добавки',
      title: 'Креатин',
      general: [
        'Задержка воды в мышцах - они выглядят более пухлыми и большими',
        'увеличение силы и силовой выносливости',
        'меньшее повреждение мышц',
        'сокращение времени регенерации',
        'Внимание: Убедитесь, что вы дополнительно пьете достаточно жидкости!'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=5&w=1080'
    },
    {
      category: 'Добавки',
      title: 'L-Глютамин',
      general: [
        'Ускорение регенерации',
        'Более быстрое восполнение запасов гликогена'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=5&w=1080'
    },
    {
      category: 'Добавки',
      title: 'EAAs',
      general: [
        'незаменимые аминокислоты важны для иммунной системы и обмена веществ',
        'Не может вырабатываться организмом',
        'участвуют в построении белков и, следовательно, в анаболических процессах',
        'При недостаточном поступлении EAA организм берет их из собственных веществ.'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=5&w=1080'
    },
    {
      category: 'Добавки',
      title: 'BCAAs',
      general: [
        'незаменимые аминокислоты валин, лейцин, изолейцин',
        'не метаболизируются в печени, а всасываются непосредственно в кишечнике',
        'Важен для синтеза мышечного белка'
      ],
      thumbnail:
        'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=5&w=1080'
    }
  ];

  public static getByCategory(category: string): INutritionWikiItem[] {
    return this.items.filter(x => x.category === category);
  }

  public static getCategories(): string[] {
    return [...new Set(this.items.map(x => x.category))];
  }

  public static getItem(title: string): INutritionWikiItem | null {
    return (
      this.items.filter(
        x => x.title.toLowerCase() === title.toLowerCase()
      )[0] || null
    );
  }
}
