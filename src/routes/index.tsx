import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Lock, Quote } from "lucide-react";
import cover from "@/assets/ebook-cover.png";
import { CtaLink } from "@/components/landing/cta-button";
import { track } from "@/lib/analytics";

/* ---------------------------------------------------------------------------
 * Campos editáveis da oferta. Substitua os placeholders pelos dados reais.
 * Os depoimentos da seção "Prova social" são placeholders de copy fornecidos
 * pelo autor — substitua por relatos reais antes de publicar.
 * ------------------------------------------------------------------------- */
const OFERTA = {
  checkout: "[LINK DE CHECKOUT]",
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

/* ------------------------------- componentes ------------------------------ */

function LandingPage() {
  useEffect(() => {
    track("view_landing_page", { page: "ebook_lula_x_bolsonaro" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Identificacao />
        <Implicacoes />
        <Mecanismo />
        <ProvaSocial />
        <TabelaComparativa />
        <Oferta />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}

/* DOBRA 1 — Hero: a promessa */
function Hero() {
  return (
    <section className="border-b border-border bg-card" aria-labelledby="hero-title">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
        <p className="eyebrow">E-book · Guia comparativo</p>
        <h1
          id="hero-title"
          className="mx-auto mt-6 max-w-3xl text-3xl leading-tight md:text-5xl md:leading-tight"
        >
          Chega de discutir política com base em memes ou opiniões de redes sociais. Conheça o guia
          comparativo definitivo que coloca lado a lado o que Lula e Bolsonaro realmente fizeram,
          fundamentado estritamente em dados oficiais.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Através de uma estrutura de triagem em 4 camadas que separa Fato, Interpretação e
          Acusação, você adquire segurança intelectual para tirar as suas próprias conclusões, sem
          precisar herdar a raiva das bolhas de internet.
        </p>
        <div className="mt-10 flex justify-center">
          <CtaLink
            href="#oferta"
            tone="gold"
            size="lg"
            location="hero_primary"
            className="rounded-none"
          >
            QUERO ACESSAR O GUIA COMPARATIVO
          </CtaLink>
        </div>
        <p className="mx-auto mt-6 flex max-w-xl items-start justify-center gap-2 text-left text-sm leading-relaxed text-muted-foreground">
          <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>
            <strong className="font-semibold text-foreground">Zero especulação ideológica:</strong>{" "}
            Todos os dados apresentados neste guia vêm acompanhados de links diretos para as bases
            oficiais do IBGE, STF, TSE, INPE e Tesouro Nacional. Verifique o recibo oficial em um
            clique.
          </span>
        </p>
      </div>
    </section>
  );
}

/* DOBRA 2 — Texto corrido: identificação */
function Identificacao() {
  return (
    <section className="section-pad" aria-labelledby="ident-title">
      <div className="mx-auto max-w-2xl px-4">
        <h2 id="ident-title" className="rule-gold text-2xl md:text-3xl">
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
    </section>
  );
}

/* DOBRA 3 — Implicações: a dor */
function Implicacoes() {
  return (
    <section className="section-pad border-y border-border bg-secondary" aria-labelledby="dor-title">
      <div className="mx-auto max-w-2xl px-4">
        <h2 id="dor-title" className="rule-gold text-2xl md:text-3xl">
          O custo invisível de não ter dados seguros na mão
        </h2>
        <ul className="mt-10 space-y-8">
          {dores.map((d) => (
            <li key={d} className="flex gap-4">
              <Quote aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" />
              <p className="text-base leading-relaxed md:text-lg">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* DOBRA 4 — Mecanismo único: a solução */
function Mecanismo() {
  return (
    <section className="section-pad" aria-labelledby="mec-title">
      <div className="mx-auto max-w-5xl px-4">
        <div className="max-w-2xl">
          <h2 id="mec-title" className="rule-gold text-2xl md:text-3xl">
            Não vendemos opiniões prontas. Entregamos a régua.
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            O nosso guia não diz a você em quem votar. Aplicamos o mesmo método de triagem
            científica em cada tema analisado:
          </p>
        </div>
        <ol className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((p) => (
            <li key={p.n} className="bg-card p-6">
              <span className="font-serif text-3xl text-gold">{p.n}</span>
              <h3 className="mt-3 font-sans text-base font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 border-l-2 border-gold bg-card p-6 shadow-editorial md:p-8">
          <p className="text-base leading-relaxed md:text-lg">
            <strong className="font-semibold text-primary">A Chave do Entendimento:</strong> O
            Glossário Jurídico Descomplicado. Explicamos a diferença real entre investigação,
            indiciamento, denúncia, condenação e anulação.
          </p>
        </div>
      </div>
    </section>
  );
}

/* DOBRA 5 — Prova social contextualizada (pull quotes) */
function ProvaSocial() {
  return (
    <section className="section-pad border-y border-border bg-secondary" aria-labelledby="prova-title">
      <div className="mx-auto max-w-3xl px-4">
        <h2 id="prova-title" className="rule-gold text-2xl md:text-3xl">
          Quem decide com base em método não depende de torcida
        </h2>
        <div className="mt-12 space-y-12">
          <blockquote className="border-l-2 border-primary pl-6">
            <p className="font-serif text-lg leading-relaxed md:text-xl">
              "A intervenção foi imediata: a Matriz de Comparação me permitiu olhar os números da
              economia de cada governo lado a lado. O resultado é que hoje consigo participar de
              qualquer conversa de forma calma e equilibrada."
            </p>
            <footer className="mt-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              — Carlos M., Engenheiro
            </footer>
          </blockquote>
          <blockquote className="border-l-2 border-primary pl-6">
            <p className="font-serif text-lg leading-relaxed md:text-xl">
              "Eu tinha pavor de compartilhar dados no trabalho e ser corrigida. Usei o método de
              triagem. O resultado é que agora debato com segurança intelectual inabalável; eu
              apenas mostro o link oficial do STF no PDF."
            </p>
            <footer className="mt-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              — Mariana S., Advogada
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* DOBRA 6 — Tabela comparativa */
function TabelaComparativa() {
  return (
    <section className="section-pad" aria-labelledby="tabela-title">
      <div className="mx-auto max-w-4xl px-4">
        <h2 id="tabela-title" className="rule-gold text-2xl md:text-3xl">
          Como você prefere se informar a partir de hoje?
        </h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm md:text-base">
            <caption className="sr-only">
              Comparação entre se informar pelas redes sociais, pelo Google ou pelo guia
              comparativo, segundo origem, isenção e tempo.
            </caption>
            <thead>
              <tr className="border-b-2 border-primary">
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Critério
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Bolha das Redes
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Google
                </th>
                <th scope="col" className="py-3 font-semibold text-primary">
                  O Nosso Guia
                </th>
              </tr>
            </thead>
            <tbody>
              {comparativo.map(([criterio, redes, google, guia]) => (
                <tr key={criterio} className="border-b border-border">
                  <th scope="row" className="py-4 pr-4 font-semibold">
                    {criterio}
                  </th>
                  <td className="py-4 pr-4 text-muted-foreground">{redes}</td>
                  <td className="py-4 pr-4 text-muted-foreground">{google}</td>
                  <td className="py-4 font-medium text-primary">{guia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* DOBRA 7 — Oferta, garantia e FAQ */
function Oferta() {
  return (
    <section
      id="oferta"
      className="section-pad border-t border-border bg-card"
      aria-labelledby="oferta-title"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Acesso completo</p>
            <h2 id="oferta-title" className="mt-4 text-2xl md:text-3xl">
              Adquira o Acesso Completo
            </h2>
            <p className="mt-6 text-base leading-relaxed md:text-lg">
              Matriz de Integridade, Glossário Jurídico, Ficha Pessoal de Decisão.{" "}
              <strong className="font-semibold">Acesso Vitalício</strong> + Atualizações com Fontes
              Oficiais Linkadas.
            </p>
            <div className="mt-8">
              <CtaLink
                href={OFERTA.checkout}
                tone="gold"
                size="lg"
                location="offer_primary"
                className="rounded-none"
              >
                QUERO ACESSAR O GUIA COMPARATIVO AGORA
              </CtaLink>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={cover}
              width={1024}
              height={1280}
              loading="lazy"
              alt="Capa do e-book Lula x Bolsonaro — O Que Cada Um Fez: Guia Comparativo para Decidir com Consciência"
              className="w-48 max-w-full shadow-cover md:w-56"
            />
          </div>
        </div>

        <div className="mt-14 border border-border bg-background p-6 md:p-8">
          <h3 className="font-serif text-xl md:text-2xl">
            Nossa Garantia de Transparência Científica
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Se em até 7 dias você encontrar uma única informação relevante neste guia que não
            possua fonte oficial linkada e rastreável, devolvemos 100% do seu dinheiro. Nosso
            compromisso é com a verdade factual.
          </p>
        </div>

        <div className="mt-14">
          <h3 className="font-serif text-xl md:text-2xl">Perguntas frequentes</h3>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold marker:hidden">
                  {f.q}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                  />
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <CtaLink
            href={OFERTA.checkout}
            tone="gold"
            size="lg"
            location="final_cta"
            className="rounded-none"
          >
            QUERO ACESSAR O GUIA COMPARATIVO AGORA
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-3xl px-4 py-10 text-center text-sm">
        <p>
          Lula x Bolsonaro — O Que Cada Um Fez: Guia Comparativo para Decidir com Consciência.
        </p>
        <p className="mt-2 text-primary-foreground/70">
          Material comparativo baseado em fontes oficiais. Não emite julgamento de valor nem
          indicação de voto. Contato: {OFERTA.contato}
        </p>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="sticky bottom-0 z-40 border-t border-border bg-card p-3 md:hidden">
      <CtaLink
        href="#oferta"
        tone="gold"
        size="md"
        full
        location="mobile_bar"
        className="rounded-none"
      >
        QUERO ACESSAR O GUIA
      </CtaLink>
    </div>
  );
}
