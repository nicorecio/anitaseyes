import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";
import logoAsset from "@/assets/anitas-eyes-logo.png.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Anita's Eyes — inicio">
          <img src={logoAsset.url} alt="Anita's Eyes" className="h-12 md:h-20 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          <Link to="/" hash="tienda" className="hover:text-muted-foreground transition">Ropa</Link>
          <Link to="/" hash="tienda" className="hover:text-muted-foreground transition">Accesorios</Link>
          <Link to="/sobre" className="hover:text-muted-foreground transition">Sobre</Link>
          <a href="https://www.instagram.com/anitas.eyes/" target="_blank" rel="noreferrer" className="hover:text-muted-foreground transition">Instagram</a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
