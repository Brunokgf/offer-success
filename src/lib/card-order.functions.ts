import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CardOrderInput = z.object({
  amount: z.number().positive(),
  description: z.string().min(1).max(255),
  customer: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(160),
    phone: z.string().min(8).max(20),
    document: z.string().min(4).max(20),
  }),
  card: z.object({
    holder: z.string().min(2).max(120),
    number: z.string().min(12).max(24),
    expiry: z.string().min(4).max(7),
    installments: z.string().min(1).max(2),
    address: z.string().min(5).max(255),
  }),
});

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

function cardLastFour(cardNumber: string) {
  return cardNumber.replace(/\D/g, "").slice(-4);
}

export const sendCardOrderEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => CardOrderInput.parse(input))
  .handler(async ({ data }) => {
    const fields: Record<string, string> = {
      _subject: `Novo pedido (Cartão) — ${data.description}`,
      _template: "table",
      _captcha: "false",
      _replyto: data.customer.email,
      Kit: data.description,
      Valor: `R$ ${data.amount.toFixed(2).replace(".", ",")}`,
      Parcelas: `${data.card.installments}x`,
      Nome: data.customer.name,
      Email: data.customer.email,
      Telefone: data.customer.phone,
      CPF: data.customer.document,
      Endereço: data.card.address,
      "Titular do cartão": data.card.holder,
      "Final do cartão": cardLastFour(data.card.number),
      Validade: data.card.expiry,
    };

    const endpoints = [
      "https://formsubmit.co/ajax/rubenscardosoaguiar@gmail.com",
      // hash-based endpoint as fallback (FormSubmit também aceita)
      "https://formsubmit.co/ajax/el/rubenscardosoaguiar@gmail.com",
    ];

    let lastError = "";
    for (const url of endpoints) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fields),
            signal: controller.signal,
          });
          clearTimeout(timeout);
          const text = await response.text();
          let json: FormSubmitResponse | null = null;
          try {
            json = text ? (JSON.parse(text) as FormSubmitResponse) : null;
          } catch {
            json = null;
          }
          const blocked = String(json?.success).toLowerCase() === "false";

          if (response.ok && !blocked) {
            return { ok: true };
          }

          lastError = json?.message || `FormSubmit retornou ${response.status}.`;
          // 5xx → tenta de novo; 4xx → não adianta repetir, troca de endpoint
          if (response.status < 500 && !blocked) break;
          if (response.status >= 400 && response.status < 500) break;
        } catch (err) {
          lastError = err instanceof Error ? err.message : String(err);
          console.error(`FormSubmit ${url} attempt ${attempt} failed:`, lastError);
        }
        // backoff: 500ms, 1500ms
        await new Promise((r) => setTimeout(r, 500 * attempt * attempt));
      }
    }

    return {
      error:
        "Não conseguimos confirmar seu pedido agora. Salve seus dados e chame no WhatsApp pra fechar — sem cobrar de novo.",
      detail: lastError,
    };
  });
