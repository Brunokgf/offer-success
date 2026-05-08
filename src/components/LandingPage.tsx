import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Truck,
  Leaf,
  Star,
  Check,
  X,
  Clock,
  Heart,
  Activity,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import bottle from "@/assets/flexivida-bottle.png";
import depo1 from "@/assets/depoimento-1.jpg";
import depo2 from "@/assets/depoimento-2.jpg";
import depo3 from "@/assets/depoimento-3.jpg";

function CountdownBar() {
  const [time, setTime] = useState({ h: 2, m: 47, s: 12 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="bg-brand-dark text-brand-foreground py-2 px-4 text-center text-sm font-medium">
      <span className="inline-flex items-center gap-2 flex-wrap justify-center">
        <Clock className="h-4 w-4" />
        <span>Promoção termina em:</span>
        <span className="font-mono font-bold tracking-wider">
          {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
        </span>
        <span className="hidden sm:inline">— Frete grátis para todo o Brasil</span>
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-radial-warm relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="h-3.5 w-3.5" /> Novidade no Brasil
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-ink mb-5">
            Volte a se mover <span className="text-brand">sem dor</span> nas articulações em até 30 dias
          </h1>
          <p className="text-lg text-muted-foreground mb-7 leading-relaxed">
            Fórmula natural com <strong className="text-foreground">Colágeno Tipo 2 + Cúrcuma + MSM</strong> que age direto na cartilagem para reduzir dor, inflamação e travamento nas juntas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-brand-foreground px-7 py-4 rounded-xl font-bold text-base shadow-warm hover:scale-[1.02] transition-transform"
            >
              QUERO MINHA FÓRMULA AGORA
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 border-2 border-border bg-card px-7 py-4 rounded-xl font-semibold text-foreground hover:bg-accent transition-colors"
            >
              Como funciona?
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>
            <span><strong className="text-foreground">4.9/5</strong> · 12.847 avaliações</span>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-brand opacity-10 blur-3xl rounded-full" />
          <img
            src={bottle}
            alt="Pote de FlexiVida — suplemento natural para articulações"
            width={1024}
            height={1024}
            className="relative max-w-sm w-full drop-shadow-2xl"
          />
          <div className="absolute -bottom-2 right-0 sm:right-8 bg-card shadow-card rounded-2xl px-4 py-3 flex items-center gap-3 border border-border">
            <ShieldCheck className="h-8 w-8 text-success" />
            <div>
              <div className="font-bold text-sm leading-tight">Garantia 30 dias</div>
              <div className="text-xs text-muted-foreground">ou seu dinheiro de volta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Leaf, label: "100% Natural" },
    { icon: ShieldCheck, label: "Aprovado pela ANVISA" },
    { icon: Truck, label: "Frete grátis Brasil" },
    { icon: Heart, label: "+47.000 clientes" },
  ];
  return (
    <div className="bg-cream border-y border-border">
      <div className="container mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2 justify-center text-sm font-medium text-foreground">
            <it.icon className="h-5 w-5 text-brand" />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  const pains = [
    "Dor ao subir ou descer escadas",
    "Joelhos que estalam e travam ao acordar",
    "Dor lombar que atrapalha o sono",
    "Dificuldade de levantar do sofá",
    "Sensação de rigidez nas mãos e dedos",
    "Medo de não conseguir brincar com os netos",
  ];
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl lg:text-5xl font-black text-center mb-4 text-ink">
          Você se reconhece em alguma dessas situações?
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Se respondeu sim para pelo menos 2, sua cartilagem está pedindo socorro.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {pains.map((p) => (
            <div key={p} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border shadow-card">
              <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <span className="text-foreground">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Leaf,
      title: "Colágeno Tipo 2 não-hidrolisado",
      desc: "Reconstrói a cartilagem desgastada e protege as articulações do atrito que causa a dor.",
    },
    {
      icon: Sparkles,
      title: "Cúrcuma (Curcumina 95%)",
      desc: "Anti-inflamatório natural mais potente que muitos remédios — sem efeitos colaterais no estômago.",
    },
    {
      icon: Activity,
      title: "MSM (Enxofre orgânico)",
      desc: "Acelera a regeneração dos tecidos e devolve flexibilidade aos movimentos.",
    },
  ];
  return (
    <section id="como-funciona" className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Como funciona</span>
          <h2 className="text-3xl lg:text-5xl font-black mt-2 text-ink">
            3 ativos que agem juntos no problema raiz
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="bg-card rounded-2xl p-7 shadow-card border border-border relative">
              <div className="absolute -top-4 -left-4 bg-gradient-brand text-brand-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-warm">
                {i + 1}
              </div>
              <s.icon className="h-10 w-10 text-brand mb-4" />
              <h3 className="text-xl font-bold mb-2 text-ink">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      img: depo1,
      name: "Marlene S., 62 anos",
      city: "Belo Horizonte/MG",
      text: "Em 3 semanas voltei a caminhar 5km sem aquela dor lancinante no joelho. Eu já tinha desistido de tudo, achei que era idade. Mudou minha vida.",
    },
    {
      img: depo2,
      name: "Roberto A., 58 anos",
      city: "Curitiba/PR",
      text: "Trabalho na construção há 30 anos. As mãos doíam tanto que eu não dormia direito. Tomo há 2 meses e estou sem dor. Comprei mais 5 potes.",
    },
    {
      img: depo3,
      name: "Conceição R., 67 anos",
      city: "Recife/PE",
      text: "Voltei a cuidar da minha horta sem ficar travada. Meus filhos não acreditaram quando me viram agachando de novo. Recomendo de coração.",
    },
  ];
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Resultados reais</span>
          <h2 className="text-3xl lg:text-5xl font-black mt-2 text-ink">
            Histórias de quem já voltou a viver
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-6 shadow-card border border-border flex flex-col">
              <div className="flex mb-3">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-foreground italic mb-5 leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={t.img} alt={t.name} loading="lazy" width={512} height={512} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-sm text-ink">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Plan = {
  potes: number;
  badge?: string;
  highlight?: boolean;
  total: string;
  perPote: string;
  oldTotal: string;
  economia: string;
  bonus?: string[];
};

function Offer() {
  const plans: Plan[] = [
    {
      potes: 1,
      total: "R$ 197",
      perPote: "R$ 197/pote",
      oldTotal: "R$ 297",
      economia: "R$ 100",
    },
    {
      potes: 3,
      badge: "MAIS VENDIDO",
      highlight: true,
      total: "R$ 397",
      perPote: "R$ 132/pote",
      oldTotal: "R$ 891",
      economia: "R$ 494",
      bonus: ["Frete grátis", "E-book Receitas Anti-inflamatórias"],
    },
    {
      potes: 5,
      badge: "MELHOR CUSTO",
      total: "R$ 597",
      perPote: "R$ 119/pote",
      oldTotal: "R$ 1.485",
      economia: "R$ 888",
      bonus: ["Frete grátis", "E-book Receitas", "Guia de Alongamentos"],
    },
  ];
  return (
    <section id="oferta" className="py-16 lg:py-24 bg-gradient-to-b from-cream to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-destructive/10 text-destructive font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
            Oferta por tempo limitado
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-ink mb-3">
            Escolha seu kit e comece hoje
          </h2>
          <p className="text-muted-foreground text-lg">Tratamento recomendado: <strong className="text-foreground">3 a 5 potes</strong> para resultado completo.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.potes}
              className={`relative rounded-2xl p-7 border-2 flex flex-col ${
                p.highlight
                  ? "bg-card border-brand shadow-warm scale-105 z-10"
                  : "bg-card border-border shadow-card"
              }`}
            >
              {p.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  p.highlight ? "bg-gradient-brand text-brand-foreground" : "bg-ink text-background"
                }`}>
                  {p.badge}
                </span>
              )}
              <div className="text-center mb-5">
                <div className="text-5xl font-display font-black text-brand">{p.potes}</div>
                <div className="text-sm uppercase tracking-wider font-semibold text-muted-foreground mt-1">
                  {p.potes === 1 ? "Pote" : "Potes"}
                </div>
              </div>
              <div className="text-center mb-5">
                <div className="text-sm text-muted-foreground line-through">{p.oldTotal}</div>
                <div className="text-4xl font-black text-ink">{p.total}</div>
                <div className="text-sm text-muted-foreground mt-1">{p.perPote}</div>
                <div className="inline-block mt-2 bg-success/10 text-success font-bold text-xs px-2 py-1 rounded">
                  Economize {p.economia}
                </div>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>{p.potes * 60} cápsulas ({p.potes} {p.potes === 1 ? "mês" : "meses"} de tratamento)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>Garantia 30 dias</span>
                </li>
                {p.bonus?.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span><strong>BÔNUS:</strong> {b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`block text-center px-5 py-3.5 rounded-xl font-bold transition-transform hover:scale-[1.02] ${
                  p.highlight
                    ? "bg-gradient-brand text-brand-foreground shadow-warm"
                    : "bg-ink text-background"
                }`}
              >
                COMPRAR AGORA
              </a>
              <div className="text-center text-xs text-muted-foreground mt-3">
                Pix, boleto ou até 12x no cartão
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-card border-2 border-brand/30 rounded-3xl p-8 lg:p-12 grid md:grid-cols-[auto_1fr] gap-8 items-center shadow-card">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-brand flex items-center justify-center shadow-warm">
              <ShieldCheck className="h-16 w-16 text-brand-foreground" strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-black text-ink mb-3">
              Garantia incondicional de 30 dias
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Use o FlexiVida por 30 dias. Se você não sentir uma redução real na dor e mais flexibilidade nas articulações, devolvemos <strong className="text-foreground">100% do seu dinheiro</strong> — sem perguntas, sem burocracia. Todo o risco é nosso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Em quanto tempo vejo resultado?",
      a: "A maioria das pessoas relata melhora a partir de 14 dias. Para resultado completo de regeneração da cartilagem, recomendamos o tratamento de 90 dias (3 potes).",
    },
    {
      q: "Tem efeito colateral?",
      a: "Não. FlexiVida é 100% natural, sem glúten, sem lactose e sem corantes artificiais. Aprovado pela ANVISA.",
    },
    {
      q: "Posso tomar com outros medicamentos?",
      a: "Sim, mas se você usa anticoagulante ou tem alguma condição específica, recomendamos consultar seu médico antes.",
    },
    {
      q: "Como tomo?",
      a: "2 cápsulas ao dia, preferencialmente após uma refeição. Cada pote dura 30 dias.",
    },
    {
      q: "Em quanto tempo chega na minha casa?",
      a: "Capitais: 2 a 4 dias úteis. Demais cidades: 4 a 8 dias úteis. Frete grátis para todo o Brasil nos kits 3 e 5 potes.",
    },
    {
      q: "E se não funcionar pra mim?",
      a: "Você tem 30 dias de garantia incondicional. Devolvemos seu dinheiro integralmente, mesmo com o pote vazio.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl lg:text-5xl font-black text-center mb-12 text-ink">
          Perguntas frequentes
        </h2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={it.q} className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-foreground hover:bg-accent/50 transition-colors"
              >
                <span>{it.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-brand text-brand-foreground">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl lg:text-5xl font-black mb-5 leading-tight">
          Não deixe a dor decidir o que você pode fazer hoje.
        </h2>
        <p className="text-lg opacity-90 mb-8">
          Mais de 47.000 brasileiros já voltaram a se mover com liberdade. Sua vez é agora.
        </p>
        <a
          href="#oferta"
          className="inline-flex items-center justify-center bg-card text-ink px-8 py-5 rounded-xl font-black text-lg shadow-warm hover:scale-[1.02] transition-transform"
        >
          QUERO COMEÇAR MEU TRATAMENTO
        </a>
        <p className="mt-5 text-sm opacity-80">Garantia de 30 dias · Frete grátis · Pagamento seguro</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-background/80 py-10">
      <div className="container mx-auto px-4 max-w-5xl text-center text-sm space-y-3">
        <div className="font-display font-black text-brand text-2xl">VIDA PLENA</div>
        <p className="max-w-2xl mx-auto opacity-70">
          Este produto não é um medicamento e não substitui o tratamento médico. Os resultados podem variar de pessoa para pessoa. Consulte sempre um profissional de saúde.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs opacity-70 pt-3">
          <a href="#" className="hover:opacity-100">Política de Privacidade</a>
          <a href="#" className="hover:opacity-100">Termos de Uso</a>
          <a href="#" className="hover:opacity-100">Contato</a>
        </div>
        <p className="text-xs opacity-50 pt-2">© 2026 Vida Plena. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <main>
      <CountdownBar />
      <Hero />
      <TrustStrip />
      <Problem />
      <HowItWorks />
      <Testimonials />
      <Offer />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}