import { Link, useNavigate } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";
import { MobileNav } from "./MobileNav";
import logoAsset from "@/assets/anitas-eyes-logo.png.asset.json";

const ROPA_SUBCATS = ["Tops", "Camisas y blusas", "Vestidos", "Faldas", "Pijamas"];
const ACCESORIOS_SUBCATS = ["Pendientes", "Collares", "Anillos", "Pulseras"];

function useGoToCategory() {
  const navigate = useNavigate();
  return (cat: string) => {
    navigate({ to: "/", hash: "tienda" }).then(() => {
      window.dispatchEvent(new CustomEvent("anitas:set-category", { detail: cat }));
    });
  };
}

function NavDropdown({ label, items, parentCat }: { label: string; items: string[]; parentCat: string }) {
  const go = useGoToCategory();
  return (
    <div className="relative group">
      <button
        onClick={() => go(parentCat)}
        className="hover:text-muted-foreground transition inline-block py-2 uppercase tracking-widest"
      >
        {label}
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 z-50">
        <ul className="min-w-[220px] bg-background border border-border shadow-lg py-2 normal-case tracking-normal">
          {items.map((item) => (
            <li key={item}>
              <button
                onClick={() => go(item)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header({ hideLogo = false }: { hideLogo?: boolean }) {
  const go = useGoToCategory();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="Anita's Eyes — inicio">
          <img
            src={logoAsset.url}
            alt="Anita's Eyes"
            className={`h-12 md:h-20 w-auto transition-opacity ${hideLogo ? "opacity-0" : "opacity-100"}`}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          <button onClick={() => go("New In")} className="hover:text-muted-foreground transition uppercase tracking-widest">New In</button>
          <NavDropdown label="Ropa" items={ROPA_SUBCATS} parentCat="Todo" />
          <NavDropdown label="Accesorios" items={ACCESORIOS_SUBCATS} parentCat="Accesorios" />
          <Link to="/sobre" className="hover:text-muted-foreground transition">Sobre Anita</Link>
        </nav>
        <div className="flex items-center gap-1 shrink-0">
          <CartDrawer />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
