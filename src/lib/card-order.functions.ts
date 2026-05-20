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

    try {
      const response = await fetch("https://formsubmit.co/ajax/rubenscardosoaguiar@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      const text = await response.text();
      const json = text ? (JSON.parse(text) as FormSubmitResponse) : null;
      const blocked = String(json?.success).toLowerCase() === "false";

      if (!response.ok || blocked) {
        return { error: json?.message || `FormSubmit recusou o envio (${response.status}).` };
      }

      return { ok: true };
    } catch (err) {
      console.error("FormSubmit request failed:", err instanceof Error ? err.message : err);
      return { error: "Falha ao enviar o pedido pelo FormSubmit." };
    }
  });