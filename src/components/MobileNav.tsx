import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Instagram, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

const CATEGORIES = [
  "Todo",
  "Ropa",
  "Accesorios",
  "New In",
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const goToCategory = async (cat: string) => {
    setOpen(false);
    if (pathname !== "/") {
      await navigate({ to: "/", search: { cat } as any, hash: "tienda" });
    } else {
      window.history.replaceState(null, "", `/?cat=${encodeURIComponent(cat)}#tienda`);
      window.dispatchEvent(new CustomEvent("anitas:set-category", { detail: cat }));
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menú"
        className="md:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-foreground hover:text-muted-foreground transition"
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[88vw] max-w-sm p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border text-left">
          <SheetTitle className="font-serif text-2xl">Menú</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-2">
          <SheetClose asChild>
            <Link
              to="/"
              className="flex items-center justify-between px-4 py-4 text-sm uppercase tracking-widest rounded-md hover:bg-secondary min-h-11"
            >
              Inicio <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </SheetClose>

          <ul className="flex flex-col px-2">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <button
                  onClick={() => goToCategory(c)}
                  className="w-full text-left flex items-center justify-between px-2 py-3 text-sm uppercase tracking-widest rounded-md hover:bg-secondary min-h-11"
                >
                  <span>{c}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>

          <SheetClose asChild>
            <Link
              to="/sobre"
              className="flex items-center justify-between px-4 py-4 text-sm uppercase tracking-widest rounded-md hover:bg-secondary min-h-11"
            >
              Sobre Anita <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </SheetClose>

          <a
            href="https://www.instagram.com/anitas.eyes/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-4 py-4 text-sm uppercase tracking-widest rounded-md hover:bg-secondary min-h-11"
          >
            <span className="inline-flex items-center gap-2">
              <Instagram className="h-4 w-4" /> Instagram
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
        </nav>

        <div className="px-6 py-4 border-t border-border text-xs text-muted-foreground">
          Envíos a toda España · Pago seguro
        </div>
      </SheetContent>
    </Sheet>
  );
}
