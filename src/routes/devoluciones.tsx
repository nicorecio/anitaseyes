import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/devoluciones")({
  component: DevolucionesPage,
  head: () => ({
    meta: [
      { title: "Política de devoluciones — Anitas Eyes" },
      { name: "description", content: "Cómo devolver tu pedido y recibir el reembolso en Anitas Eyes." },
      { property: "og:title", content: "Política de devoluciones — Anitas Eyes" },
      { property: "og:description", content: "Plazos, condiciones y reembolsos." },
    ],
  }),
});

function DevolucionesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Información</p>
        <h1 className="font-serif text-4xl md:text-6xl mb-10">Política de devoluciones</h1>

        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Plazo</h2>
            <p>
              Dispones de <strong>14 días naturales</strong> desde la recepción del pedido para solicitar la
              devolución, conforme a la normativa europea de consumo.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Condiciones</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>La pieza debe estar sin usar, en perfecto estado y con su embalaje original.</li>
              <li>No se aceptan devoluciones de pendientes (por higiene), piezas personalizadas ni rebajadas.</li>
              <li>Los gastos de envío de la devolución corren por cuenta de la persona compradora.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Cómo solicitarla</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Escríbenos a <a className="underline hover:text-accent" href="mailto:hola@anitaseyes.com">hola@anitaseyes.com</a> con tu número de pedido.</li>
              <li>Te enviamos la dirección y las instrucciones para el envío de vuelta.</li>
              <li>En cuanto recibamos y revisemos la pieza, tramitamos el reembolso.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Reembolso</h2>
            <p>
              Devolvemos el importe por el mismo método de pago en un plazo máximo de <strong>14 días</strong> desde
              la recepción de la pieza. El coste original del envío no es reembolsable salvo en caso de defecto o error.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Piezas defectuosas</h2>
            <p>
              Si tu pieza llega dañada o con un defecto, escríbenos en las primeras 48 horas con fotos y nos hacemos
              cargo del envío de la devolución y del reemplazo o reembolso.
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
