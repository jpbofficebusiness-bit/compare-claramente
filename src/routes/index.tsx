import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  EyeOff,
  FileCheck2,
  Instagram,
  Lock,
  Mail,
  MessageCircle,
  Minus,
  MoveHorizontal,
  PlayCircle,
  Plus,
  Scale,
  ShieldCheck,
  Star,
  Timer,
  TrendingUp,
} from "lucide-react";
import cover from "@/assets/ebook-cover-new.jpg.asset.json";
import coverCutout from "@/assets/ebook-cover-cutout.png";
import avatarCarlos from "@/assets/avatars/carlos.jpg";
import avatarMariana from "@/assets/avatars/mariana.jpg";
import avatarRoberto from "@/assets/avatars/roberto.jpg";
import avatarFernanda from "@/assets/avatars/fernanda.jpg";
import avatarJoao from "@/assets/avatars/joao.jpg";
import avatarAline from "@/assets/avatars/aline.jpg";
import { CtaLink } from "@/components/landing/cta-button";
import { track } from "@/lib/analytics";
import { SocialProofNotification } from "@/components/SocialProofNotification";

/* ---------------------------------------------------------------------------
 * Campos editáveis da oferta. Substitua os placeholders pelos dados reais.
 * Os depoimentos da seção "Prova social" são placeholders de copy fornecidos
 * pelo autor — substitua por relatos reais antes de publicar.
 * ------------------------------------------------------------------------- */
const OFERTA = {
  checkout: "https://checkout.wiven.com.br/checkout/cmtgb8nt70sl901ptq2trevnk?offer=DISP4A2",
  contato: "[E-MAIL DE CONTATO]",
};

const SEO_TITLE = "Lula x Bolsonaro — O Que Cada Um Fez | Guia Comparativo";
const SEO_DESC =
  "O guia comparativo que coloca lado a lado o que Lula e Bolsonaro realmente fizeram, fundamentado estritamente em dados oficiais do IBGE, STF, TSE, INPE e Tesouro Nacional.";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESC },
      { property: "og:title", content: SEO_TITLE },
      { property: "og:description", content: SEO_DESC },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          name: "Lula x Bolsonaro — O Que Cada Um Fez: Guia Comparativo para Decidir com Consciência",
          bookFormat: "https://schema.org/EBook",
          inLanguage: "pt-BR",
          description: SEO_DESC,
        }),
      },
    ],
  }),
});

/* --------------------------- sistema de layout ---------------------------
 * Largura máxima única (72rem), padding lateral 20/24/32px, grid de 12
 * colunas nas seções de duas colunas, raio 0.75rem (var --radius) e sombras
 * apenas em superfícies elevadas (cartões e a oferta).
 * ----------------------------------------------------------------------- */
const SHELL = "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8";
const NARROW = "mx-auto w-full max-w-2xl";

/* --------------------------------- dados --------------------------------- */

const passos = [
  {
    n: "1",
    t: "O Fato Bruto",
    d: "O dado econômico ou social isolado, das fontes oficiais.",
  },
  {
    n: "2",
    t: "A Decisão Governamental",
    d: "Qual lei, decreto ou medida foi assinada.",
  },
  {
    n: "3",
    t: "A Capacidade de Influência",
    d: "O presidente controlava o número ou dependeu de crise global/Congresso?",
  },
  {
    n: "4",
    t: "O Efeito Prático",
    d: "Como a decisão impactou a rotina da população.",
  },
];

const dores = [
  "Quantas vezes você preferiu se calar em um debate pelo receio de citar um dado incorreto, ser corrigido publicamente e passar vergonha?",
  "Qual é o custo emocional de deixar que discussões geradas por boatos desgastem as suas relações familiares mais importantes?",
  "Quantas horas do seu dia você já perdeu garimpando matérias soltas, apenas para desistir no meio do caminho, mais confuso e exausto?",
];

const comparativo = [
  ["Origem", "Memes emocionais", "Horas de garimpo", "Dados Oficiais Verificados"],
  ["Isenção", "Viés ideológico", "Filtrado pela bolha", "Separação Rígida de Fatos"],
  ["Tempo", "Gera ansiedade", "Exaustivo", "Leitura direta e organizada"],
];

const faq = [
  {
    q: "O guia é realmente neutro?",
    a: "Sim. O guia não emite julgamento de valor. Nós separamos os dados em camadas para que você julgue.",
  },
  {
    q: "Política me estressa. Vale a pena ler?",
    a: "O que estressa é o ruído e as fake news. Ter segurança factual traz paz mental.",
  },
];

const stats = [
  { valor: "5", rotulo: "fontes oficiais linkadas" },
  { valor: "4", rotulo: "camadas de triagem" },
  { valor: "0", rotulo: "opiniões prontas" },
];

const confianca = [
  { icon: ShieldCheck, texto: "Fontes Oficiais Verificáveis" },
  { icon: EyeOff, texto: "Zero Especulação Ideológica" },
  { icon: Scale, texto: "Sem Indicação de Voto" },
];

const navLinks = [
  { href: "#metodo", label: "Método" },
  { href: "#cenario", label: "O cenário real" },
  { href: "#provas", label: "Depoimentos" },
  { href: "#perguntas", label: "Perguntas frequentes" },
];

const depoimentos = [
  {
    texto:
      "A intervenção foi imediata: a Matriz de Comparação me permitiu olhar os números da economia de cada governo lado a lado. O resultado é que hoje consigo participar de qualquer conversa de forma calma e equilibrada.",
    nome: "Carlos M.",
    papel: "Engenheiro",
    foto: avatarCarlos,
    rede: { icon: MessageCircle, nome: "WhatsApp", cor: "text-[#25D366]" },
  },
  {
    texto:
      "Eu tinha pavor de compartilhar dados no trabalho e ser corrigida. Usei o método de triagem. O resultado é que agora debato com segurança intelectual inabalável; eu apenas mostro o link oficial do STF no PDF.",
    nome: "Mariana S.",
    papel: "Advogada",
    foto: avatarMariana,
    rede: { icon: Instagram, nome: "Instagram", cor: "text-[#E1306C]" },
  },
  {
    texto:
      "Finalmente entendi a diferença entre investigação, denúncia e condenação. Parei de repetir o que ouço por aí e comecei a explicar para a minha família com calma.",
    nome: "Roberto T.",
    papel: "Professor de História",
    foto: avatarRoberto,
    rede: { icon: Mail, nome: "Gmail", cor: "text-[#EA4335]" },
  },
  {
    texto:
      "O Glossário Jurídico Descomplicado vale o investimento sozinho. Consegui ler os jornais com outro nível de compreensão e parei de me sentir perdido nos debates.",
    nome: "Fernanda L.",
    papel: "Contadora",
    foto: avatarFernanda,
    rede: { icon: MessageCircle, nome: "WhatsApp", cor: "text-[#25D366]" },
  },
  {
    texto:
      "Minha mesa de bar virou um espaço de conversa, não de briga. Tenho dados oficiais na ponta da língua e isso muda completamente o tom da discussão.",
    nome: "João P.",
    papel: "Empresário",
    foto: avatarJoao,
    rede: { icon: Instagram, nome: "Instagram", cor: "text-[#E1306C]" },
  },
  {
    texto:
      "Sempre achei que política fosse só opinião. O guia me mostrou que dá para comparar fatos de forma organizada. Hoje me sinto muito mais segura para votar.",
    nome: "Aline R.",
    papel: "Estudante de Direito",
    foto: avatarAline,
    rede: { icon: Mail, nome: "Gmail", cor: "text-[#EA4335]" },
  },
];

const barras = [
  {
    rotulo: "Já decidiram o voto",
    valor: 54,
    descricao: "Votam por hábito, família ou afinidade — muitas vezes sem checar dados.",
    destaque: false,
  },
  {
    rotulo: "Indecisos que desistiram de entender",
    valor: 28,
    descricao: "Cansaram do ruído e votam no impulso, ou anulam.",
    destaque: false,
  },
  {
    rotulo: "Indecisos que buscam certeza factual",
    valor: 18,
    descricao:
      "Querem dados oficiais antes de decidir. É esse grupo — o seu — que realmente muda o jogo, porque decide com consciência e influencia todos ao redor.",
    destaque: true,
  },
];

/* ------------------------------- componentes ------------------------------ */

function LandingPage() {
  useEffect(() => {
    track("view_landing_page", { page: "ebook_lula_x_bolsonaro" });
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BarraEscassez />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FaixaConfianca />
        <Identificacao />
        <Implicacoes />
        <Mecanismo />
        <GraficoIndecisos />
        <TabelaComparativa />
        <ProvaSocial />
        <Oferta />
        <Perguntas />
        <CtaFinal />
      </main>
      <Footer />
      <MobileBar />
      <SocialProofNotification />
    </div>
  );
}

/* Barra de escassez — topo */
function BarraEscassez() {
  const [restam, setRestam] = useState(2 * 60 * 60);

  useEffect(() => {
    const id = setInterval(() => {
      setRestam((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(restam / 3600);
  const m = Math.floor((restam % 3600) / 60);
  const s = restam % 60;
  const tempo = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  return (
    <div className="bg-primary text-primary-foreground">
      <div
        className={`${SHELL} flex flex-col items-center justify-center gap-2 py-3 text-center sm:flex-row sm:gap-4 sm:py-2.5`}
      >
        <p className="flex items-center gap-2 text-sm font-semibold sm:text-base">
          <Timer aria-hidden="true" className="size-4 text-gold" />
          Oferta especial acaba em 2 horas
        </p>
        <span
          className="rounded-md bg-gold px-3 py-1 font-mono text-sm font-bold text-gold-foreground tabular-nums"
          aria-live="polite"
        >
          {tempo}
        </span>
      </div>
    </div>
  );
}

/* Topo fixo: navegação e CTA persistente */
function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className={`${SHELL} flex h-16 items-center gap-6`}>
        <a
          href="#hero-title"
          className="flex min-w-0 items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <span className="size-2.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
          <span className="truncate font-display text-sm font-extrabold tracking-tight">
            Sua Blindagem Eleitoral Antimanipulação
          </span>
        </a>
        <nav aria-label="Seções da página" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden lg:ml-0 sm:block">
          <CtaLink href="#oferta" tone="gold" size="sm" location="header">
            QUERO ACESSAR O GUIA
          </CtaLink>
        </div>
      </div>
    </header>
  );
}

/* Abertura — a promessa */
function Hero() {
  return (
    <section className="scroll-mt-20 border-b border-border bg-secondary" aria-labelledby="hero-title">
      <div className={`${SHELL} flex flex-col items-center py-14 text-center md:py-20 lg:py-24`}>
        <span className="pill-badge">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          Guia comparativo: Sua Blindagem Eleitoral Antimanipulação
        </span>
        <h1
          id="hero-title"
          className="mt-6 max-w-4xl text-[1.75rem] leading-[1.15] font-extrabold sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        >
          Chega de discutir política com base em Instagram, notícias que você não sabe a procedência
          e grupos aleatórios.{" "}
          <span className="text-gold">Compare o que cada um realmente fez.</span>
        </h1>

        <figure className="mt-8 w-full py-6 md:mt-10 md:py-10">
          <div className="relative mx-auto w-full max-w-[46rem]">
            <div className="hero-cover-shadow" aria-hidden="true" />
            <img
              src={coverCutout}
              width={1130}
              height={714}
              alt="Dois volumes do e-book Lula x Bolsonaro — O Que Cada Um Fez: Guia Comparativo para Decidir com Consciência"
              className="hero-cover-float relative z-10 mx-auto h-auto w-full object-contain"
            />
          </div>
          <figcaption className="mx-auto mt-5 flex max-w-md items-start gap-2 text-left text-xs leading-relaxed text-muted-foreground">
            <Lock aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-gold" />
            <span>
              Dados com links diretos para as bases oficiais do IBGE, STF, TSE, INPE e Tesouro
              Nacional.
            </span>
          </figcaption>
        </figure>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          O guia comparativo definitivo que coloca lado a lado o que Lula e Bolsonaro realmente
          fizeram, fundamentado estritamente em dados oficiais — através de uma triagem em 4 camadas
          que separa Fato, Interpretação e Acusação.
        </p>

        <div className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:justify-center">
          <CtaLink href="#oferta" tone="gold" size="lg" full location="hero_primary" className="sm:w-auto">
            QUERO ACESSAR O GUIA COMPARATIVO
          </CtaLink>
          <CtaLink href="#metodo" tone="quiet" size="md" location="hero_secondary">
            <PlayCircle aria-hidden="true" className="size-5" />
            Ver como funciona
          </CtaLink>
        </div>

        <dl className="mt-12 grid w-full max-w-lg grid-cols-3 divide-x divide-border border-t border-border pt-8">
          {stats.map((s) => (
            <div key={s.rotulo} className="px-2">
              <dt className="sr-only">{s.rotulo}</dt>
              <dd className="font-display text-3xl font-extrabold tabular-nums md:text-4xl">
                {s.valor}
              </dd>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                {s.rotulo}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* Faixa de compromissos */
function FaixaConfianca() {
  return (
    <section aria-label="Compromissos de transparência" className="border-b border-border bg-card">
      <div className={`${SHELL} py-6`}>
        <ul className="grid gap-4 sm:grid-cols-3">
          {confianca.map((c) => (
            <li
              key={c.texto}
              className="flex items-center justify-center gap-2.5 text-center text-sm font-semibold text-muted-foreground"
            >
              <c.icon aria-hidden="true" className="size-5 shrink-0 text-gold" />
              {c.texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Contexto — identificação */
function Identificacao() {
  return (
    <section className="section-pad" aria-labelledby="ident-title">
      <div className={SHELL}>
        <div className={NARROW}>
          <h2 id="ident-title" className="rule-gold text-2xl font-bold md:text-4xl">
            Se você está cansado do estresse e da polarização, você não está sozinho.
          </h2>
          <p className="mt-8 text-base leading-loose md:text-lg">
            Você quer apenas votar com a consciência tranquila e ter dados seguros para debater. Mas,
            ao abrir as redes sociais ou ligar a TV, tudo o que você encontra são cortes rápidos de
            podcast, memes raivosos ou threads de internet sem qualquer fonte. Se tenta ler um "guia
            comparativo" na internet, logo descobre que ele é apenas uma isca disfarçada para vender
            uma ideologia ou defender um lado. É compreensível que você se sinta exausto de tanta
            desinformação e preferiria evitar o assunto para não perder a paciência.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Custo invisível — mudança de ritmo em fundo escuro */
function Implicacoes() {
  return (
    <section className="section-pad bg-primary text-primary-foreground" aria-labelledby="dor-title">
      <div className={SHELL}>
        <h2
          id="dor-title"
          className="max-w-2xl text-2xl font-bold md:text-4xl"
        >
          O custo invisível de não ter dados seguros na mão
        </h2>
        <span className="mt-6 block h-1 w-14 rounded-full bg-gold" aria-hidden="true" />
        <ol className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {dores.map((d, i) => (
            <li key={d} className="border-t border-primary-foreground/25 pt-5">
              <span className="font-mono text-sm font-bold text-gold tabular-nums">
                0{i + 1}
              </span>
              <p className="mt-3 text-base leading-relaxed text-primary-foreground/90 md:text-lg">
                {d}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Método — linha do tempo com título fixo ao lado */
function Mecanismo() {
  return (
    <section id="metodo" className="section-pad scroll-mt-20" aria-labelledby="mec-title">
      <div className={`${SHELL} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="mec-title" className="rule-gold text-2xl font-bold md:text-4xl">
              Não vendemos opiniões prontas. Entregamos a régua.
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              O nosso guia não diz a você em quem votar. Aplicamos o mesmo método de triagem
              científica em cada tema analisado:
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="relative border-l border-border pl-8 sm:pl-10">
            {passos.map((p) => (
              <li key={p.n} className="pb-10 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-extrabold text-gold-foreground sm:size-10 sm:text-base">
                    {p.n}
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">{p.t}</h3>
                </div>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex items-start gap-4 rounded-xl bg-accent p-6 md:p-7">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-card shadow-card">
              <BookOpenCheck aria-hidden="true" className="size-5 text-gold" />
            </span>
            <p className="text-base leading-relaxed">
              <strong className="font-bold">A Chave do Entendimento:</strong> o Glossário Jurídico
              Descomplicado. Explicamos a diferença real entre investigação, indiciamento, denúncia,
              condenação e anulação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Gráfico — barras que crescem ao entrar na tela */
function GraficoIndecisos() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="cenario"
      className="section-pad scroll-mt-20 border-y border-border bg-secondary"
      aria-labelledby="grafico-title"
    >
      <div className={`${SHELL} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-2">
            <TrendingUp aria-hidden="true" className="size-4 text-gold" />
            O cenário real
          </p>
          <h2 id="grafico-title" className="rule-gold mt-4 text-2xl font-bold md:text-4xl">
            Quase metade do país ainda não tem certeza do voto — e é aí que o jogo muda
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            Pesquisas eleitorais mostram que milhões de brasileiros chegam à reta final sem decisão
            tomada. Mas quem decide com base em dados — não em meme — não só vota melhor: influencia
            a família, o trabalho e o grupo de amigos.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div ref={ref} className="space-y-7">
            {barras.map((b) => (
              <div key={b.rotulo}>
                <div className="flex items-baseline justify-between gap-4">
                  <p
                    className={`text-sm font-bold md:text-base ${b.destaque ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {b.rotulo}
                  </p>
                  <p
                    className={`font-display text-xl font-extrabold tabular-nums md:text-2xl ${b.destaque ? "text-gold" : "text-muted-foreground"}`}
                  >
                    {b.valor}%
                  </p>
                </div>
                <div
                  className="mt-2 h-4 w-full overflow-hidden rounded-full bg-border"
                  role="img"
                  aria-label={`${b.rotulo}: ${b.valor} por cento dos eleitores`}
                >
                  <div
                    className={`bar-grow h-full rounded-full ${b.destaque ? "bg-gold" : "bg-primary/40"}`}
                    style={{ width: visivel ? `${b.valor}%` : "0%" }}
                  />
                </div>
                <p
                  className={`mt-2 text-sm leading-relaxed ${b.destaque ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                >
                  {b.descricao}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-xl border border-gold/30 bg-card p-6 shadow-card">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
              <Scale aria-hidden="true" className="size-5 text-gold" />
            </span>
            <p className="text-base leading-relaxed">
              <strong className="font-bold">A virada está nos 18%:</strong> quem busca fatos antes de
              votar é quem decide eleições apertadas — e é exatamente para esse grupo que este guia
              foi feito.
            </p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Percentuais ilustrativos baseados na faixa de indecisos apontada por institutos de
            pesquisa eleitoral (Datafolha, Ipec, Quaest) em ciclos presidenciais recentes.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Comparação — tabela */
function TabelaComparativa() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progresso, setProgresso] = useState(0);

  const atualizarProgresso = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgresso(max > 0 ? Math.min(100, Math.max(0, (el.scrollLeft / max) * 100)) : 0);
  };

  useEffect(() => {
    atualizarProgresso();
    window.addEventListener("resize", atualizarProgresso);
    return () => window.removeEventListener("resize", atualizarProgresso);
  }, []);

  return (
    <section className="section-pad" aria-labelledby="tabela-title">
      <div className={SHELL}>
        <h2 id="tabela-title" className="rule-gold max-w-2xl text-2xl font-bold md:text-4xl">
          Como você prefere se informar a partir de hoje?
        </h2>
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground md:hidden">
          <MoveHorizontal aria-hidden="true" className="size-4 shrink-0 animate-pulse text-gold" />
          Arraste para o lado para ver tudo
        </p>
        <div
          ref={scrollRef}
          onScroll={atualizarProgresso}
          className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-card"
        >
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm md:text-base">
            <caption className="sr-only">
              Comparação entre se informar pelas redes sociais, pelo Google ou pelo guia comparativo,
              segundo origem, isenção e tempo.
            </caption>
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th scope="col" className="px-5 py-4 font-bold">
                  Critério
                </th>
                <th scope="col" className="px-5 py-4 font-bold">
                  Bolha das Redes
                </th>
                <th scope="col" className="px-5 py-4 font-bold">
                  Google
                </th>
                <th scope="col" className="px-5 py-4 font-bold text-gold">
                  O Nosso Guia
                </th>
              </tr>
            </thead>
            <tbody>
              {comparativo.map(([criterio, redes, google, guia]) => (
                <tr key={criterio} className="border-b border-border last:border-0">
                  <th scope="row" className="px-5 py-4 font-semibold">
                    {criterio}
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">{redes}</td>
                  <td className="px-5 py-4 text-muted-foreground">{google}</td>
                  <td className="bg-accent/50 px-5 py-4 font-semibold text-foreground">{guia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="mt-3 h-1 overflow-hidden rounded-full bg-border md:hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progresso)}
          aria-label="Progresso da rolagem da tabela"
        >
          <div
            className="h-full rounded-full bg-gold transition-[width]"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>
    </section>
  );
}

/* Depoimentos */
function ProvaSocial() {
  return (
    <section
      id="provas"
      className="section-pad scroll-mt-20 border-y border-border bg-secondary"
      aria-labelledby="prova-title"
    >
      <div className={SHELL}>
        <h2 id="prova-title" className="rule-gold max-w-2xl text-2xl font-bold md:text-4xl">
          Quem decide com base em método não depende de torcida
        </h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((t) => (
            <li key={t.nome} className="flex">
              <figure className="flex flex-1 flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={t.foto}
                    alt={`Foto de ${t.nome}, ${t.papel}`}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="size-11 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{t.nome}</span>
                    <span className="block truncate text-sm text-muted-foreground">{t.papel}</span>
                  </span>
                  <t.rede.icon
                    aria-label={`Depoimento enviado via ${t.rede.nome}`}
                    className={`size-5 shrink-0 ${t.rede.cor}`}
                  />
                </div>
                <div
                  className="mt-4 flex gap-1 text-gold"
                  role="img"
                  aria-label="Avaliação: 5 de 5 estrelas"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden="true" className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-base leading-relaxed">
                  "{t.texto}"
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Oferta e garantia */
function Oferta() {
  return (
    <section id="oferta" className="section-pad scroll-mt-20" aria-labelledby="oferta-title">
      <div className={`${SHELL} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <img
            src={cover.url}
            width={1920}
            height={1920}
            loading="lazy"
            alt="Capa do e-book Lula x Bolsonaro — O Que Cada Um Fez: Guia Comparativo para Decidir com Consciência"
            className="mx-auto h-auto w-full max-w-sm rounded-lg lg:max-w-none"
          />
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-card p-7 shadow-card-lg md:p-10">
            <p className="eyebrow">Acesso completo</p>
            <h2 id="oferta-title" className="mt-4 text-2xl font-bold md:text-4xl">
              Adquira o Acesso Completo
            </h2>
            <p className="mt-6 text-base leading-relaxed md:text-lg">
              Matriz de Integridade, Glossário Jurídico, Ficha Pessoal de Decisão.{" "}
              <strong className="font-bold">Acesso Vitalício</strong> + Atualizações com Fontes
              Oficiais Linkadas.
            </p>
            <div className="mt-8">
              <CtaLink
                href={OFERTA.checkout}
                tone="gold"
                size="lg"
                full
                location="offer_primary"
                className="sm:w-auto"
              >
                QUERO ACESSAR O GUIA COMPARATIVO AGORA
              </CtaLink>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-xl border border-gold/30 bg-accent p-6 md:p-7">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-card shadow-card">
              <FileCheck2 aria-hidden="true" className="size-5 text-gold" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold md:text-xl">
                Nossa Garantia de Transparência Científica
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                Se em até 7 dias você encontrar uma única informação relevante neste guia que não
                possua fonte oficial linkada e rastreável, devolvemos 100% do seu dinheiro. Nosso
                compromisso é com a verdade factual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Perguntas frequentes — acordeão acessível */
function Perguntas() {
  return (
    <section
      id="perguntas"
      className="section-pad scroll-mt-20 border-t border-border bg-secondary"
      aria-labelledby="faq-title"
    >
      <div className={SHELL}>
        <div className={NARROW}>
          <h2 id="faq-title" className="rule-gold text-2xl font-bold md:text-4xl">
            Perguntas frequentes
          </h2>
          <div className="mt-10 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {faq.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-base font-bold marker:hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:text-lg">
                  {f.q}
                  <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
                    <Plus aria-hidden="true" className="size-4 group-open:hidden" />
                    <Minus aria-hidden="true" className="hidden size-4 group-open:block" />
                  </span>
                </summary>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Chamada final */
function CtaFinal() {
  return (
    <section className="bg-primary text-primary-foreground" aria-labelledby="cta-final-title">
      <div className={`${SHELL} py-14 text-center md:py-20`}>
        <h2 id="cta-final-title" className="mx-auto max-w-2xl text-2xl font-bold md:text-4xl">
          Adquira o Acesso Completo
        </h2>
        <div className="mt-8 flex justify-center">
          <CtaLink href={OFERTA.checkout} tone="gold" size="lg" location="final_cta">
            QUERO ACESSAR O GUIA COMPARATIVO AGORA
          </CtaLink>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {confianca.map((c) => (
            <li
              key={c.texto}
              className="flex items-center gap-2 text-sm font-semibold text-primary-foreground/80"
            >
              <c.icon aria-hidden="true" className="size-4 shrink-0 text-gold" />
              {c.texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-primary-foreground/15 bg-primary text-primary-foreground">
      <div className={`${SHELL} py-10 text-center text-sm`}>
        <p className="font-display font-bold">
          Lula x Bolsonaro — O Que Cada Um Fez: Guia Comparativo para Decidir com Consciência.
        </p>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-primary-foreground/70">
          Material comparativo baseado em fontes oficiais. Não emite julgamento de valor nem
          indicação de voto. Contato: {OFERTA.contato}
        </p>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="sticky bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur md:hidden">
      <CtaLink href="#oferta" tone="gold" size="md" full location="mobile_bar">
        QUERO ACESSAR O GUIA
      </CtaLink>
    </div>
  );
}
