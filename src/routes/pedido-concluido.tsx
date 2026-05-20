import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pedido-concluido")({
  component: PedidoConcluido,
  head: () => ({
    meta: [
      { title: "Pedido concluído" },
      { name: "description", content: "Recebemos seu pedido com sucesso." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function PedidoConcluido() {
  return (
    <main className="min-h-screen bg-ink text-cream flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6 py-16">
        <div className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center">
          <Check className="h-10 w-10 text-success" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-cream">
          Pedido recebido!
        </h1>
        <p className="text-cream/70 text-base md:text-lg">
          Recebemos seus dados com sucesso. Em instantes nosso time entra em contato
          pelo e-mail ou WhatsApp informado para confirmar o pagamento e combinar a entrega.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-block bg-gradient-brand text-brand-foreground px-8 py-4 rounded-xl font-black shadow-warm hover:scale-[1.02] transition-transform"
          >
            Voltar para a loja
          </Link>
        </div>
      </div>
    </main>
  );
}