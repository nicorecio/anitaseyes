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
      className="fixed inset-x-0 bottom-0 z-50 pointer-events-none"
    >
      <div className="pointer-events-auto bg-background border-t border-border px-4 py-2 sm:py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground flex-1 leading-snug">
            Usamos cookies para mejorar tu experiencia.{" "}
            <Link to="/cookies" className="underline hover:text-accent text-foreground whitespace-nowrap">
              política de cookies
            </Link>
          </p>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5" onClick={() => decide("rejected")}>
              Rechazar
            </Button>
            <Button size="sm" className="h-7 text-xs px-2.5" onClick={() => decide("accepted")}>
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
