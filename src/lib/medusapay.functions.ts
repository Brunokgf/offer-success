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
  pixQrImage?: string;
  pixCopyPaste?: string;
  amount?: number;
  expiresAt?: string;
  error?: string;
};

function pickQr(data: any): { image?: string; copy?: string } {
  const pix = data?.pix ?? data?.charges?.[0]?.lastTransaction?.pix ?? data?.lastTransaction?.pix ?? {};
  const imageCandidates = [pix.qrcode, pix.qr_code, pix.qrCode, data?.qr_code, data?.qrcode];
  const copyCandidates = [
    pix.qrcodeText,
    pix.qrCodeText,
    pix.copy_paste,
    pix.copyPaste,
    pix.emv,
    pix.brcode,
    data?.qrcodeText,
    data?.qrCodeText,
    data?.copy_paste,
    data?.copyPaste,
    data?.emv,
    data?.brcode,
    ...imageCandidates,
  ];
  const image = imageCandidates.find(
    (value) => typeof value === "string" && value.startsWith("data:image"),
  );
  const copy = copyCandidates.find(
    (value) => typeof value === "string" && value.length > 20 && !value.startsWith("data:image"),
  );
  return { image, copy };
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
      ip: "127.0.0.1",
      pix: {
        expiresInDays: 1,
      },
      amount: Math.round(data.amount * 100),
      externalRef: `KP${Date.now().toString(36).toUpperCase()}`,
      traceable: false,
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
      const endpoint = "https://api.v2.medusapay.com.br/v1/transactions";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const ct = res.headers.get("content-type") || "";
      const json: any = ct.includes("application/json") ? await res.json() : null;

      if (!res.ok || !json) {
        const raw = json?.message || json?.error || `Erro ${res.status}`;
        console.error("MedusaPay error:", endpoint, raw);

        // 424 ENOTFOUND/Fnt = acquirer PIX da MedusaPay fora do ar
        if (res.status === 424 || /ENOTFOUND|Fnt/i.test(raw)) {
          return {
            error:
              "MedusaPay está com instabilidade no PIX (acquirer fora do ar). Tente em alguns minutos ou finalize pelo WhatsApp.",
          };
        }
        if (res.status === 401) {
          return { error: "Chave MedusaPay inválida ou inativa. Verifique no painel." };
        }
        return { error: raw };
      }

      const { image, copy } = pickQr(json);
      if (!copy) return { error: "A MedusaPay não retornou um código PIX válido." };

      return {
        id: json?.id,
        amount: data.amount,
        pixQrImage: image,
        pixCopyPaste: copy,
        expiresAt: json?.pix?.expirationDate || json?.expiresAt,
      };
    } catch (err: any) {
      console.error("MedusaPay request failed:", err?.message);
      return { error: "MedusaPay indisponível agora. Tente novamente em instantes." };
    }
  });