import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c262b5c8-2f05-4e90-b193-79ae6fbc0834/files/9c73cba0-c7c5-400a-86ea-9e8cf227a2e3.jpg";
const ELDERLY_IMAGE = "https://cdn.poehali.dev/projects/c262b5c8-2f05-4e90-b193-79ae6fbc0834/files/c48ffe51-702d-44ce-a395-844e841fa168.jpg";
const YOUTH_IMAGE = "https://cdn.poehali.dev/projects/c262b5c8-2f05-4e90-b193-79ae6fbc0834/files/62864bfd-4f71-402b-9f44-d7053e48f929.jpg";

type Section = "home" | "elderly" | "youth" | "about";

const QA_DATA = [
  { id: 1, section: "elderly", q: "Как пользоваться смартфоном?", a: "Начните с основ: включение, звонки, сообщения. Наши волонтёры помогут на бесплатных занятиях по средам." },
  { id: 2, section: "elderly", q: "Как получить льготы онлайн?", a: "Через портал Госуслуг можно оформить любые льготы. Мы проведём вас через каждый шаг." },
  { id: 3, section: "elderly", q: "Куда обратиться за помощью?", a: "Позвоните на нашу горячую линию или приходите в центр каждый рабочий день с 9 до 18." },
  { id: 4, section: "elderly", q: "Как записаться к врачу онлайн?", a: "Через приложение ЕМИАС или Госуслуги. Мы поможем установить и настроить приложение." },
  { id: 5, section: "youth", q: "Как стать волонтёром?", a: "Оставьте заявку на нашем сайте или приходите в офис. Нужны активные люди от 14 лет!" },
  { id: 6, section: "youth", q: "Какие мероприятия проводятся?", a: "Еженедельные встречи, обучающие воркшопы, выезды на природу и культурные события." },
  { id: 7, section: "youth", q: "Можно ли получить справку волонтёра?", a: "Да, после 10 часов волонтёрской деятельности вы получите официальную справку." },
  { id: 8, section: "youth", q: "Как помочь пожилым людям?", a: "Присоединяйтесь к программе «Цифровой помощник» — обучайте старшее поколение работе с гаджетами." },
  { id: 9, section: "home", q: "Что такое проект Вместе?", a: "Это платформа для объединения людей разных поколений. Помогаем друг другу и строим добрые связи." },
  { id: 10, section: "home", q: "Как связаться с организацией?", a: "Напишите нам на почту или позвоните. Мы отвечаем в течение одного рабочего дня." },
  { id: 11, section: "about", q: "Когда основан проект?", a: "Проект основан в 2020 году группой неравнодушных людей, которые хотели сделать что-то доброе." },
  { id: 12, section: "about", q: "Сколько людей уже помогли?", a: "За эти годы более 5000 человек получили помощь, а 800 волонтёров приняли участие в проекте." },
];

const NAV_ITEMS = [
  { id: "home" as Section, label: "Главная" },
  { id: "elderly" as Section, label: "Пожилым" },
  { id: "youth" as Section, label: "Молодёжи" },
  { id: "about" as Section, label: "О проекте" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredQA = QA_DATA.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = searchQuery !== "" || item.section === activeSection;
    return matchesSearch && matchesSection;
  });

  const goTo = (section: Section) => {
    setActiveSection(section);
    setSearchQuery("");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "hsl(38, 30%, 97%)" }}>
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ background: "hsla(38, 30%, 97%, 0.92)", borderColor: "hsl(38, 25%, 87%)" }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => goTo("home")} className="flex items-center gap-2">
            <span className="text-2xl">🤝</span>
            <span className="font-caveat text-2xl font-semibold" style={{ color: "hsl(200, 55%, 45%)" }}>Вместе</span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`nav-link text-sm font-medium pb-1 transition-colors ${activeSection === item.id && searchQuery === "" ? "active" : ""}`}
                style={{ color: activeSection === item.id && searchQuery === "" ? "hsl(200, 55%, 45%)" : "hsl(25, 20%, 40%)" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2 rounded-lg" style={{ color: "hsl(25, 20%, 40%)" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t px-4 py-3 flex flex-col gap-1" style={{ borderColor: "hsl(38, 25%, 87%)", background: "hsl(38, 30%, 97%)" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="text-left py-2 px-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  background: activeSection === item.id ? "hsl(200, 45%, 88%)" : "transparent",
                  color: activeSection === item.id ? "hsl(200, 55%, 35%)" : "hsl(25, 20%, 35%)"
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* SEARCH */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "hsl(200, 55%, 55%)" }} />
          <input
            type="text"
            placeholder="Найти ответ на вопрос..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm border focus:outline-none transition-shadow"
            style={{
              background: "white",
              borderColor: "hsl(38, 25%, 85%)",
              color: "hsl(25, 20%, 20%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60" style={{ color: "hsl(25, 15%, 60%)" }}>
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* SEARCH RESULTS */}
      {searchQuery && (
        <div className="max-w-5xl mx-auto px-4 pt-4 pb-12">
          <p className="text-sm mb-4" style={{ color: "hsl(25, 15%, 55%)" }}>
            {filteredQA.length > 0 ? `Найдено: ${filteredQA.length}` : "Ничего не найдено — попробуйте другой запрос"}
          </p>
          <div className="grid gap-3">
            {filteredQA.map((item, idx) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 card-hover animate-slide-up" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", animationDelay: `${idx * 0.05}s`, opacity: 0, animationFillMode: "forwards" }}>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "hsl(200, 45%, 88%)", color: "hsl(200, 55%, 35%)" }}>?</span>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: "hsl(25, 20%, 20%)" }}>{item.q}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 45%)" }}>{item.a}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(38, 40%, 92%)", color: "hsl(25, 20%, 50%)" }}>
                      {NAV_ITEMS.find((n) => n.id === item.section)?.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN */}
      {!searchQuery && (
        <main className="max-w-5xl mx-auto px-4 pt-6 pb-16">

          {/* ── HOME ── */}
          {activeSection === "home" && (
            <div>
              <div className="rounded-3xl overflow-hidden mb-8 relative" style={{ background: "hsl(200, 55%, 55%)", minHeight: 300 }}>
                <div className="absolute inset-0">
                  <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-25" />
                </div>
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>Добро пожаловать</span>
                  <h1 className="font-caveat text-5xl md:text-6xl font-semibold text-white mb-3 animate-fade-in">Вместе — теплее 🌿</h1>
                  <p className="text-base md:text-lg max-w-xl animate-fade-in stagger-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                    Объединяем людей разных поколений. Помогаем, учимся и растём вместе.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-6 animate-fade-in stagger-3">
                    <button onClick={() => goTo("elderly")} className="px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all hover:scale-105" style={{ background: "white", color: "hsl(200, 55%, 40%)" }}>
                      Помощь пожилым
                    </button>
                    <button onClick={() => goTo("youth")} className="px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                      Стать волонтёром
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { emoji: "👴", value: "5 000+", label: "человек получили помощь" },
                  { emoji: "🙋", value: "800+", label: "активных волонтёров" },
                  { emoji: "📅", value: "4 года", label: "мы рядом" },
                  { emoji: "🏙️", value: "12", label: "районов охвата" },
                ].map((s, i) => (
                  <div key={i} className={`bg-white rounded-2xl p-5 text-center card-hover animate-slide-up stagger-${i + 1}`} style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)", animationFillMode: "forwards" }}>
                    <div className="text-3xl mb-2">{s.emoji}</div>
                    <div className="text-xl font-bold mb-1" style={{ color: "hsl(200, 55%, 45%)" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: "hsl(25, 15%, 55%)" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-3xl overflow-hidden card-hover cursor-pointer" onClick={() => goTo("elderly")}>
                  <div className="relative h-48">
                    <img src={ELDERLY_IMAGE} alt="Пожилым" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,35,50,0.72), transparent)" }} />
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="text-white font-semibold text-lg">Пожилым</p>
                      <p className="text-white text-sm opacity-80">Помощь, обучение, поддержка</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl overflow-hidden card-hover cursor-pointer" onClick={() => goTo("youth")}>
                  <div className="relative h-48">
                    <img src={YOUTH_IMAGE} alt="Молодёжи" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,35,50,0.72), transparent)" }} />
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="text-white font-semibold text-lg">Молодёжи</p>
                      <p className="text-white text-sm opacity-80">Волонтёрство и активизм</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ELDERLY ── */}
          {activeSection === "elderly" && (
            <div>
              <div className="flex items-center gap-3 mb-6 animate-fade-in">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "hsl(200, 45%, 88%)" }}>👴</div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: "hsl(25, 20%, 20%)" }}>Раздел для пожилых</h2>
                  <p className="text-sm" style={{ color: "hsl(25, 15%, 55%)" }}>Помощь и поддержка в любой ситуации</p>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden mb-6 animate-slide-up stagger-1" style={{ animationFillMode: "forwards" }}>
                <img src={ELDERLY_IMAGE} alt="Пожилым" className="w-full h-56 object-cover" />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { emoji: "📱", title: "Цифровая грамотность", desc: "Научим пользоваться смартфоном, интернетом и приложениями" },
                  { emoji: "🏥", title: "Запись к врачу", desc: "Поможем записаться онлайн и разобраться с документами" },
                  { emoji: "📋", title: "Льготы и выплаты", desc: "Оформим документы на льготы через Госуслуги" },
                ].map((card, i) => (
                  <div key={i} className={`bg-white rounded-2xl p-5 card-hover animate-slide-up stagger-${i + 2}`} style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)", animationFillMode: "forwards" }}>
                    <div className="text-3xl mb-3">{card.emoji}</div>
                    <h3 className="font-semibold mb-2" style={{ color: "hsl(25, 20%, 20%)" }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 50%)" }}>{card.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mb-4 text-lg" style={{ color: "hsl(25, 20%, 25%)" }}>Частые вопросы</h3>
              <div className="grid gap-3 mb-6">
                {filteredQA.map((item, idx) => (
                  <div key={item.id} className="bg-white rounded-2xl p-5 animate-slide-up" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)", animationDelay: `${idx * 0.08}s`, opacity: 0, animationFillMode: "forwards" }}>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "hsl(200, 45%, 88%)", color: "hsl(200, 55%, 35%)" }}>?</span>
                      <div>
                        <p className="font-medium mb-1" style={{ color: "hsl(25, 20%, 20%)" }}>{item.q}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 50%)" }}>{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-5" style={{ background: "hsl(200, 45%, 88%)" }}>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold" style={{ color: "hsl(200, 55%, 30%)" }}>Горячая линия</p>
                    <p className="text-sm" style={{ color: "hsl(200, 45%, 40%)" }}>Пн–Пт, 9:00–18:00 · Звонок бесплатный</p>
                  </div>
                  <button className="ml-auto px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105" style={{ background: "hsl(200, 55%, 55%)", color: "white" }}>
                    Позвонить
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── YOUTH ── */}
          {activeSection === "youth" && (
            <div>
              <div className="flex items-center gap-3 mb-6 animate-fade-in">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "hsl(38, 60%, 88%)" }}>🙋</div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: "hsl(25, 20%, 20%)" }}>Раздел для молодёжи</h2>
                  <p className="text-sm" style={{ color: "hsl(25, 15%, 55%)" }}>Волонтёрство, мероприятия, рост</p>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden mb-6 animate-slide-up stagger-1" style={{ animationFillMode: "forwards" }}>
                <img src={YOUTH_IMAGE} alt="Молодёжи" className="w-full h-56 object-cover" />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { emoji: "🤝", title: "Стать волонтёром", desc: "Помогайте пожилым, участвуйте в событиях, получайте опыт" },
                  { emoji: "🎓", title: "Обучение и рост", desc: "Воркшопы, тренинги и сертификаты волонтёра" },
                  { emoji: "🎉", title: "Мероприятия", desc: "Еженедельные встречи, выезды, культурные события" },
                ].map((card, i) => (
                  <div key={i} className={`bg-white rounded-2xl p-5 card-hover animate-slide-up stagger-${i + 2}`} style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)", animationFillMode: "forwards" }}>
                    <div className="text-3xl mb-3">{card.emoji}</div>
                    <h3 className="font-semibold mb-2" style={{ color: "hsl(25, 20%, 20%)" }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 50%)" }}>{card.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mb-4 text-lg" style={{ color: "hsl(25, 20%, 25%)" }}>Частые вопросы</h3>
              <div className="grid gap-3 mb-6">
                {filteredQA.map((item, idx) => (
                  <div key={item.id} className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "hsl(38, 60%, 88%)", color: "hsl(25, 50%, 40%)" }}>?</span>
                      <div>
                        <p className="font-medium mb-1" style={{ color: "hsl(25, 20%, 20%)" }}>{item.q}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 50%)" }}>{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, hsl(200, 55%, 55%), hsl(200, 60%, 42%))" }}>
                <p className="text-xl font-caveat font-semibold text-white mb-1">Хочешь помочь?</p>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>Присоединяйся к нашей команде уже сегодня</p>
                <button className="px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all hover:scale-105" style={{ background: "white", color: "hsl(200, 55%, 40%)" }}>
                  Оставить заявку
                </button>
              </div>
            </div>
          )}

          {/* ── ABOUT ── */}
          {activeSection === "about" && (
            <div>
              <div className="flex items-center gap-3 mb-6 animate-fade-in">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "hsl(38, 40%, 90%)" }}>🌿</div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: "hsl(25, 20%, 20%)" }}>О проекте</h2>
                  <p className="text-sm" style={{ color: "hsl(25, 15%, 55%)" }}>История, миссия и ценности</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 mb-5 animate-slide-up stagger-1" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)", animationFillMode: "forwards" }}>
                <h3 className="font-caveat text-3xl font-semibold mb-4" style={{ color: "hsl(200, 55%, 45%)" }}>Наша история</h3>
                <p className="leading-relaxed mb-3" style={{ color: "hsl(25, 15%, 40%)" }}>
                  Проект «Вместе» начался в 2020 году как небольшая инициатива нескольких друзей, которые хотели помочь пожилым соседям разобраться с цифровыми сервисами.
                </p>
                <p className="leading-relaxed" style={{ color: "hsl(25, 15%, 40%)" }}>
                  Сегодня мы — большая семья из сотен волонтёров, объединённых желанием делать добро и строить мосты между поколениями.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { emoji: "💛", title: "Доброта", desc: "Каждое действие совершается с заботой и теплом", bg: "hsl(45, 60%, 92%)" },
                  { emoji: "🤲", title: "Взаимопомощь", desc: "Мы помогаем друг другу без условий и ожиданий", bg: "hsl(200, 45%, 90%)" },
                  { emoji: "🌱", title: "Рост", desc: "Развиваемся сами и помогаем расти другим", bg: "hsl(130, 30%, 90%)" },
                ].map((v, i) => (
                  <div key={i} className={`rounded-2xl p-5 animate-slide-up stagger-${i + 2}`} style={{ background: v.bg, animationFillMode: "forwards" }}>
                    <div className="text-3xl mb-2">{v.emoji}</div>
                    <h3 className="font-semibold mb-1" style={{ color: "hsl(25, 20%, 20%)" }}>{v.title}</h3>
                    <p className="text-sm" style={{ color: "hsl(25, 15%, 50%)" }}>{v.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mb-4 text-lg" style={{ color: "hsl(25, 20%, 25%)" }}>Частые вопросы</h3>
              <div className="grid gap-3 mb-6">
                {filteredQA.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "hsl(38, 40%, 90%)", color: "hsl(25, 40%, 40%)" }}>?</span>
                      <div>
                        <p className="font-medium mb-1" style={{ color: "hsl(25, 20%, 20%)" }}>{item.q}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 50%)" }}>{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-5" style={{ background: "hsl(38, 40%, 92%)" }}>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-semibold" style={{ color: "hsl(25, 30%, 30%)" }}>Напишите нам</p>
                    <p className="text-sm" style={{ color: "hsl(25, 20%, 50%)" }}>Ответим в течение одного рабочего дня</p>
                  </div>
                  <button className="ml-auto px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105" style={{ background: "hsl(200, 55%, 55%)", color: "white" }}>
                    Написать
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: "hsl(38, 25%, 87%)" }}>
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤝</span>
            <span className="font-caveat text-lg font-semibold" style={{ color: "hsl(200, 55%, 45%)" }}>Вместе</span>
          </div>
          <p className="text-xs" style={{ color: "hsl(25, 15%, 60%)" }}>2020–2026 · Проект добровольцев</p>
          <div className="flex gap-4">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => goTo(item.id)} className="text-xs hover:opacity-60 transition-opacity" style={{ color: "hsl(25, 15%, 55%)" }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
