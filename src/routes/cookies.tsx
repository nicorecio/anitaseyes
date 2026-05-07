import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Política de cookies — Anitas Eyes" },
      { name: "description", content: "Información sobre el uso de cookies en Anitas Eyes y cómo gestionarlas." },
      { property: "og:title", content: "Política de cookies — Anitas Eyes" },
      { property: "og:description", content: "Qué cookies usamos y cómo gestionarlas." },
    ],
  }),
});

function CookiesPage() {
  const reset = () => {
    try {
      localStorage.removeItem("ae_cookie_consent");
      window.dispatchEvent(new Event("ae:cookie-consent-reset"));
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Información</p>
        <h1 className="font-serif text-4xl md:text-6xl mb-10">Política de cookies</h1>

        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos que un sitio web guarda en tu dispositivo para recordar información
              sobre tu visita, como tus preferencias o el contenido de tu carrito.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Cookies que utilizamos</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Técnicas (necesarias):</strong> imprescindibles para el funcionamiento de la tienda, el carrito
                y el proceso de pago. No requieren consentimiento.
              </li>
              <li>
                <strong>Preferencias:</strong> recuerdan opciones como tu consentimiento de cookies.
              </li>
              <li>
                <strong>Analíticas:</strong> nos ayudan a entender cómo se usa la web de forma agregada y anónima.
                Solo se activan si las aceptas.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Cookies de terceros</h2>
            <p>
              Algunas funcionalidades, como el checkout, utilizan servicios de terceros (por ejemplo, Shopify) que
              pueden instalar sus propias cookies. Te recomendamos consultar sus políticas para más detalle.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">Cómo gestionarlas</h2>
            <p>
              Puedes aceptar o rechazar las cookies no necesarias en el banner de consentimiento. También puedes
              borrar las cookies desde la configuración de tu navegador en cualquier momento.
            </p>
            <div className="mt-4">
              <Button variant="outline" onClick={reset}>Volver a mostrar el banner de cookies</Button>
            </div>
          </section>
        </div>

        <div className="mt-14 text-sm">
          <Link to="/" className="uppercase tracking-widest hover:text-accent">← Volver al inicio</Link>
        </div>
      </article>
    </div>
  );
}
