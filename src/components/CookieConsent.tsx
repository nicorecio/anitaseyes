import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ae_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        setVisible(!localStorage.getItem(STORAGE_KEY));
      } catch {
        setVisible(true);
      }
    };
    check();
    window.addEventListener("ae:cookie-consent-reset", check);
    return () => window.removeEventListener("ae:cookie-consent-reset", check);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-4xl mx-auto bg-background border border-border shadow-lg p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el uso de la web. Puedes aceptar
          todas o rechazar las opcionales. Más detalle en nuestra{" "}
          <Link to="/cookies" className="underline hover:text-accent text-foreground">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={() => decide("rejected")}>
            Rechazar
          </Button>
          <Button size="sm" onClick={() => decide("accepted")}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
