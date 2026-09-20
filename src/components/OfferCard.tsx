// src/components/OfferCard.tsx
import { useEffect, useState } from "react";

type OfferCardProps = {
  title?: string;
  subtitle?: string;
  badge?: string;
  installments?: number;
  installmentPrice?: number;
  installmentOldPrice?: number | null;
  cashPrice?: number;
  cashOldPrice?: number | null;
  proofHighlight?: string;
  proofText?: string;
  avatars?: string[];
  barPercent?: number;
  ctaText?: string;
  ctaUrl?: string;
  onCtaClick?: () => void;
};

const brl = (v: number) => v.toFixed(2).replace(".", ",");

export function OfferCard({
  title = "Sua Blindagem Eleitoral",
  subtitle = "Um pagamento. Sem renovação.",
  badge = "Oferta",
  installments = 4,
  installmentPrice = 4.97,
  installmentOldPrice = null,
  cashPrice = 19.9,
  cashOldPrice = 36.9,
  proofHighlight = "Mais de 300",
  proofText = "já estão estudando o guia",
  avatars = [],
  barPercent = 100,
  ctaText = "QUERO ACESSAR MEU GUIA AGORA",
  ctaUrl = "#checkout",
  onCtaClick,
}: OfferCardProps) {
  const pct = Math.max(0, Math.min(100, barPercent));

  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setFilled(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);

  const [int, cents] = installmentPrice.toFixed(2).split(".");

  return (
    <article className="w-full max-w-sm rounded-2xl border border-border bg-background p-6">
      <header className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-[1.75rem] font-bold leading-tight text-foreground">
          {title}
        </h2>
        {badge && (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-primary px-3.5 py-1 font-serif text-sm font-bold text-primary-foreground">
            {badge}
          </span>
        )}
      </header>
      <p className="mt-1.5 text-base text-muted-foreground">{subtitle}</p>

      <div className="mt-7">
        {installmentOldPrice ? (
          <div className="font-serif text-base text-muted-foreground line-through">
            {installments}x de R$ {brl(installmentOldPrice)}
          </div>
        ) : null}

        <div className="mt-1.5 flex items-baseline gap-2 font-serif text-foreground">
          <span className="text-2xl font-medium">{installments}x de</span>
          <span className="text-5xl font-bold leading-none">R$ {int}</span>
          <span className="text-3xl font-bold text-muted-foreground">,{cents}</span>
        </div>

        <p className="mt-2 text-base text-muted-foreground">
          ou {cashOldPrice ? <s className="mr-1">R$ {brl(cashOldPrice)}</s> : null}
          <strong className="font-bold text-foreground">R$ {brl(cashPrice)}</strong> à vista
        </p>
      </div>

      <section className="mt-5 rounded-2xl bg-muted/50 p-5">
        {avatars.length > 0 && (
          <div className="mb-3.5 flex">
            {avatars.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className={`size-10 shrink-0 rounded-full border-2 border-background object-cover ${
                  i > 0 ? "-ml-3" : ""
                } ${i >= 6 ? "hidden min-[401px]:block" : ""}`}
              />
            ))}
          </div>
        )}

        <p className="text-base leading-snug text-muted-foreground">
          <strong className="font-bold text-foreground">{proofHighlight}</strong> {proofText}
        </p>

        <div
          className="relative mt-4 h-3"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="absolute inset-0 rounded-full bg-muted" />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-[900ms] ease-out motion-reduce:transition-none"
            style={{ width: `${filled}%` }}
          />
          <svg
            viewBox="0 0 40 40"
            aria-hidden="true"
            className="absolute top-1/2 size-[30px] -translate-x-1/2 -translate-y-1/2 drop-shadow-md transition-[left] duration-[900ms] ease-out motion-reduce:transition-none"
            style={{ left: `${filled}%` }}
          >
            <circle cx="20" cy="20" r="18" fill="#fff" />
            <circle cx="20" cy="20" r="18" fill="none" stroke="#2f7d4f" strokeWidth="3" />
            <path
              d="M12 20.5l5.5 5.5L28.5 14.5"
              fill="none"
              stroke="#2f7d4f"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <a
        href={ctaUrl}
        onClick={onCtaClick}
        className="mt-5 block text-balance rounded-xl bg-primary px-4 py-[18px] text-center text-base font-bold leading-tight tracking-[0.01em] text-primary-foreground ring-4 ring-primary/15 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
      >
        {ctaText}
      </a>
    </article>
  );
}
