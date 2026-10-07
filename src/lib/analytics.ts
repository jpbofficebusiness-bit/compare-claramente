import { sendMetaEvent } from "./meta-capi";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: AnalyticsPayload[];
    fbq?: (...args: unknown[]) => void;
    __metaPageViewId?: string;
  }
}

function newEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Envia o evento para a Meta pelo Pixel (navegador) e pela API de Conversões (servidor),
 * com o mesmo eventID para a Meta deduplicar.
 * Passe `eventId` quando o Pixel já tiver disparado o evento com esse ID.
 */
export function trackMeta(
  eventName: string,
  customData?: Record<string, string | number | boolean>,
  eventId?: string,
) {
  if (typeof window === "undefined") return;
  const id = eventId ?? newEventId();
  if (!eventId) window.fbq?.("track", eventName, customData ?? {}, { eventID: id });
  sendMetaEvent({
    data: { eventName, eventId: id, eventSourceUrl: window.location.href, customData },
  }).catch(() => {});
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

export const CHECKOUT_URL = "https://checkout.wiven.com.br/checkout/cmtgb8nt70sl901ptq2trevnk?offer=DISP4A2";

export function goToCheckout(location: string) {
  track("begin_checkout", { location, item_name: "ebook_lula_x_bolsonaro" });
  trackMeta("InitiateCheckout", { content_name: "ebook_lula_x_bolsonaro" });
  if (CHECKOUT_URL.startsWith("http")) {
    window.location.href = CHECKOUT_URL;
  }
}
