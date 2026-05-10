import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Truck,
  Star,
  Check,
  Clock,
  Heart,
  Flame,
  ChevronDown,
  Gem,
  Wine,
  Gift,
  Package,
  X,
} from "lucide-react";
import kit from "@/assets/kit-paixao.jpg";
import prodJoias from "@/assets/produto-joias.webp";
import prodCaixa from "@/assets/produto-caixa.webp";
import prodRosas from "@/assets/produto-rosas.webp";
import prodBaloes from "@/assets/produto-baloes.webp";
import prodLingerie from "@/assets/produto-lingerie.webp";
import prodVinho from "@/assets/produto-vinho.webp";
import prodBombons from "@/assets/produto-bombons.jpg";

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
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="bg-night text-brand-foreground py-2.5 px-4 text-center text-sm font-medium">
      <span className="inline-flex items-center gap-2 flex-wrap justify-center">
        <Flame className="h-4 w-4 text-brand" />
        <span>Faltam</span>
        <span className="font-mono font-bold tracking-wider text-brand">
          {mounted ? `${t.d}d ${pad(t.h)}:${pad(t.m)}:${pad(t.s)}` : "—"}
        </span>
        <span>para o Dia dos Namorados — últimas unidades do Kit Paixão</span>
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-night-stars text-brand-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 py-14 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-brand/20 text-brand border border-brand/40 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            <Flame className="h-3.5 w-3.5" /> Edição Limitada · Dia dos Namorados
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5">
            Acenda a noite com o <span className="text-brand italic">Kit Paixão.</span>
          </h1>
          <p className="text-lg text-brand-foreground/80 mb-7 leading-relaxed">
            Tudo que ela sonha em receber — em uma única caixa. <strong className="text-brand-foreground">Joias, rosas, lingerie, vinho e o ursinho com mensagem</strong>. O presente que vai transformar a noite de vocês.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-brand-foreground px-7 py-4 rounded-xl font-bold text-base shadow-warm hover:scale-[1.02] transition-transform"
            >
              QUERO MEU KIT PAIXÃO
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 border border-brand-foreground/30 px-7 py-4 rounded-xl font-semibold text-brand-foreground hover:bg-brand-foreground/10 transition-colors"
            >
              O que vem dentro?
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm text-brand-foreground/70">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-brand text-brand" />
              ))}
            </div>
            <span><strong className="text-brand-foreground">4.9/5</strong> · 12.480 casais incendiados</span>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-brand/30 blur-3xl rounded-full" />
          <img
            src={kit}
            alt="Kit Paixão Dia dos Namorados — joias, rosas, lingerie e vinho"
            width={1024}
            height={1024}
            className="relative max-w-md w-full rounded-3xl shadow-warm"
          />
          <div className="absolute -bottom-2 right-0 sm:right-4 bg-card text-foreground shadow-card rounded-2xl px-4 py-3 flex items-center gap-3 border border-border">
            <Gift className="h-8 w-8 text-brand" />
            <div>
              <div className="font-bold text-sm leading-tight">Caixa surpresa</div>
              <div className="text-xs text-muted-foreground">embalada e lacrada</div>
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
    { icon: Gift, label: "Caixa luxo inclusa" },
    { icon: Heart, label: "+12.000 casais felizes" },
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
      icon: Gem,
      title: "Joias Coração Rubi",
      desc: "Colar, brincos e pulseira banhados a ouro com pedras vermelhas. Ela vai usar pra sempre.",
    },
    {
      icon: Heart,
      title: "Rosas + Caixa Coração",
      desc: "Buquê de rosas vermelhas, ursinho 'I Love You' dentro de uma caixa coração e pétalas pra criar o clima.",
    },
    {
      icon: Flame,
      title: "Lingerie + Vinho",
      desc: "Lingerie vermelha rendada, vinho tinto Reserva e velas em formato de coração. A noite tá feita.",
    },
  ];
  return (
    <section id="como-funciona" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">O que vem no kit</span>
          <h2 className="text-3xl lg:text-5xl font-black mt-2 text-ink">
            3 momentos. Uma noite inesquecível.
          </h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
            Cada item foi escolhido pra construir a noite perfeita — do "abre o presente" até o "vai dormir".
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
    "Conjunto de joias coração rubi (colar + brincos + pulseira)",
    "Buquê com 12 rosas vermelhas naturais preservadas",
    "Caixa coração com ursinho 'I Love You' e rosas perfumadas",
    "Lingerie vermelha em renda — tamanhos P ao GG",
    "Vinho tinto Reserva 750ml + 2 taças de cristal",
    "10 velas perfumadas em formato de coração",
    "Pétalas de rosa pra espalhar no caminho",
    "Cartão escrito à mão com a sua mensagem",
  ];
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        <img
          src={kit}
          alt="Itens do Kit Paixão organizados"
          loading="lazy"
          width={768}
          height={768}
          className="rounded-3xl shadow-warm w-full"
        />
        <div>
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Tudo que vem dentro</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-2 mb-6 text-ink leading-tight">
            Não é um presente. É <em className="text-brand">uma noite inteira</em> dentro de uma caixa.
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
      name: "Lucas & Marina",
      city: "São Paulo/SP",
      initials: "LM",
      text: "Cara, eu não esperava. Dei o Kit Paixão e ela ficou SEM PALAVRAS. Foi a melhor noite que a gente teve em anos. Recomendo demais.",
    },
    {
      name: "Beatriz P.",
      city: "Florianópolis/SC",
      initials: "BP",
      text: "Comprei pra surpreender meu marido. As joias são lindas de verdade, o vinho ótimo e a lingerie caiu perfeita. Valeu MUITO a pena.",
    },
    {
      name: "Gabriel & Camila",
      city: "Belo Horizonte/MG",
      initials: "GC",
      text: "Chegou em 4 dias, embalagem impecável. Ela abriu chorando e a noite... bom, a noite não dá pra contar aqui 🔥. 10/10.",
    },
  ];
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Quem comprou, ama</span>
          <h2 className="text-3xl lg:text-5xl font-black mt-2 text-ink">
            Casais que viveram a noite
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-6 shadow-card border border-border flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-brand-foreground font-bold shadow-warm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-sm text-ink">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="text-foreground italic leading-relaxed flex-1">"{t.text}"</p>
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
  produtos: { img: string; nome: string }[];
};

function Offer() {
  const [openPlan, setOpenPlan] = useState<Plan | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => {
    if (!openPlan) return;
    setActiveImg(0);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPlan(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openPlan]);

  const itensRomance = [
    { img: prodJoias, nome: "Conjunto joias coração rubi" },
    { img: prodCaixa, nome: "Caixa coração + ursinho" },
  ];
  const itensPaixao = [
    ...itensRomance,
    { img: prodRosas, nome: "Buquê de 12 rosas vermelhas" },
    { img: prodLingerie, nome: "Lingerie vermelha em renda" },
    { img: prodVinho, nome: "Vinho tinto Reserva 750ml" },
  ];
  const itensInferno = [
    ...itensPaixao,
    { img: prodBaloes, nome: "Balões 'TE AMO' + pétalas" },
    { img: prodBombons, nome: "Caixa de bombons gourmet AMOR" },
  ];

  const plans: Plan[] = [
    {
      name: "Romance",
      size: "Kit essencial",
      total: "R$ 197",
      oldTotal: "R$ 297",
      economia: "R$ 100",
      features: [
        "Conjunto de joias coração rubi",
        "Caixa coração com ursinho + rosas",
        "Velas perfumadas formato coração",
        "Caixa presente lacrada",
      ],
      produtos: itensRomance,
    },
    {
      name: "Paixão",
      size: "Kit completo · MAIS VENDIDO",
      badge: "MAIS VENDIDO",
      highlight: true,
      total: "R$ 297",
      oldTotal: "R$ 497",
      economia: "R$ 200",
      features: [
        "TUDO do kit Romance +",
        "Buquê com 12 rosas vermelhas",
        "Lingerie vermelha em renda",
        "Vinho tinto Reserva 750ml",
        "FRETE EXPRESSO grátis",
        "BÔNUS: cartão escrito à mão",
      ],
      produtos: itensPaixao,
    },
    {
      name: "Inferno",
      size: "Kit luxo · Edição limitada",
      badge: "EDIÇÃO LIMITADA",
      total: "R$ 497",
      oldTotal: "R$ 797",
      economia: "R$ 300",
      features: [
        "TUDO do kit Paixão +",
        "2 taças de cristal personalizadas",
        "Pétalas de rosa naturais (200g)",
        "Balões coração 'TE AMO' metalizados",
        "Caixa de bombons gourmet",
        "Embalagem luxo + laço de cetim",
      ],
      produtos: itensInferno,
    },
  ];
  return (
    <section id="oferta" className="py-16 lg:py-24 bg-gradient-to-b from-cream to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-destructive/10 text-destructive font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
            Promoção Dia dos Namorados — até 40% OFF
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-ink mb-3">
            Escolha seu Kit Paixão
          </h2>
          <p className="text-muted-foreground text-lg">Quanto mais completo o kit, mais inesquecível a noite.</p>
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
              <button
                onClick={() => setOpenPlan(p)}
                className={`block w-full text-center px-5 py-3.5 rounded-xl font-bold transition-transform hover:scale-[1.02] ${
                  p.highlight
                    ? "bg-gradient-brand text-brand-foreground shadow-warm"
                    : "bg-ink text-background"
                }`}
              >
                QUERO ESSE
              </button>
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
      {openPlan && (
        <div
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setOpenPlan(null)}
        >
          <div
            className="bg-card rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-warm border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenPlan(null)}
              className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-card/90 hover:bg-accent flex items-center justify-center transition-colors shadow-card border border-border"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid md:grid-cols-2 gap-0">
              {/* GALERIA estilo e-commerce */}
              <div className="bg-cream p-5 md:p-8 flex flex-col gap-4 md:rounded-l-3xl">
                <div className="aspect-square bg-background rounded-2xl overflow-hidden border border-border shadow-card">
                  <img
                    src={openPlan.produtos[activeImg]?.img}
                    alt={openPlan.produtos[activeImg]?.nome}
                    className="w-full h-full object-cover transition-opacity"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {openPlan.produtos.map((item, i) => (
                    <button
                      key={item.nome}
                      onClick={() => setActiveImg(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        activeImg === i ? "border-brand ring-2 ring-brand/30" : "border-border opacity-70 hover:opacity-100"
                      }`}
                      aria-label={item.nome}
                    >
                      <img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground text-center font-medium">
                  {openPlan.produtos[activeImg]?.nome}
                </div>
              </div>

              {/* DETALHES estilo e-commerce */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="text-xs text-brand font-bold uppercase tracking-widest mb-2">
                  {openPlan.badge ?? "Edição Dia dos Namorados"}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-black text-ink leading-tight mb-2">
                  Kit {openPlan.name} — {openPlan.size}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">4.9 · 12.480 casais incendiados</span>
                </div>

                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-sm text-muted-foreground line-through">{openPlan.oldTotal}</span>
                  <span className="text-4xl font-black text-brand">{openPlan.total}</span>
                </div>
                <div className="text-xs text-success font-bold mb-1">
                  Você economiza {openPlan.economia}
                </div>
                <div className="text-xs text-muted-foreground mb-5">
                  ou 12x sem juros no cartão
                </div>

                <div className="bg-cream rounded-xl p-4 mb-5 border border-border">
                  <div className="text-xs font-bold text-ink uppercase tracking-wider mb-3">
                    {openPlan.produtos.length} itens neste kit
                  </div>
                  <ul className="space-y-2">
                    {openPlan.produtos.map((item, i) => (
                      <li
                        key={item.nome}
                        onClick={() => setActiveImg(i)}
                        className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-lg transition-colors ${
                          activeImg === i ? "bg-accent" : "hover:bg-background/60"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-md overflow-hidden border border-border bg-background flex-shrink-0">
                          <img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-ink leading-tight">{item.nome}</span>
                        <Check className="h-4 w-4 text-success ml-auto flex-shrink-0" />
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#"
                  className="block text-center bg-gradient-brand text-brand-foreground px-6 py-4 rounded-xl font-black text-base shadow-warm hover:scale-[1.01] transition-transform mb-3"
                >
                  COMPRAR AGORA · {openPlan.total}
                </a>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                  <span className="flex flex-col items-center gap-1 text-center">
                    <ShieldCheck className="h-4 w-4 text-brand" /> Compra segura
                  </span>
                  <span className="flex flex-col items-center gap-1 text-center">
                    <Truck className="h-4 w-4 text-brand" /> Frete expresso
                  </span>
                  <span className="flex flex-col items-center gap-1 text-center">
                    <Heart className="h-4 w-4 text-brand" /> Garantia 7 dias
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
              Garantia "Vai Incendiar ou Devolvemos"
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Se ao abrir o kit vocês não amarem cada detalhe, devolvemos <strong className="text-foreground">100% do seu dinheiro</strong> em até 7 dias. Sem perguntas, sem burocracia. O único risco é a noite ficar quente demais.
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
      q: "O que exatamente vem dentro do kit?",
      a: "Depende do plano: o Romance traz joias + caixa coração com ursinho + velas. O Paixão adiciona buquê de rosas, lingerie, vinho e cartão. O Inferno inclui taças de cristal, pétalas, balões e bombons. Tudo embalado em caixa presente lacrada.",
    },
    {
      q: "Em quanto tempo chega?",
      a: "Envio em até 24h + entrega expressa de 2 a 5 dias úteis. Pedidos feitos até 04 de junho chegam garantidamente antes do Dia dos Namorados.",
    },
    {
      q: "Posso escolher o tamanho da lingerie?",
      a: "Sim. Após a compra você recebe um link pra escolher o tamanho (P, M, G ou GG) e escrever a mensagem do cartão.",
    },
    {
      q: "Vem pronto pra presentear?",
      a: "Sim! Já chega dentro da nossa caixa presente exclusiva, lacrada e com laço. É só entregar e ver a reação.",
    },
    {
      q: "As joias são de verdade?",
      a: "Sim — folheadas a ouro 18k com pedras de zircônia vermelha de alto brilho. Garantia de 6 meses contra oxidação. Não é bijuteria barata.",
    },
    {
      q: "Vem nota fiscal? Posso parcelar?",
      a: "Sim, nota fiscal em todas as compras. Parcele em até 12x no cartão ou pague no Pix com 5% de desconto extra.",
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
        <Flame className="h-10 w-10 text-brand mx-auto mb-5" />
        <h2 className="text-3xl lg:text-5xl font-black mb-5 leading-tight font-display">
          Esse Dia dos Namorados, faça ela dizer <em className="text-brand">"foi o melhor da minha vida".</em>
        </h2>
        <p className="text-lg text-brand-foreground/80 mb-8">
          Chocolate acaba em 5 minutos. Jantar fora vocês esquecem. O Kit Paixão vira a história que vocês vão contar pra sempre.
        </p>
        <a
          href="#oferta"
          className="inline-flex items-center justify-center bg-gradient-brand text-brand-foreground px-8 py-5 rounded-xl font-black text-lg shadow-warm hover:scale-[1.02] transition-transform"
        >
          QUERO MEU KIT PAIXÃO
        </a>
        <p className="mt-5 text-sm text-brand-foreground/60">Garantia de satisfação · Caixa presente · Entrega expressa</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-background/80 py-10">
      <div className="container mx-auto px-4 max-w-5xl text-center text-sm space-y-3">
        <div className="font-display font-black text-brand text-2xl italic">Kit Paixão</div>
        <p className="max-w-2xl mx-auto opacity-70">
          Presentes que viram histórias. Montado e enviado do Brasil com muito amor (e fogo).
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs opacity-70 pt-3">
          <a href="#" className="hover:opacity-100">Política de Privacidade</a>
          <a href="#" className="hover:opacity-100">Termos de Uso</a>
          <a href="#" className="hover:opacity-100">Trocas e Devoluções</a>
          <a href="#" className="hover:opacity-100">Contato</a>
        </div>
        <p className="text-xs opacity-50 pt-2">© 2026 Kit Paixão. Todos os direitos reservados.</p>
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
