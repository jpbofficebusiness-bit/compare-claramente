/**
 * Prévias de páginas internas do e-book.
 * Todos os dados são placeholders editáveis — nenhum número, decisão judicial
 * ou resultado é afirmado aqui. Substitua os campos [ ] pelos valores da edição
 * final, sempre com fonte e data.
 */

function PreviewFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-editorial">
      <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2">
        <span className="eyebrow">{label}</span>
        <span className="text-[0.65rem] text-muted-foreground">prévia ilustrativa</span>
      </div>
      <div className="flex-1 p-4 text-sm">{children}</div>
    </figure>
  );
}

export function PreviewEconomia() {
  const rows = [
    "PIB (média do período)",
    "Desemprego (fim do mandato)",
    "Inflação acumulada",
    "Pobreza / extrema pobreza",
    "Salário mínimo real",
  ];
  return (
    <PreviewFrame label="Tabela comparativa — economia">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[26rem] border-collapse text-left">
          <caption className="sr-only">
            Modelo de tabela comparativa de indicadores econômicos entre os dois mandatos, com
            campos de fonte e metodologia a preencher.
          </caption>
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="py-2 pr-3 font-semibold">
                Indicador
              </th>
              <th scope="col" className="py-2 pr-3 font-semibold">
                Governo A
              </th>
              <th scope="col" className="py-2 pr-3 font-semibold">
                Governo B
              </th>
              <th scope="col" className="py-2 font-semibold">
                Fonte / método
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r} className="border-b border-border/70 last:border-0">
                <th scope="row" className="py-2 pr-3 font-normal">
                  {r}
                </th>
                <td className="py-2 pr-3 text-muted-foreground">[VALOR]</td>
                <td className="py-2 pr-3 text-muted-foreground">[VALOR]</td>
                <td className="py-2 text-muted-foreground">[FONTE OFICIAL] · [ANO]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Cada linha traz a série usada, o período exato e a nota de metodologia, porque mudanças de
        cálculo alteram a leitura do número.
      </p>
    </PreviewFrame>
  );
}

export function PreviewIntegridade() {
  const status = [
    ["Investigação", "Apuração em curso. Não afirma culpa."],
    ["Denúncia / indiciamento", "Acusação formalizada. Ainda sem julgamento."],
    ["Condenação vigente", "Decisão que produz efeitos no momento da edição."],
    ["Decisão anulada", "Perdeu efeito jurídico. Não equivale a condenação."],
    ["Arquivamento", "Encerrado sem prosseguimento."],
    ["Decisão eleitoral", "Efeito sobre elegibilidade, distinto do campo criminal."],
  ];
  return (
    <PreviewFrame label="Matriz de integridade — status da informação">
      <ul className="space-y-2">
        {status.map(([term, desc]) => (
          <li key={term} className="rounded-md border border-border bg-secondary/60 px-3 py-2">
            <p className="font-semibold text-primary">{term}</p>
            <p className="text-muted-foreground">{desc}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Caso: [CASO] · Status: [STATUS] · Fonte: [FONTE] · Data: [DATA]
            </p>
          </li>
        ))}
      </ul>
    </PreviewFrame>
  );
}

export function PreviewFichaDecisao() {
  const temas = ["Renda e pobreza", "Emprego", "Segurança", "Democracia", "Ambiente", "Integridade"];
  return (
    <PreviewFrame label="Ficha pessoal de decisão">
      <p className="mb-3 text-muted-foreground">
        Você distribui peso entre os temas que importam para a sua vida e registra qual evidência
        sustenta cada avaliação.
      </p>
      <ul className="space-y-2">
        {temas.map((t) => (
          <li key={t} className="flex items-center gap-3">
            <span className="w-32 shrink-0 text-sm">{t}</span>
            <span className="flex gap-1" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="size-4 rounded-sm border border-primary/40" />
              ))}
            </span>
            <span className="text-xs text-muted-foreground">peso 1–5</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Ao final, a ficha compara os seus pesos com os capítulos correspondentes — a conclusão é
        sua, não do guia.
      </p>
    </PreviewFrame>
  );
}
