import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c262b5c8-2f05-4e90-b193-79ae6fbc0834/files/9c73cba0-c7c5-400a-86ea-9e8cf227a2e3.jpg";
const ELDERLY_IMAGE = "https://cdn.poehali.dev/projects/c262b5c8-2f05-4e90-b193-79ae6fbc0834/files/c48ffe51-702d-44ce-a395-844e841fa168.jpg";
const YOUTH_IMAGE = "https://cdn.poehali.dev/projects/c262b5c8-2f05-4e90-b193-79ae6fbc0834/files/62864bfd-4f71-402b-9f44-d7053e48f929.jpg";

type ChapterId = "intro" | "problem" | "concept" | "elderly" | "youth" | "interaction" | "tools" | "steps" | "faq";

interface Chapter {
  id: ChapterId;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
}

const CHAPTERS: Chapter[] = [
  { id: "intro",       number: "00", title: "О методичке",        subtitle: "Для кого и зачем",              icon: "BookOpen" },
  { id: "problem",     number: "01", title: "Проблема",           subtitle: "Одиночество и изоляция",        icon: "AlertCircle" },
  { id: "concept",     number: "02", title: "Концепция",          subtitle: "Что такое «Вместе»",            icon: "Layers" },
  { id: "elderly",     number: "03", title: "Пожилым",            subtitle: "Пути участия и адаптации",      icon: "Heart" },
  { id: "youth",       number: "04", title: "Молодёжи",           subtitle: "Как стать частью проекта",      icon: "Users" },
  { id: "interaction", number: "05", title: "Взаимодействие",     subtitle: "Форматы и практики",            icon: "ArrowLeftRight" },
  { id: "tools",       number: "06", title: "Инструменты",        subtitle: "Цифровые помощники",            icon: "Wrench" },
  { id: "steps",       number: "07", title: "С чего начать",      subtitle: "Пошаговый план",                icon: "ListChecks" },
  { id: "faq",         number: "08", title: "Вопросы и ответы",   subtitle: "Поиск по методичке",            icon: "MessageCircle" },
];

const QA_DATA = [
  { q: "Кому адресована методичка?", a: "Всем — пожилым людям, ищущим общение и поддержку, молодым волонтёрам, координаторам НКО и всем, кто хочет строить добрые связи между поколениями." },
  { q: "Нужен ли специальный опыт, чтобы участвовать?", a: "Нет. Достаточно желания помочь или принять помощь. Всем навыкам обучим в процессе." },
  { q: "Как пожилому человеку начать участие?", a: "Позвоните на горячую линию или попросите близких помочь оставить заявку. Наш координатор свяжется в течение дня." },
  { q: "Как молодому человеку стать волонтёром?", a: "Заполните анкету на сайте или придите на ближайшую встречу. Принимаем с 14 лет." },
  { q: "Какие форматы взаимодействия существуют?", a: "Очные встречи, онлайн-созвоны, совместные мастер-классы, прогулки, помощь с гаджетами, клубы по интересам." },
  { q: "Как часто проходят мероприятия?", a: "Еженедельно — встречи клубов. Раз в месяц — большое совместное событие. Онлайн-поддержка — ежедневно." },
  { q: "Что получает пожилой участник?", a: "Живое общение, новые навыки, помощь с цифровыми сервисами, чувство причастности и поддержку в трудную минуту." },
  { q: "Что получает волонтёр?", a: "Официальную справку, опыт, новых друзей разных поколений, сертификаты и благодарность, которая остаётся с человеком навсегда." },
];

const STEPS = [
  {
    number: "01",
    title: "Познакомьтесь с проектом",
    desc: "Прочитайте разделы «Проблема» и «Концепция» — они дают понимание, зачем всё это и как работает система.",
    tag: "Старт",
    color: "hsl(200, 45%, 88%)",
    textColor: "hsl(200, 55%, 30%)",
  },
  {
    number: "02",
    title: "Определите свою роль",
    desc: "Вы пожилой участник, молодой волонтёр или координатор? Прочитайте соответствующий раздел — там конкретные шаги именно для вас.",
    tag: "Роль",
    color: "hsl(38, 50%, 88%)",
    textColor: "hsl(30, 50%, 30%)",
  },
  {
    number: "03",
    title: "Выберите формат",
    desc: "Ознакомьтесь с разделом «Взаимодействие». Очные встречи, онлайн, клубы по интересам — выберите то, что подходит именно вам.",
    tag: "Формат",
    color: "hsl(130, 30%, 88%)",
    textColor: "hsl(130, 40%, 28%)",
  },
  {
    number: "04",
    title: "Освойте инструменты",
    desc: "Раздел «Инструменты» содержит краткие руководства по Госуслугам, видеозвонкам и приложениям — всё, что нужно для участия.",
    tag: "Навыки",
    color: "hsl(280, 30%, 90%)",
    textColor: "hsl(280, 40%, 30%)",
  },
  {
    number: "05",
    title: "Сделайте первый шаг",
    desc: "Позвоните или оставьте заявку. Координатор назначит первую встречу, познакомит с группой и ответит на все вопросы.",
    tag: "Действие",
    color: "hsl(200, 55%, 55%)",
    textColor: "white",
  },
];

export default function Index() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredQA = QA_DATA.filter(
    (item) =>
      searchQuery === "" ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentChapter = CHAPTERS.find((c) => c.id === activeChapter)!;

  const goTo = (id: ChapterId) => {
    setActiveChapter(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-golos flex flex-col" style={{ background: "hsl(38, 28%, 96%)" }}>

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 border-b flex items-center justify-between px-5 py-3" style={{ background: "hsla(38, 28%, 96%, 0.95)", backdropFilter: "blur(12px)", borderColor: "hsl(38, 22%, 86%)" }}>
        <div className="flex items-center gap-3">
          <button className="md:hidden p-1.5 rounded-lg" style={{ color: "hsl(25, 20%, 40%)" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Icon name={sidebarOpen ? "X" : "Menu"} size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">🤝</span>
            <div>
              <span className="font-caveat text-xl font-semibold leading-none" style={{ color: "hsl(200, 55%, 42%)" }}>Вместе</span>
              <p className="text-xs leading-none mt-0.5 hidden sm:block" style={{ color: "hsl(25, 15%, 58%)" }}>методическое пособие</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "hsl(200, 45%, 88%)", color: "hsl(200, 55%, 35%)" }}>
          <Icon name="BookOpen" size={13} />
          <span className="hidden sm:inline">Раздел </span>{currentChapter.number}
        </div>
      </header>

      <div className="flex flex-1 max-w-6xl mx-auto w-full">

        {/* ── SIDEBAR ── */}
        <aside
          className={`
            fixed md:sticky top-[53px] z-40 h-[calc(100vh-53px)] w-64 flex-shrink-0
            flex flex-col border-r overflow-y-auto transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
          style={{ background: "hsl(38, 24%, 94%)", borderColor: "hsl(38, 22%, 86%)" }}
        >
          <div className="p-4 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-2" style={{ color: "hsl(25, 15%, 60%)" }}>Содержание</p>
            <nav className="flex flex-col gap-0.5">
              {CHAPTERS.map((ch) => {
                const active = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => goTo(ch.id)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group"
                    style={{
                      background: active ? "hsl(200, 55%, 55%)" : "transparent",
                      color: active ? "white" : "hsl(25, 20%, 35%)",
                    }}
                  >
                    <span className="text-xs font-mono font-bold w-6 flex-shrink-0 opacity-60" style={{ color: active ? "rgba(255,255,255,0.7)" : "hsl(25, 15%, 55%)" }}>{ch.number}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-tight truncate">{ch.title}</p>
                      <p className="text-xs leading-tight mt-0.5 truncate" style={{ color: active ? "rgba(255,255,255,0.7)" : "hsl(25, 15%, 58%)" }}>{ch.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t" style={{ borderColor: "hsl(38, 22%, 86%)" }}>
            <p className="text-xs text-center" style={{ color: "hsl(25, 15%, 62%)" }}>2024 · Проект «Вместе»</p>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* ── CONTENT ── */}
        <main className="flex-1 min-w-0 px-5 md:px-10 py-8">

          {/* ── 00 INTRO ── */}
          {activeChapter === "intro" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="00" title="О методичке" />
              <div className="rounded-3xl overflow-hidden mb-8" style={{ height: 260 }}>
                <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 35%)" }}>
                Это методическое пособие создано для всех, кто хочет понять, как работает проект <strong>«Вместе»</strong> — и стать его частью.
              </p>
              <InfoCard emoji="🎯" title="Цель пособия">
                Дать чёткое, практичное руководство по социальной адаптации пожилых людей через межпоколенческое взаимодействие — без лишних слов, только по делу.
              </InfoCard>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {[
                  { emoji: "👴", label: "Пожилым", desc: "Найдёте своё место и поймёте, как начать" },
                  { emoji: "🙋", label: "Волонтёрам", desc: "Узнаете, как помогать эффективно и с душой" },
                  { emoji: "📋", label: "Координаторам", desc: "Получите рабочую базу для организации" },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl p-4 text-center" style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <div className="text-3xl mb-2">{c.emoji}</div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "hsl(25, 20%, 22%)" }}>{c.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "hsl(25, 15%, 55%)" }}>{c.desc}</p>
                  </div>
                ))}
              </div>
              <NavButtons next="problem" onNext={goTo} />
            </div>
          )}

          {/* ── 01 PROBLEM ── */}
          {activeChapter === "problem" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="01" title="Проблема" />
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                Социальная изоляция пожилых — один из серьёзнейших вызовов современного общества. С выходом на пенсию человек теряет привычный круг общения, ритм дня и ощущение нужности.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { stat: "40%", desc: "пенсионеров чувствуют себя одинокими большую часть времени" },
                  { stat: "3×", desc: "выше риск депрессии при социальной изоляции" },
                  { stat: "60%", desc: "пожилых испытывают трудности с цифровыми сервисами" },
                  { stat: "2 года", desc: "средний срок адаптации без внешней поддержки" },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <p className="text-3xl font-bold mb-1" style={{ color: "hsl(200, 55%, 45%)" }}>{s.stat}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 48%)" }}>{s.desc}</p>
                  </div>
                ))}
              </div>
              <InfoCard emoji="💡" title="Ключевой инсайт">
                Проблема не в возрасте — а в разрыве связей. Восстановить их можно. Именно для этого существует проект «Вместе».
              </InfoCard>
              <div className="mt-6 rounded-2xl p-5" style={{ background: "hsl(38, 40%, 91%)" }}>
                <p className="font-semibold mb-3" style={{ color: "hsl(25, 20%, 25%)" }}>Что разрушает связи:</p>
                <ul className="space-y-2">
                  {["Выход на пенсию — потеря рабочего коллектива", "Цифровой разрыв — неумение пользоваться новыми сервисами", "Физические ограничения — сложность выходить из дома", "Потеря близких — сужение круга общения"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "hsl(25, 15%, 40%)" }}>
                      <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "hsl(200, 55%, 55%)", color: "white" }}>{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <NavButtons prev="intro" next="concept" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 02 CONCEPT ── */}
          {activeChapter === "concept" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="02" title="Концепция «Вместе»" />
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                «Вместе» — это не просто волонтёрская программа. Это экосистема живых связей, где каждый участник одновременно и даёт, и получает.
              </p>
              <div className="rounded-3xl overflow-hidden mb-6" style={{ height: 220 }}>
                <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { emoji: "🔄", title: "Взаимность", desc: "Пожилые люди делятся опытом и мудростью — молодые приносят энергию и знание новых технологий. Обмен равноценный." },
                  { emoji: "🌐", title: "Не только межпоколенческое", desc: "Проект объединяет людей независимо от возраста — соседей, переехавших, людей после болезни, всех, кто оказался в изоляции." },
                  { emoji: "🏗️", title: "Системный подход", desc: "Это не разовые акции, а постоянно работающая инфраструктура встреч, обучения и поддержки." },
                ].map((v, i) => (
                  <div key={i} className="flex gap-4 rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <span className="text-2xl flex-shrink-0">{v.emoji}</span>
                    <div>
                      <p className="font-semibold mb-1" style={{ color: "hsl(25, 20%, 22%)" }}>{v.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 48%)" }}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <InfoCard emoji="📌" title="Миссия проекта">
                Создать среду, в которой пожилой человек перестаёт быть «получателем помощи» и становится полноценным участником социальной жизни.
              </InfoCard>
              <NavButtons prev="problem" next="elderly" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 03 ELDERLY ── */}
          {activeChapter === "elderly" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="03" title="Пожилым участникам" />
              <div className="rounded-3xl overflow-hidden mb-6" style={{ height: 220 }}>
                <img src={ELDERLY_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                Этот раздел — для вас. Здесь собрано всё, что нужно знать, чтобы найти своё место в проекте и почувствовать себя частью живого, тёплого сообщества.
              </p>
              <StepCards steps={[
                { n: "01", title: "Узнайте о форматах", desc: "Есть очные клубы, онлайн-встречи и помощь на дому. Выберите то, что вам удобно — никакого давления.", tag: "Шаг 1" },
                { n: "02", title: "Оставьте контакт", desc: "Позвоните по горячей линии или попросите близкого помочь оставить заявку. Координатор перезвонит в тот же день.", tag: "Шаг 2" },
                { n: "03", title: "Первая встреча", desc: "Вас познакомят с группой, расскажут о клубах по интересам. Ни к чему не обязывает — просто знакомство.", tag: "Шаг 3" },
                { n: "04", title: "Станьте наставником", desc: "Ваш опыт бесценен. Многие пожилые участники со временем сами помогают другим — делятся ремёслами, историями, знаниями.", tag: "Шаг 4" },
              ]} />
              <InfoCard emoji="💛" title="Важно знать">
                Участие полностью бесплатно. Мы приходим к вам домой, если выйти сложно. Всему обучаем с нуля — без спешки.
              </InfoCard>
              <NavButtons prev="concept" next="youth" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 04 YOUTH ── */}
          {activeChapter === "youth" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="04" title="Молодёжи и волонтёрам" />
              <div className="rounded-3xl overflow-hidden mb-6" style={{ height: 220 }}>
                <img src={YOUTH_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                Волонтёр в «Вместе» — это не «помощник», это полноценный участник. Вы строите настоящие связи, приобретаете уникальный опыт и меняете жизни — включая свою.
              </p>
              <StepCards steps={[
                { n: "01", title: "Заполните анкету", desc: "Расскажите о себе: интересы, свободное время, что умеете. Анкета займёт 5 минут — принимаем с 14 лет.", tag: "Шаг 1" },
                { n: "02", title: "Вводный тренинг", desc: "2-часовая встреча, где объясняем подход проекта, даём базовые навыки коммуникации с пожилыми людьми.", tag: "Шаг 2" },
                { n: "03", title: "Выберите направление", desc: "Цифровой помощник, клуб по интересам, домашние визиты, онлайн-общение — выберите формат под себя.", tag: "Шаг 3" },
                { n: "04", title: "Регулярное участие", desc: "1–2 часа в неделю. После 10 часов — официальная справка волонтёра, после 50 — сертификат проекта.", tag: "Шаг 4" },
              ]} />
              <div className="rounded-2xl p-5 mt-4" style={{ background: "hsl(200, 45%, 88%)" }}>
                <p className="font-semibold mb-3" style={{ color: "hsl(200, 55%, 30%)" }}>Что получает волонтёр:</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {["Официальная справка и сертификаты", "Тренинги и воркшопы бесплатно", "Рекомендательное письмо", "Живые связи с людьми разных поколений"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "hsl(200, 55%, 28%)" }}>
                      <Icon name="Check" size={14} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <NavButtons prev="elderly" next="interaction" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 05 INTERACTION ── */}
          {activeChapter === "interaction" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="05" title="Форматы взаимодействия" />
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                Проект предлагает разные форматы — для разных людей, возможностей и ритмов жизни. Ниже — подробный разбор каждого.
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    emoji: "🏡", title: "Клубы по интересам",
                    desc: "Регулярные встречи малых групп (8–12 человек) по общим темам: садоводство, история, кино, кулинария, рукоделие. Смешанный возраст — ключевой принцип.",
                    details: ["Раз в неделю, 1.5–2 часа", "Очно или онлайн", "Постоянный состав = доверие"]
                  },
                  {
                    emoji: "📱", title: "Цифровой помощник",
                    desc: "Молодой волонтёр обучает пожилого участника работе с гаджетами, приложениями, Госуслугами. Формат 1:1 — максимальная эффективность.",
                    details: ["2–4 сессии по 1 часу", "Дома или в центре", "Индивидуальная программа"]
                  },
                  {
                    emoji: "🚶", title: "Совместные прогулки",
                    desc: "Выходы в парки, музеи, на рынки. Простой формат, который снимает физическую изоляцию и создаёт поводы для разговора.",
                    details: ["По выходным", "Группы 4–8 человек", "Разный темп — всегда"]
                  },
                  {
                    emoji: "💻", title: "Онлайн-общение",
                    desc: "Группы в мессенджерах, видеоклубы, «утренние кофе» в Zoom. Для тех, кто не может выходить регулярно.",
                    details: ["Ежедневные чаты", "Еженедельные видеовстречи", "Никакого обязательного онлайна — только желание"]
                  },
                ].map((f, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{f.emoji}</span>
                      <div className="flex-1">
                        <p className="font-semibold mb-1" style={{ color: "hsl(25, 20%, 22%)" }}>{f.title}</p>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(25, 15%, 48%)" }}>{f.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {f.details.map((d, j) => (
                            <span key={j} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "hsl(200, 45%, 90%)", color: "hsl(200, 55%, 32%)" }}>{d}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <NavButtons prev="youth" next="tools" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 06 TOOLS ── */}
          {activeChapter === "tools" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="06" title="Цифровые инструменты" />
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                Не нужно знать всё сразу. Начните с одного инструмента — того, что нужен прямо сейчас. Всё остальное придёт со временем.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  {
                    icon: "Smartphone", title: "Смартфон: базовые функции",
                    steps: ["Звонки и видеозвонки близким", "Мессенджеры: WhatsApp, Telegram", "Фото и галерея", "Настройки громкости и шрифта"],
                    level: "Старт", levelColor: "hsl(130, 35%, 88%)", levelText: "hsl(130, 45%, 30%)"
                  },
                  {
                    icon: "Globe", title: "Госуслуги",
                    steps: ["Регистрация через МФЦ или онлайн", "Запись к врачу", "Оформление льгот и выплат", "Получение справок"],
                    level: "Важно", levelColor: "hsl(200, 45%, 88%)", levelText: "hsl(200, 55%, 30%)"
                  },
                  {
                    icon: "Video", title: "Видеосвязь",
                    steps: ["Zoom — установка и первый звонок", "WhatsApp-видео — звонок с телефона", "Как включить камеру и микрофон", "Групповые созвоны"],
                    level: "Общение", levelColor: "hsl(38, 50%, 88%)", levelText: "hsl(30, 50%, 30%)"
                  },
                ].map((t, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon name={t.icon} size={18} style={{ color: "hsl(200, 55%, 50%)" }} />
                        <p className="font-semibold" style={{ color: "hsl(25, 20%, 22%)" }}>{t.title}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: t.levelColor, color: t.levelText }}>{t.level}</span>
                    </div>
                    <ol className="space-y-1.5">
                      {t.steps.map((s, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "hsl(25, 15%, 45%)" }}>
                          <span className="flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: "hsl(200, 45%, 90%)", color: "hsl(200, 55%, 35%)" }}>{j + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
              <InfoCard emoji="🙌" title="Помните">
                Нет «глупых» вопросов. Цифровой помощник проекта поможет разобраться с любым шагом — столько раз, сколько нужно.
              </InfoCard>
              <NavButtons prev="interaction" next="steps" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 07 STEPS ── */}
          {activeChapter === "steps" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="07" title="С чего начать" />
              <p className="text-base leading-relaxed mb-8" style={{ color: "hsl(25, 15%, 38%)" }}>
                Пять конкретных шагов, которые проведут вас от «интересно, но не знаю как» до полноценного участия в проекте.
              </p>
              <div className="space-y-4 mb-8">
                {STEPS.map((step, i) => (
                  <div key={i} className="rounded-2xl p-6 flex gap-5 items-start" style={{ background: step.color, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                    <div className="flex-shrink-0">
                      <span className="font-mono text-3xl font-black" style={{ color: step.textColor, opacity: 0.35 }}>{step.number}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-base" style={{ color: step.textColor }}>{step.title}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.4)", color: step.textColor }}>{step.tag}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: step.textColor, opacity: 0.82 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-5 text-center" style={{ background: "hsl(200, 55%, 55%)" }}>
                <p className="font-caveat text-2xl text-white mb-1">Готовы начать?</p>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>Свяжитесь с нами — первый шаг самый важный</p>
                <div className="flex gap-3 justify-center">
                  <button className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105" style={{ background: "white", color: "hsl(200, 55%, 40%)" }}>Позвонить</button>
                  <button className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.4)" }}>Написать</button>
                </div>
              </div>
              <NavButtons prev="tools" next="faq" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 08 FAQ ── */}
          {activeChapter === "faq" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="08" title="Вопросы и ответы" />
              <div className="relative mb-6">
                <Icon name="Search" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "hsl(200, 55%, 55%)" }} />
                <input
                  type="text"
                  placeholder="Найти вопрос..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm border focus:outline-none transition-shadow"
                  style={{ background: "white", borderColor: "hsl(38, 22%, 84%)", color: "hsl(25, 20%, 20%)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity" style={{ color: "hsl(25, 15%, 60%)" }}>
                    <Icon name="X" size={15} />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-sm mb-4" style={{ color: "hsl(25, 15%, 55%)" }}>
                  {filteredQA.length > 0 ? `Найдено: ${filteredQA.length}` : "Ничего не найдено"}
                </p>
              )}
              <div className="space-y-3">
                {filteredQA.map((item, i) => (
                  <FaqItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
              <NavButtons prev="steps" onPrev={goTo} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

/* ── SHARED COMPONENTS ── */

function ChapterHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="font-mono text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "hsl(200, 55%, 55%)" }}>Раздел {number}</span>
      <h1 className="font-caveat text-4xl font-semibold" style={{ color: "hsl(25, 20%, 18%)" }}>{title}</h1>
      <div className="w-12 h-1 rounded-full mt-3" style={{ background: "hsl(200, 55%, 55%)" }} />
    </div>
  );
}

function InfoCard({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 flex gap-3" style={{ background: "hsl(200, 45%, 90%)" }}>
      <span className="text-xl flex-shrink-0">{emoji}</span>
      <div>
        <p className="font-semibold mb-1" style={{ color: "hsl(200, 55%, 28%)" }}>{title}</p>
        <p className="text-sm leading-relaxed" style={{ color: "hsl(200, 45%, 35%)" }}>{children}</p>
      </div>
    </div>
  );
}

function StepCards({ steps }: { steps: { n: string; title: string; desc: string; tag: string }[] }) {
  return (
    <div className="space-y-3 mb-6">
      {steps.map((s, i) => (
        <div key={i} className="rounded-2xl p-5 flex gap-4" style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm" style={{ background: "hsl(200, 45%, 90%)", color: "hsl(200, 55%, 40%)" }}>{s.n}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold" style={{ color: "hsl(25, 20%, 22%)" }}>{s.title}</p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(38, 45%, 90%)", color: "hsl(30, 40%, 40%)" }}>{s.tag}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 48%)" }}>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <button className="w-full flex items-start gap-3 p-5 text-left" onClick={() => setOpen(!open)}>
        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: "hsl(200, 45%, 88%)", color: "hsl(200, 55%, 35%)" }}>?</span>
        <p className="flex-1 font-medium text-sm" style={{ color: "hsl(25, 20%, 22%)" }}>{q}</p>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} style={{ color: "hsl(25, 15%, 55%)", flexShrink: 0, marginTop: 2 }} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-sm leading-relaxed pl-9" style={{ color: "hsl(25, 15%, 48%)" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

function NavButtons({
  prev, next, onPrev, onNext
}: {
  prev?: ChapterId; next?: ChapterId;
  onPrev?: (id: ChapterId) => void;
  onNext?: (id: ChapterId) => void;
}) {
  return (
    <div className="flex justify-between mt-10 pt-6 border-t" style={{ borderColor: "hsl(38, 22%, 86%)" }}>
      {prev && onPrev ? (
        <button onClick={() => onPrev(prev)} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all hover:scale-105" style={{ background: "hsl(38, 40%, 91%)", color: "hsl(25, 20%, 35%)" }}>
          <Icon name="ChevronLeft" size={16} /> Назад
        </button>
      ) : <div />}
      {next && onNext ? (
        <button onClick={() => onNext(next)} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all hover:scale-105" style={{ background: "hsl(200, 55%, 55%)", color: "white" }}>
          Далее <Icon name="ChevronRight" size={16} />
        </button>
      ) : <div />}
    </div>
  );
}