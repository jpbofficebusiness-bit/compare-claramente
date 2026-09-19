import { useEffect, useMemo, useState } from "react";
import MarianaCosta from "@/assets/01-mariana-costa.jpg";
import LeandroSilva from "@/assets/02-leandro-silva.jpg";
import CarlosEduardo from "@/assets/03-carlos-eduardo.jpg";
import JoanaCruz from "@/assets/04-joana-cruz.jpg";
import JulianaFreitas from "@/assets/05-juliana-freitas.jpg";
import BeatrizLima from "@/assets/06-beatriz-lima.jpg";
import FelipeRocha from "@/assets/07-felipe-rocha.jpg";
import RodrigoMendes from "@/assets/08-rodrigo-mendes.jpg";
import PatriciaDias from "@/assets/09-patricia-dias.jpg";
import ThiagoMartins from "@/assets/10-thiago-martins.jpg";

const avaliacoes = [
  {
    nome: "Mariana Costa",
    plataforma: "Instagram",
    texto: "Abriu meus olhos sem puxar sardinha para nenhum lado. Essencial!",
    estrelas: 5,
    iniciais: "MC",
    foto: MarianaCosta,
  },
  {
    nome: "Leandro Silva",
    plataforma: "Instagram",
    texto: "Abriu meus olhos sem puxar sardinha para nenhum lado. Essencial!",
    estrelas: 4,
    iniciais: "LS",
    foto: LeandroSilva,
  },
  {
    nome: "Carlos Eduardo",
    plataforma: "Facebook",
    texto: "Imparcialidade pura. Mostra os acertos e erros dos dois governos com fatos.",
    estrelas: 5,
    iniciais: "CE",
    foto: CarlosEduardo,
  },
  {
    nome: "Joana Cruz",
    plataforma: "Instagram",
    texto: "Leitura rápida e direta ao ponto. Me ajudou muito a decidir meu voto.",
    estrelas: 5,
    iniciais: "JC",
    foto: JoanaCruz,
  },
  {
    nome: "Juliana Freitas",
    plataforma: "Gmail",
    texto: "Excelente para quem quer fugir da polarização e entender o cenário real.",
    estrelas: 4,
    iniciais: "JF",
    foto: JulianaFreitas,
  },
  {
    nome: "Beatriz Lima",
    plataforma: "Facebook",
    texto: "Gráficos e comparativos impecáveis. Conteúdo de primeiríssima linha.",
    estrelas: 5,
    iniciais: "BL",
    foto: BeatrizLima,
  },
  {
    nome: "Felipe Rocha",
    plataforma: "Facebook",
    texto: "Conteúdo sério, baseado em dados oficiais. Vale cada centavo.",
    estrelas: 5,
    iniciais: "FR",
    foto: FelipeRocha,
  },
  {
    nome: "Rodrigo Mendes",
    plataforma: "Gmail",
    texto: "O livro que todo cidadão deveria ler antes de ir às urnas.",
    estrelas: 4,
    iniciais: "RM",
    foto: RodrigoMendes,
  },
  {
    nome: "Patrícia Dias",
    plataforma: "Instagram",
    texto: "Me deu total autonomia intelectual para analisar os candidatos.",
    estrelas: 5,
    iniciais: "PD",
    foto: PatriciaDias,
  },
  {
    nome: "Thiago Martins",
    plataforma: "Instagram",
    texto: "Conteúdo sério, baseado em dados oficiais. Vale cada centavo.",
    estrelas: 5,
    iniciais: "TM",
    foto: ThiagoMartins,
  },
];

const ATRASO_INICIAL = 10000;
const TEMPO_VISIVEL = 6000;
const INTERVALO_OCULTO = 1000;

export function SocialProofNotification() {
  const [visivel, setVisivel] = useState(false);
  const [pos, setPos] = useState(0);

  const ordem = useMemo(
    () =>
      [...avaliacoes]
        .map((avaliacao) => ({
          avaliacao,
          ordem: Math.random(),
        }))
        .sort((a, b) => a.ordem - b.ordem)
        .map((item) => item.avaliacao),
    [],
  );

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const agendar = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    let primeira = true;

    const ciclo = () => {
      if (primeira) {
        primeira = false;
      } else {
        setPos((posAtual) => (posAtual + 1) % ordem.length);
      }

      setVisivel(true);

      agendar(() => {
        setVisivel(false);
        agendar(ciclo, INTERVALO_OCULTO);
      }, TEMPO_VISIVEL);
    };

    agendar(ciclo, ATRASO_INICIAL);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [ordem]);

  const avaliacao = ordem[pos];
  if (!avaliacao) return null;

  return (
    <div
      className={`fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 mx-auto max-w-sm transition-all duration-500 sm:bottom-5 sm:left-auto sm:right-5 sm:mx-0 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-background p-3 shadow-xl">
        <img
          src={avaliacao.foto}
          alt={`Foto de ${avaliacao.nome}`}
          className="size-12 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-semibold text-foreground">{avaliacao.nome}</span>

            <span className="shrink-0 text-xs tracking-wide text-gold">
              {"★".repeat(avaliacao.estrelas)}
              <span className="text-muted-foreground">{"★".repeat(5 - avaliacao.estrelas)}</span>
            </span>
          </div>

          <div className="text-xs text-muted-foreground">{avaliacao.plataforma}</div>

          <p className="mt-1 text-sm leading-snug text-foreground">“{avaliacao.texto}”</p>
        </div>
      </div>
    </div>
  );
}
