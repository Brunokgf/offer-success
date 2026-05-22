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
      const endpoints = [
        "https://api.v2.medusapay.com.br/v1/transactions",
        "https://api.medusapay.com.br/v1/transactions",
      ];

      let json: any = null;
      let lastError = "Falha ao gerar PIX. Tente novamente.";

      for (const endpoint of endpoints) {
        let res: Response;
        try {
          res = await fetch(endpoint, {
            method: "POST",
            headers: {
              Authorization: `Basic ${auth}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        } catch (err: any) {
          lastError = err?.message || lastError;
          console.error("MedusaPay request failed:", endpoint, lastError);
          continue;
        }

        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          const text = await res.text();
          console.error("MedusaPay non-JSON:", endpoint, text.slice(0, 300));
          lastError = `Resposta inválida (${res.status})`;
          if (res.status >= 500) continue;
          return { error: lastError };
        }

        json = await res.json();
        if (res.ok) break;

        lastError = json?.message || json?.error || `Erro ${res.status}`;
        console.error("MedusaPay error:", endpoint, JSON.stringify(json));

        const shouldTryFallback =
          res.status === 424 || res.status >= 500 || /ENOTFOUND|Fnt/i.test(lastError);
        if (!shouldTryFallback) break;
      }

      if (!json || json?.message || json?.error) return { error: lastError };

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