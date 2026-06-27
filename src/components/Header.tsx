import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";
import { MobileNav } from "./MobileNav";
import logoAsset from "@/assets/anitas-eyes-logo.png.asset.json";

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
          <Link to="/" hash="tienda" className="hover:text-muted-foreground transition">Ropa</Link>
          <Link to="/" hash="tienda" className="hover:text-muted-foreground transition">Accesorios</Link>
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
