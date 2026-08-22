type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: AnalyticsPayload[];
  }
}

/**
 * Envia eventos para o dataLayer (GTM/GA4 ou qualquer consumidor).
 * Não coleta dados pessoais nem identifica o visitante.
 */
export function track(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}

export const CHECKOUT_URL = "[LINK DE CHECKOUT]";

export function goToCheckout(location: string) {
  track("begin_checkout", { location, item_name: "ebook_lula_x_bolsonaro" });
  if (CHECKOUT_URL.startsWith("http")) {
    window.location.href = CHECKOUT_URL;
  }
}
