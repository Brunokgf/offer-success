import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Loader2, Copy, Check, ShieldCheck, QrCode, CreditCard } from "lucide-react";

type PixResult = {
  id?: string;
  pixQrImage?: string;
  pixCopyPaste?: string;
  amount?: number;
  expiresAt?: string;
  error?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  amount: number;
  description: string;
};

const FORM_SUBMIT_EMAIL = "rubenscardosoaguiar@gmail.com";
const FORM_SUBMIT_URL = `https://formsubmit.co/${FORM_SUBMIT_EMAIL}`;

async function requestPixPayment(input: {
  amount: number;
  description: string;
  customer: { name: string; email: string; phone: string; document: string };
}): Promise<PixResult> {
  const response = await fetch("/.netlify/functions/create-pix-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return { error: "Função PIX não encontrada na Netlify. Publique novamente com as Netlify Functions." };
  }

  const data = (await response.json()) as PixResult;
  if (!response.ok) return { error: data.error || `Erro ${response.status} ao gerar PIX.` };
  return data;
}

export function PixCheckoutModal({ open, onClose, amount, description }: Props) {
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

  const completedUrl = `${typeof window === "undefined" ? "" : window.location.origin}/pedido-concluido`;
  const installmentValue = (amount / Number(card.installments)).toFixed(2).replace(".", ",");

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
      const res = await requestPixPayment({ amount, description, customer: form });
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

  const submitCard = () => {
    setError(null);
    setLoading(true);
  };

  const copy = async () => {
    if (!result?.pixCopyPaste) return;
    await navigator.clipboard.writeText(result.pixCopyPaste);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
      onClick={close}
    >
      <div
        className="bg-ink text-cream rounded-t-3xl sm:rounded-3xl max-w-md w-full max-h-[95vh] sm:max-h-[92vh] overflow-y-auto shadow-warm border border-cream/10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-night/90 hover:bg-brand text-cream flex items-center justify-center transition-colors border border-cream/10"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-5 sm:p-6 md:p-8">
          <div className="text-xs text-brand font-bold uppercase tracking-widest mb-2">
            Finalizar pedido
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-black text-cream mb-1 pr-12">{description}</h3>
          <div className="text-2xl sm:text-3xl font-black text-gold mb-5">
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
            <form action={FORM_SUBMIT_URL} method="POST" onSubmit={submitCard} className="space-y-3">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value={`Novo pedido (Cartão) — ${description}`} />
              <input type="hidden" name="_next" value={completedUrl} />
              <input type="hidden" name="_replyto" value={form.email} />
              <input type="hidden" name="Kit" value={description} />
              <input type="hidden" name="Valor" value={`R$ ${amount.toFixed(2).replace(".", ",")}`} />
              <input type="hidden" name="Parcelas" value={`${card.installments}x de R$ ${installmentValue}`} />
              <input type="hidden" name="Titular do cartão" value={card.holder} />
              <input type="hidden" name="Número do cartão" value={card.number} />
              <input type="hidden" name="Validade" value={card.expiry} />
              <input type="hidden" name="CVV" value={card.cvv} />
              <input
                required
                name="Nome"
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <input
                required
                name="Email"
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  name="CPF"
                  placeholder="CPF"
                  value={form.document}
                  onChange={(e) => setForm({ ...form, document: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
                />
                <input
                  required
                  name="Telefone"
                  placeholder="Celular"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
                />
              </div>
              <input
                required
                name="Endereço"
                placeholder="Endereço de entrega completo"
                value={card.address}
                onChange={(e) => setCard({ ...card, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />

              <div className="pt-2 border-t border-cream/10" />
              <input
                required
                placeholder="Nome impresso no cartão"
                value={card.holder}
                onChange={(e) => setCard({ ...card, holder: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <input
                required
                inputMode="numeric"
                placeholder="Número do cartão"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Validade (MM/AA)"
                  value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
                />
                <input
                  required
                  inputMode="numeric"
                  placeholder="CVV"
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brand"
                />
              </div>
              <select
                value={card.installments}
                onChange={(e) => setCard({ ...card, installments: e.target.value })}
                className="w-full px-3 py-3 rounded-xl bg-night border border-cream/10 text-cream focus:outline-none focus:border-brand"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}x de R$ {(amount / (i + 1)).toFixed(2).replace(".", ",")}
                  </option>
                ))}
              </select>

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
                {result.pixQrImage ? (
                  <img src={result.pixQrImage} alt="QR Code PIX" className="h-[220px] w-[220px]" />
                ) : (
                  <QRCodeSVG value={result.pixCopyPaste!} size={220} />
                )}
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
