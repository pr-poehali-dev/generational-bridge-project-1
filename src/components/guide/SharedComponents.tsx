import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ChapterId } from "./types";

export function ChapterHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="font-mono text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: "hsl(200, 55%, 55%)" }}>Раздел {number}</span>
      <h1 className="font-caveat text-4xl font-semibold" style={{ color: "hsl(25, 20%, 18%)" }}>{title}</h1>
      <div className="w-12 h-1 rounded-full mt-3" style={{ background: "hsl(200, 55%, 55%)" }} />
    </div>
  );
}

export function InfoCard({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) {
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

export function StepCards({ steps }: { steps: { n: string; title: string; desc: string; tag: string }[] }) {
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

export function FaqItem({ q, a }: { q: string; a: string }) {
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

export function NavButtons({
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
