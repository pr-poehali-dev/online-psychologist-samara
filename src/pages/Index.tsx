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
  { label: 'Как проходит', href: '#process' },
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

const starts = [
  { title: 'Разобраться с тревогой', text: 'Когда внутри постоянное напряжение и мысли крутятся по кругу.' },
  { title: 'Восстановиться после выгорания', text: 'Когда нет сил, работа раздражает, а отдых не восстанавливает.' },
  { title: 'Обсудить отношения', text: 'Когда в близком общении много конфликтов и хочется разобраться в себе.' },
  { title: 'Пережить расставание', text: 'Когда переживаете разрыв и ищете опору и новое спокойствие внутри.' },
  { title: 'Вернуть внутреннюю опору', text: 'Когда привычная почва ушла из-под ног и хочется устойчивости.' },
  { title: 'Понять, что со мной происходит', text: 'Когда трудно сформулировать, что именно беспокоит, но что-то не так.' },
];

const consultationIncludes = [
  'Спокойно разберём, что вас беспокоит',
  'Поможем сформулировать запрос',
  'Обсудим тревогу, выгорание, отношения, самооценку или сложный период',
  'Поймём, какой формат работы может подойти дальше',
  'Без давления и обещаний быстрого результата',
];

const samaraReasons = [
  { icon: 'Car', text: 'Не нужно ехать в кабинет' },
  { icon: 'MapPinned', text: 'Не нужно искать приём рядом с домом' },
  { icon: 'Sofa', text: 'Можно говорить из спокойного места' },
  { icon: 'CalendarClock', text: 'Время подбирается с учётом Самары' },
  { icon: 'Globe', text: 'Район города не важен — консультация проходит онлайн' },
];

const processSteps = [
  'Вы оставляете заявку',
  'Мы связываемся с вами',
  'Уточняем удобное время',
  'Консультация проходит онлайн',
  'На встрече спокойно разбираем запрос',
  'После встречи становится понятнее, как двигаться дальше',
];

const afterRequest = [
  { icon: 'Inbox', title: 'Мы получим ваш контакт', text: 'Заявка приходит к нам, и мы связываемся удобным способом.' },
  { icon: 'CalendarClock', title: 'Уточним удобное время', text: 'Подбираем время с учётом самарского часового пояса.' },
  { icon: 'MessageCircle', title: 'Ответим на вопросы', text: 'Спокойно проясним все организационные моменты.' },
  { icon: 'CheckCircle2', title: 'Подтвердим запись', text: 'Согласуем детали и подтверждаем встречу.' },
  { icon: 'Video', title: 'Консультация пройдёт онлайн', text: 'Встреча по видеосвязи из вашего спокойного места.' },
];

const trust = [
  { icon: 'Lock', text: 'Консультация конфиденциальна' },
  { icon: 'Wallet', text: 'Цена известна заранее' },
  { icon: 'Eye', text: 'Формат понятен до записи' },
  { icon: 'Hand', text: 'Нет обещаний быстрого результата' },
  { icon: 'HeartHandshake', text: 'Можно прийти без чёткого запроса' },
  { icon: 'Stethoscope', text: 'При необходимости подскажем, когда лучше обратиться к врачу или психиатру' },
];

const summary = [
  'Можно обратиться из Самары, потому что консультации проходят онлайн',
  'Очного приёма в Самаре нет',
  'Консультация длится 60 минут',
  'Стоимость 2000 рублей',
  'Формат подходит взрослым',
  'Можно прийти без чёткого запроса',
  'Заявка не обязывает к оплате',
  'При остром состоянии нужно обращаться в экстренные службы или к врачу',
];

const faq = [
  { q: 'Можно ли обратиться к психологу онлайн из Самары?', a: 'Да. Консультации проходят по видеосвязи, поэтому географически вы можете находиться где угодно, в том числе в Самаре. Время встречи подбираем с учётом самарского часового пояса.' },
  { q: 'Есть ли очный приём в Самаре?', a: 'Нет, очного приёма в Самаре нет. Консультации проходят только онлайн.' },
  { q: 'Сколько стоит консультация?', a: 'Онлайн консультация длится 60 минут и стоит 2000 рублей. В стоимость входит первая встреча, спокойный разбор запроса и бережная обратная связь.' },
  { q: 'Как проходит первая консультация?', a: 'Встреча проходит по видеосвязи и длится 60 минут. На ней спокойно разбираем, что вас беспокоит, помогаем сформулировать запрос и понять, какой формат работы может подойти дальше. Без давления и обещаний быстрого результата.' },
  { q: 'Можно ли прийти без чёткого запроса?', a: 'Да. Иногда сложно сформулировать, что именно беспокоит. Психолог поможет прояснить запрос вместе с вами на первой встрече.' },
  { q: 'Конфиденциальна ли консультация?', a: 'Да. Всё, что обсуждается на встрече, остаётся между вами и психологом. Данные заявки не передаются третьим лицам.' },
  { q: 'Когда нужен психиатр?', a: 'Если есть острое состояние, нужна медицинская диагностика или назначение лекарств — это зона работы врача-психиатра. Психолог не назначает лекарства и не заменяет медицинскую помощь.' },
  { q: 'Как записаться?', a: 'Оставьте заявку через форму на сайте. Мы свяжемся с вами удобным способом и согласуем время первой встречи.' },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-[72px]">
          <a href="#" className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-semibold">Психологическая помощь онлайн</span>
            <span className="text-xs text-muted-foreground">Для взрослых из Самары</span>
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

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm font-medium text-primary">2000 ₽ / 60 минут</span>
            <Button onClick={() => scrollTo('#zayavka')} className="rounded-full px-6">
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
          <div className="lg:hidden border-t border-border bg-card animate-fade-in-up">
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
            </nav>
          </div>
        )}
      </header>

      {/* 1. Первый экран */}
      <section className="container pt-14 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground mb-6">
              <Icon name="Video" size={15} /> Конфиденциально · только онлайн
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.1rem] font-semibold leading-[1.05] mb-6">
              Психологическая помощь онлайн для взрослых из&nbsp;Самары
            </h1>
            <p className="text-lg text-foreground/75 leading-relaxed mb-5 max-w-xl">
              Конфиденциальная онлайн консультация при тревоге, выгорании, сложностях в отношениях,
              самооценке или личном кризисе. Встреча проходит по видеосвязи, длится 60 минут и стоит
              2000 рублей. Очного приёма в Самаре нет.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => scrollTo('#zayavka')} className="text-base px-7 py-6 rounded-full">
                Записаться на консультацию
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('#zaprosy')}
                className="text-base px-7 py-6 rounded-full"
              >
                С чем можно обратиться
              </Button>
            </div>
            <p className="text-sm text-foreground/60 mt-4">
              Ответим в течение рабочего дня. Заявка не обязывает к оплате.
            </p>
          </div>

          {/* Тёплый визуал онлайн-консультации */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-accent/40 rounded-[2.5rem] -rotate-3" />
            <div className="relative rounded-[2rem] bg-card border border-border shadow-xl p-6">
              <div className="rounded-2xl bg-gradient-to-br from-secondary to-accent/50 aspect-[4/3] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-card/80 flex items-center justify-center mb-4 shadow-sm">
                  <Icon name="Video" size={28} className="text-primary" />
                </div>
                <p className="font-display text-2xl font-semibold text-foreground mb-1">Спокойный разговор</p>
                <p className="text-sm text-foreground/70">по видеосвязи из безопасного места</p>
              </div>
              <div className="flex items-center justify-between mt-5 px-1">
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Icon name="Lock" size={16} className="text-primary" /> Конфиденциально
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Icon name="Clock" size={16} /> 60 минут · 2000 ₽
                </div>
              </div>
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

      {/* 6. Услуга — первая консультация */}
      <section id="stoimost" className="bg-secondary/50 py-20 md:py-28">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-10 text-center">Первая онлайн консультация психолога</h2>
          <div className="rounded-[2.5rem] bg-card border border-border shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border">
                <div className="font-display text-6xl font-semibold text-primary mb-1">2000 ₽</div>
                <p className="text-foreground/70 mb-6">за 60 минут по видеосвязи</p>
                <ul className="space-y-3">
                  {['60 минут', 'По видеосвязи', 'Для взрослых', 'Можно прийти без чёткого запроса', 'Очного приёма в Самаре нет'].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-base">
                      <Icon name="Check" size={20} className="text-primary mt-0.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 md:p-10 bg-muted/40">
                <h3 className="font-display text-2xl font-semibold mb-5">Что будет на консультации</h3>
                <ul className="space-y-3">
                  {consultationIncludes.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-base text-foreground/80">
                      <Icon name="Dot" size={20} className="text-primary mt-0.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-8 md:p-10 border-t border-border text-center">
              <Button size="lg" onClick={() => scrollTo('#zayavka')} className="rounded-full text-base px-8 py-6">
                Записаться на первую консультацию
              </Button>
              <p className="text-sm text-foreground/60 mt-4">Заявка не обязывает к оплате.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. С чего можно начать */}
      <section id="zaprosy" className="container py-20 md:py-28">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">С чего можно начать</h2>
          <p className="text-foreground/70 text-lg">
            Необязательно заранее идеально формулировать запрос. Можно просто прийти и спокойно поговорить.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {starts.map((s) => (
            <div key={s.title} className="rounded-3xl bg-card border border-border p-7 flex flex-col">
              <h3 className="font-display text-2xl font-semibold mb-2">{s.title}</h3>
              <p className="text-foreground/70 text-base leading-relaxed mb-6">{s.text}</p>
              <Button
                variant="outline"
                onClick={() => scrollTo('#zayavka')}
                className="mt-auto rounded-full w-full"
              >
                Обсудить на консультации
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Основной текстовый блок */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8">Онлайн консультация психолога для жителей Самары</h2>
          <div className="space-y-5 text-lg text-foreground/75 leading-relaxed">
            <p>
              Онлайн консультация психолога подходит взрослым из Самары, которым нужна спокойная и
              конфиденциальная помощь без поездки в кабинет. Встреча проходит по видеосвязи, длится
              60 минут и стоит 2000 рублей.
            </p>
            <p>
              На консультации можно обсудить тревогу, выгорание, сложности в отношениях, самооценку,
              расставание, эмоциональную усталость или состояние, когда трудно понять, что именно
              происходит. Не обязательно заранее идеально формулировать запрос. Часто первая встреча
              помогает спокойно разобраться, с чего начать.
            </p>
            <p>
              Онлайн формат удобен тем, что вы выбираете помощь не по району Самары, а по доверию,
              формату и возможности спокойно поговорить из безопасного места. Очного приёма в Самаре
              нет, консультации проходят только дистанционно.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Почему онлайн удобно жителям Самары */}
      <section className="container py-20 md:py-28">
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Почему онлайн удобно жителям Самары</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {samaraReasons.map((r) => (
            <div key={r.text} className="flex items-start gap-4 rounded-2xl bg-card border border-border p-6">
              <Icon name={r.icon} size={24} className="text-primary shrink-0 mt-0.5" />
              <span className="text-base leading-relaxed">{r.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Как проходит консультация */}
      <section id="process" className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Как проходит консультация</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {processSteps.map((s, i) => (
              <div key={s} className="rounded-3xl bg-card border border-border p-7">
                <span className="font-display text-4xl font-semibold text-primary">0{i + 1}</span>
                <p className="text-base mt-3 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Что будет после заявки */}
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
        <p className="text-base text-foreground/70 mt-8 inline-flex items-center gap-2">
          <Icon name="ShieldCheck" size={18} className="text-primary" /> Заявка не обязывает к оплате.
        </p>
      </section>

      {/* 12. Почему нам можно доверять */}
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

      {/* 13. Коротко о консультации */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8">Коротко о консультации</h2>
          <ul className="space-y-4">
            {summary.map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl bg-card border border-border p-5">
                <Icon name="Check" size={20} className="text-primary mt-0.5 shrink-0" />
                <span className="text-base">{t}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-start gap-3 rounded-2xl bg-muted/50 border border-border p-5 mt-6">
            <Icon name="Info" size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[15px] text-foreground/75 leading-relaxed">
              Онлайн консультация психолога не является экстренной медицинской помощью. Психолог
              не назначает лекарства и не ставит диагнозы.
            </p>
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section id="faq" className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
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
        </div>
      </section>

      {/* 15. Форма */}
      <section id="zayavka" className="container py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Записаться на онлайн консультацию
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              Оставьте заявку, чтобы обсудить запрос и согласовать удобное время первой онлайн
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
            className="rounded-3xl bg-card border border-border p-8 space-y-5 shadow-sm"
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
              персональных данных. Заявка не обязывает к оплате.
            </p>
          </form>
        </div>
      </section>

      {/* 16. Футер */}
      <footer className="bg-footer text-footer-foreground border-t border-border">
        <div className="container py-14">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="font-display text-2xl font-semibold mb-3">Психологическая помощь онлайн для взрослых</p>
              <ul className="space-y-1.5 text-[15px] text-footer-foreground/80">
                <li>Консультации проходят дистанционно</li>
                <li>Очного приёма в Самаре нет</li>
                <li>Не является экстренной медицинской помощью</li>
              </ul>
            </div>
            <nav className="flex flex-col gap-2.5 text-[15px] md:items-end">
              <a href="#" className="text-primary hover:opacity-80 transition-opacity font-medium">Политика конфиденциальности</a>
              <a href="#" className="text-primary hover:opacity-80 transition-opacity font-medium">Согласие на обработку персональных данных</a>
              <a href="#" className="text-primary hover:opacity-80 transition-opacity font-medium">Правила оплаты и отмены</a>
              <a href="#" className="text-primary hover:opacity-80 transition-opacity font-medium">Контакт для связи</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
