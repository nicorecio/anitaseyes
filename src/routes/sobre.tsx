import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import sobre1 from "@/assets/sobre-1.jpg";
import sobre2 from "@/assets/sobre-2.jpg";
import sobre3 from "@/assets/sobre-3.jpg";
import sobre4 from "@/assets/sobre-4.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre anitas.eyes — Ropa para mujeres con mirada propia" },
      {
        name: "description",
        content:
          "Anita's Eyes es la tienda de ropa de Anita Sáez: una selección pensada para mujeres que quieren vestirse bien sin complicarse.",
      },
      { property: "og:title", content: "Sobre anitas.eyes" },
      {
        property: "og:description",
        content:
          "La historia de Anita's Eyes: moda accesible y con criterio, elegida por Anita.",
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
          Una mirada hecha
          <br />
          <span className="italic text-muted-foreground">a tu medida.</span>
        </h1>

        <div className="space-y-10 text-lg leading-relaxed text-foreground/90 font-light">
          <p>
            <span className="font-serif text-2xl">a</span>nitas.eyes nació en 2020
            de la mirada de Anita Sáez: una manera muy suya de elegir lo que se pone,
            de mezclar prendas y de saber qué le sienta bien a cada mujer.
          </p>

          {/* Polaroid 1 — derecha */}
          <div className="flex justify-end my-12">
            <Polaroid
              src={sobre1}
              caption="Las primeras prendas, 2020"
              rotate="rotate-3"
              className="w-56 sm:w-64"
            />
          </div>

          <p>
            Sus amigas fueron las primeras clientas. Le pedían consejo, le copiaban
            los looks, le preguntaban dónde compraba. Y así, casi sin darse cuenta,
            lo que era un ojo entrenado se convirtió en una marca con nombre propio.
          </p>

          {/* Par de polaroids — izquierda + derecha solapadas */}
          <div className="relative flex justify-center items-center gap-4 my-16 py-8">
            <Polaroid
              src={sobre2}
              caption="Camisa favorita del verano"
              rotate="-rotate-6"
              className="w-44 sm:w-52 -mr-4 z-10"
            />
            <Polaroid
              src={sobre3}
              caption="Vestidos para todos los días"
              rotate="rotate-6"
              className="w-44 sm:w-52 mt-8"
            />
          </div>

          <p>
            La mirada de Anita nunca se quedó quieta. Se fijaba en qué les faltaba
            a sus amigas en el armario, en qué era difícil encontrar a un precio
            honesto, en qué prenda repetían una y otra vez. Y de ahí nació la
            primera colección propia.
          </p>

          {/* Polaroid 4 — izquierda */}
          <div className="flex justify-start my-12">
            <Polaroid
              src={sobre4}
              caption="Primera colección de ropa, 2026"
              rotate="-rotate-3"
              className="w-56 sm:w-64"
            />
          </div>

          <p>
            Hoy Anita's Eyes es una tienda de ropa para mujeres — tops, camisas,
            vestidos, faldas, pijamas — seleccionada con el mismo criterio con el que
            Anita elige lo que se pone ella. Cómoda, bonita y para todos los días.
          </p>
        </div>

        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <p className="font-serif italic text-xl text-muted-foreground">
            Ropa con criterio. Mirada propia.
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
