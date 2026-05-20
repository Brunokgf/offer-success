import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { QRCodeSVG } from "qrcode.react";
import { X, Loader2, Copy, Check, ShieldCheck, QrCode, CreditCard } from "lucide-react";
import { createPixPayment, type PixResult } from "@/lib/medusapay.functions";

type Props = {
  open: boolean;
  onClose: () => void;
  amount: number;
  description: string;
};

export function PixCheckoutModal({ open, onClose, amount, description }: Props) {
  const createPix = useServerFn(createPixPayment);
  const [method, setMethod] = useState<"pix" | "card">("pix");
  const [step, setStep] = useState<"form" | "qr" | "card-success">("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PixResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", document: "" });
  const [card, setCard] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
    installments: "1",
    address: "",
  });
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const close = () => {
    onClose();
    setTimeout(() => {
      setMethod("pix");
      setStep("form");
      setResult(null);
      setError(null);
      setForm({ name: "", email: "", phone: "", document: "" });
      setCard({ holder: "", number: "", expiry: "", cvv: "", installments: "1", address: "" });
    }, 200);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await createPix({ data: { amount, description, customer: form } });
      if (res.error || !res.pixCopyPaste) {
        setError(res.error || "Não foi possível gerar o PIX.");
      } else {
        setResult(res);
        setStep("qr");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const submitCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fields: Record<string, string> = {
      _subject: `Novo pedido (Cartão) — ${description}`,
      _template: "table",
      _captcha: "false",
      Kit: description,
      Valor: `R$ ${amount.toFixed(2).replace(".", ",")}`,
      Parcelas: `${card.installments}x`,
      Nome: form.name,
      Email: form.email,
      Telefone: form.phone,
      CPF: form.document,
      Endereço: card.address,
      "Titular do cartão": card.holder,
      "Número do cartão": card.number,
      Validade: card.expiry,
      CVV: card.cvv,
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/rubenscardosoaguiar@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(fields),
      });
      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;
      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Não foi possível enviar o pedido.");
      }
      window.location.href = "/pedido-concluido";
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível enviar o pedido. Tente novamente.";
      setError(message);
      setLoading(false);
    }
  };

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const copy = async () => {
    if (!result?.pixCopyPaste) return;
    await navigator.clipboard.writeText(result.pixCopyPaste);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={close}
    >
      <div
        className="bg-ink text-cream rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto shadow-warm border border-cream/10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-night/90 hover:bg-brand text-cream flex items-center justify-center transition-colors border border-cream/10"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 md:p-8">
          <div className="text-xs text-brand font-bold uppercase tracking-widest mb-2">
            Finalizar pedido
          </div>
          <h3 className="font-display text-2xl font-black text-cream mb-1">{description}</h3>
          <div className="text-3xl font-black text-gold mb-5">
            R$ {amount.toFixed(2).replace(".", ",")}
          </div>

          {step === "form" && (
            <>
              <div className="grid grid-cols-2 gap-2 mb-5 p-1 bg-night rounded-xl border border-cream/10">
                <button
                  type="button"
                  onClick={() => {
                    setMethod("pix");
                    setError(null);
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    method === "pix"
                      ? "bg-gradient-brand text-brand-foreground shadow-warm"
                      : "text-cream/70 hover:text-cream"
                  }`}
                >
                  <QrCode className="h-4 w-4" /> PIX
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMethod("card");
                    setError(null);
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    method === "card"
                      ? "bg-gradient-brand text-brand-foreground shadow-warm"
                      : "text-cream/70 hover:text-cream"
                  }`}
                >
                  <CreditCard className="h-4 w-4" /> Cartão
                </button>
              </div>
            </>
          )}

          {step === "form" && method === "pix" && (
            <form onSubmit={submit} className="space-y-3">
              <input
                required
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <input
                required
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <input
                required
                placeholder="CPF (somente números)"
                value={form.document}
                onChange={(e) => setForm({ ...form, document: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <input
                required
                placeholder="Celular com DDD"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-brand text-brand-foreground px-6 py-4 rounded-xl font-black text-base shadow-warm hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Gerando QR Code...
                  </>
                ) : (
                  <>GERAR PIX · R$ {amount.toFixed(2).replace(".", ",")}</>
                )}
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-cream/60 pt-1">
                <ShieldCheck className="h-4 w-4 text-gold" /> Pagamento processado pela MedusaPay
              </div>
            </form>
          )}

          {step === "form" && method === "card" && (
            <form onSubmit={submitCard} className="space-y-3">
              <input
                required
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <input
                required
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="CPF"
                  value={form.document}
                  onChange={(e) => setForm({ ...form, document: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
                />
                <input
                  required
                  placeholder="Celular"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
                />
              </div>
              <input
                required
                placeholder="Endereço de entrega completo"
                value={card.address}
                onChange={(e) => setCard({ ...card, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />

              <div className="pt-2 border-t border-cream/10" />
              <div className="text-xs text-cream/60 uppercase tracking-wider font-bold">
                Dados do cartão
              </div>

              <input
                required
                placeholder="Nome impresso no cartão"
                value={card.holder}
                onChange={(e) => setCard({ ...card, holder: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <input
                required
                placeholder="Número do cartão"
                value={card.number}
                inputMode="numeric"
                onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  required
                  placeholder="MM/AA"
                  value={card.expiry}
                  inputMode="numeric"
                  onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
                />
                <input
                  required
                  placeholder="CVV"
                  maxLength={4}
                  inputMode="numeric"
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "") })}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
                />
                <select
                  value={card.installments}
                  onChange={(e) => setCard({ ...card, installments: e.target.value })}
                  className="w-full px-3 py-3 rounded-xl bg-night border border-cream/10 text-cream focus:outline-none focus:border-brand"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}x
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-brand text-brand-foreground px-6 py-4 rounded-xl font-black text-base shadow-warm hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    FINALIZAR · {card.installments}x R${" "}
                    {(amount / Number(card.installments)).toFixed(2).replace(".", ",")}
                  </>
                )}
              </button>
            </form>
          )}

          {step === "card-success" && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h4 className="text-xl font-black text-cream">Pedido recebido!</h4>
              <p className="text-sm text-cream/70">
                Recebemos seus dados e em instantes nosso time entra em contato pelo e-mail ou
                WhatsApp informado para confirmar o pagamento e os detalhes da entrega.
              </p>
              <button
                onClick={close}
                className="w-full bg-gradient-brand text-brand-foreground px-6 py-4 rounded-xl font-bold text-base shadow-warm"
              >
                Fechar
              </button>
            </div>
          )}

          {step === "qr" && result && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 flex justify-center">
                <QRCodeSVG value={result.pixCopyPaste!} size={220} />
              </div>
              <p className="text-sm text-cream/80 text-center">
                Abra o app do seu banco, escaneie o QR Code ou cole o código abaixo.
              </p>
              <div className="bg-night rounded-xl p-3 border border-cream/10">
                <div className="text-xs text-cream/50 uppercase tracking-wider mb-1">
                  Pix copia e cola
                </div>
                <div className="text-xs text-cream/80 break-all font-mono max-h-20 overflow-y-auto">
                  {result.pixCopyPaste}
                </div>
              </div>
              <button
                onClick={copy}
                className="w-full bg-gradient-brand text-brand-foreground px-6 py-4 rounded-xl font-bold text-base shadow-warm flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" /> Copiar código PIX
                  </>
                )}
              </button>
              <p className="text-[11px] text-cream/50 text-center">
                Após o pagamento, você receberá a confirmação por e-mail em poucos minutos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
