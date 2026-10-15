import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ChevronLeft, FileSearch, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Quiz introdutório: tela inicial + 2 perguntas, uma por tela.
 * Ao final, redireciona para a landing principal em /guia.
 */

const SEO_TITLE = "Quiz — Como você busca informações sobre candidatos";
const SEO_DESC =
  "Responda a duas perguntas rápidas sobre como você busca informações para conhecer melhor os candidatos.";

type Screen = "start" | "q1" | "q2";

const PERGUNTA_1 = {
  titulo: "O que você considera importante analisar ao conhecer um candidato?",
  alternativas: [
    "As propostas e o plano de governo.",
    "O histórico de atuação e as decisões anteriores.",
    "As informações sobre gestão e resultados públicos.",
    "Informações verificáveis de diferentes fontes.",
  ],
};

const PERGUNTA_2 = {
  titulo: "Onde você costuma buscar informações sobre candidatos?",
  alternativas: [
    "Sites e documentos oficiais.",
    "Notícias e reportagens.",
    "Redes sociais e vídeos.",
    "Diferentes fontes, comparando as informações.",
  ],
};

function Progresso({ atual }: { atual: 1 | 2 }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
        <span>Pergunta {atual} de 2</span>
        <span aria-hidden="true">{atual === 1 ? "1/2" : "2/2"}</span>
      </div>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={2}
        aria-valuenow={atual}
        aria-label={`Pergunta ${atual} de 2`}
      >
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out"
          style={{ width: atual === 1 ? "50%" : "100%" }}
        />
      </div>
    </div>
  );
}

function Alternativa({
  texto,
  selecionada,
  onSelect,
}: {
  texto: string;
  selecionada: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selecionada}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border-2 bg-card p-4 text-left text-base font-medium text-foreground transition-colors",
        "min-h-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selecionada
          ? "border-gold bg-secondary shadow-card"
          : "border-border hover:border-primary/40 hover:bg-secondary/60",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selecionada ? "border-gold bg-gold" : "border-muted-foreground/40 bg-background",
        )}
      >
        {selecionada && <CheckCircle2 className="h-3.5 w-3.5 text-gold-foreground" />}
      </span>
      <span>{texto}</span>
    </button>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESC },
      { property: "og:title", content: SEO_TITLE },
      { property: "og:description", content: SEO_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate({ from: "/" });
  const [screen, setScreen] = useState<Screen>("start");
  const [resposta1, setResposta1] = useState<number | null>(null);
  const [resposta2, setResposta2] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function selecionar(pergunta: 1 | 2, indice: number) {
    setErro(null);
    if (pergunta === 1) setResposta1(indice);
    else setResposta2(indice);
  }

  function continuarDaPrimeira() {
    if (resposta1 === null) {
      setErro("Selecione uma alternativa para continuar.");
      return;
    }
    setScreen("q2");
  }

  function finalizar() {
    if (resposta2 === null) {
      setErro("Selecione uma alternativa para continuar.");
      return;
    }
    navigate({ to: "/guia" });
  }

  function voltar() {
    setErro(null);
    if (screen === "q2") setScreen("q1");
    else if (screen === "q1") setScreen("start");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary px-4 py-10 sm:py-16">
      <div className="w-full max-w-xl">
        {screen === "start" ? (
          <section
            className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-10"
            aria-labelledby="quiz-start-title"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <FileSearch aria-hidden="true" className="h-6 w-6" />
            </div>
            <h1
              id="quiz-start-title"
              className="mt-6 text-center text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl"
            >
              Informação é essencial na hora de escolher
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
              Responda a duas perguntas rápidas sobre como você busca informações para conhecer
              melhor os candidatos.
            </p>
            <button
              type="button"
              onClick={() => setScreen("q1")}
              className="mt-8 flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-gold px-8 text-base font-bold text-gold-foreground shadow-cta transition-colors hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
            >
              <Sparkles aria-hidden="true" className="h-5 w-5" />
              Começar
            </button>
            <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-primary" />
              Leva menos de um minuto.
            </p>
          </section>
        ) : (
          <section
            className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-10"
            aria-labelledby={screen === "q1" ? "quiz-q1-title" : "quiz-q2-title"}
          >
            <Progresso atual={screen === "q1" ? 1 : 2} />
            <h2
              id={screen === "q1" ? "quiz-q1-title" : "quiz-q2-title"}
              className="mt-6 text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl"
            >
              {screen === "q1" ? PERGUNTA_1.titulo : PERGUNTA_2.titulo}
            </h2>
            <div className="mt-6 flex flex-col gap-3" role="group">
              {(screen === "q1" ? PERGUNTA_1.alternativas : PERGUNTA_2.alternativas).map(
                (texto, i) => (
                  <Alternativa
                    key={texto}
                    texto={texto}
                    selecionada={(screen === "q1" ? resposta1 : resposta2) === i}
                    onSelect={() => selecionar(screen === "q1" ? 1 : 2, i)}
                  />
                ),
              )}
            </div>
            {erro && (
              <p role="alert" className="mt-4 text-sm font-semibold text-destructive">
                {erro}
              </p>
            )}
            <button
              type="button"
              onClick={screen === "q1" ? continuarDaPrimeira : finalizar}
              className="mt-6 flex min-h-14 w-full items-center justify-center rounded-lg bg-gold px-8 text-base font-bold text-gold-foreground shadow-cta transition-colors hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
            >
              {screen === "q1" ? "Continuar" : "Conhecer o guia"}
            </button>
            <button
              type="button"
              onClick={voltar}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              Voltar
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
