import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const cta = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60",
  {
    variants: {
      tone: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        gold: "bg-gold text-gold-foreground shadow-cta hover:bg-gold/90",
        outline: "border border-primary/30 bg-card text-primary hover:bg-secondary",
        quiet: "text-primary underline underline-offset-4 hover:text-primary/80",
      },
      size: {
        sm: "min-h-10 px-4 text-sm",
        md: "min-h-12 px-6 text-base",
        lg: "min-h-14 px-8 text-base md:text-lg",
      },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { tone: "primary", size: "md", full: false },
  },
);

type Props = React.ComponentProps<"a"> &
  VariantProps<typeof cta> & {
    /** Nome do evento de analytics disparado no clique. */
    event?: string;
    /** Onde na página o CTA está (para segmentar o relatório). */
    location: string;
  };

export function CtaLink({
  className,
  tone,
  size,
  full,
  event = "cta_click",
  location,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <a
      className={cn(cta({ tone, size, full }), className)}
      onClick={(e) => {
        track(event, { location, label: typeof children === "string" ? children : undefined });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
