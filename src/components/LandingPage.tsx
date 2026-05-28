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
  Instagram,
  MessageCircle,
  MapPin,
  Lock,
  CreditCard,
  BadgeCheck,
} from "lucide-react";
import kit from "@/assets/kit-paixao.jpg";
import { PixCheckoutModal } from "@/components/PixCheckoutModal";
import prodJoias from "@/assets/produto-joias.webp";
import prodCaixa from "@/assets/produto-caixa.webp";
import prodRosas from "@/assets/produto-rosas.webp";
import prodBaloes from "@/assets/produto-baloes.webp";
import prodLingerie from "@/assets/produto-lingerie.webp";
import prodVinho from "@/assets/produto-vinho.webp";
import prodBombons from "@/assets/produto-bombons.jpg";

// ====== CONFIG FÁCIL DE EDITAR ======
const BRAND = {
  cnpj: "00.000.000/0001-00", // troque pelo CNPJ real
  instagram: "imperyumpresents", // sem @
  whatsapp: "5511999999999", // só dígitos com DDI 55
  whatsappLabel: "(11) 99999-9999",
};
const WHATSAPP_URL = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
  "Olá! Tenho uma dúvida sobre o Kit Paixão.",
)}`;
const INSTAGRAM_URL = `https://instagram.com/${BRAND.instagram}`;

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
    <div className="bg-night text-brand-foreground py-2 px-3 text-center text-[11px] sm:text-sm font-medium">
      <span className="inline-flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center leading-tight">
        <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand shrink-0" />
        <span>Faltam</span>
        <span className="font-mono font-bold tracking-wider text-brand">
          {mounted ? `${t.d}d ${pad(t.h)}:${pad(t.m)}:${pad(t.s)}` : "—"}
        </span>
        <span className="hidden sm:inline">para o Dia dos Namorados — últimas unidades do Kit Paixão</span>
        <span className="sm:hidden">p/ o Dia dos Namorados</span>
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-night-stars text-brand-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 py-10 sm:py-14 lg:py-24 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 bg-brand/20 text-brand border border-brand/40 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5">
            <Flame className="h-3.5 w-3.5" /> Edição Limitada · Dia dos Namorados
          </span>
          <h1 className="font-display text-[2rem] xs:text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] mb-4 sm:mb-5">
            Acenda a noite com o <span className="text-brand italic">Kit Paixão.</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-foreground/80 mb-6 sm:mb-7 leading-relaxed">
            Tudo que ela sonha em receber — em uma única caixa. <strong className="text-brand-foreground">Joias, rosas, lingerie, vinho e o ursinho com mensagem</strong>. O presente que vai transformar a noite de vocês.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-brand-foreground px-6 sm:px-7 py-4 rounded-xl font-bold text-sm sm:text-base shadow-warm hover:scale-[1.02] transition-transform text-center"
            >
              QUERO MEU KIT PAIXÃO
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 border border-brand-foreground/30 px-6 sm:px-7 py-4 rounded-xl font-semibold text-sm sm:text-base text-brand-foreground hover:bg-brand-foreground/10 transition-colors text-center"
            >
              O que vem dentro?
            </a>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-brand-foreground/70 flex-wrap">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-brand text-brand" />
              ))}
            </div>
            <span><strong className="text-brand-foreground">4.9/5</strong> · 12.480 casais incendiados</span>
          </div>
        </div>
        <div className="relative flex items-center justify-center order-1 lg:order-2 px-2 sm:px-0">
          <div className="absolute inset-0 bg-brand/30 blur-3xl rounded-full" />
          <img
            src={kit}
            alt="Kit Paixão Dia dos Namorados — joias, rosas, lingerie e vinho"
            width={1024}
            height={1024}
            className="relative max-w-xs sm:max-w-md w-full rounded-3xl shadow-warm"
          />
          <div className="absolute -bottom-2 right-2 sm:right-4 bg-card text-foreground shadow-card rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 border border-border">
            <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-brand" />
            <div>
              <div className="font-bold text-xs sm:text-sm leading-tight">Caixa surpresa</div>
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
    <div className="border-y border-border">
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
    <section id="como-funciona" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">O que vem no kit</span>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-3 leading-tight">
            <span className="bg-gradient-brand bg-clip-text text-transparent drop-shadow-[0_0_30px_oklch(0.55_0.24_25/0.5)]">
              3 momentos.
            </span>{" "}
            <span className="text-gold italic font-display">Uma noite inesquecível.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-2xl mx-auto">
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
    <section className="py-16 lg:py-24">
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2 mb-6 text-foreground leading-tight">
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
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Quem comprou, ama</span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mt-2 text-foreground">
            Casais que viveram <span className="text-brand">a noite</span>
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
  const [pixOpen, setPixOpen] = useState(false);
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
      total: "R$ 97",
      oldTotal: "R$ 197",
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
      total: "R$ 147",
      oldTotal: "R$ 297",
      economia: "R$ 150",
      features: [
        "TUDO do kit Romance +",
        "Buquê com 12 rosas vermelhas",
        "🎁 BRINDE: Lingerie vermelha em renda",
        "🎁 BRINDE: Vinho tinto Reserva 750ml",
        "FRETE EXPRESSO grátis",
        "BÔNUS: cartão escrito à mão",
      ],
      produtos: itensPaixao,
    },
    {
      name: "Inferno",
      size: "Kit luxo · Edição limitada",
      badge: "EDIÇÃO LIMITADA",
      total: "R$ 197",
      oldTotal: "R$ 397",
      economia: "R$ 200",
      features: [
        "TUDO do kit Paixão +",
        "🎁 BRINDE: Lingerie vermelha em renda",
        "🎁 BRINDE: Vinho tinto Reserva 750ml",
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
    <section id="oferta" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-destructive/10 text-destructive font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
            Promoção Dia dos Namorados — até 40% OFF
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-foreground mb-3">
            Escolha seu Kit Paixão
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">Quanto mais completo o kit, mais inesquecível a noite.</p>
          <div className="mt-7 flex justify-center">
            <OfferCountdown />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-5 sm:p-7 border-2 flex flex-col ${
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
              <StockBar
                left={p.name === "Paixão" ? 7 : p.name === "Inferno" ? 4 : 12}
                total={p.name === "Paixão" ? 30 : p.name === "Inferno" ? 20 : 40}
              />
              <button
                onClick={() => setOpenPlan(p)}
                className="group relative block w-full text-center px-5 py-4 rounded-xl font-black tracking-wider text-base bg-gradient-brand text-brand-foreground shadow-warm transition-all hover:scale-[1.03] hover:shadow-[0_25px_60px_-15px_oklch(0.55_0.24_25/0.8)] ring-2 ring-gold/40 hover:ring-gold animate-pulse-slow"
              >
                <Flame className="inline-block h-5 w-5 mr-2 -mt-0.5" />
                QUERO ESSE
                <Flame className="inline-block h-5 w-5 ml-2 -mt-0.5" />
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
            className="bg-ink text-cream rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-warm border border-ink relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenPlan(null)}
              className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-night/90 hover:bg-brand text-cream flex items-center justify-center transition-colors shadow-card border border-cream/10"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          <div className="grid md:grid-cols-2 gap-0">
              {/* GALERIA estilo e-commerce */}
            <div className="bg-night p-4 sm:p-5 md:p-8 flex flex-col gap-3 sm:gap-4 md:rounded-l-3xl">
                <div className="aspect-square bg-ink rounded-2xl overflow-hidden border border-cream/10 shadow-card">
                  <img
                    src={openPlan.produtos[activeImg]?.img}
                    alt={openPlan.produtos[activeImg]?.nome}
                    className="w-full h-full object-cover transition-opacity"
                  />
                </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {openPlan.produtos.map((item, i) => (
                    <button
                      key={item.nome}
                      onClick={() => setActiveImg(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        activeImg === i ? "border-brand ring-2 ring-brand/40" : "border-cream/10 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={item.nome}
                    >
                      <img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="text-xs text-cream/70 text-center font-medium">
                  {openPlan.produtos[activeImg]?.nome}
                </div>
              </div>

              {/* DETALHES estilo e-commerce */}
              <div className="p-5 sm:p-6 md:p-8 flex flex-col bg-ink">
                <div className="text-xs text-brand font-bold uppercase tracking-widest mb-2">
                  {openPlan.badge ?? "Edição Dia dos Namorados"}
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-cream leading-tight mb-2">
                  Kit {openPlan.name} — {openPlan.size}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-cream/60">4.9 · 12.480 casais incendiados</span>
                </div>

                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-sm text-cream/50 line-through">{openPlan.oldTotal}</span>
                  <span className="text-4xl font-black text-gold">{openPlan.total}</span>
                </div>
                <div className="text-xs text-success font-bold mb-1">
                  Você economiza {openPlan.economia}
                </div>
                <div className="text-xs text-cream/60 mb-5">
                  ou 12x sem juros no cartão
                </div>

                <div className="bg-night rounded-xl p-4 mb-5 border border-cream/10">
                  <div className="text-xs font-bold text-cream uppercase tracking-wider mb-3">
                    {openPlan.produtos.length} itens neste kit
                  </div>
                  <ul className="space-y-2">
                    {openPlan.produtos.map((item, i) => (
                      <li
                        key={item.nome}
                        onClick={() => setActiveImg(i)}
                        className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-lg transition-colors ${
                          activeImg === i ? "bg-brand/20" : "hover:bg-cream/5"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-md overflow-hidden border border-cream/10 bg-ink flex-shrink-0">
                          <img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-cream leading-tight">{item.nome}</span>
                        <Check className="h-4 w-4 text-success ml-auto flex-shrink-0" />
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setPixOpen(true)}
                  className="block w-full text-center bg-gradient-brand text-brand-foreground px-6 py-4 rounded-xl font-black text-base shadow-warm hover:scale-[1.01] transition-transform mb-3"
                >
                  COMPRAR AGORA · {openPlan.total}
                </button>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-cream/60">
                  <span className="flex flex-col items-center gap-1 text-center">
                    <ShieldCheck className="h-4 w-4 text-gold" /> Compra segura
                  </span>
                  <span className="flex flex-col items-center gap-1 text-center">
                    <Truck className="h-4 w-4 text-gold" /> Frete expresso
                  </span>
                  <span className="flex flex-col items-center gap-1 text-center">
                    <Heart className="h-4 w-4 text-gold" /> Garantia 7 dias
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <PixCheckoutModal
        open={pixOpen}
        onClose={() => setPixOpen(false)}
        amount={openPlan ? Number(openPlan.total.replace(/[^\d,]/g, "").replace(",", ".")) : 0}
        description={openPlan ? `Kit ${openPlan.name}` : "Kit Paixão"}
      />
    </section>
  );
}

function Guarantee() {
  return (
    <section className="py-16 lg:py-20">
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
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-10 sm:mb-12 text-foreground">
          Perguntas <span className="text-brand">frequentes</span>
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
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-5 leading-tight font-display">
          Esse Dia dos Namorados, faça ela dizer <em className="text-brand">"foi o melhor da minha vida".</em>
        </h2>
        <p className="text-base sm:text-lg text-brand-foreground/80 mb-8">
          Chocolate acaba em 5 minutos. Jantar fora vocês esquecem. O Kit Paixão vira a história que vocês vão contar pra sempre.
        </p>
        <a
          href="#oferta"
          className="inline-flex items-center justify-center bg-gradient-brand text-brand-foreground px-7 sm:px-8 py-4 sm:py-5 rounded-xl font-black text-base sm:text-lg shadow-warm hover:scale-[1.02] transition-transform"
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
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl text-center text-sm space-y-3">
        <div className="font-display font-black text-brand text-2xl italic">Imperyum Presents</div>
        <p className="max-w-2xl mx-auto opacity-70">
          Presentes que viram histórias. Montado e enviado do Brasil com muito amor (e fogo).
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 pt-2 text-xs opacity-80">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:opacity-100"
          >
            <Instagram className="h-4 w-4" /> @{BRAND.instagram}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:opacity-100"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp {BRAND.whatsappLabel}
          </a>
        </div>
        <p className="text-xs opacity-70 pt-1">
          Imperyum Presents · CNPJ {BRAND.cnpj}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs opacity-70 pt-3">
          <a href="#" className="hover:opacity-100">Política de Privacidade</a>
          <a href="#" className="hover:opacity-100">Termos de Uso</a>
          <a href="#" className="hover:opacity-100">Trocas e Devoluções</a>
          <a href="#politica-entrega" className="hover:opacity-100">Política de Entrega</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">Contato</a>
        </div>
        <p className="text-xs opacity-50 pt-2">© 2026 Imperyum Presents. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

// ======================= NOVOS COMPONENTES =======================

function OfferCountdown() {
  // contador curto (48h) para urgência da promoção
  const [end] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("kp_offer_end") : null;
    if (saved && Number(saved) > Date.now()) return Number(saved);
    const next = Date.now() + 1000 * 60 * 60 * 48;
    if (typeof window !== "undefined") localStorage.setItem("kp_offer_end", String(next));
    return next;
  });
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const Box = ({ v, l }: { v: string; l: string }) => (
    <div className="bg-ink/80 border border-brand/40 rounded-xl px-3 sm:px-4 py-2 min-w-[56px] sm:min-w-[68px] text-center shadow-warm">
      <div className="font-mono font-black text-2xl sm:text-3xl text-brand leading-none">{v}</div>
      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-cream/60 mt-1">{l}</div>
    </div>
  );
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand font-bold">
        <Flame className="h-4 w-4 animate-pulse" /> Oferta termina em
      </div>
      <div className="flex items-center gap-2">
        <Box v={pad(h)} l="Horas" />
        <span className="text-brand font-black text-2xl">:</span>
        <Box v={pad(m)} l="Min" />
        <span className="text-brand font-black text-2xl">:</span>
        <Box v={pad(s)} l="Seg" />
      </div>
    </div>
  );
}

function StockBar({ left, total }: { left: number; total: number }) {
  const pct = Math.round((left / total) * 100);
  return (
    <div className="mt-4 mb-1">
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-1.5">
        <span className="text-brand inline-flex items-center gap-1">
          <Flame className="h-3 w-3" /> Estoque acabando
        </span>
        <span className="text-cream/80">{left} de {total} restantes</span>
      </div>
      <div className="h-2 w-full rounded-full bg-cream/10 overflow-hidden">
        <div
          className="h-full bg-gradient-brand shadow-warm transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

const RECENT_BUYERS = [
  { name: "Ana C.", city: "Rio de Janeiro/RJ", kit: "Kit Paixão" },
  { name: "Rafael M.", city: "Curitiba/PR", kit: "Kit Inferno" },
  { name: "Juliana S.", city: "Salvador/BA", kit: "Kit Paixão" },
  { name: "Pedro H.", city: "São Paulo/SP", kit: "Kit Inferno" },
  { name: "Mariana O.", city: "Porto Alegre/RS", kit: "Kit Romance" },
  { name: "Lucas F.", city: "Brasília/DF", kit: "Kit Paixão" },
  { name: "Camila R.", city: "Recife/PE", kit: "Kit Inferno" },
  { name: "Bruno A.", city: "Belo Horizonte/MG", kit: "Kit Paixão" },
];

function RecentPurchasePopup() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let i = 0;
    const cycle = () => {
      setIdx(i % RECENT_BUYERS.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 5500);
      i++;
    };
    const startTimer = setTimeout(cycle, 4000);
    const id = setInterval(cycle, 11000);
    return () => {
      clearTimeout(startTimer);
      clearInterval(id);
    };
  }, []);
  const b = RECENT_BUYERS[idx];
  const minutes = ((idx * 3 + 2) % 14) + 1;
  return (
    <div
      className={`fixed left-3 sm:left-5 bottom-3 sm:bottom-5 z-40 max-w-[300px] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
      aria-live="polite"
    >
      <div className="bg-ink/95 backdrop-blur border border-brand/30 rounded-xl shadow-warm p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-brand-foreground font-bold text-sm shrink-0">
          {b.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div className="text-xs leading-tight">
          <div className="text-cream font-bold">{b.name}</div>
          <div className="text-cream/70">comprou o <span className="text-brand font-semibold">{b.kit}</span></div>
          <div className="text-cream/50 text-[10px] mt-0.5">
            {b.city} · há {minutes} min
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-warm hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
    </a>
  );
}

function TrustSeals() {
  return (
    <section className="py-10 sm:py-12 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-6">
          <span className="text-brand font-semibold uppercase tracking-wider text-xs">Loja oficial · Empresa registrada</span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground mt-1">
            Compra 100% segura e protegida
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: BadgeCheck, t: "CNPJ ativo", s: BRAND.cnpj },
            { icon: Lock, t: "Site seguro SSL", s: "Dados criptografados" },
            { icon: CreditCard, t: "Pagamento seguro", s: "Pix · Cartão · Boleto" },
            { icon: ShieldCheck, t: "Garantia 7 dias", s: "Devolução sem perguntas" },
          ].map((it) => (
            <div key={it.t} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-card">
              <it.icon className="h-8 w-8 text-brand shrink-0" />
              <div className="leading-tight">
                <div className="text-sm font-bold text-foreground">{it.t}</div>
                <div className="text-[11px] text-muted-foreground">{it.s}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 mt-6 text-xs text-muted-foreground">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand transition-colors">
            <Instagram className="h-4 w-4" /> @{BRAND.instagram}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand transition-colors">
            <MessageCircle className="h-4 w-4" /> {BRAND.whatsappLabel}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-4 w-4" /> Enviamos para todo o Brasil
          </span>
        </div>
      </div>
    </section>
  );
}

function DeliveryCalculator() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<
    null | { city: string; uf: string; days: string; price: string }
  >(null);
  const [error, setError] = useState<string | null>(null);

  async function calcular(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) {
      setError("Digite um CEP válido (8 dígitos).");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await r.json();
      if (data.erro) {
        setError("CEP não encontrado.");
        return;
      }
      const uf: string = data.uf;
      const sudeste = ["SP", "RJ", "MG", "ES"];
      const sul = ["PR", "SC", "RS"];
      const nordeste = ["BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA"];
      const centro = ["DF", "GO", "MT", "MS"];
      let days = "5 a 8 dias úteis";
      let price = "R$ 29,90";
      if (sudeste.includes(uf)) { days = "2 a 4 dias úteis"; price = "GRÁTIS"; }
      else if (sul.includes(uf)) { days = "3 a 5 dias úteis"; price = "GRÁTIS"; }
      else if (centro.includes(uf)) { days = "4 a 6 dias úteis"; price = "R$ 19,90"; }
      else if (nordeste.includes(uf)) { days = "5 a 8 dias úteis"; price = "R$ 24,90"; }
      else { days = "6 a 10 dias úteis"; price = "R$ 34,90"; }
      setResult({ city: data.localidade, uf, days, price });
    } catch {
      setError("Não conseguimos consultar agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="politica-entrega" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-card border-2 border-brand/30 rounded-3xl p-6 sm:p-8 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center shadow-warm">
              <Truck className="h-6 w-6 text-brand-foreground" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-ink leading-tight">
                Calcule seu prazo de entrega
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Envio em até 24h via transportadora expressa.
              </p>
            </div>
          </div>
          <form onSubmit={calcular} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CEP (somente números)"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-brand text-brand-foreground font-bold px-6 py-3 rounded-xl shadow-warm hover:scale-[1.02] transition-transform disabled:opacity-60"
            >
              {loading ? "Calculando..." : "Calcular prazo"}
            </button>
          </form>
          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-brand inline-block mt-2"
          >
            Não sei meu CEP
          </a>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
          )}
          {result && (
            <div className="mt-5 rounded-2xl border border-brand/40 bg-brand/5 p-5">
              <div className="text-xs uppercase tracking-wider text-brand font-bold mb-1">
                {result.city}/{result.uf}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Prazo estimado</div>
                  <div className="text-lg font-black text-foreground inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand" /> {result.days}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Frete</div>
                  <div className={`text-lg font-black ${result.price === "GRÁTIS" ? "text-success" : "text-foreground"}`}>
                    {result.price}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">
                Prazo a partir da postagem. Pedidos aprovados em dias úteis até 14h saem no mesmo dia.
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-3 mt-6 text-xs">
            <div className="bg-background/50 rounded-lg p-3 border border-border">
              <div className="font-bold text-foreground mb-0.5">Envio em 24h</div>
              <div className="text-muted-foreground">Direto do nosso CD em SP</div>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border">
              <div className="font-bold text-foreground mb-0.5">Código de rastreio</div>
              <div className="text-muted-foreground">Enviado por e-mail e WhatsApp</div>
            </div>
            <div className="bg-background/50 rounded-lg p-3 border border-border">
              <div className="font-bold text-foreground mb-0.5">Embalagem discreta</div>
              <div className="text-muted-foreground">Caixa lacrada · ninguém vê o que tem dentro</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoReviews() {
  const reviews = [
    {
      img: prodJoias,
      name: "Larissa T.",
      city: "Campinas/SP",
      text: "As joias chegaram lindas, embalagem perfeita. Meu noivo amou a surpresa 😍",
      rating: 5,
    },
    {
      img: prodCaixa,
      name: "Diego R.",
      city: "Niterói/RJ",
      text: "Caixa coração com ursinho ficou top. Ela chorou quando abriu. Recomendo!",
      rating: 5,
    },
    {
      img: prodRosas,
      name: "Patrícia L.",
      city: "Goiânia/GO",
      text: "Rosas naturais lindas, dura muito mais que comprei em florista. Voltarei!",
      rating: 5,
    },
    {
      img: prodLingerie,
      name: "Camila & João",
      city: "Fortaleza/CE",
      text: "Lingerie veio do tamanho certo, tecido bom mesmo. Noite foi inesquecível 🔥",
      rating: 5,
    },
    {
      img: prodVinho,
      name: "Rodrigo S.",
      city: "Vitória/ES",
      text: "O vinho é de qualidade, não é vinho ruim de mercado. Combinou perfeito.",
      rating: 5,
    },
    {
      img: prodBombons,
      name: "Tatiane M.",
      city: "Sorocaba/SP",
      text: "Bombons gourmet maravilhosos, caixa luxuosa. Vale cada centavo.",
      rating: 5,
    },
  ];
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <span className="text-brand font-semibold uppercase tracking-wider text-sm">Fotos reais de clientes</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2 text-foreground">
            Veja como o kit chega na <span className="text-brand">casa de quem comprou</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card flex flex-col">
              <div className="aspect-square overflow-hidden bg-ink">
                <img src={r.img} alt={`Foto enviada por ${r.name}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                  ))}
                </div>
                <p className="text-sm text-foreground italic leading-snug">"{r.text}"</p>
                <div className="text-xs text-muted-foreground pt-1 border-t border-border mt-1 flex items-center justify-between">
                  <span className="font-bold text-foreground">{r.name}</span>
                  <span>{r.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <main>
      <CountdownBar />
      <Hero />
      <TrustStrip />
      <TrustSeals />
      <HowItWorks />
      <Why />
      <Testimonials />
      <PhotoReviews />
      <Offer />
      <DeliveryCalculator />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
      <RecentPurchasePopup />
      <WhatsAppFloat />
    </main>
  );
}
