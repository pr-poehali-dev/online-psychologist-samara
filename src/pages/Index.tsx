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
  { label: 'О психологе', href: '#o-psihologe' },
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
  { icon: 'Wind', title: 'Тревога и напряжение', text: 'Постоянное беспокойство и внутреннее напряжение, которое сложно объяснить себе.' },
  { icon: 'BatteryLow', title: 'Выгорание и усталость', text: 'Нет сил и интереса, ощущение, что вы работаете «на пределе» уже долгое время.' },
  { icon: 'Heart', title: 'Сложности в отношениях', text: 'Конфликты, непонимание, желание разобраться в себе и в близком общении.' },
  { icon: 'Sparkles', title: 'Самооценка', text: 'Хочется опираться на себя, мягче относиться к себе и своим решениям.' },
  { icon: 'HelpCircle', title: 'Неуверенность', text: 'Сомнения в себе, сложно доверять собственному мнению и желаниям.' },
  { icon: 'CloudRain', title: 'Расставание', text: 'Переживание разрыва, поиск опоры и нового спокойствия внутри.' },
  { icon: 'Moon', title: 'Одиночество', text: 'Чувство, что вы наедине с собой, хочется поддержки и понимания.' },
  { icon: 'Compass', title: 'Трудности с решениями', text: 'Сложно выбрать направление, когда много мыслей и сомнений сразу.' },
  { icon: 'Cloudy', title: 'Эмоциональная перегрузка', text: 'Слишком много чувств и задач, хочется выдохнуть и разложить всё по полкам.' },
  { icon: 'Anchor', title: 'Потеря опоры', text: 'Привычная почва ушла из-под ног, ищется новое ощущение устойчивости.' },
];

const steps = [
  { num: '01', title: 'Вы оставляете заявку', text: 'Заполняете короткую форму на сайте — без долгих анкет и обязательств.' },
  { num: '02', title: 'Согласуем удобное время по Самаре', text: 'Подбираем время встречи с учётом самарского часового пояса.' },
  { num: '03', title: 'Встреча по видеосвязи', text: 'Разговор проходит онлайн из любого спокойного места, где вам комфортно.' },
  { num: '04', title: 'Обсуждаем запрос', text: 'На первой консультации вместе смотрим, с чем хочется поработать.' },
  { num: '05', title: 'Психолог помогает сформулировать проблему', text: 'Даже если запрос неясный — вместе проясняем, что важно для вас.' },
  { num: '06', title: 'Становится понятнее, как двигаться дальше', text: 'После встречи яснее ваша ситуация и возможный формат дальнейшей работы.' },
];

const suitable = [
  'Вы живёте в Самаре и хотите консультацию онлайн',
  'Выбираете специалиста по подходу, а не по району',
  'Вам нужна помощь взрослому человеку',
  'Вам важно говорить из спокойного, своего места',
  'Хотите заранее понимать цену и формат',
];

const notSuitable = [
  'Нужна экстренная помощь прямо сейчас',
  'Есть риск причинить вред себе или другим',
  'Нужна медицинская диагностика',
  'Нужно назначение лекарств',
  'Нужна очная помощь врача или психиатра',
  'Нет безопасного места для разговора',
];

const faq = [
  { q: 'Можно ли обратиться к психологу онлайн из Самары?', a: 'Да. Консультации проходят по видеосвязи, поэтому географически вы можете находиться где угодно, в том числе в Самаре. Время встречи подбираем с учётом самарского часового пояса.' },
  { q: 'Сколько стоит консультация?', a: 'Онлайн консультация длится 60 минут и стоит 2000 рублей. В стоимость входит первая встреча, спокойный разбор запроса и бережная обратная связь.' },
  { q: 'Есть ли очный приём в Самаре?', a: 'Нет, консультации проходят только онлайн. Очного приёма в кабинете в Самаре нет.' },
  { q: 'Чем онлайн консультация отличается от очной?', a: 'По содержанию разговор такой же, как в кабинете. Отличие в формате: встреча проходит по видеосвязи, и вам не нужно тратить время на дорогу.' },
  { q: 'Можно ли прийти без чёткого запроса?', a: 'Да. Иногда сложно сформулировать, что именно беспокоит. Психолог поможет прояснить запрос вместе с вами на первой встрече.' },
  { q: 'Конфиденциальна ли консультация?', a: 'Да. Всё, что обсуждается на встрече, остаётся между вами и психологом. Данные заявки не передаются третьим лицам.' },
  { q: 'Сколько встреч может понадобиться?', a: 'Это индивидуально и зависит от запроса. Иногда достаточно нескольких встреч, иногда работа занимает больше времени. Обещаний быстрого результата здесь нет.' },
  { q: 'Когда нужен психиатр?', a: 'Если есть острое состояние, нужна медицинская диагностика или назначение лекарств — это зона работы врача-психиатра. В таких случаях онлайн консультация психолога не заменяет медицинскую помощь.' },
  { q: 'Как записаться?', a: 'Оставьте заявку через форму на сайте. Мы свяжемся с вами удобным способом и согласуем время первой встречи.' },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToForm = () => {
    setMenuOpen(false);
    document.getElementById('zayavka')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

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
                onClick={() => handleNav(l.href)}
                className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button onClick={scrollToForm} className="rounded-full px-6 hidden sm:inline-flex">
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
                  onClick={() => handleNav(l.href)}
                  className="text-left py-3 text-base text-foreground/80"
                >
                  {l.label}
                </button>
              ))}
              <Button onClick={scrollToForm} className="rounded-full mt-2 sm:hidden">
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
              <Icon name="Video" size={15} /> Только онлайн консультации
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-6">
              Психолог онлайн для взрослых из&nbsp;Самары
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-5 max-w-xl">
              Онлайн консультации для взрослых при тревоге, выгорании, сложностях в отношениях,
              самооценке или личном кризисе. Встречи проходят по видеосвязи, время подбирается
              с учётом самарского времени.
            </p>
            <div className="flex items-start gap-3 rounded-2xl bg-secondary/70 border border-border p-4 mb-8 max-w-xl">
              <Icon name="Info" size={20} className="text-primary shrink-0 mt-0.5" />
              <p className="text-[15px] text-foreground">
                Консультации проходят только онлайн. Очного приёма в Самаре нет.
              </p>
            </div>
            <Button size="lg" onClick={scrollToForm} className="text-base px-8 py-6 rounded-full">
              Записаться на консультацию
              <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Ответим в течение рабочего дня. Стоимость консультации 2000 рублей за 60 минут.
            </p>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-accent/40 rounded-[2.5rem] -rotate-3" />
            <div className="relative rounded-[2rem] w-full aspect-[4/5] shadow-xl bg-muted border border-border flex flex-col items-center justify-center text-center px-8">
              <Icon name="Image" size={48} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">Фото психолога будет добавлено позже</p>
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

      {/* 4. Почему онлайн удобно жителям Самары */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Почему онлайн удобно жителям Самары</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Онлайн формат помогает выбрать психолога не по району и близости к кабинету, а по
              специализации, подходу, опыту и ощущению доверия. Не нужно тратить время на дорогу.
              Можно говорить из спокойного места и подобрать время с учётом самарского часового пояса.
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

      {/* 5. Запросы */}
      <section id="zaprosy" className="container py-20 md:py-28">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">С какими запросами приходят</h2>
          <p className="text-muted-foreground text-lg">
            Если узнаёте себя в чём-то из этого — это уже достаточный повод поговорить.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {requests.map((r) => (
            <div key={r.title} className="rounded-3xl bg-card border border-border p-7 transition-shadow hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-5">
                <Icon name={r.icon} size={22} className="text-accent-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Как выбрать психолога */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Как выбрать психолога в Самаре</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Для онлайн консультации район города не главное. Гораздо важнее обращать внимание
              на то, что действительно влияет на качество работы и ваше ощущение безопасности.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Опыт и образование специалиста',
              'Подход, который вам близок',
              'Работа именно со взрослыми',
              'Понятная и заранее озвученная цена',
              'Конфиденциальность',
              'Спокойный, уважительный контакт',
              'Без обещаний быстрого результата',
              'Регулярная супервизия специалиста',
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 rounded-2xl bg-card border border-border p-5">
                <Icon name="Check" size={20} className="text-primary mt-0.5 shrink-0" />
                <span className="text-[15px]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Как проходит консультация */}
      <section id="process" className="container py-20 md:py-28">
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Как проходит консультация</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.num} className="rounded-3xl bg-card border border-border p-7">
              <span className="font-display text-4xl font-semibold text-primary">{s.num}</span>
              <h3 className="font-display text-xl font-semibold mt-3 mb-2">{s.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Стоимость */}
      <section id="stoimost" className="container py-20 md:py-28">
        <div className="rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
            Онлайн консультация психолога для жителей Самары
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-4">60 минут</p>
          <div className="font-display text-6xl md:text-7xl font-semibold my-4">2000 ₽</div>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            В стоимость входит первая встреча, спокойный разбор запроса, бережная обратная связь
            и понимание дальнейшего формата работы.
          </p>
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-card text-foreground hover:bg-card/90 text-base px-8 py-6 rounded-full"
          >
            Записаться
          </Button>
        </div>
      </section>

      {/* 9. О психологе */}
      <section id="o-psihologe" className="bg-secondary/50 py-20 md:py-28">
        <div className="container grid md:grid-cols-[0.8fr_1fr] gap-12 items-start">
          <div className="relative">
            <div className="absolute -inset-3 bg-accent/40 rounded-[2rem] rotate-2" />
            <div className="relative rounded-[1.75rem] w-full aspect-[4/5] shadow-lg bg-muted border border-border flex flex-col items-center justify-center text-center px-6">
              <Icon name="Image" size={44} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">Фото психолога будет добавлено позже</p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">О психологе</h2>
            <dl className="space-y-5">
              {[
                { label: 'Имя', value: 'Имя Фамилия' },
                { label: 'Образование', value: 'Укажите вуз и специальность' },
                { label: 'Подход', value: 'Например: КПТ, гештальт, интегративный подход' },
                { label: 'Опыт', value: 'Количество лет практики' },
                { label: 'С какими запросами работает', value: 'Тревога, выгорание, отношения, самооценка' },
                { label: 'С чем не работает', value: 'Острые состояния, медицинская диагностика, назначение лекарств' },
                { label: 'Супервизия или повышение квалификации', value: 'Укажите регулярную супервизию и курсы' },
              ].map((row) => (
                <div key={row.label} className="border-b border-border pb-4">
                  <dt className="text-sm text-muted-foreground mb-1">{row.label}</dt>
                  <dd className="font-medium text-[15px]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 10 + 11. Кому подойдёт / может не подойти */}
      <section className="container py-20 md:py-28 grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-card border border-border p-8 md:p-10">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6">
            <Icon name="CircleCheck" size={24} className="text-accent-foreground" />
          </div>
          <h2 className="font-display text-3xl font-semibold mb-6">Кому подойдёт онлайн формат</h2>
          <ul className="space-y-3">
            {suitable.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-[15px]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-muted border border-border p-8 md:p-10">
          <div className="w-12 h-12 rounded-2xl bg-card flex items-center justify-center mb-6">
            <Icon name="CircleAlert" size={24} className="text-primary" />
          </div>
          <h2 className="font-display text-3xl font-semibold mb-6">Когда онлайн консультация может не подойти</h2>
          <ul className="space-y-3">
            {notSuitable.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Icon name="Minus" size={20} className="text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-[15px]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12. Конфиденциальность */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Конфиденциальность и безопасность</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Всё, что вы рассказываете на встрече, остаётся между вами и психологом. Форма на сайте
            собирает только данные для связи, и эти данные не передаются третьим лицам.
          </p>
          <div className="flex items-start gap-4 rounded-2xl bg-destructive/10 border border-destructive/30 p-6">
            <Icon name="TriangleAlert" size={24} className="text-destructive shrink-0 mt-0.5" />
            <p className="text-foreground leading-relaxed">
              Если состояние острое и есть угроза жизни или безопасности — вашей или другого человека —
              нужно обращаться в экстренные службы или к врачу. Онлайн консультация психолога не заменяет
              неотложную и медицинскую помощь.
            </p>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section id="faq" className="container py-20 md:py-28">
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Частые вопросы</h2>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-xl font-medium hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* 14. Финальная запись */}
      <section id="zayavka" className="bg-secondary/50 py-20 md:py-28">
        <div className="container grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Записаться к психологу онлайн из Самары
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Оставьте заявку, чтобы обсудить запрос и подобрать удобное время для первой онлайн
              консультации. Консультация 60 минут — 2000 рублей.
            </p>
            <div className="space-y-3">
              {facts.slice(0, 4).map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <Icon name={f.icon} size={20} className="text-primary" />
                  <span className="text-[15px]">{f.text}</span>
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
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой
              персональных данных.
            </p>
          </form>
        </div>
      </section>

      {/* 15. Футер */}
      <footer className="container py-12 border-t border-border">
        <div className="flex flex-col gap-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Согласие на обработку персональных данных</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Правила оплаты и отмены консультации</a>
          </nav>
          <p className="text-sm text-muted-foreground">
            Онлайн консультации психолога для взрослых. Не являются экстренной медицинской помощью.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
