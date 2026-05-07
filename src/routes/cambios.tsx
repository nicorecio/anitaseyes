import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/cambios")({
  component: CambiosPage,
  head: () => ({
    meta: [
      { title: "Política de cambios — Anitas Eyes" },
      { name: "description", content: "Cómo solicitar un cambio de talla, color o pieza en Anitas Eyes." },
      { property: "og:title", content: "Política de cambios — Anitas Eyes" },
      { property: "og:description", content: "Cómo cambiar tu pieza por otra talla o modelo." },
    ],
  }),
});

function CambiosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Información</p>
        <h1 className="font-serif text-4xl md:text-6xl mb-10">Política de cambios</h1>

        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Plazo</h2>
            <p>
              Tienes <strong>14 días naturales</strong> desde la recepción del pedido para solicitar un cambio de talla,
              color o modelo (sujeto a disponibilidad).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Cómo hacerlo</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Escríbenos a <a className="underline hover:text-accent" href="mailto:hola@anitaseyes.com">hola@anitaseyes.com</a> indicando tu número de pedido y la pieza por la que quieres cambiarlo.</li>
              <li>Te confirmamos disponibilidad y te enviamos las instrucciones de devolución.</li>
              <li>Una vez recibida la pieza original en perfecto estado, preparamos y enviamos la nueva.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Costes</h2>
            <p>
              El primer cambio dentro de península es <strong>gratuito</strong>. Los siguientes envíos asociados al
              cambio corren por cuenta de la persona compradora.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Excepciones</h2>
            <p>
              No se aceptan cambios de piezas personalizadas, pendientes (por motivos de higiene) ni artículos rebajados.
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
