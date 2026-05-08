import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nosso Céu — Mapa Estelar Personalizado | Presente de Dia dos Namorados" },
      {
        name: "description",
        content:
          "Eternize a noite mais especial de vocês em um quadro com o mapa real das estrelas. Personalizado, emoldurado e embalado pra presentear. Entrega garantida no Dia dos Namorados.",
      },
      { property: "og:title", content: "Nosso Céu — O presente que ela vai abrir chorando" },
      {
        property: "og:description",
        content:
          "Mapa estelar personalizado da noite que mudou tudo. Já vem emoldurado e embalado. Edição Dia dos Namorados com 40% OFF.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
