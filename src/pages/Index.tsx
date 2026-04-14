import { useEffect, useRef, useState } from "react";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0867fbb5-6410-406d-9503-bdbaea829312/files/47f0d23c-e18b-4265-a2af-4db812b93ce2.jpg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`section-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function NeonLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-display tracking-widest uppercase neon-text mb-3 px-3 py-1 rounded-full" style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.25)" }}>
      {children}
    </span>
  );
}

function PosCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="card-glass rounded-2xl p-6 flex flex-col gap-3 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 group" style={{ borderColor: "rgba(0,200,255,0.12)" }}>
      <div className="text-3xl mb-1">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-white tracking-wide">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(180,210,230,0.7)" }}>{desc}</p>
    </div>
  );
}

function NegCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300" style={{ background: "rgba(255,60,80,0.06)", border: "1px solid rgba(255,60,80,0.15)" }}>
      <div className="text-3xl mb-1">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-white tracking-wide">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(180,210,230,0.7)" }}>{desc}</p>
    </div>
  );
}

function BarChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const timeData = [
    { label: "Менее 1 часа", value: 12, color: "#00c8ff" },
    { label: "1–2 часа", value: 35, color: "#00a8e8" },
    { label: "2–4 часа", value: 31, color: "#0078cc" },
    { label: "Более 4 часов", value: 22, color: "#ff4060" },
  ];

  const opinionData = [
    { label: "Скорее вредно", value: 38, color: "#ff4060" },
    { label: "Нейтрально", value: 29, color: "#888" },
    { label: "Скорее полезно", value: 33, color: "#00c8ff" },
  ];

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8">
      <div className="card-glass rounded-2xl p-6">
        <h3 className="font-display text-base font-semibold text-white mb-1 tracking-wide">Сколько времени подростки проводят в играх</h3>
        <p className="text-xs mb-5" style={{ color: "rgba(180,210,230,0.5)" }}>опрос среди 120 учеников, % от общего числа</p>
        <div className="flex flex-col gap-4">
          {timeData.map((d) => (
            <div key={d.label}>
              <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(180,210,230,0.7)" }}>
                <span>{d.label}</span>
                <span className="font-semibold" style={{ color: d.color }}>{d.value}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div
                  className="h-full rounded-full bar-fill"
                  style={{
                    width: animated ? `${d.value}%` : "0%",
                    background: `linear-gradient(90deg, ${d.color}, ${d.color}99)`,
                    boxShadow: `0 0 8px ${d.color}66`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-glass rounded-2xl p-6">
        <h3 className="font-display text-base font-semibold text-white mb-1 tracking-wide">Как подростки оценивают влияние игр</h3>
        <p className="text-xs mb-5" style={{ color: "rgba(180,210,230,0.5)" }}>субъективное восприятие пользы/вреда, %</p>
        <div className="flex flex-col gap-4">
          {opinionData.map((d) => (
            <div key={d.label}>
              <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(180,210,230,0.7)" }}>
                <span>{d.label}</span>
                <span className="font-semibold" style={{ color: d.color }}>{d.value}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div
                  className="h-full rounded-full bar-fill"
                  style={{
                    width: animated ? `${d.value}%` : "0%",
                    background: `linear-gradient(90deg, ${d.color}, ${d.color}99)`,
                    boxShadow: `0 0 8px ${d.color}66`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.12)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(180,210,230,0.65)" }}>
            Интересно: <span style={{ color: "#00c8ff" }}>33% подростков</span> считают игры скорее полезными — это выше, чем можно было бы ожидать. При этом только <span style={{ color: "#ff4060" }}>22%</span> играют более 4 часов в день.
          </p>
        </div>
      </div>
    </div>
  );
}

function DonutStat({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dash = animated ? circ * (value / 100) : 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg ref={ref} width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="48" cy="48" r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            strokeDashoffset={circ / 4}
            style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 6px ${color}88)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl font-bold" style={{ color }}>{value}%</span>
        </div>
      </div>
      <p className="text-xs text-center leading-tight max-w-[90px]" style={{ color: "rgba(180,210,230,0.65)" }}>{label}</p>
    </div>
  );
}

export default function Index() {
  const scrollToContent = () => {
    document.getElementById("relevance")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--deep-bg)", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4" style={{ background: "rgba(7,13,26,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,200,255,0.08)" }}>
        <span className="font-display text-sm tracking-widest uppercase neon-text">Исследование 2026</span>
        <div className="hidden md:flex gap-6 text-xs tracking-wide" style={{ color: "rgba(180,210,230,0.6)" }}>
          {[["Актуальность", "relevance"], ["Влияние", "influence"], ["Данные", "research"], ["Вывод", "conclusion"]].map(([label, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-cyan-400 transition-colors">{label}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden grid-bg">
        <div className="absolute inset-0 scanline" />
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="gaming" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(7,13,26,0.3) 0%, rgba(7,13,26,0.6) 60%, var(--deep-bg) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block text-xs font-display tracking-widest uppercase px-4 py-2 rounded-full" style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.3)", color: "#00c8ff" }}>
              🎮 Школьный исследовательский проект
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Влияние<br />
            <span className="neon-text">компьютерных игр</span><br />
            на жизнь человека
          </h1>

          <p className="text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(180,210,230,0.65)" }}>
            Исследовательский проект ученика 10.1 класса<br />
            <strong className="text-white">Калиненкова Кирилла</strong> · г. Челябинск · 2026
          </p>

          <button
            onClick={scrollToContent}
            className="group font-display tracking-widest uppercase text-sm px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00c8ff, #0078cc)", color: "#070d1a", fontWeight: 600, boxShadow: "0 0 30px rgba(0,200,255,0.35)" }}
          >
            Подробнее
            <span className="inline-block ml-2 group-hover:translate-y-1 transition-transform">↓</span>
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,200,255,0.4))" }} />
        </div>
      </section>

      {/* RELEVANCE */}
      <section id="relevance" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Section>
            <NeonLabel>01 · Актуальность</NeonLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">Почему это важно сегодня?</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { num: "3.2 млрд", label: "геймеров в мире по данным Newzoo 2024" },
                { num: "72%", label: "российских подростков играют ежедневно" },
                { num: "2.5 ч", label: "среднее время игры в день среди школьников" },
              ].map((s) => (
                <div key={s.num} className="card-glass rounded-2xl p-6 text-center">
                  <div className="font-display text-3xl font-bold neon-text mb-2">{s.num}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "rgba(180,210,230,0.6)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "rgba(180,210,230,0.75)" }}>
              Компьютерные игры стали неотъемлемой частью жизни современного подростка. Однако общество по-прежнему неоднозначно оценивает их влияние. Понять реальную картину — цель этого исследования.
            </p>
          </Section>
        </div>
      </section>

      {/* GOALS */}
      <section className="py-20 px-6" style={{ background: "rgba(0,200,255,0.03)", borderTop: "1px solid rgba(0,200,255,0.08)", borderBottom: "1px solid rgba(0,200,255,0.08)" }}>
        <div className="max-w-4xl mx-auto">
          <Section>
            <NeonLabel>02 · Цель и задачи</NeonLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8 tracking-wide">Что мы исследуем</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-glass rounded-2xl p-6" style={{ border: "1px solid rgba(0,200,255,0.25)" }}>
                <div className="neon-text font-display text-sm tracking-widest uppercase mb-3">Цель</div>
                <p className="text-white text-base leading-relaxed">
                  Исследовать и систематизировать влияние компьютерных игр на физическое, психологическое и социальное состояние человека
                </p>
              </div>
              <div className="card-glass rounded-2xl p-6">
                <div className="text-sm tracking-widest uppercase mb-3 font-display" style={{ color: "rgba(180,210,230,0.5)" }}>Задачи</div>
                <ul className="space-y-3">
                  {[
                    "Изучить положительное влияние игр",
                    "Выявить негативные последствия",
                    "Проанализировать научные исследования",
                    "Провести опрос среди сверстников",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(180,210,230,0.75)" }}>
                      <span className="neon-text font-display font-bold text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* POSITIVE */}
      <section id="influence" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <NeonLabel>03 · Положительное влияние</NeonLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 tracking-wide">Игры развивают</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <PosCard icon="⚡" title="Реакция и внимание" desc="Динамичные игры тренируют скорость обработки информации и концентрацию внимания" />
              <PosCard icon="🧠" title="Логика и стратегия" desc="Стратегические игры развивают планирование, аналитическое и критическое мышление" />
              <PosCard icon="🌐" title="Изучение языков" desc="Многие игры на английском языке — эффективный способ погружения в иностранную речь" />
              <PosCard icon="🤝" title="Командная работа" desc="Командные игры формируют навыки кооперации, лидерства и коммуникации" />
            </div>
          </Section>

          <Section delay={100} className="mt-10">
            <div className="grid sm:grid-cols-3 gap-5">
              <PosCard icon="🎨" title="Творчество" desc="Sandbox-игры стимулируют воображение и творческое мышление" />
              <PosCard icon="📍" title="Пространственное мышление" desc="3D-игры улучшают ориентацию в пространстве и визуализацию" />
              <PosCard icon="💪" title="Стрессоустойчивость" desc="Преодоление сложных уровней формирует настойчивость и устойчивость к неудачам" />
            </div>
          </Section>
        </div>
      </section>

      {/* NEGATIVE */}
      <section className="py-24 px-6" style={{ background: "rgba(255,40,60,0.03)", borderTop: "1px solid rgba(255,60,80,0.1)", borderBottom: "1px solid rgba(255,60,80,0.1)" }}>
        <div className="max-w-5xl mx-auto">
          <Section>
            <NeonLabel>04 · Негативное влияние</NeonLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 tracking-wide">Риски и последствия</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <NegCard icon="🎰" title="Игровая зависимость" desc="ВОЗ признала игровое расстройство болезнью. Симптомы: потеря контроля, приоритет игры над всем" />
              <NegCard icon="😴" title="Нарушение сна" desc="Синий свет экрана и перевозбуждение перед сном ухудшают качество и продолжительность сна" />
              <NegCard icon="🦴" title="Проблемы здоровья" desc="Сидячий образ жизни, ухудшение зрения, проблемы с осанкой и запястным каналом" />
              <NegCard icon="🚶" title="Снижение активности" desc="Игры могут вытеснять физические упражнения и живое общение из жизни подростка" />
            </div>
          </Section>
        </div>
      </section>

      {/* RESEARCH / CHARTS */}
      <section id="research" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <NeonLabel>05 · Исследование</NeonLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">Данные опроса</h2>
            <p className="text-sm mb-10" style={{ color: "rgba(180,210,230,0.55)" }}>Опрос проведён среди учеников 9–11 классов, 120 участников</p>
            <BarChart />
          </Section>

          <Section delay={150} className="mt-14">
            <div className="card-glass rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-white mb-6 tracking-wide">Ключевые показатели</h3>
              <div className="flex flex-wrap justify-around gap-10">
                <DonutStat value={67} label="играют каждый день" color="#00c8ff" />
                <DonutStat value={44} label="считают, что игры мешают учёбе" color="#ff9800" />
                <DonutStat value={28} label="чувствуют зависимость" color="#ff4060" />
                <DonutStat value={58} label="хотят играть меньше" color="#a78bfa" />
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* SCIENCE */}
      <section className="py-24 px-6" style={{ background: "rgba(0,200,255,0.03)", borderTop: "1px solid rgba(0,200,255,0.08)", borderBottom: "1px solid rgba(0,200,255,0.08)" }}>
        <div className="max-w-4xl mx-auto">
          <Section>
            <NeonLabel>06 · Научный взгляд</NeonLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8 tracking-wide">Что говорит наука?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Время решает всё", icon: "⏱️", text: "Исследования Оксфордского университета (2021): умеренное время в играх (до 1 ч/день) связано с более высоким уровнем благополучия у подростков" },
                { title: "Жанр имеет значение", icon: "🎯", text: "Образовательные и стратегические игры развивают когнитивные навыки. Агрессивные шутеры при длительном использовании повышают тревожность" },
                { title: "Возраст и мозг", icon: "🧬", text: "Мозг подростка до 18 лет особенно уязвим к формированию зависимостей из-за незрелости системы самоконтроля (префронтальная кора)" },
              ].map((c) => (
                <div key={c.title} className="card-glass rounded-2xl p-6">
                  <div className="text-2xl mb-3">{c.icon}</div>
                  <h3 className="font-display text-base font-bold text-white mb-3 tracking-wide">{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(180,210,230,0.65)" }}>{c.text}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Section>
            <NeonLabel>07 · Рекомендации</NeonLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 tracking-wide">Как играть правильно</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: "⏰", title: "Соблюдай лимит времени", text: "Оптимально — не более 1–2 часов в будни, до 3 часов на выходных" },
                { icon: "🔄", title: "Делай перерывы", text: "Каждые 45–60 минут — пауза на 10–15 минут, разминка для глаз и тела" },
                { icon: "🌅", title: "Не играй перед сном", text: "За 1.5–2 часа до сна завершай игровые сессии для нормального засыпания" },
                { icon: "📚", title: "Сначала учёба", text: "Игры — как награда после выполнения обязательных дел, а не вместо них" },
                { icon: "🏃", title: "Физическая активность", text: "Компенсируй сидячий образ жизни: спорт, прогулки, активный отдых" },
                { icon: "💬", title: "Живое общение", text: "Онлайн-дружба не заменяет реального общения. Поддерживай оба формата" },
              ].map((r) => (
                <div key={r.title} className="flex items-start gap-4 card-glass rounded-xl p-5">
                  <div className="text-2xl flex-shrink-0">{r.icon}</div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1 tracking-wide">{r.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(180,210,230,0.65)" }}>{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* CONCLUSION */}
      <section id="conclusion" className="py-24 px-6 relative overflow-hidden grid-bg">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,200,255,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <Section>
            <NeonLabel>08 · Вывод</NeonLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">Итог исследования</h2>
            <div className="card-glass rounded-2xl p-8 neon-border mb-8">
              <p className="text-base md:text-lg leading-relaxed text-white mb-4">
                Компьютерные игры — это <span className="neon-text font-semibold">не зло и не панацея</span>. Это инструмент, и, как любой инструмент, их эффект определяется тем, как их использовать.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(180,210,230,0.7)" }}>
                При разумном подходе игры развивают когнитивные способности, социальные навыки и даже профессиональные компетенции. При злоупотреблении — наносят реальный вред здоровью и успеваемости. Ключевой фактор — <span className="text-white font-medium">осознанность и самоконтроль</span>.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { emoji: "✅", text: "Умеренное время в играх безопасно и может быть полезным" },
                { emoji: "⚠️", text: "Важно следить за жанром, контентом и возрастными ограничениями" },
                { emoji: "🎯", text: "Баланс между играми и реальной жизнью — залог гармоничного развития" },
              ].map((c) => (
                <div key={c.emoji} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-2xl mb-2">{c.emoji}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(180,210,230,0.7)" }}>{c.text}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ background: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(0,200,255,0.1)" }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-display text-lg font-bold text-white mb-1 tracking-wide">Калиненков Кирилл</div>
            <div className="text-sm" style={{ color: "rgba(180,210,230,0.5)" }}>10.1 класс · г. Челябинск · 2026</div>
          </div>
          <div className="text-center">
            <div className="neon-text font-display text-sm tracking-widest uppercase mb-1">Исследовательский проект</div>
            <div className="text-xs" style={{ color: "rgba(180,210,230,0.4)" }}>Влияние компьютерных игр на жизнь человека</div>
          </div>
          <div className="text-xs text-center" style={{ color: "rgba(180,210,230,0.35)" }}>
            Школьный проект<br />2025–2026 учебный год
          </div>
        </div>
      </footer>
    </div>
  );
}
