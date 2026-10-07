import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

export const META_PIXEL_ID = "1807620873614301";
const GRAPH_API_VERSION = "v21.0";

type MetaEventInput = {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  customData?: Record<string, string | number | boolean> | undefined;
};

/**
 * Envia um evento para a API de Conversões da Meta (server-side).
 * O token fica apenas no servidor, na variável de ambiente META_CAPI_ACCESS_TOKEN.
 * O eventId deve ser o mesmo usado no fbq() do navegador para a Meta deduplicar.
 */
export const sendMetaEvent = createServerFn({ method: "POST" })
  .validator((data: MetaEventInput) => {
    if (typeof data?.eventName !== "string" || typeof data?.eventId !== "string") {
      throw new Error("Invalid Meta event payload");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const token = process.env["META_CAPI_ACCESS_TOKEN"];
    if (!token) {
      console.warn("META_CAPI_ACCESS_TOKEN não configurado; evento não enviado.");
      return { ok: false };
    }

    const userData: Record<string, string> = {};
    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestIP({ xForwardedFor: true });
    const userAgent = getRequestHeader("user-agent");
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    if (ip) userData["client_ip_address"] = ip;
    if (userAgent) userData["client_user_agent"] = userAgent;
    if (fbp) userData["fbp"] = fbp;
    if (fbc) userData["fbc"] = fbc;

    const body = {
      data: [
        {
          event_name: data.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: data.eventId,
          event_source_url: data.eventSourceUrl,
          action_source: "website",
          user_data: userData,
          ...(data.customData ? { custom_data: data.customData } : {}),
        },
      ],
    };

    try {
      const res = await fetch(
        `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) {
        console.error("Meta CAPI error", res.status, await res.text());
        return { ok: false };
      }
      return { ok: true };
    } catch (error) {
      console.error("Meta CAPI request failed", error);
      return { ok: false };
    }
  });
