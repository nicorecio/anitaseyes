import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";
import { MobileNav } from "./MobileNav";
import logoAsset from "@/assets/anitas-eyes-logo.png.asset.json";

const ROPA_SUBCATS = ["Tops", "Camisas y blusas", "Vestidos", "Faldas", "Pijamas"];
const ACCESORIOS_SUBCATS = ["Pendientes", "Collares", "Anillos", "Pulseras"];

function NavDropdown({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="relative group">
      <Link
        to="/"
        search={{ cat: label === "Ropa" ? "Todo" : "Accesorios" }}
        hash="tienda"
        className="hover:text-muted-foreground transition inline-block py-2"
      >
        {label}
      </Link>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 z-50">
        <ul className="min-w-[220px] bg-background border border-border shadow-lg py-2 normal-case tracking-normal">
          {items.map((item) => (
            <li key={item}>
              <Link
                to="/"
                search={{ cat: item }}
                hash="tienda"
                className="block px-4 py-2 text-sm hover:bg-secondary transition"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header({ hideLogo = false }: { hideLogo?: boolean }) {
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
          <Link to="/" search={{ cat: "New In" }} hash="tienda" className="hover:text-muted-foreground transition">New In</Link>
          <NavDropdown label="Ropa" items={ROPA_SUBCATS} />
          <NavDropdown label="Accesorios" items={ACCESORIOS_SUBCATS} />
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
