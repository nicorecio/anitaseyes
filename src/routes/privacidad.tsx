import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { LEGAL_INFO } from "@/lib/legalInfo";

export const Route = createFileRoute("/privacidad")({
  component: PrivacidadPage,
  head: () => ({
    meta: [
      { title: `Política de privacidad — ${LEGAL_INFO.brand}` },
      { name: "description", content: `Cómo trata ${LEGAL_INFO.brand} tus datos personales conforme al RGPD y la LOPDGDD.` },
      { property: "og:title", content: `Política de privacidad — ${LEGAL_INFO.brand}` },
      { property: "og:description", content: "Tratamiento de datos personales conforme al RGPD." },
    ],
  }),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function PrivacidadPage() {
  const i = LEGAL_INFO;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Información legal</p>
        <h1 className="font-serif text-4xl md:text-6xl mb-4">Política de privacidad</h1>
        <p className="text-sm text-muted-foreground mb-12">Última actualización: {i.lastUpdate}</p>

        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <Section title="1. Responsable del tratamiento">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Responsable:</strong> {i.ownerName} ({i.brand})</li>
              <li><strong>NIF:</strong> {i.nif}</li>
              <li><strong>Domicilio:</strong> {i.address}</li>
              <li><strong>Email:</strong> <a className="underline hover:text-accent" href={`mailto:${i.email}`}>{i.email}</a></li>
            </ul>
          </Section>

          <Section title="2. Finalidades del tratamiento">
            <p>Tratamos tus datos personales para las siguientes finalidades:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gestionar la compra, el pago y el envío de tus pedidos.</li>
              <li>Atender consultas, devoluciones y soporte al cliente.</li>
              <li>Enviarte la newsletter, solo si te has suscrito previamente.</li>
              <li>Cumplir con obligaciones legales (fiscales, contables, de consumo).</li>
            </ul>
          </Section>

          <Section title="3. Base legitimadora">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Ejecución del contrato</strong> de compraventa para tramitar pedidos.</li>
              <li><strong>Consentimiento</strong> para newsletter y cookies no esenciales.</li>
              <li><strong>Obligación legal</strong> para conservar facturas y cumplir con la normativa.</li>
              <li><strong>Interés legítimo</strong> para la atención al cliente y la mejora del servicio.</li>
            </ul>
          </Section>

          <Section title="4. Conservación de los datos">
            <p>
              Conservaremos tus datos mientras dure la relación comercial y, posteriormente, durante los plazos
              legalmente exigidos (mínimo 6 años para datos fiscales). Los datos para newsletter se conservan hasta
              que retires tu consentimiento.
            </p>
          </Section>

          <Section title="5. Destinatarios">
            <p>No cedemos tus datos a terceros salvo a los siguientes encargados de tratamiento:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Plataforma de comercio electrónico (Shopify Inc.) para la gestión de la tienda y los pagos.</li>
              <li>Proveedores de pago (p. ej. Shopify Payments, Stripe, PayPal) para tramitar las transacciones.</li>
              <li>Empresas de transporte para entregar tus pedidos.</li>
              <li>Proveedores de email marketing, en caso de suscripción a la newsletter.</li>
            </ul>
            <p>
              Algunos proveedores pueden estar ubicados fuera del Espacio Económico Europeo. En tal caso, garantizamos
              que se aplican las cláusulas contractuales tipo aprobadas por la Comisión Europea.
            </p>
          </Section>

          <Section title="6. Derechos">
            <p>
              Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación
              y portabilidad escribiendo a <a className="underline hover:text-accent" href={`mailto:${i.email}`}>{i.email}</a>,
              adjuntando copia de tu DNI o documento equivalente. También tienes derecho a presentar una reclamación
              ante la Agencia Española de Protección de Datos (<a className="underline hover:text-accent" href="https://www.aepd.es" target="_blank" rel="noreferrer">www.aepd.es</a>).
            </p>
          </Section>

          <Section title="7. Seguridad">
            <p>
              Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no
              autorizados, pérdida o alteración.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              Para más información sobre las cookies que utilizamos, consulta nuestra{" "}
              <Link to="/cookies" className="underline hover:text-accent text-foreground">política de cookies</Link>.
            </p>
          </Section>
        </div>

        <div className="mt-14 text-sm">
          <Link to="/" className="uppercase tracking-widest hover:text-accent">← Volver al inicio</Link>
        </div>
      </article>
    </div>
  );
}
