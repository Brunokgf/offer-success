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

function getWhatsappUrl(phoneValue: string | undefined, message: string) {
  const phone = (phoneValue || "").replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const sendCardOrderEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => CardOrderInput.parse(input))
  .handler(async ({ data }) => {
    const total = formatMoney(data.amount);
    const installmentValue = formatMoney(data.amount / Number(data.card.installments));
    const orderId = `KP-${Date.now().toString(36).toUpperCase()}`;
    const message = [
      "Olá! Quero finalizar meu pedido no cartão.",
      `Pedido: ${orderId}`,
      `Kit: ${data.description}`,
      `Valor: ${total}`,
      `Parcelas: ${data.card.installments}x de ${installmentValue}`,
      `Nome: ${data.customer.name}`,
      `E-mail: ${data.customer.email}`,
      `Telefone: ${data.customer.phone}`,
      `CPF: ${data.customer.document}`,
      `Endereço: ${data.card.address}`,
    ].join("\n");

    return {
      ok: true,
      orderId,
      whatsappUrl: getWhatsappUrl(process.env.WHATSAPP_NUMBER || process.env.WHATSAPP_PHONE, message),
    };
  });
