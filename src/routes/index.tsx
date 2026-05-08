import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlexiVida — Alívio Natural para Dores nas Articulações em 30 Dias" },
      {
        name: "description",
        content:
          "Fórmula com Colágeno Tipo 2 + Cúrcuma + MSM. Reduza dores no joelho, coluna e articulações de forma natural. Garantia de 30 dias ou seu dinheiro de volta.",
      },
      { property: "og:title", content: "FlexiVida — Volte a se mover sem dor" },
      {
        property: "og:description",
        content:
          "Fórmula natural usada por mais de 47.000 brasileiros para aliviar dores articulares. Garantia de 30 dias.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
