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
    holder: z.string().min(2).max(120).optional().default("Cliente"),
    installments: z.string().min(1).max(2),
    address: z.string().min(5).max(255),
  }),
});

function formatMoney(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

async function sendToFormSubmit(fields: Record<string, string>) {
  const response = await fetch("https://formsubmit.co/ajax/rubenscardosoaguiar@gmail.com", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  const text = await response.text();
  let payload: { success?: boolean | string; message?: string } | null = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }

  const blocked = String(payload?.success).toLowerCase() === "false";
  if (response.ok && !blocked) return { ok: true };
  return { ok: false, error: payload?.message || `FormSubmit retornou ${response.status}.` };
}

export const sendCardOrderEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => CardOrderInput.parse(input))
  .handler(async ({ data }) => {
    const total = formatMoney(data.amount);
    const installmentValue = formatMoney(data.amount / Number(data.card.installments));
    const orderId = `KP-${Date.now().toString(36).toUpperCase()}`;
    const fields = {
      _subject: `Novo pedido (Cartão) — ${data.description}`,
      _template: "table",
      _captcha: "false",
      _next: "/pedido-concluido",
      _replyto: data.customer.email,
      Pedido: orderId,
      Kit: data.description,
      Valor: total,
      Parcelas: `${data.card.installments}x de ${installmentValue}`,
      Nome: data.customer.name,
      Email: data.customer.email,
      Telefone: data.customer.phone,
      CPF: data.customer.document,
      Endereço: data.card.address,
    };

    const result = await sendToFormSubmit(fields);
    if (!result.ok) return { error: result.error };

    return {
      ok: true,
      orderId,
      redirectUrl: fields._next,
    };
  });
