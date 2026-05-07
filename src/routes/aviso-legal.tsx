import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { LEGAL_INFO } from "@/lib/legalInfo";

export const Route = createFileRoute("/aviso-legal")({
  component: AvisoLegalPage,
  head: () => ({
    meta: [
      { title: `Aviso legal — ${LEGAL_INFO.brand}` },
      { name: "description", content: `Información legal y condiciones de uso del sitio web de ${LEGAL_INFO.brand}.` },
      { property: "og:title", content: `Aviso legal — ${LEGAL_INFO.brand}` },
      { property: "og:description", content: "Información legal y condiciones de uso del sitio." },
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

function AvisoLegalPage() {
  const i = LEGAL_INFO;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Información legal</p>
        <h1 className="font-serif text-4xl md:text-6xl mb-4">Aviso legal</h1>
        <p className="text-sm text-muted-foreground mb-12">Última actualización: {i.lastUpdate}</p>

        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <Section title="1. Datos identificativos">
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), se informa de los datos del titular del sitio web:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Titular:</strong> {i.ownerName}</li>
              <li><strong>Nombre comercial:</strong> {i.brand}</li>
              <li><strong>NIF:</strong> {i.nif}</li>
              <li><strong>Domicilio:</strong> {i.address}</li>
              <li><strong>Email:</strong> <a className="underline hover:text-accent" href={`mailto:${i.email}`}>{i.email}</a></li>
              {i.phone ? <li><strong>Teléfono:</strong> {i.phone}</li> : null}
              <li><strong>Web:</strong> {i.website}</li>
              {i.registry ? <li>{i.registry}</li> : null}
            </ul>
          </Section>

          <Section title="2. Objeto">
            <p>
              El presente aviso legal regula el uso del sitio web {i.website}, propiedad de {i.ownerName}, cuya
              actividad principal es la venta online de joyería, ropa y accesorios.
            </p>
          </Section>

          <Section title="3. Condiciones de uso">
            <p>
              La utilización del sitio atribuye la condición de usuario e implica la aceptación de las presentes condiciones.
              El usuario se compromete a hacer un uso adecuado de los contenidos y servicios y a no utilizarlos para realizar
              actividades ilícitas o que perjudiquen a terceros.
            </p>
          </Section>

          <Section title="4. Propiedad intelectual e industrial">
            <p>
              Todos los contenidos del sitio (textos, fotografías, gráficos, imágenes, diseño y código) son titularidad
              de {i.brand} o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o
              modificación sin autorización expresa.
            </p>
          </Section>

          <Section title="5. Exclusión de responsabilidad">
            <p>
              {i.brand} no se hace responsable de los daños o perjuicios derivados del uso del sitio o de la imposibilidad
              de acceder al mismo, así como de errores u omisiones que pudieran existir en los contenidos.
            </p>
          </Section>

          <Section title="6. Legislación aplicable">
            <p>
              Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se
              someten a los Juzgados y Tribunales del domicilio del titular, salvo disposición legal en contrario.
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
