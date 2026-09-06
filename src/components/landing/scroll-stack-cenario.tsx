import { useEffect, useRef, useState } from "react";
import { TrendingUp, Scale, Users, EyeOff, Target } from "lucide-react";

type BaseSlide = {
  id: string;
  descricao: string;
  icone: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  destaque: boolean;
};

type IntroSlide = BaseSlide & {
  eyebrow: string;
  titulo: string;
};

type DataSlide = BaseSlide & {
  rotulo: string;
  valor: number;
};

type Slide = IntroSlide | DataSlide;

const introSlide: IntroSlide = {
  id: "intro",
  eyebrow: "O cenário real",
  titulo: "Quase metade do país ainda não tem certeza do voto — e é aí que o jogo muda.",
  descricao:
    "Pesquisas eleitorais mostram que milhões de brasileiros chegam à reta final sem decisão tomada. Quem decide com base em dados — não em meme — não só vota melhor: influencia a família, o trabalho e o grupo de amigos.",
  icone: TrendingUp,
  destaque: false,
};

const dataSlides: DataSlide[] = [
  {
    id: "decididos",
    rotulo: "Já decidiram o voto",
    valor: 54,
    descricao:
      "Votam por hábito, família ou afinidade — muitas vezes sem checar dados. São a maioria, mas não definem eleições apertadas.",
    icone: Users,
    destaque: false,
  },
  {
    id: "desistiram",
    rotulo: "Indecisos que desistiram de entender",
    valor: 28,
    descricao:
      "Cansaram do ruído e votam no impulso, ou anulam. Esse grupo sente o estresse da polarização, mas ainda não encontrou uma fonte confiável.",
    icone: EyeOff,
    destaque: false,
  },
  {
    id: "certeza",
    rotulo: "Indecisos que buscam certeza factual",
    valor: 18,
    descricao:
      "Querem dados oficiais antes de decidir. É esse grupo — o seu — que realmente muda o jogo, porque decide com consciência e influencia todos ao redor.",
    icone: Target,
    destaque: true,
  },
];

const slides: Slide[] = [introSlide, ...dataSlides];

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) setInView(true);
    }, { threshold: 0.25, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

function BarraProgresso({
  valor,
  destaque,
  animar,
}: {
  valor: number;
  destaque: boolean;
  animar: boolean;
}) {
  return (
    <div
      className={`mt-4 h-5 w-full overflow-hidden rounded-full ${destaque ? "bg-gold/20" : "bg-border"}`}
      role="img"
      aria-label={`${valor} por cento`}
    >
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${destaque ? "bg-gold" : "bg-primary/50"}`}
        style={{ width: animar ? `${valor}%` : "0%" }}
      />
    </div>
  );
}

function CardIntro({ slide }: { slide: IntroSlide }) {
  const Icon = slide.icone;
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="flex min-h-full flex-col justify-center px-4 py-16 md:py-24"
    >
      <p className="eyebrow flex items-center gap-2">
        <Icon aria-hidden={true} className="size-4 text-gold" />
        {slide.eyebrow}
      </p>
      <h2 className="rule-gold mt-4 text-2xl font-bold md:text-4xl">
        {slide.titulo}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {slide.descricao}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {dataSlides.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-border bg-card/80 p-4 shadow-card backdrop-blur-sm"
          >
            <p className="font-display text-2xl font-extrabold md:text-3xl">
              {s.valor}%
            </p>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              {s.rotulo}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mt-10 h-2 w-full overflow-hidden rounded-full bg-border"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-gold"
          style={{ width: inView ? "100%" : "0%", transition: "width 1.2s ease-out" }}
        />
      </div>
    </div>
  );
}

function CardBarra({ slide }: { slide: DataSlide }) {
  const Icon = slide.icone;
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="flex min-h-full flex-col justify-center px-4 py-16 md:py-24"
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${slide.destaque ? "bg-gold text-gold-foreground" : "bg-secondary text-primary"}`}
        >
          <Icon aria-hidden={true} className="size-6" />
        </span>
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl font-bold md:text-2xl text-foreground">
              {slide.rotulo}
            </h3>
            <p
              className={`font-display text-3xl font-extrabold md:text-4xl ${slide.destaque ? "text-gold" : "text-muted-foreground"}`}
            >
              {slide.valor}%
            </p>
          </div>
          <BarraProgresso
            valor={slide.valor}
            destaque={slide.destaque}
            animar={inView}
          />
          <p
            className={`mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${slide.destaque ? "font-semibold text-foreground" : "text-muted-foreground"}`}
          >
            {slide.descricao}
          </p>
        </div>
      </div>
    </div>
  );
}

function CardConclusao() {
  return (
    <div className="flex min-h-full flex-col justify-center px-4 py-16 md:py-24">
      <div className="flex items-start gap-4 rounded-2xl border border-gold/30 bg-accent p-6 md:p-8">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-card shadow-card">
          <Scale aria-hidden="true" className="size-6 text-gold" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold md:text-2xl">
            A virada está nos 18%
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Quem busca fatos antes de votar é quem decide eleições apertadas — e é
            exatamente para esse grupo que este guia foi feito.
          </p>
        </div>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Percentuais ilustrativos baseados na faixa de indecisos apontada por
        institutos de pesquisa eleitoral (Datafolha, Ipec, Quaest) em ciclos
        presidenciais recentes.
      </p>
    </div>
  );
}

function isDataSlide(slide: Slide): slide is DataSlide {
  return "valor" in slide;
}

export function ScrollStackCenario() {
  return (
    <section
      className="relative bg-background"
      style={{ height: `${slides.length * 100 + 60}vh` }}
      aria-labelledby="cenario-title"
    >
      <h2 id="cenario-title" className="sr-only">
        O cenário real da indecisão eleitoral
      </h2>

      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="sticky top-0 h-screen w-full border-b border-border bg-background"
          style={{ zIndex: i + 1 }}
        >
          <div className="mx-auto h-full max-w-4xl">
            {isDataSlide(slide) ? (
              <CardBarra slide={slide} />
            ) : (
              <CardIntro slide={slide} />
            )}
          </div>
        </div>
      ))}

      <div
        className="sticky top-0 h-screen w-full border-b border-border bg-background"
        style={{ zIndex: slides.length + 1 }}
      >
        <div className="mx-auto h-full max-w-4xl">
          <CardConclusao />
        </div>
      </div>
    </section>
  );
}
