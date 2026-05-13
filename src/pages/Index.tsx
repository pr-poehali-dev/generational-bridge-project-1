import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  HERO_IMAGE, ELDERLY_IMAGE, YOUTH_IMAGE,
  ChapterId, CHAPTERS, QA_DATA, STEPS,
} from "@/components/guide/types";
import {
  ChapterHeader, InfoCard, StepCards, FaqItem, NavButtons,
} from "@/components/guide/SharedComponents";
import { TopBar, Sidebar } from "@/components/guide/Sidebar";

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

      <TopBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentChapter={currentChapter}
      />

      <div className="flex flex-1 max-w-6xl mx-auto w-full">

        <Sidebar
          activeChapter={activeChapter}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          goTo={goTo}
        />

        <main className="flex-1 min-w-0 px-5 md:px-10 py-8">

          {/* ── 00 INTRO ── */}
          {activeChapter === "intro" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="00" title="О методичке" />
              <div className="rounded-3xl overflow-hidden mb-8" style={{ height: 260 }}>
                <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 35%)" }}>
                Это практическое пособие о том, как социальная изоляция пожилых людей преодолевается через живое взаимодействие — с другими поколениями и с окружающим миром.
              </p>
              <InfoCard emoji="🎯" title="Зачем это пособие">
                Дать конкретное понимание проблемы и рабочие форматы для тех, кто хочет что-то изменить — для себя или рядом с собой.
              </InfoCard>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {[
                  { emoji: "👴", label: "Пожилым", desc: "Как найти общение и остаться активным участником жизни" },
                  { emoji: "🙋", label: "Молодым", desc: "Как выстроить настоящий контакт со старшим поколением" },
                  { emoji: "📋", label: "Организаторам", desc: "Принципы и форматы для тех, кто создаёт среду" },
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
                Социальная изоляция у пожилых людей — не редкость, а массовое явление. С выходом на пенсию, потерей близких или ухудшением здоровья человек нередко теряет привычный круг общения, ритм дня и ощущение нужности.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { stat: "40%", desc: "людей старше 60 лет чувствуют себя одинокими большую часть времени" },
                  { stat: "3×", desc: "выше риск депрессии при хронической социальной изоляции" },
                  { stat: "60%", desc: "пожилых испытывают трудности с базовыми цифровыми сервисами" },
                  { stat: "5–7 лет", desc: "на столько может сокращаться продолжительность жизни при сильном одиночестве" },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <p className="text-3xl font-bold mb-1" style={{ color: "hsl(200, 55%, 45%)" }}>{s.stat}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(25, 15%, 48%)" }}>{s.desc}</p>
                  </div>
                ))}
              </div>
              <InfoCard emoji="💡" title="Ключевое">
                Проблема не в возрасте — а в разрыве связей. Пока связи есть, человек активен. Как только они обрываются — начинается угасание. Восстановить связи можно в любом возрасте.
              </InfoCard>
              <div className="mt-6 rounded-2xl p-5" style={{ background: "hsl(38, 40%, 91%)" }}>
                <p className="font-semibold mb-3" style={{ color: "hsl(25, 20%, 25%)" }}>Что чаще всего разрушает связи:</p>
                <ul className="space-y-2">
                  {[
                    "Выход на пенсию — исчезает рабочий коллектив и ежедневный ритм",
                    "Цифровой разрыв — растущая часть жизни уходит в онлайн, куда нет доступа",
                    "Физические ограничения — выход из дома становится трудным или невозможным",
                    "Потеря близких — круг общения сужается, новых знакомств не появляется",
                  ].map((item, i) => (
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
              <ChapterHeader number="02" title="Принципы подхода" />
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                Межпоколенческое взаимодействие — это не шефство старших над младшими и не помощь молодых пожилым. Это горизонтальный контакт, в котором каждый участник одновременно и даёт, и получает.
              </p>
              <div className="rounded-3xl overflow-hidden mb-6" style={{ height: 220 }}>
                <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { emoji: "🔄", title: "Взаимность, а не помощь", desc: "Пожилые люди несут в себе опыт, терпение и особый взгляд на вещи. Молодые — энергию, знание новых технологий, иной темп. Обмен равноценный." },
                  { emoji: "🌐", title: "Шире, чем поколения", desc: "Изоляция возникает по разным причинам: переезд, болезнь, потеря работы. Подход работает для всех, кто оказался вне привычных связей — независимо от возраста." },
                  { emoji: "🏗️", title: "Постоянство важнее интенсивности", desc: "Редкие большие события не заменяют регулярного живого контакта. Один час в неделю в постоянной группе ценнее десяти часов раз в год." },
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
              <InfoCard emoji="📌" title="Важный принцип">
                Пожилой человек в этой модели — не получатель помощи, а полноценный участник. Это ключевое условие: только как участник, а не как «объект заботы», он действительно включается в жизнь.
              </InfoCard>
              <NavButtons prev="problem" next="elderly" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 03 ELDERLY ── */}
          {activeChapter === "elderly" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="03" title="Для пожилых людей" />
              <div className="rounded-3xl overflow-hidden mb-6" style={{ height: 220 }}>
                <img src={ELDERLY_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                Этот раздел — для тех, кто чувствует, что привычных контактов стало меньше и хочет это изменить. Здесь нет призывов и инструкций — только ориентиры.
              </p>
              <StepCards steps={[
                { n: "01", title: "Найдите подходящий формат", desc: "Клуб по интересам, прогулки, онлайн-общение — разные форматы подходят разным людям. Выберите то, что не требует усилий над собой.", tag: "Шаг 1" },
                { n: "02", title: "Сделайте пробный шаг", desc: "Первый раз — просто посмотреть. Ни к чему не обязывает. Если не понравилось — можно попробовать другой формат или другую группу.", tag: "Шаг 2" },
                { n: "03", title: "Войдите в ритм", desc: "Важна не активность, а регулярность. Даже один час в неделю в постоянном кругу людей даёт ощущение принадлежности и смысла.", tag: "Шаг 3" },
                { n: "04", title: "Делитесь тем, что умеете", desc: "Ваш опыт — это ресурс. Ремесло, история, знания — то, чего нет у молодых. Когда это начинает передаваться, появляется настоящий смысл участия.", tag: "Шаг 4" },
              ]} />
              <InfoCard emoji="💛" title="Стоит помнить">
                Одиночество не норма и не неизбежность. Оно возникает из-за обстоятельств, а не из-за характера или возраста. Изменить ситуацию можно — с небольших, конкретных шагов.
              </InfoCard>
              <NavButtons prev="concept" next="youth" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 04 YOUTH ── */}
          {activeChapter === "youth" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="04" title="Для молодых людей" />
              <div className="rounded-3xl overflow-hidden mb-6" style={{ height: 220 }}>
                <img src={YOUTH_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(25, 15%, 38%)" }}>
                Участие молодых в жизни старшего поколения — это не помощь «сверху вниз». Это отношения, которые обогащают обе стороны, если выстраиваются правильно.
              </p>
              <StepCards steps={[
                { n: "01", title: "Откажитесь от роли помощника", desc: "Человек, который «помогает», неосознанно ставит себя выше. Полезнее заходить в отношения как равный — с интересом, а не с миссией.", tag: "Установка" },
                { n: "02", title: "Начните с общего интереса", desc: "Найдите точку пересечения — кино, книги, история, природа, кулинария. Совместное дело убирает неловкость и создаёт поводы для разговора.", tag: "Контакт" },
                { n: "03", title: "Помогайте с технологиями без спешки", desc: "Если помогаете с телефоном или компьютером — один шаг за раз, без торопливости, без удивления. Атмосфера важнее скорости.", tag: "Навыки" },
                { n: "04", title: "Будьте стабильны", desc: "Для пожилого человека предсказуемость важна. Если договорились встречаться — встречайтесь. Регулярный контакт строит доверие.", tag: "Доверие" },
              ]} />
              <div className="rounded-2xl p-5 mt-4" style={{ background: "hsl(200, 45%, 88%)" }}>
                <p className="font-semibold mb-3" style={{ color: "hsl(200, 55%, 30%)" }}>Что даёт такое участие молодому человеку:</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Взгляд на жизнь в более широкой перспективе",
                    "Навык общения с людьми разных характеров",
                    "Опыт, который не даёт ни учёба, ни работа",
                    "Живые связи, которые остаются надолго",
                  ].map((item, i) => (
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
                Не существует универсального формата. Важно подбирать тот, который соответствует возможностям и желаниям конкретных людей.
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    emoji: "🏡", title: "Клубы по интересам",
                    desc: "Малые группы (6–12 человек) с постоянным составом, объединённые общей темой. Садоводство, история, кино, кулинария, рукоделие — что угодно, лишь бы был повод собираться регулярно. Смешанный возраст не обязателен, но желателен.",
                    details: ["Раз в неделю, 1–2 часа", "Очно или онлайн", "Постоянный состав = доверие"]
                  },
                  {
                    emoji: "📱", title: "Парные встречи",
                    desc: "Один молодой и один пожилой человек встречаются регулярно — для разговора, прогулки или обучения. Формат 1:1 даёт пространство для настоящего контакта, который теряется в группе.",
                    details: ["1–2 раза в неделю", "По месту или онлайн", "Без повестки — просто быть рядом"]
                  },
                  {
                    emoji: "🚶", title: "Совместные прогулки",
                    desc: "Один из самых простых и эффективных форматов. Движение снимает напряжение, общий маршрут создаёт общую тему разговора. Подходит людям, которым сложно просто «сидеть и общаться».",
                    details: ["По выходным или в будни", "Группы 4–8 человек", "Темп выбирается по самому медленному"]
                  },
                  {
                    emoji: "💻", title: "Онлайн-форматы",
                    desc: "Групповые чаты, видеозвонки, совместный просмотр и обсуждение. Работает для тех, кто не может или не хочет выходить из дома. Важно: онлайн дополняет, но не заменяет очный контакт.",
                    details: ["Ежедневные чаты — как поддержание связи", "Видеовстречи — как полноценный формат", "Минимальный барьер для входа"]
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
                Цифровой барьер — одна из главных причин изоляции. Не нужно осваивать всё сразу. Начните с того, что нужно прямо сейчас.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  {
                    icon: "Smartphone", title: "Смартфон: базовые функции",
                    steps: ["Звонки и видеозвонки близким", "Мессенджеры: WhatsApp, Telegram", "Фотографии и галерея", "Настройки громкости и размера шрифта"],
                    level: "Первый шаг", levelColor: "hsl(130, 35%, 88%)", levelText: "hsl(130, 45%, 30%)"
                  },
                  {
                    icon: "Globe", title: "Госуслуги",
                    steps: ["Регистрация — лично в МФЦ или онлайн", "Запись к врачу", "Оформление льгот и выплат", "Получение справок и документов"],
                    level: "Практично", levelColor: "hsl(200, 45%, 88%)", levelText: "hsl(200, 55%, 30%)"
                  },
                  {
                    icon: "Video", title: "Видеосвязь",
                    steps: ["Zoom — установка и первый звонок", "WhatsApp-видео — звонок прямо с телефона", "Как включить камеру и микрофон", "Групповые созвоны с несколькими людьми"],
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
              <InfoCard emoji="🙌" title="Про обучение">
                Осваивать технологии лучше всего в паре с тем, кто умеет объяснять без раздражения. Один шаг за раз, с повторением — так усваивается навык, а не просто информация.
              </InfoCard>
              <NavButtons prev="interaction" next="steps" onPrev={goTo} onNext={goTo} />
            </div>
          )}

          {/* ── 07 STEPS ── */}
          {activeChapter === "steps" && (
            <div className="max-w-2xl animate-fade-in">
              <ChapterHeader number="07" title="С чего начать" />
              <p className="text-base leading-relaxed mb-8" style={{ color: "hsl(25, 15%, 38%)" }}>
                Пять ориентиров — от понимания проблемы до первого реального шага. Необязательно двигаться строго по порядку.
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
              <InfoCard emoji="🌱" title="Главное">
                Любое изменение начинается с малого. Один разговор, одна встреча, один совместный шаг — уже достаточно для начала.
              </InfoCard>
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
