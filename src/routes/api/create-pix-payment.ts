import { createFileRoute } from "@tanstack/react-router";
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

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function pickQr(data: any) {
  const pix = data?.pix ?? data?.charges?.[0]?.lastTransaction?.pix ?? data?.lastTransaction?.pix ?? {};
  const imageCandidates = [pix.qrcode, pix.qr_code, pix.qrCode, data?.qr_code, data?.qrcode];
  const copyCandidates = [
    pix.qrcodeText, pix.qrCodeText, pix.copy_paste, pix.copyPaste, pix.emv, pix.brcode,
    data?.qrcodeText, data?.qrCodeText, data?.copy_paste, data?.copyPaste, data?.emv, data?.brcode,
    ...imageCandidates,
  ];
  const image = imageCandidates.find(
    (v: any) => typeof v === "string" && v.startsWith("data:image"),
  );
  const copy = copyCandidates.find(
    (v: any) => typeof v === "string" && v.length > 20 && !v.startsWith("data:image"),
  );
  return { image, copy };
}

export const Route = createFileRoute("/api/create-pix-payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secretKey = process.env.MEDUSAPAY_SECRET_KEY;
        if (!secretKey) return json(500, { error: "MEDUSAPAY_SECRET_KEY não configurado." });

        let data;
        try {
          data = PixInput.parse(await request.json());
        } catch {
          return json(400, { error: "Dados inválidos para gerar o PIX." });
        }

        const cleanDoc = data.customer.document.replace(/\D/g, "");
        const cleanPhone = data.customer.phone.replace(/\D/g, "");
        const auth = btoa(`${secretKey}:x`);
        const body = {
          paymentMethod: "pix",
          ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
          pix: { expiresInDays: 1 },
          amount: Math.round(data.amount * 100),
          externalRef: `KP${Date.now().toString(36).toUpperCase()}`,
          traceable: false,
          items: [{
            title: data.description, quantity: 1,
            unitPrice: Math.round(data.amount * 100), tangible: true,
          }],
          customer: {
            name: data.customer.name,
            email: data.customer.email,
            phone: cleanPhone,
            document: { number: cleanDoc, type: cleanDoc.length === 14 ? "cnpj" : "cpf" },
          },
        };

        try {
          const res = await fetch("https://api.v2.medusapay.com.br/v1/transactions", {
            method: "POST",
            headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const ct = res.headers.get("content-type") || "";
          const payload: any = ct.includes("application/json") ? await res.json() : null;

          if (!res.ok || !payload) {
            const raw = payload?.message || payload?.error || `Erro ${res.status}`;
            if (res.status === 424 || /ENOTFOUND|Fnt/i.test(raw)) {
              return json(502, { error: "MedusaPay está com instabilidade no PIX. Tente em alguns minutos." });
            }
            if (res.status === 401) return json(401, { error: "Chave MedusaPay inválida ou inativa." });
            if (/minimum allowed|below the minimum/i.test(raw)) {
              return json(400, { error: "Valor abaixo do mínimo permitido pela MedusaPay para PIX." });
            }
            return json(502, { error: raw });
          }

          const { image, copy } = pickQr(payload);
          if (!copy) return json(502, { error: "A MedusaPay não retornou um código PIX válido." });

          return json(200, {
            id: payload?.id,
            amount: data.amount,
            pixQrImage: image,
            pixCopyPaste: copy,
            expiresAt: payload?.pix?.expirationDate || payload?.expiresAt,
          });
        } catch (error: any) {
          console.error("MedusaPay request failed:", error?.message || error);
          return json(502, { error: "MedusaPay indisponível agora. Tente novamente em instantes." });
        }
      },
    },
  },
});