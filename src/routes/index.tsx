import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  Landmark,
  LineChart,
  ListChecks,
  Scale,
  ShieldCheck,
  Sprout,
  Timer,
  Users,
} from "lucide-react";
import cover from "@/assets/ebook-cover.png";
import { CtaLink } from "@/components/landing/cta-button";
import {
  PreviewEconomia,
  PreviewFichaDecisao,
  PreviewIntegridade,
} from "@/components/landing/previews";
import { track } from "@/lib/analytics";

/* ---------------------------------------------------------------------------
 * Campos editáveis da oferta. Substitua os placeholders pelos dados reais.
 * Nada aqui deve ser inventado: sem preço, prazo ou garantia confirmados,
 * mantenha o placeholder visível.
 * ------------------------------------------------------------------------- */
const OFERTA = {
  preco: "[PREÇO]",
  formaPagamento: "[FORMA DE PAGAMENTO]",
  garantia: "[PRAZO DE GARANTIA]",
  dataCorte: "[DATA DE CORTE]",
  checkout: "[LINK DE CHECKOUT]",
  edicao: "[NOME DA EDIÇÃO]",
  precoValidoAte: "[DATA REAL]",
  contato: "[E-MAIL DE CONTATO]",
};

const SEO_TITLE = "Lula x Bolsonaro: compare o que cada um fez antes de decidir";
const SEO_DESC =
  "Um guia comparativo com fatos, resultados, controvérsias, decisões judiciais e contexto para entender Lula e Bolsonaro e tomar sua própria decisão com mais clareza.";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESC },
      { property: "og:title", content: "O que Lula e Bolsonaro realmente fizeram?" },
      {
        property: "og:description",
        content:
          "Compare economia, emprego, pobreza, segurança, ambiente, integridade e democracia em um guia organizado para quem quer decidir sem depender de torcida.",
      },
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

const matriz = [
  { n: "1", t: "Problema", d: "Qual situação existia e como ela era medida naquele momento." },
  { n: "2", t: "Decisão", d: "O que foi efetivamente decidido, por qual instrumento e quando." },
  { n: "3", t: "Resultado", d: "O que os indicadores e registros mostram no período." },
  { n: "4", t: "Custo ou efeito colateral", d: "O preço fiscal, social ou institucional da escolha." },
  { n: "5", t: "Melhor argumento favorável", d: "A defesa mais forte da medida, apresentada sem ironia." },
  { n: "6", t: "Crítica principal", d: "A objeção mais consistente, com a fonte que a sustenta." },
  { n: "7", t: "Limite de atribuição", d: "Quanto do resultado depende do presidente e quanto não." },
];

const entregaveis = [
  { icon: BookOpen, t: "E-book comparativo completo", d: "Lula e Bolsonaro analisados tema por tema com a mesma sequência." },
  { icon: LineChart, t: "Economia e vida real", d: "Emprego, renda, pobreza, inflação e custo de vida, com a metodologia de cada série indicada." },
  { icon: Users, t: "Educação, saúde e pandemia", d: "Programas, cobertura, gastos e decisões sanitárias em contexto." },
  { icon: ShieldCheck, t: "Segurança e competências", d: "Armas, homicídios e o que é responsabilidade federal, estadual ou municipal." },
  { icon: Sprout, t: "Ambiente e desenvolvimento", d: "Amazônia, fiscalização, produção e cooperação internacional." },
  { icon: Scale, t: "Integridade caso a caso", d: "Investigação, denúncia, condenação, anulação e arquivamento sem misturar categorias." },
  { icon: Landmark, t: "Democracia e instituições", d: "Decisões eleitorais e criminais, inelegibilidade e conflitos com órgãos de controle." },
  { icon: Timer, t: "Linha do tempo 2002–2026", d: "Os marcos dos dois lados na mesma régua temporal." },
  { icon: FileText, t: "Gráficos, tabelas e sínteses", d: "Resumos por prioridade para consultar em minutos." },
  { icon: ListChecks, t: "Glossário e checklist", d: "Termos jurídicos, econômicos e políticos + roteiro para checar vídeos e números virais." },
  { icon: ClipboardList, t: "Ficha pessoal de decisão", d: "Você organiza seus pesos e chega a uma conclusão própria." },
  { icon: CheckCircle2, t: "Apêndices metodológicos", d: "Como testar promessas e comparar evidências de qualidade diferente." },
];

const erros = [
  "Comparar um mandato inteiro com um único escândalo.",
  "Confundir investigação com condenação.",
  "Tratar uma decisão anulada como se tivesse o mesmo peso de uma condenação vigente.",
  "Atribuir ao presidente tudo o que acontece em estados e municípios.",
  "Usar PIB, desemprego, pobreza, homicídios ou desmatamento sem olhar metodologia e período.",
  "Consumir apenas conteúdo do próprio campo político.",
  "Decidir o voto por medo de estar sendo enganado.",
];

const prioridades = [
  { t: "Renda e redução da pobreza", d: "Vá aos capítulos de proteção social, emprego e salário: o que foi criado, o que foi mantido, o que caiu e a que custo." },
  { t: "Segurança e costumes", d: "Compare armas, autoridade, prevenção, inteligência e pautas de valores — com o limite claro da competência federal." },
  { t: "Democracia e instituições", d: "Leia as decisões eleitorais e criminais, o respeito aos limites institucionais e os atritos com órgãos de controle." },
  { t: "Ambiente e desenvolvimento", d: "Confronte fiscalização, produção, soberania, Amazônia e cooperação internacional." },
  { t: "Integridade", d: "Avalie escândalos, controles e status processual sem transformar acusação em condenação." },
];

const faq = [
  {
    q: "Esse e-book é de esquerda ou de direita?",
    a: "Ele foi estruturado para comparar os dois lados com o mesmo método. Você encontrará pontos favoráveis e críticas a Lula e a Bolsonaro, além das fontes e das limitações da análise.",
  },
  {
    q: "Já sei em quem vou votar. Por que ler?",
    a: "Porque conhecer o melhor argumento do outro lado ajuda a testar a sua própria decisão e evita que ela dependa de informações frágeis.",
  },
  {
    q: "Posso pesquisar tudo isso gratuitamente?",
    a: "Pode. O valor do guia está em reunir, organizar e contextualizar informações dispersas, economizando tempo e oferecendo uma sequência de análise que você pode repetir sozinho.",
  },
  {
    q: "O material promete dizer em quem devo votar?",
    a: "Não. Ele mostra o que cada um fez e oferece critérios para você decidir conforme as suas prioridades.",
  },
  {
    q: "Como sei que as acusações estão corretas?",
    a: "O guia distingue investigação, indiciamento, denúncia, condenação, anulação, arquivamento e decisão eleitoral, sempre indicando o status apresentado nas fontes consultadas.",
  },
  {
    q: "O conteúdo pode ficar desatualizado?",
    a: `Sim. Política e processos judiciais mudam. Esta edição reúne dados disponíveis até ${OFERTA.dataCorte}, e a data de corte fica visível na página e no arquivo.`,
  },
];

/* ------------------------------- componentes ------------------------------ */

function LandingPage() {
  useEffect(() => {
    track("view_landing_page", { page: "ebook_lula_x_bolsonaro" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main>
        <Hero />
        <Identificacao />
        <Agitacao />
        <Virada />
        <Mecanismo />
        <FuturePacing />
        <Entrega />
        <Previas />
        <Prioridades />
        <Faq />
        <Metodo />
        <Oferta />
        <CtaFinal />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}

function TopBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
        <p className="text-sm">Um guia comparativo para quem quer entender antes de escolher.</p>
        <CtaLink href="#oferta" tone="gold" size="sm" location="topbar">
          Conhecer o guia
        </CtaLink>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="section-pad border-b border-border bg-card" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
        <div>
          <p className="eyebrow">E-book · Guia comparativo</p>
          <h1 id="hero-title" className="mt-3 text-3xl leading-tight md:text-5xl">
            Antes de escolher entre Lula e Bolsonaro, descubra o que cada um realmente fez.
          </h1>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Um guia comparativo com fatos, resultados, controvérsias, decisões judiciais e contexto
            para você decidir com mais clareza — sem depender de torcida, cortes ou acusações fora
            de contexto.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#oferta" size="lg" location="hero_primary">
              Quero comparar os dois
            </CtaLink>
            <CtaLink href="#previas" tone="outline" size="lg" location="hero_secondary">
              Ver o que está dentro do guia
            </CtaLink>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Produto digital. Leitura imediata. Conteúdo comparativo e baseado em fontes.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={cover}
            width={1024}
            height={1280}
            alt="Capa do e-book Lula x Bolsonaro — O Que Cada Um Fez: Guia Comparativo para Decidir com Consciência, em azul-marinho com detalhes dourados, gráfico de barras e linha do tempo"
            className="w-64 max-w-full drop-shadow-[0_24px_60px_oklch(0.24_0.06_262/0.28)] md:w-80"
          />
        </div>
      </div>
    </section>
  );
}

function Identificacao() {
  return (
    <section className="section-pad" aria-labelledby="ident-title">
      <div className="mx-auto max-w-3xl px-4">
        <h2 id="ident-title" className="rule-gold text-2xl md:text-3xl">
          Versões demais, critério de menos
        </h2>
        <p className="mt-6 text-base leading-relaxed md:text-lg">
          Você recebe um vídeo dizendo que Lula destruiu o país. Em seguida, alguém afirma que
          Bolsonaro acabou com a democracia. Depois aparece um número sobre economia, uma acusação
          sobre corrupção e uma discussão sobre pandemia — tudo sem o mesmo critério e sem contexto.
        </p>
        <blockquote className="mt-6 border-l-2 border-gold pl-5 text-lg text-primary md:text-xl">
          “Não sei mais em quem acreditar.” · “Todo mundo parece manipular os dados.” · “Queria
          comparar os dois sem passar horas pesquisando.”
        </blockquote>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Se você já pensou algo assim, este guia foi feito para você. Também foi feito para quem
          vota pela primeira vez, para quem quer entender o contexto histórico e para quem já
          simpatiza com um lado e quer testar se os próprios argumentos resistem aos fatos.
        </p>
      </div>
    </section>
  );
}

function Agitacao() {
  return (
    <section className="section-pad border-y border-border bg-secondary" aria-labelledby="agit-title">
      <div className="mx-auto max-w-4xl px-4">
        <h2 id="agit-title" className="rule-gold text-2xl md:text-3xl">
          Os erros de informação que mais atrapalham uma comparação
        </h2>
        <p className="mt-6 text-muted-foreground">
          Nenhum deles é falha moral de quem consome notícia. São armadilhas de formato: aparecem
          quando a informação chega solta, sem período, sem fonte e sem status.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {erros.map((e) => (
            <li
              key={e}
              className="flex gap-3 rounded-md border border-border bg-card p-4 text-sm shadow-editorial"
            >
              <span aria-hidden="true" className="mt-1 size-2 shrink-0 rounded-full bg-crimson" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Virada() {
  return (
    <section className="section-pad" aria-labelledby="virada-title">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="eyebrow">A virada</p>
        <h2 id="virada-title" className="mt-3 text-2xl md:text-4xl">
          Talvez o problema não seja falta de informação. Talvez seja excesso de informação sem um
          método para comparar.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Você não precisa assistir a centenas de vídeos nem virar analista político. Precisa de uma
          estrutura que mostre, em cada tema, o problema, a decisão tomada, o resultado, o custo, o
          melhor argumento a favor, a crítica mais forte e o limite de responsabilidade do
          presidente. É exatamente isso que o guia faz — dos dois lados, na mesma ordem.
        </p>
      </div>
    </section>
  );
}

function Mecanismo() {
  return (
    <section className="section-pad border-y border-border bg-card" aria-labelledby="mec-title">
      <div className="mx-auto max-w-6xl px-4">
        <p className="eyebrow">Mecanismo do guia</p>
        <h2 id="mec-title" className="mt-3 text-2xl md:text-3xl">
          A Matriz Comparativa de Evidências
        </h2>
        <p className="mt-5 max-w-3xl text-muted-foreground">
          Em vez de escolher uma torcida antes de olhar os fatos, o guia aplica a mesma sequência aos
          dois lados: o que aconteceu, qual decisão foi tomada, que resultado apareceu, qual custo
          surgiu, qual é o melhor argumento favorável, qual é a crítica mais forte e quanto daquele
          resultado pode ser atribuído ao presidente.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {matriz.map((m) => (
            <li key={m.n} className="rounded-lg border border-border bg-background p-5 shadow-editorial">
              <span className="font-serif text-2xl text-gold">{m.n}</span>
              <h3 className="mt-2 text-base font-semibold">{m.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          A matriz não produz “a verdade definitiva”. Ela reduz confusão, torna a comparação
          simétrica e deixa o raciocínio verificável: você vê de onde veio cada informação e pode
          discordar com base no mesmo material.
        </p>
      </div>
    </section>
  );
}

function FuturePacing() {
  return (
    <section className="section-pad" aria-labelledby="futuro-title">
      <div className="mx-auto max-w-4xl px-4">
        <h2 id="futuro-title" className="rule-gold text-2xl md:text-3xl">
          Como fica a sua próxima conversa sobre política
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-editorial">
            <p className="leading-relaxed">
              Imagine acompanhar uma discussão sobre economia, corrupção ou segurança e não precisar
              escolher entre repetir um meme ou ficar em silêncio. Você abre o guia, localiza o tema,
              entende o contexto, confere o status da informação e forma uma opinião própria.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-editorial">
            <p className="leading-relaxed">
              Imagine chegar à decisão eleitoral sabendo não apenas o que seu candidato promete, mas
              quais resultados ele tem, quais críticas são legítimas, quais acusações tiveram
              desfecho jurídico e quais riscos você está disposto a aceitar.
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          O guia não promete que você vencerá debates, convencerá parentes ou encontrará um candidato
          perfeito. Promete organização, contexto e critérios.
        </p>
      </div>
    </section>
  );
}

function Entrega() {
  return (
    <section className="section-pad border-y border-border bg-secondary" aria-labelledby="entrega-title">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="entrega-title" className="rule-gold text-2xl md:text-3xl">
          O que você recebe
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entregaveis.map(({ icon: Icon, t, d }) => (
            <li key={t} className="rounded-lg border border-border bg-card p-5 shadow-editorial">
              <Icon aria-hidden="true" className="size-5 text-gold" />
              <h3 className="mt-3 text-base font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">
          O conteúdo tem data de corte: {OFERTA.dataCorte}. Fatos jurídicos ou políticos posteriores
          podem exigir atualização, e a página informa como isso é tratado.
        </p>
      </div>
    </section>
  );
}

function Previas() {
  const previas = [
    {
      el: <PreviewEconomia />,
      t: "Resultados econômicos lado a lado",
      d: "Você vê o indicador, o período, a fonte e a nota de método — o que impede comparar séries diferentes como se fossem iguais.",
    },
    {
      el: <PreviewIntegridade />,
      t: "Integridade sem confusão de categorias",
      d: "Investigação, condenação, anulação e arquivamento aparecem separados, com o status registrado na fonte consultada.",
    },
    {
      el: <PreviewFichaDecisao />,
      t: "Sua ficha pessoal de decisão",
      d: "Você atribui peso aos temas que afetam a sua vida e vê onde os capítulos respondem a cada prioridade.",
    },
  ];
  return (
    <section id="previas" className="section-pad scroll-mt-24" aria-labelledby="previas-title">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="previas-title" className="rule-gold text-2xl md:text-3xl">
          Prévias de páginas internas
        </h2>
        <p className="mt-5 max-w-3xl text-muted-foreground">
          As prévias abaixo mostram a estrutura das páginas. Os campos entre colchetes são
          preenchidos na edição final com valor, fonte e data — nada é afirmado sem referência.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {previas.map((p) => (
            <article key={p.t} className="flex flex-col gap-4">
              {p.el}
              <div>
                <h3 className="text-base font-semibold">{p.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Prioridades() {
  return (
    <section className="section-pad border-y border-border bg-card" aria-labelledby="prio-title">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="prio-title" className="text-2xl md:text-3xl">
          A pergunta não é apenas “quem é melhor?”. É: o que você considera mais importante?
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {prioridades.map((p) => (
            <div key={p.t} className="rounded-lg border border-border bg-background p-5 shadow-editorial">
              <h3 className="text-base font-semibold text-primary">Se a sua prioridade é {p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Não existe resposta universal aqui. O guia organiza o material para que a decisão seja sua
          e coerente com o que você valoriza.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section-pad" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-4">
        <h2 id="faq-title" className="rule-gold text-2xl md:text-3xl">
          Perguntas honestas, respostas diretas
        </h2>
        <div className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group px-5 py-4"
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) {
                  track("faq_open", { question: item.q });
                }
              }}
            >
              <summary className="cursor-pointer list-none text-base font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span aria-hidden="true" className="text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metodo() {
  return (
    <section className="section-pad border-y border-border bg-secondary" aria-labelledby="metodo-title">
      <div className="mx-auto max-w-3xl px-4">
        <h2 id="metodo-title" className="rule-gold text-2xl md:text-3xl">
          Como o material é apurado
        </h2>
        <ul className="mt-7 space-y-4 text-base leading-relaxed">
          <li className="rounded-md border border-border bg-card p-4">
            Dados oficiais e fontes institucionais são priorizados para indicadores e decisões.
          </li>
          <li className="rounded-md border border-border bg-card p-4">
            Estudos acadêmicos e jornalismo profissional ajudam a contextualizar resultados e
            divergências de interpretação.
          </li>
          <li className="rounded-md border border-border bg-card p-4">
            Debates em redes sociais servem para identificar dúvidas e a linguagem do público — nunca
            como prova isolada.
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Simetria metodológica, na prática: o mesmo número de critérios, a mesma exigência de fonte
          e o mesmo espaço para argumento favorável e crítica nos dois lados. Quando uma informação
          não tem fonte confiável ou data verificável, ela é marcada como indisponível em vez de
          preenchida por estimativa.
        </p>
      </div>
    </section>
  );
}

function Oferta() {
  return (
    <section id="oferta" className="section-pad scroll-mt-24" aria-labelledby="oferta-title">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-8 rounded-xl border border-border bg-card p-6 shadow-editorial md:grid-cols-[minmax(0,15rem)_1fr] md:p-10">
          <img
            src={cover}
            width={1024}
            height={1280}
            loading="lazy"
            alt="Capa do e-book comparativo Lula x Bolsonaro em fundo azul-marinho com título em destaque"
            className="mx-auto w-48 md:w-full"
          />
          <div>
            <h2 id="oferta-title" className="text-2xl md:text-3xl">
              Guia comparativo completo — edição {OFERTA.edicao}
            </h2>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "E-book comparativo completo em formato digital",
                "13 blocos temáticos com a Matriz Comparativa de Evidências",
                "Linha do tempo 2002–2026, gráficos e tabelas",
                "Glossário, checklist de checagem e ficha pessoal de decisão",
                "Apêndices metodológicos e lista de fontes",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-serif text-3xl text-primary">{OFERTA.preco}</p>
            <p className="text-sm text-muted-foreground">
              Pagamento: {OFERTA.formaPagamento} · Acesso digital imediato após a confirmação
            </p>
            <CtaLink
              href={OFERTA.checkout}
              size="lg"
              full
              className="mt-6"
              event="begin_checkout"
              location="offer_block"
            >
              Quero acessar o guia comparativo
            </CtaLink>
            <dl className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-foreground">Formato</dt>
                <dd>PDF/EPUB para ler no celular, tablet ou computador.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Garantia</dt>
                <dd>{OFERTA.garantia}, conforme a política da plataforma de pagamento.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Data de corte da edição</dt>
                <dd>{OFERTA.dataCorte}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Atualizações</dt>
                <dd>Atualização da edição {OFERTA.edicao} liberada para quem já comprou, se houver nova versão.</dd>
              </div>
            </dl>
            <div className="mt-6 rounded-md border border-gold/50 bg-gold/10 p-4 text-sm">
              <p>Edição atualizada com dados disponíveis até {OFERTA.dataCorte}.</p>
              <p className="mt-1 text-muted-foreground">
                Preço introdutório válido até {OFERTA.precoValidoAte}. Sem cronômetro, sem “últimas
                vagas”: é um produto digital e você pode voltar quando quiser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className="section-pad bg-primary text-primary-foreground" aria-labelledby="cta-title">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 id="cta-title" className="text-3xl md:text-4xl">
          Compare antes de escolher.
        </h2>
        <p className="mt-5 text-base text-primary-foreground/80 md:text-lg">
          Tenha em mãos um guia organizado para entender o que Lula e Bolsonaro fizeram, avaliar
          resultados e decidir com base no que realmente importa para você.
        </p>
        <CtaLink
          href={OFERTA.checkout}
          tone="gold"
          size="lg"
          className="mt-8"
          event="begin_checkout"
          location="final_cta"
        >
          Quero acessar o guia comparativo
        </CtaLink>
        <p className="mt-4 text-sm text-primary-foreground/70">
          Você receberá um produto digital informativo. A decisão política continua sendo sua.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg">Lula x Bolsonaro — O Que Cada Um Fez</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Guia comparativo para decidir com consciência. Edição {OFERTA.edicao}, com dados
              disponíveis até {OFERTA.dataCorte}.
            </p>
          </div>
          <nav aria-label="Links institucionais" className="text-sm">
            <ul className="space-y-2">
              <li>
                <a className="underline underline-offset-4 hover:text-primary" href="/politica-de-privacidade">
                  Política de privacidade
                </a>
              </li>
              <li>
                <a className="underline underline-offset-4 hover:text-primary" href="/termos-de-compra">
                  Termos de compra
                </a>
              </li>
              <li>
                <a className="underline underline-offset-4 hover:text-primary" href="/politica-de-reembolso">
                  Política de reembolso
                </a>
              </li>
              <li>
                <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${OFERTA.contato}`}>
                  Contato: {OFERTA.contato}
                </a>
              </li>
            </ul>
          </nav>
          <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              Conteúdo informativo e educacional. Não substitui a consulta a fontes oficiais,
              documentos públicos e decisões judiciais na íntegra.
            </p>
            <p>
              Esta página não promete determinar o voto de ninguém e não faz propaganda partidária.
            </p>
            <p>
              Fatos posteriores à data de corte podem alterar o status de informações jurídicas,
              econômicas ou políticas citadas na edição.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="sticky bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur md:hidden">
      <CtaLink href="#oferta" size="md" full location="mobile_sticky">
        Quero comparar os dois
      </CtaLink>
    </div>
  );
}
