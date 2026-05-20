import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PixInput = z.object({
  amount: z.number().positive(),
  description: z.string().min(1).max(255),
  customer: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(160),
    phone: z.string().min(8).max(20),
    document: z.string().min(11).max(20),
  }),
});

export type PixResult = {
  id?: string;
  pixQrCode?: string;
  pixCopyPaste?: string;
  amount?: number;
  expiresAt?: string;
  error?: string;
};

function pickQr(data: any): { qr?: string; copy?: string } {
  const pix = data?.pix ?? data?.charges?.[0]?.lastTransaction?.pix ?? data?.lastTransaction?.pix ?? {};
  const qr = pix.qrcode || pix.qr_code || pix.qrCode || data?.qr_code || data?.qrcode;
  const copy = pix.qrcode || pix.copy_paste || pix.copyPaste || data?.copy_paste || qr;
  return { qr, copy };
}

export const createPixPayment = createServerFn({ method: "POST" })
  .inputValidator((input) => PixInput.parse(input))
  .handler(async ({ data }): Promise<PixResult> => {
    const secretKey = process.env.MEDUSAPAY_SECRET_KEY;
    if (!secretKey) return { error: "MEDUSAPAY_SECRET_KEY não configurado" };

    const auth = Buffer.from(`${secretKey}:x`).toString("base64");
    const cleanDoc = data.customer.document.replace(/\D/g, "");
    const cleanPhone = data.customer.phone.replace(/\D/g, "");

    const body = {
      paymentMethod: "pix",
      amount: Math.round(data.amount * 100),
      items: [
        {
          title: data.description,
          quantity: 1,
          unitPrice: Math.round(data.amount * 100),
          tangible: true,
        },
      ],
      customer: {
        name: data.customer.name,
        email: data.customer.email,
        phone: cleanPhone,
        document: {
          number: cleanDoc,
          type: cleanDoc.length === 14 ? "cnpj" : "cpf",
        },
      },
    };

    try {
      const res = await fetch("https://api.v2.medusapay.com.br/v1/transactions", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const text = await res.text();
        console.error("MedusaPay non-JSON:", text.slice(0, 300));
        return { error: `Resposta inválida (${res.status})` };
      }

      const json = await res.json();
      if (!res.ok) {
        console.error("MedusaPay error:", JSON.stringify(json));
        return { error: json?.message || json?.error || `Erro ${res.status}` };
      }

      const { qr, copy } = pickQr(json);
      return {
        id: json?.id,
        amount: data.amount,
        pixQrCode: qr,
        pixCopyPaste: copy,
        expiresAt: json?.pix?.expirationDate || json?.expiresAt,
      };
    } catch (err: any) {
      console.error("MedusaPay request failed:", err?.message);
      return { error: "Falha ao gerar PIX. Tente novamente." };
    }
  });