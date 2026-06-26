import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const navLinks = [
  { label: 'Запросы', href: '#zaprosy' },
  { label: 'Специалисты', href: '#specialisty' },
  { label: 'Стоимость', href: '#stoimost' },
  { label: 'FAQ', href: '#faq' },
];

const facts = [
  { icon: 'Video', text: 'Онлайн' },
  { icon: 'User', text: 'Для взрослых' },
  { icon: 'Clock', text: '60 минут' },
  { icon: 'Wallet', text: '2000 ₽' },
  { icon: 'Lock', text: 'Конфиденциально' },
  { icon: 'Home', text: 'Без дороги до кабинета' },
];

const requests = [
  { icon: 'Wind', title: 'Тревога', text: 'Когда внутри постоянное напряжение, сложно расслабиться и мысли крутятся по кругу.' },
  { icon: 'BatteryLow', title: 'Выгорание', text: 'Когда нет сил, работа раздражает, а отдых не восстанавливает.' },
  { icon: 'Heart', title: 'Сложности в отношениях', text: 'Когда в близком общении много конфликтов, непонимания и хочется разобраться в себе.' },
  { icon: 'Sparkles', title: 'Самооценка', text: 'Когда хочется мягче относиться к себе и опираться на собственное мнение.' },
  { icon: 'HelpCircle', title: 'Неуверенность', text: 'Когда сложно доверять своим желаниям и решениям, всё время сомневаетесь в себе.' },
  { icon: 'CloudRain', title: 'Расставание', text: 'Когда переживаете разрыв и ищете опору и новое спокойствие внутри.' },
  { icon: 'Moon', title: 'Одиночество', text: 'Когда кажется, что вы наедине с собой, и хочется поддержки и понимания.' },
  { icon: 'Compass', title: 'Трудности с решениями', text: 'Когда много мыслей сразу и сложно выбрать направление.' },
  { icon: 'Cloudy', title: 'Эмоциональная перегрузка', text: 'Когда слишком много чувств и задач, хочется выдохнуть и всё разложить по полкам.' },
];

const specialists = [
  {
    name: 'Специалист 1',
    exp: '8 лет практики',
    approach: 'КПТ, интегративный подход',
    works: 'Тревога, выгорание, самооценка',
    time: 'Ближайшее: завтра, 18:00',
    tags: ['Тревога', 'Выгорание', 'Самооценка'],
  },
  {
    name: 'Специалист 2',
    exp: '6 лет практики',
    approach: 'Гештальт-подход',
    works: 'Отношения, расставание, одиночество',
    time: 'Ближайшее: сегодня, 20:00',
    tags: ['Отношения', 'Расставание'],
  },
  {
    name: 'Специалист 3',
    exp: '11 лет практики',
    approach: 'Схема-терапия',
    works: 'Личный кризис, перегрузка, неуверенность',
    time: 'Ближайшее: послезавтра, 12:00',
    tags: ['Самооценка', 'Выгорание', 'Не знаю запрос'],
  },
];

const filters = ['Все', 'Тревога', 'Отношения', 'Выгорание', 'Самооценка', 'Расставание', 'Не знаю запрос'];

const afterRequest = [
  { icon: 'PenLine', title: 'Вы оставляете заявку', text: 'Короткая форма без долгих анкет и обязательств.' },
  { icon: 'MessageCircle', title: 'Мы уточняем запрос', text: 'Спокойно расспрашиваем, с чем хочется поработать.' },
  { icon: 'Users', title: 'Помогаем выбрать специалиста', text: 'Подбираем психолога под ваш запрос и подход.' },
  { icon: 'CalendarClock', title: 'Согласуем время по Самаре', text: 'Выбираем удобное время с учётом самарского часового пояса.' },
  { icon: 'Video', title: 'Консультация по видеосвязи', text: 'Встреча проходит онлайн из вашего спокойного места.' },
];

const trust = [
  { icon: 'UserCheck', text: 'Психологи работают со взрослыми' },
  { icon: 'BadgeCheck', text: 'Указаны опыт, подход и специализация' },
  { icon: 'Wallet', text: 'Цена известна заранее — 2000 ₽ за 60 минут' },
  { icon: 'Lock', text: 'Консультации конфиденциальны' },
  { icon: 'Hand', text: 'Нет обещаний быстрого результата' },
  { icon: 'Stethoscope', text: 'При необходимости подскажем, когда лучше обратиться к врачу или психиатру' },
];

const summary = [
  'Можно обратиться из Самары, потому что консультации проходят онлайн',
  'Очного приёма в Самаре нет',
  'Консультация длится 60 минут',
  'Стоимость 2000 рублей',
  'Формат подходит взрослым',
  'Можно прийти без чёткого запроса',
  'При остром состоянии нужно обращаться в экстренные службы или к врачу',
];

const faq = [
  { q: 'Можно ли обратиться к психологу онлайн из Самары?', a: 'Да. Консультации проходят по видеосвязи, поэтому географически вы можете находиться где угодно, в том числе в Самаре. Время встречи подбираем с учётом самарского часового пояса.' },
  { q: 'Есть ли очный приём в Самаре?', a: 'Нет, консультации проходят только онлайн. Очного приёма в кабинете в Самаре нет.' },
  { q: 'Сколько стоит консультация?', a: 'Онлайн консультация длится 60 минут и стоит 2000 рублей. В стоимость входит первая встреча, спокойный разбор запроса и бережная обратная связь.' },
  { q: 'Как выбрать специалиста?', a: 'Можно выбрать психолога по запросу, подходу и ощущению доверия. Район Самары не важен, потому что консультации проходят онлайн. Если сложно выбрать самостоятельно — оставьте заявку, и мы поможем подобрать специалиста под ваш запрос.' },
  { q: 'Можно ли прийти без чёткого запроса?', a: 'Да. Иногда сложно сформулировать, что именно беспокоит. Психолог поможет прояснить запрос вместе с вами на первой встрече.' },
  { q: 'Конфиденциальна ли консультация?', a: 'Да. Всё, что обсуждается на встрече, остаётся между вами и психологом. Данные заявки не передаются третьим лицам.' },
  { q: 'Когда нужен психиатр?', a: 'Если есть острое состояние, нужна медицинская диагностика или назначение лекарств — это зона работы врача-психиатра. Психолог не назначает лекарства и не заменяет медицинскую помощь.' },
  { q: 'Как записаться?', a: 'Оставьте заявку через форму на сайте. Мы свяжемся с вами удобным способом и согласуем время первой встречи.' },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Все');

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const visibleSpecialists =
    activeFilter === 'Все'
      ? specialists
      : specialists.filter((s) => s.tags.includes(activeFilter) || activeFilter === 'Не знаю запрос');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-[72px]">
          <a href="#" className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-semibold">Психолог онлайн</span>
            <span className="text-xs text-muted-foreground">Консультации для взрослых</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button onClick={() => scrollTo('#zayavka')} className="rounded-full px-6 hidden sm:inline-flex">
              Записаться
            </Button>
            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in-up">
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left py-3 text-base text-foreground/80"
                >
                  {l.label}
                </button>
              ))}
              <Button onClick={() => scrollTo('#zayavka')} className="rounded-full mt-2 sm:hidden">
                Записаться
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* 1. Первый экран */}
      <section className="container pt-14 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground mb-6">
              <Icon name="Video" size={15} /> Подбор специалиста · только онлайн
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.2rem] font-semibold leading-[1.05] mb-6">
              Подбор онлайн психолога для взрослых из&nbsp;Самары
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed mb-5 max-w-xl">
              Поможем выбрать специалиста для онлайн консультации при тревоге, выгорании, сложностях
              в отношениях, самооценке или личном кризисе. Встречи проходят по видеосвязи, время
              подбирается с учётом Самары.
            </p>
            <div className="flex items-start gap-3 rounded-2xl bg-secondary/70 border border-border p-4 mb-8 max-w-xl">
              <Icon name="Info" size={20} className="text-primary shrink-0 mt-0.5" />
              <p className="text-[15px] text-foreground">
                Консультации проходят только онлайн. Очного приёма в Самаре нет.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => scrollTo('#zayavka')} className="text-base px-7 py-6 rounded-full">
                Подобрать психолога
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('#specialisty')}
                className="text-base px-7 py-6 rounded-full"
              >
                Посмотреть специалистов
              </Button>
            </div>
            <p className="text-sm text-foreground/60 mt-4">
              Ответим в течение рабочего дня. Консультация 60 минут, 2000 рублей.
            </p>
          </div>

          {/* Визуал: онлайн-встреча + карточки специалистов */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-accent/40 rounded-[2.5rem] -rotate-3" />
            <div className="relative rounded-[2rem] bg-card border border-border shadow-xl p-5 space-y-4">
              <div className="rounded-2xl bg-gradient-to-br from-accent/60 to-secondary aspect-video flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-card/80 flex items-center justify-center mb-3">
                  <Icon name="Video" size={26} className="text-primary" />
                </div>
                <span className="text-sm text-foreground/70">Онлайн консультация по видеосвязи</span>
              </div>
              {specialists.slice(0, 2).map((s) => (
                <div key={s.name} className="flex items-center gap-4 rounded-2xl bg-background border border-border p-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Icon name="User" size={22} className="text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-[15px]">{s.name}</p>
                    <p className="text-[13px] text-foreground/60 truncate">{s.works}</p>
                  </div>
                  <span className="ml-auto text-sm font-semibold text-primary whitespace-nowrap">2000 ₽</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facts.map((f) => (
            <div key={f.text} className="flex flex-col items-center text-center gap-2 rounded-2xl bg-card border border-border p-5">
              <Icon name={f.icon} size={22} className="text-primary" />
              <span className="text-[15px] font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Почему онлайн удобно жителям Самары */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Почему онлайн удобно жителям Самары</h2>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Онлайн формат помогает выбрать специалиста не по району, а по опыту, подходу и ощущению
              доверия. Не нужно ехать в кабинет, тратить время на дорогу и искать приём рядом. Можно
              выбрать спокойное место для разговора и подобрать время с учётом самарского часового пояса.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: 'MapPinned', text: 'Выбор специалиста по подходу, а не по району' },
              { icon: 'Clock4', text: 'Без дороги и пробок — экономия времени' },
              { icon: 'Sofa', text: 'Разговор из своего спокойного места' },
              { icon: 'CalendarClock', text: 'Удобное время с учётом самарского часового пояса' },
            ].map((i) => (
              <div key={i.text} className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5">
                <Icon name={i.icon} size={24} className="text-primary shrink-0" />
                <span className="font-medium text-[15px]">{i.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Текстовый блок копирайтера */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8">Онлайн консультация психолога для жителей Самары</h2>
          <div className="space-y-5 text-lg text-foreground/75 leading-relaxed">
            <p>
              Онлайн консультация подходит взрослым из Самары, которым нужна спокойная помощь без
              поездки в кабинет. На встрече можно обсудить тревогу, выгорание, отношения, самооценку,
              расставание, эмоциональную усталость или состояние, когда трудно понять, что происходит.
            </p>
            <p>
              Не обязательно заранее идеально формулировать запрос — психолог поможет разобраться
              вместе с вами. Онлайн формат помогает выбрать специалиста по опыту, подходу и доверию,
              а не по району города.
            </p>
          </div>
        </div>
      </section>

      {/* Запросы */}
      <section id="zaprosy" className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">С какими запросами приходят</h2>
            <p className="text-foreground/70 text-lg">
              Если узнаёте себя в чём-то из этого — это уже достаточный повод поговорить.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {requests.map((r) => (
              <div key={r.title} className="rounded-3xl bg-card border border-border p-7 transition-shadow hover:shadow-md">
                <h3 className="font-display text-2xl font-semibold mb-2">{r.title}</h3>
                <p className="text-foreground/70 text-base leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как выбрать психолога */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Как выбрать психолога в Самаре</h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-10">
            Для онлайн консультации район города не главное. Гораздо важнее обращать внимание
            на то, что действительно влияет на качество работы и ваше ощущение безопасности.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Образование специалиста',
            'Опыт практики',
            'Подход, который вам близок',
            'Работа именно со взрослыми',
            'Понятная стоимость',
            'Конфиденциальность',
            'Без обещаний быстрого результата',
            'Ощущение доверия в контакте',
          ].map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-2xl bg-card border border-border p-5">
              <Icon name="Check" size={20} className="text-primary mt-0.5 shrink-0" />
              <span className="text-base">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Специалисты */}
      <section id="specialisty" className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">Специалисты, которые консультируют онлайн</h2>
            <p className="text-foreground/70 text-lg">
              Вы можете выбрать психолога по запросу, подходу и ощущению доверия. Район Самары не важен,
              потому что консультации проходят онлайн.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                  activeFilter === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground/70 border-border hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(visibleSpecialists.length ? visibleSpecialists : specialists).map((s) => (
              <div key={s.name} className="rounded-3xl bg-card border border-border p-7 flex flex-col shadow-sm">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Icon name="User" size={28} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight">{s.name}</h3>
                    <p className="text-sm text-foreground/60">{s.exp}</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-base mb-6">
                  <p><span className="text-foreground/55">Подход:</span> {s.approach}</p>
                  <p><span className="text-foreground/55">С чем работает:</span> {s.works}</p>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-semibold text-primary text-lg">2000 ₽</span>
                    <span className="text-sm text-foreground/60">60 минут</span>
                  </div>
                  <p className="text-sm text-foreground/70 flex items-center gap-2">
                    <Icon name="CalendarClock" size={16} /> {s.time}
                  </p>
                  <Button onClick={() => scrollTo('#zayavka')} className="w-full rounded-full">
                    Выбрать специалиста
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground/55 mt-6">
            Имена и фото будут добавлены позже. Сейчас показаны примеры карточек специалистов.
          </p>

          {/* Не знаете, кого выбрать */}
          <div className="mt-10 rounded-3xl bg-card border border-border p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">Не знаете, кого выбрать?</h3>
              <p className="text-foreground/70 text-base leading-relaxed">
                Оставьте заявку, и мы поможем подобрать специалиста под ваш запрос. Это не обязывает
                к записи.
              </p>
            </div>
            <Button size="lg" onClick={() => scrollTo('#zayavka')} className="rounded-full px-8 py-6 shrink-0">
              Помочь с подбором
            </Button>
          </div>
        </div>
      </section>

      {/* Что будет после заявки */}
      <section className="container py-20 md:py-28">
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Что будет после заявки</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {afterRequest.map((s, i) => (
            <div key={s.title} className="rounded-3xl bg-card border border-border p-6">
              <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center mb-4">
                <Icon name={s.icon} size={20} className="text-accent-foreground" />
              </div>
              <span className="text-sm text-foreground/50">Шаг {i + 1}</span>
              <h3 className="font-display text-xl font-semibold mt-1 mb-2">{s.title}</h3>
              <p className="text-[15px] text-foreground/70 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Почему нам можно доверять */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Почему нам можно доверять</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trust.map((t) => (
              <div key={t.text} className="flex items-start gap-4 rounded-2xl bg-card border border-border p-6">
                <Icon name={t.icon} size={24} className="text-primary shrink-0 mt-0.5" />
                <span className="text-base leading-relaxed">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Стоимость */}
      <section id="stoimost" className="container py-20 md:py-28">
        <div className="rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
            Онлайн консультация психолога для взрослых из Самары
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-4">60 минут</p>
          <div className="font-display text-6xl md:text-7xl font-semibold my-4">2000 ₽</div>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            В стоимость входит первая встреча, разбор запроса, бережная обратная связь и понимание
            дальнейшего формата работы.
          </p>
          <Button
            size="lg"
            onClick={() => scrollTo('#zayavka')}
            className="bg-card text-foreground hover:bg-card/90 text-base px-8 py-6 rounded-full"
          >
            Записаться
          </Button>
        </div>
      </section>

      {/* Коротко о консультации */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8">Коротко о консультации</h2>
          <ul className="space-y-4">
            {summary.map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl bg-card border border-border p-5">
                <Icon name="Check" size={20} className="text-primary mt-0.5 shrink-0" />
                <span className="text-base">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-20 md:py-28">
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Частые вопросы</h2>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-xl font-medium hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 text-base leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Форма */}
      <section id="zayavka" className="bg-secondary/50 py-20 md:py-28">
        <div className="container grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Записаться к психологу онлайн из Самары
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              Оставьте заявку, чтобы обсудить запрос и подобрать специалиста для первой онлайн
              консультации. Консультация 60 минут — 2000 рублей.
            </p>
            <div className="space-y-3">
              {facts.slice(0, 4).map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <Icon name={f.icon} size={20} className="text-primary" />
                  <span className="text-base">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
          <form
            className="rounded-3xl bg-card border border-border p-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm font-medium mb-2 block">Имя</label>
              <Input placeholder="Как к вам обращаться" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Телефон или мессенджер</label>
              <Input placeholder="+7 или @ник" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Удобный способ связи</label>
              <Input placeholder="Например: WhatsApp, Telegram, звонок" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Комментарий (по желанию)</label>
              <Textarea placeholder="Можно коротко описать, с чем хотите обратиться" className="rounded-xl" />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full text-base py-6">
              Записаться на консультацию
            </Button>
            <p className="text-xs text-foreground/60 text-center leading-relaxed">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой
              персональных данных.
            </p>
          </form>
        </div>
      </section>

      {/* Футер */}
      <footer className="container py-12 border-t border-border">
        <div className="flex flex-col gap-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Согласие на обработку персональных данных</a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Правила оплаты и отмены консультации</a>
          </nav>
          <p className="text-sm text-foreground/60">
            Онлайн консультации психолога для взрослых не являются экстренной медицинской помощью.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
