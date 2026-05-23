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

function json(status, body) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function getSiteOrigin(event) {
  const headerOrigin = event.headers.origin || event.headers.Origin;
  if (headerOrigin) return headerOrigin;

  const referer = event.headers.referer || event.headers.Referer;
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      // mantém o fallback abaixo
    }
  }

  return process.env.URL || process.env.DEPLOY_PRIME_URL || "https://lovable.app";
}

function formatMoney(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function getWhatsappUrl(message) {
  const rawNumber = process.env.WHATSAPP_NUMBER || process.env.WHATSAPP_PHONE || "";
  const phone = rawNumber.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
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

  const siteOrigin = getSiteOrigin(event);
  const total = formatMoney(data.amount);
  const installmentValue = formatMoney(data.amount / Number(data.card.installments));
  const orderId = `KP-${Date.now().toString(36).toUpperCase()}`;
  const message = [
    `Olá! Quero finalizar meu pedido no cartão.`,
    `Pedido: ${orderId}`,
    `Kit: ${data.description}`,
    `Valor: ${total}`,
    `Parcelas: ${data.card.installments}x de ${installmentValue}`,
    `Nome: ${data.customer.name}`,
    `E-mail: ${data.customer.email}`,
    `Telefone: ${data.customer.phone}`,
    `CPF: ${data.customer.document}`,
    `Endereço: ${data.card.address}`,
    `Origem: ${siteOrigin}/pedido-concluido`,
  ].join("\n");

  return json(200, {
    ok: true,
    orderId,
    whatsappUrl: getWhatsappUrl(message),
  });
}