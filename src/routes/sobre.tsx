import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import sobre1 from "@/assets/sobre-1.jpg";
import sobre2 from "@/assets/sobre-2.jpg";
import sobre3 from "@/assets/sobre-3.jpg";
import sobre4 from "@/assets/sobre-4.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre anitas.eyes — Joyería artesanal con nombre propio" },
      {
        name: "description",
        content:
          "anitas.eyes nace en 2020 de las manos de Anita: pendientes, pulseras y joyas hechas a mano, con nombres de amigas y precios honestos.",
      },
      { property: "og:title", content: "Sobre anitas.eyes" },
      {
        property: "og:description",
        content:
          "Joyería artesanal hecha con cariño desde 2020. Cada pieza lleva el nombre de una amiga.",
      },
      { property: "og:image", content: sobre1 },
    ],
  }),
  component: SobrePage,
});

function Polaroid({
  src,
  caption,
  rotate,
  className = "",
}: {
  src: string;
  caption: string;
  rotate: string;
  className?: string;
}) {
  return (
    <figure
      className={`bg-background p-3 pb-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ${rotate} ${className}`}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img src={src} alt={caption} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <figcaption className="font-serif italic text-sm text-muted-foreground text-center mt-3">
        {caption}
      </figcaption>
    </figure>
  );
}

function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          Desde 2020
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight mb-12">
          Una historia hecha
          <br />
          <span className="italic text-muted-foreground">a mano.</span>
        </h1>

        <div className="space-y-10 text-lg leading-relaxed text-foreground/90 font-light">
          <p>
            <span className="font-serif text-2xl">a</span>nitas.eyes nació en 2020,
            casi sin querer. Anita empezó a crear pendientes, pulseras y pequeñas
            joyas en casa, por puro placer de hacer algo con las manos.
          </p>

          {/* Polaroid 1 — derecha */}
          <div className="flex justify-end my-12">
            <Polaroid
              src={sobre1}
              caption="Las primeras piezas, 2020"
              rotate="rotate-3"
              className="w-56 sm:w-64"
            />
          </div>

          <p>
            Lo que comenzó como una afición fue tomando forma cuando empezó a
            compartir sus piezas en Instagram. Sus amigas fueron las primeras en
            pedirle una, luego otra, y otra más.
          </p>

          {/* Par de polaroids — izquierda + derecha solapadas */}
          <div className="relative flex justify-center items-center gap-4 my-16 py-8">
            <Polaroid
              src={sobre2}
              caption="Pendientes a juego"
              rotate="-rotate-6"
              className="w-44 sm:w-52 -mr-4 z-10"
            />
            <Polaroid
              src={sobre3}
              caption="Aros con esmeralda"
              rotate="rotate-6"
              className="w-44 sm:w-52 mt-8"
            />
          </div>

          <p>
            Aquí no hay grandes márgenes ni fórmulas de negocio: el precio de cada
            pieza es prácticamente lo que cuesta fabricarla. Nunca fue sobre ganar
            dinero, sino sobre crear algo bonito y compartirlo.
          </p>

          {/* Polaroid 4 — izquierda */}
          <div className="flex justify-start my-12">
            <Polaroid
              src={sobre4}
              caption="Mini aros, edición amigas"
              rotate="-rotate-3"
              className="w-56 sm:w-64"
            />
          </div>

          <p>
            Por eso cada modelo lleva el nombre de una de sus amigas. Son piezas
            con dedicatoria, hechas pensando en alguien concreto, en una forma de
            ser, en una manera de mirar. De ahí el nombre:{" "}
            <span className="italic">anitas.eyes</span> — los ojos con los que
            Anita ve a las mujeres que la rodean.
          </p>
        </div>

        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <p className="font-serif italic text-xl text-muted-foreground">
            Hecho a mano, con nombre y apellido.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-sm uppercase tracking-widest border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition self-start sm:self-auto"
          >
            Ver la colección →
          </Link>
        </div>
      </main>
    </div>
  );
}
