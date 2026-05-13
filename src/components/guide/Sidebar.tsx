import Icon from "@/components/ui/icon";
import { ChapterId, Chapter, CHAPTERS } from "./types";

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentChapter: Chapter;
}

export function TopBar({ sidebarOpen, setSidebarOpen, currentChapter }: TopBarProps) {
  return (
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
  );
}

interface SidebarProps {
  activeChapter: ChapterId;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  goTo: (id: ChapterId) => void;
}

export function Sidebar({ activeChapter, sidebarOpen, setSidebarOpen, goTo }: SidebarProps) {
  return (
    <>
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

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  );
}
