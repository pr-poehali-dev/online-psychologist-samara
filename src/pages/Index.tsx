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

const PSYCHOLOGIST_PHOTO =
  'https://cdn.poehali.dev/projects/1e0d1b84-35b8-4262-b6ec-3d16f77f7f26/files/417559c5-abb3-4c77-ae48-318dca585c00.jpg';

const facts = [
  { icon: 'Video', text: 'Онлайн' },
  { icon: 'User', text: 'Для взрослых' },
  { icon: 'Clock', text: '60 минут' },
  { icon: 'Wallet', text: '2000 ₽' },
  { icon: 'Lock', text: 'Конфиденциально' },
  { icon: 'Home', text: 'Без дороги до кабинета' },
];

const requests = [
  { icon: 'Wind', title: 'Тревога и напряжение', text: 'Постоянное беспокойство, внутреннее напряжение, которое сложно объяснить.' },
  { icon: 'BatteryLow', title: 'Выгорание', text: 'Усталость, потеря интереса, ощущение, что сил больше не осталось.' },
  { icon: 'Heart', title: 'Отношения', text: 'Сложности в паре, конфликты, непонимание, желание разобраться в себе.' },
  { icon: 'Sparkles', title: 'Самооценка и неуверенность', text: 'Сомнения в себе, самокритика, трудно опираться на собственное мнение.' },
  { icon: 'CloudRain', title: 'Расставание и одиночество', text: 'Переживание потери, чувство одиночества, поиск опоры внутри себя.' },
  { icon: 'Compass', title: 'Трудности с решениями', text: 'Сложно выбрать направление, эмоциональная перегрузка мешает действовать.' },
];

const steps = [
  { num: '01', title: 'Вы оставляете заявку', text: 'Заполняете форму на сайте — без долгих анкет и обязательств.' },
  { num: '02', title: 'Согласуем время', text: 'Подбираем удобное время для встречи с учётом часового пояса Самары.' },
  { num: '03', title: 'Встреча по видеосвязи', text: 'Разговор проходит онлайн — из любого спокойного места, где вам комфортно.' },
  { num: '04', title: 'Обсуждаем запрос', text: 'На первой консультации вместе формулируем, с чем хочется поработать.' },
  { num: '05', title: 'Понимаем, как двигаться дальше', text: 'После встречи становится яснее ваша ситуация и возможный формат работы.' },
];

const suitable = [
  'Вы живёте в Самаре и вам удобнее общаться дистанционно',
  'Хотите выбрать специалиста по подходу, а не по району',
  'Вам нужна помощь взрослому человеку',
  'Вам важно говорить из спокойного, своего места',
  'Хотите заранее понимать цену и формат',
];

const notSuitable = [
  'Нужна экстренная помощь прямо сейчас',
  'Есть риск причинить вред себе или другому человеку',
  'Нужна медицинская диагностика',
  'Требуется назначение лекарств',
  'Необходима очная помощь врача или психиатра',
  'Нет безопасного места для разговора',
];

const faq = [
  { q: 'Можно ли обратиться к психологу онлайн из Самары?', a: 'Да. Консультации проходят по видеосвязи, поэтому географически вы можете находиться где угодно, в том числе в Самаре. Время встречи подбираем с учётом вашего часового пояса.' },
  { q: 'Сколько стоит консультация?', a: 'Онлайн консультация длится 60 минут и стоит 2000 рублей. В стоимость входит первая встреча, разбор запроса и бережная обратная связь.' },
  { q: 'Чем онлайн консультация отличается от очной?', a: 'По содержанию разговор такой же, как в кабинете. Отличие в формате: встреча проходит по видеосвязи, и вам не нужно тратить время на дорогу.' },
  { q: 'Можно ли прийти без чёткого запроса?', a: 'Да. Иногда сложно сформулировать, что именно беспокоит. Психолог поможет прояснить запрос вместе с вами на первой встрече.' },
  { q: 'Конфиденциальна ли консультация?', a: 'Да. Всё, что обсуждается на встрече, остаётся между вами и психологом. Данные заявки не передаются третьим лицам.' },
  { q: 'Сколько встреч может понадобиться?', a: 'Это индивидуально и зависит от запроса. Иногда достаточно нескольких встреч, иногда работа занимает больше времени. Обещаний быстрого результата здесь нет.' },
  { q: 'Когда лучше обратиться к психиатру?', a: 'Если есть острое состояние, нужна медицинская диагностика или назначение лекарств — это зона работы врача-психиатра. В таких случаях онлайн консультация психолога не заменяет медицинскую помощь.' },
  { q: 'Как записаться?', a: 'Оставьте заявку через форму на сайте. Мы свяжемся с вами удобным способом и согласуем время первой встречи.' },
];

const Index = () => {
  const scrollToForm = () => {
    document.getElementById('zayavka')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Хлебные крошки */}
      <nav className="container pt-6 text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <ol className="flex items-center gap-2">
          <li>Главная</li>
          <li><Icon name="ChevronRight" size={14} /></li>
          <li className="text-foreground">Психолог онлайн для взрослых из Самары</li>
        </ol>
      </nav>

      {/* 1. Первый экран */}
      <header className="container pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground mb-6">
              <Icon name="Video" size={15} /> Онлайн консультации
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-6">
              Психолог онлайн для взрослых из&nbsp;Самары
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Онлайн консультации для взрослых при тревоге, выгорании, трудностях в отношениях,
              самооценке или личном кризисе. Встречи по видеосвязи, время с учётом Самары.
            </p>
            <Button size="lg" onClick={scrollToForm} className="text-base px-8 py-6 rounded-full">
              Записаться на консультацию
              <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
          </div>
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 bg-accent/40 rounded-[2.5rem] -rotate-3" />
            <img
              src={PSYCHOLOGIST_PHOTO}
              alt="Психолог для онлайн консультаций"
              className="relative rounded-[2rem] w-full object-cover aspect-[4/5] shadow-xl"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facts.map((f) => (
            <div key={f.text} className="flex flex-col items-center text-center gap-2 rounded-2xl bg-card border border-border p-5">
              <Icon name={f.icon} size={22} className="text-primary" />
              <span className="text-sm font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </header>

      {/* 2. Когда стоит обратиться */}
      <section className="container py-16 md:py-24">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">Когда стоит обратиться</h2>
          <p className="text-muted-foreground text-lg">
            Запросы, с которыми взрослые приходят на онлайн консультацию. Если узнаёте себя в чём-то — это уже повод поговорить.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {requests.map((r) => (
            <div key={r.title} className="rounded-3xl bg-card border border-border p-7 transition-shadow hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-5">
                <Icon name={r.icon} size={22} className="text-accent-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">{r.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Почему онлайн удобно */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Почему онлайн удобно жителям Самары</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Онлайн формат помогает выбрать психолога не по району города, а по специализации,
              подходу и ощущению доверия. Не нужно ехать в кабинет и тратить время на дорогу —
              достаточно выбрать спокойное место, где вам комфортно говорить.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: 'MapPinned', text: 'Выбор специалиста по подходу, а не по району' },
              { icon: 'Clock4', text: 'Без дороги и пробок — экономия времени' },
              { icon: 'Sofa', text: 'Разговор из своего спокойного места' },
            ].map((i) => (
              <div key={i.text} className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5">
                <Icon name={i.icon} size={24} className="text-primary shrink-0" />
                <span className="font-medium">{i.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Как выбрать психолога */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Как выбрать психолога в Самаре</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Для онлайн консультации район города не главное. Гораздо важнее обращать внимание на то,
            что действительно влияет на качество работы:
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Опыт и образование специалиста',
            'Подход, который вам близок',
            'Работа именно со взрослыми',
            'Понятная и заранее озвученная цена',
            'Конфиденциальность',
            'Без обещаний быстрого результата',
          ].map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-2xl bg-card border border-border p-5">
              <Icon name="Check" size={20} className="text-primary mt-0.5 shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Как проходит консультация */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Как проходит консультация</h2>
          <div className="grid md:grid-cols-5 gap-5">
            {steps.map((s) => (
              <div key={s.num} className="rounded-3xl bg-card border border-border p-6">
                <span className="font-display text-4xl font-semibold text-primary">{s.num}</span>
                <h3 className="font-display text-xl font-semibold mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Стоимость */}
      <section className="container py-16 md:py-24">
        <div className="rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Стоимость консультации психолога онлайн для жителей Самары
          </h2>
          <div className="font-display text-6xl md:text-7xl font-semibold my-6">2000 ₽</div>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Онлайн консультация 60 минут. В стоимость входит первая встреча, разбор запроса,
            бережная обратная связь и понимание дальнейшего формата работы.
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

      {/* 7. О психологе */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container grid md:grid-cols-[0.8fr_1fr] gap-12 items-start">
          <div className="relative">
            <div className="absolute -inset-3 bg-accent/40 rounded-[2rem] rotate-2" />
            <img
              src={PSYCHOLOGIST_PHOTO}
              alt="Фото психолога"
              className="relative rounded-[1.75rem] w-full object-cover aspect-[4/5] shadow-lg"
            />
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
                { label: 'Супервизия / повышение квалификации', value: 'Укажите регулярную супервизию и курсы' },
              ].map((row) => (
                <div key={row.label} className="border-b border-border pb-4">
                  <dt className="text-sm text-muted-foreground mb-1">{row.label}</dt>
                  <dd className="font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 8 + 9. Кому подойдёт / может не подойти */}
      <section className="container py-16 md:py-24 grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-card border border-border p-8 md:p-10">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6">
            <Icon name="CircleCheck" size={24} className="text-accent-foreground" />
          </div>
          <h2 className="font-display text-3xl font-semibold mb-6">Кому подойдёт онлайн формат</h2>
          <ul className="space-y-3">
            {suitable.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{t}</span>
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
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. Конфиденциальность и безопасность */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Конфиденциальность и безопасность</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Всё, что вы рассказываете на встрече, остаётся между вами и психологом. Данные из заявки
            не передаются третьим лицам и используются только для связи и согласования времени.
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

      {/* 11. FAQ */}
      <section className="container py-16 md:py-24">
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

      {/* 12. Финальная запись */}
      <section id="zayavka" className="bg-secondary/50 py-16 md:py-24">
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
                  <span>{f.text}</span>
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
            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </form>
        </div>
      </section>

      {/* Подвал */}
      <footer className="container py-10 border-t border-border">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-muted-foreground">
          <span>Онлайн консультации психолога для взрослых из Самары</span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Согласие на обработку данных</a>
            <a href="#" className="hover:text-foreground transition-colors">Правила оплаты и отмены</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
