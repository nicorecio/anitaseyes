import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/envios")({
  component: EnviosPage,
  head: () => ({
    meta: [
      { title: "Política de envíos — Anitas Eyes" },
      { name: "description", content: "Información sobre plazos, costes y zonas de envío de Anitas Eyes." },
      { property: "og:title", content: "Política de envíos — Anitas Eyes" },
      { property: "og:description", content: "Plazos, costes y zonas de envío." },
    ],
  }),
});

function EnviosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Información</p>
        <h1 className="font-serif text-4xl md:text-6xl mb-10">Política de envíos</h1>

        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Plazos de entrega</h2>
            <p>
              Preparamos cada pedido con cariño en un plazo de <strong>1 a 3 días laborables</strong>.
              Una vez enviado, la entrega tarda entre <strong>2 y 5 días laborables</strong> en península y entre 5 y 8
              días en Baleares, Canarias, Ceuta y Melilla.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Costes de envío</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Península: 4,90&nbsp;€ (gratis a partir de 45&nbsp;€).</li>
              <li>Baleares: 7,90&nbsp;€.</li>
              <li>Canarias, Ceuta y Melilla: 12,90&nbsp;€ (impuestos no incluidos).</li>
              <li>Resto de Europa: calculado en el checkout.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Seguimiento</h2>
            <p>
              Recibirás un correo con el número de seguimiento en cuanto tu pedido salga. Si no lo
              encuentras, escríbenos por Instagram <a className="underline hover:text-accent" href="https://www.instagram.com/anitas.eyes/" target="_blank" rel="noreferrer">@anitas.eyes</a>.
            </p>
          </section>
        </div>

        <div className="mt-14 text-sm">
          <Link to="/" className="uppercase tracking-widest hover:text-accent">← Volver al inicio</Link>
        </div>
      </article>
    </div>
  );
}
