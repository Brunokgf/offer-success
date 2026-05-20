import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { QRCodeSVG } from "qrcode.react";
import { X, Loader2, Copy, Check, ShieldCheck } from "lucide-react";
import { createPixPayment, type PixResult } from "@/lib/medusapay.functions";

type Props = {
  open: boolean;
  onClose: () => void;
  amount: number;
  description: string;
};

export function PixCheckoutModal({ open, onClose, amount, description }: Props) {
  const createPix = useServerFn(createPixPayment);
  const [step, setStep] = useState<"form" | "qr">("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PixResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", document: "" });
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setResult(null);
      setError(null);
      setForm({ name: "", email: "", phone: "", document: "" });
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
    } catch (err: any) {
      setError(err?.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
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
            Pagamento via PIX
          </div>
          <h3 className="font-display text-2xl font-black text-cream mb-1">
            {description}
          </h3>
          <div className="text-3xl font-black text-gold mb-6">
            R$ {amount.toFixed(2).replace(".", ",")}
          </div>

          {step === "form" && (
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

          {step === "qr" && result && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 flex justify-center">
                <QRCodeSVG value={result.pixCopyPaste!} size={220} />
              </div>
              <p className="text-sm text-cream/80 text-center">
                Abra o app do seu banco, escaneie o QR Code ou cole o código abaixo.
              </p>
              <div className="bg-night rounded-xl p-3 border border-cream/10">
                <div className="text-xs text-cream/50 uppercase tracking-wider mb-1">Pix copia e cola</div>
                <div className="text-xs text-cream/80 break-all font-mono max-h-20 overflow-y-auto">
                  {result.pixCopyPaste}
                </div>
              </div>
              <button
                onClick={copy}
                className="w-full bg-gradient-brand text-brand-foreground px-6 py-4 rounded-xl font-bold text-base shadow-warm flex items-center justify-center gap-2"
              >
                {copied ? (
                  <><Check className="h-5 w-5" /> Copiado!</>
                ) : (
                  <><Copy className="h-5 w-5" /> Copiar código PIX</>
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