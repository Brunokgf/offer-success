import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit Paixão — O Presente Definitivo de Dia dos Namorados" },
      {
        name: "description",
        content:
          "Joias, rosas, lingerie, vinho e mais — tudo numa única caixa surpresa. O Kit Paixão é o presente que transforma a noite de vocês. Entrega garantida no Dia dos Namorados.",
      },
      { property: "og:title", content: "Kit Paixão — O presente que ela nunca vai esquecer" },
      {
        property: "og:description",
        content:
          "Joias rubi, lingerie, rosas, vinho e ursinho — tudo numa caixa só. Edição Dia dos Namorados com até 40% OFF.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
