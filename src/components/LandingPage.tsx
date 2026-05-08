import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Truck,
  Star,
  Check,
  Clock,
  Heart,
  Sparkles,
  ChevronDown,
  MapPin,
  CalendarHeart,
  Type,
  Package,
  Gift,
} from "lucide-react";
import mapa from "@/assets/mapa-estelar.png";
import casal1 from "@/assets/casal-1.jpg";
import casal2 from "@/assets/casal-2.jpg";
import casal3 from "@/assets/casal-3.jpg";

function CountdownBar() {
  // Conta regressiva até 12 de junho do ano corrente (Dia dos Namorados)
  const target = (() => {
    const now = new Date();
    let t = new Date(now.getFullYear(), 5, 12, 23, 59, 59);
    if (t.getTime() < now.getTime()) t = new Date(now.getFullYear() + 1, 5, 12, 23, 59, 59);
    return t.getTime();
  })();
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  });
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="bg-night text-brand-foreground py-2.5 px-4 text-center text-sm font-medium">
      <span className="inline-flex items-center gap-2 flex-wrap justify-center">
        <Clock className="h-4 w-4 text-gold" />
        <span>Faltam</span>
        <span className="font-mono font-bold tracking-wider text-gold">
          {t.d}d {pad(t.h)}:{pad(t.m)}:{pad(t.s)}
        </span>
        <span>para o Dia dos Namorados — peça hoje e receba a tempo</span>
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-night-stars text-brand-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 py-14 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="h-3.5 w-3.5" /> Edição Dia dos Namorados
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5">
            O céu da noite em que <span className="text-gold italic">tudo começou.</span>
          </h1>
          <p className="text-lg text-brand-foreground/80 mb-7 leading-relaxed">
            Transforme o dia mais especial de vocês em um quadro personalizado com o <strong className="text-brand-foreground">mapa real das estrelas</strong> daquela noite. Um presente que ela vai abrir chorando.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-brand-foreground px-7 py-4 rounded-xl font-bold text-base shadow-warm hover:scale-[1.02] transition-transform"
            >
              CRIAR MEU MAPA AGORA
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 border border-brand-foreground/30 px-7 py-4 rounded-xl font-semibold text-brand-foreground hover:bg-brand-foreground/10 transition-colors"
            >
              Como funciona?
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm text-brand-foreground/70">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span><strong className="text-brand-foreground">4.9/5</strong> · 8.214 casais apaixonados</span>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
          <img
            src={mapa}
            alt="Mapa estelar personalizado emoldurado — Nosso Céu"
            width={1024}
            height={1024}
            className="relative max-w-md w-full drop-shadow-2xl"
          />
          <div className="absolute -bottom-2 right-0 sm:right-4 bg-card text-foreground shadow-card rounded-2xl px-4 py-3 flex items-center gap-3 border border-border">
            <Gift className="h-8 w-8 text-brand" />
            <div>
              <div className="font-bold text-sm leading-tight">Embalagem presente</div>
              <div className="text-xs text-muted-foreground">grátis em todos os pedidos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Truck, label: "Entrega antes de 12/06" },
    { icon: ShieldCheck, label: "Garantia de satisfação" },
    { icon: Gift, label: "Embalagem presente grátis" },
    { icon: Heart, label: "+8.000 casais felizes" },
  ];
  return (
    <div className="bg-cream border-y border-border">
      <div className="container mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2 justify-center text-sm font-medium text-foreground text-center">
            <it.icon className="h-5 w-5 text-brand shrink-0" />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: CalendarHeart,
      title: "1. Escolha a data",
      desc: "Primeiro encontro, primeiro beijo, pedido de casamento... a noite que mudou tudo.",
    },
    {
      icon: MapPin,
      title: "2. Escolha o local",
      desc: "Calculamos o céu exato como ele estava naquela cidade, naquela noite — com precisão astronômica.",
    },
    {
      icon: Type,
      title: "3. Personalize a mensagem",
      desc: "Frase, nomes e coordenadas. Tudo impresso em papel premium e emoldurado pra você só desembrulhar.",
    },
  ];
  return (
    <section id="como-funciona" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Como funciona</span>
          <h2 className="text-3xl lg:text-5xl font-black mt-2 text-ink">
            Em 3 passos simples
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
            Você cria em menos de 2 minutos. Nós produzimos e enviamos pronto pra presentear.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="bg-card rounded-2xl p-7 shadow-card border border-border">
              <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center mb-5 shadow-warm">
                <s.icon className="h-7 w-7 text-brand-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ink">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    "Mapa estelar real, calculado com dados astronômicos da NASA",
    "Impressão giclée em papel fosco premium 250g",
    "Moldura de madeira maciça pronta pra pendurar",
    "Embalagem presente exclusiva — chega lacrada",
    "Personalize nomes, data, coordenadas e mensagem",
    "Produção em até 48h e envio expresso",
  ];
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        <img
          src={casal2}
          alt="Mulher emocionada abrindo o presente Nosso Céu"
          loading="lazy"
          width={768}
          height={768}
          className="rounded-3xl shadow-card w-full"
        />
        <div>
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Por que vão amar</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-2 mb-6 text-ink leading-tight">
            Não é só um quadro. É a noite de vocês <em className="text-brand">eternizada.</em>
          </h2>
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it} className="flex items-start gap-3 text-foreground">
                <Check className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      img: casal1,
      name: "Lucas & Marina",
      city: "São Paulo/SP",
      text: "Dei pra ela no jantar de aniversário de namoro. Ela chorou MUITO. Disse que foi o presente mais lindo que já recebeu. Vale cada centavo.",
    },
    {
      img: casal2,
      name: "Beatriz P.",
      city: "Florianópolis/SC",
      text: "Comprei pra dar pro meu marido no Dia dos Namorados do ano passado. Hoje está na parede da sala. Todo mundo que entra em casa pergunta sobre.",
    },
    {
      img: casal3,
      name: "Gabriel & Camila",
      city: "Belo Horizonte/MG",
      text: "Pedi com a data do nosso pedido de casamento. Chegou super rápido, embalagem linda. Ela abriu e ficou sem palavras. 10/10.",
    },
  ];
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Histórias reais</span>
          <h2 className="text-3xl lg:text-5xl font-black mt-2 text-ink">
            Casais que viraram clientes
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-6 shadow-card border border-border flex flex-col">
              <img src={t.img} alt={t.name} loading="lazy" width={768} height={768} className="w-full h-56 object-cover rounded-xl mb-5" />
              <div className="flex mb-3">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground italic mb-5 leading-relaxed flex-1">"{t.text}"</p>
              <div className="pt-4 border-t border-border">
                <div className="font-bold text-sm text-ink">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Plan = {
  name: string;
  size: string;
  badge?: string;
  highlight?: boolean;
  total: string;
  oldTotal: string;
  economia: string;
  features: string[];
};

function Offer() {
  const plans: Plan[] = [
    {
      name: "Mini",
      size: "Tamanho A4 (21x30cm)",
      total: "R$ 97",
      oldTotal: "R$ 149",
      economia: "R$ 52",
      features: [
        "Mapa estelar personalizado",
        "Moldura de madeira inclusa",
        "Embalagem presente",
        "Envio em até 5 dias úteis",
      ],
    },
    {
      name: "Clássico",
      size: "Tamanho A3 (30x40cm)",
      badge: "MAIS PEDIDO",
      highlight: true,
      total: "R$ 147",
      oldTotal: "R$ 247",
      economia: "R$ 100",
      features: [
        "Mapa estelar personalizado",
        "Moldura de madeira premium",
        "Embalagem presente exclusiva",
        "Envio EXPRESSO grátis",
        "BÔNUS: Cartão escrito à mão",
      ],
    },
    {
      name: "Eterno",
      size: "Tamanho A2 (40x60cm)",
      badge: "EDIÇÃO LIMITADA",
      total: "R$ 227",
      oldTotal: "R$ 397",
      economia: "R$ 170",
      features: [
        "Mapa estelar personalizado",
        "Moldura nobre + vidro antirreflexo",
        "Embalagem luxo + laço de cetim",
        "Envio EXPRESSO grátis",
        "BÔNUS: Cartão + álbum de memórias digital",
      ],
    },
  ];
  return (
    <section id="oferta" className="py-16 lg:py-24 bg-gradient-to-b from-cream to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-destructive/10 text-destructive font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
            Promoção Dia dos Namorados — 40% OFF
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-ink mb-3">
            Escolha seu mapa
          </h2>
          <p className="text-muted-foreground text-lg">Quanto maior o quadro, maior o impacto da surpresa.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-7 border-2 flex flex-col ${
                p.highlight
                  ? "bg-card border-brand shadow-warm md:scale-105 z-10"
                  : "bg-card border-border shadow-card"
              }`}
            >
              {p.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                  p.highlight ? "bg-gradient-brand text-brand-foreground" : "bg-ink text-background"
                }`}>
                  {p.badge}
                </span>
              )}
              <div className="text-center mb-5">
                <div className="text-2xl font-display font-black text-ink">{p.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{p.size}</div>
              </div>
              <div className="text-center mb-5">
                <div className="text-sm text-muted-foreground line-through">{p.oldTotal}</div>
                <div className="text-4xl font-black text-brand">{p.total}</div>
                <div className="inline-block mt-2 bg-success/10 text-success font-bold text-xs px-2 py-1 rounded">
                  Economize {p.economia}
                </div>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <span>{f}</span>
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
                QUERO ESSE
              </a>
              <div className="text-center text-xs text-muted-foreground mt-3">
                Pix, boleto ou até 12x no cartão
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2">
          <Package className="h-4 w-4" />
          Última data de pedido com entrega garantida no Dia dos Namorados: <strong className="text-foreground">04 de junho</strong>
        </p>
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
              Garantia "Vai Amar ou Devolvemos"
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Se na hora de presentear vocês não amarem o resultado, devolvemos <strong className="text-foreground">100% do seu dinheiro</strong> em até 7 dias. Você não corre nenhum risco — só o risco bom de fazer ela chorar de emoção.
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
      q: "Como o mapa é gerado?",
      a: "Usamos dados astronômicos reais (efemérides) pra calcular como o céu estava na data, hora e local que você escolher. É o céu de verdade — não uma ilustração genérica.",
    },
    {
      q: "Em quanto tempo chega?",
      a: "Produção em até 48h + envio expresso de 2 a 5 dias úteis. Pedidos feitos até 04 de junho chegam garantidamente antes do Dia dos Namorados.",
    },
    {
      q: "Como personalizo?",
      a: "Após a compra você recebe um link pra preencher: data, horário, cidade, nomes e mensagem. Você ainda aprova a prévia digital antes da gente imprimir.",
    },
    {
      q: "Vem pronto pra presentear?",
      a: "Sim! Já chega emoldurado e dentro da nossa embalagem presente exclusiva, lacrada. É só entregar.",
    },
    {
      q: "Posso escolher qualquer data?",
      a: "Qualquer data dos últimos 100 anos e qualquer cidade do mundo. Pode ser primeiro encontro, casamento, nascimento de filho, o que vocês quiserem eternizar.",
    },
    {
      q: "E se eu errar a data?",
      a: "Sem problema. Você aprova a prévia antes da impressão e pode ajustar quantas vezes precisar.",
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
    <section className="py-16 lg:py-24 bg-night-stars text-brand-foreground">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <Sparkles className="h-10 w-10 text-gold mx-auto mb-5" />
        <h2 className="text-3xl lg:text-5xl font-black mb-5 leading-tight font-display">
          Esse Dia dos Namorados, dê algo que <em className="text-gold">ninguém mais vai dar.</em>
        </h2>
        <p className="text-lg text-brand-foreground/80 mb-8">
          Flores murcham. Chocolate acaba. Nosso Céu fica na parede de vocês pra sempre.
        </p>
        <a
          href="#oferta"
          className="inline-flex items-center justify-center bg-gradient-brand text-brand-foreground px-8 py-5 rounded-xl font-black text-lg shadow-warm hover:scale-[1.02] transition-transform"
        >
          CRIAR MEU MAPA AGORA
        </a>
        <p className="mt-5 text-sm text-brand-foreground/60">Garantia de satisfação · Embalagem presente · Entrega garantida</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-background/80 py-10">
      <div className="container mx-auto px-4 max-w-5xl text-center text-sm space-y-3">
        <div className="font-display font-black text-gold text-2xl italic">Nosso Céu</div>
        <p className="max-w-2xl mx-auto opacity-70">
          Presentes personalizados feitos à mão no Brasil. Cada mapa é único como a sua história.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs opacity-70 pt-3">
          <a href="#" className="hover:opacity-100">Política de Privacidade</a>
          <a href="#" className="hover:opacity-100">Termos de Uso</a>
          <a href="#" className="hover:opacity-100">Trocas e Devoluções</a>
          <a href="#" className="hover:opacity-100">Contato</a>
        </div>
        <p className="text-xs opacity-50 pt-2">© 2026 Nosso Céu. Todos os direitos reservados.</p>
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
      <HowItWorks />
      <Why />
      <Testimonials />
      <Offer />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
